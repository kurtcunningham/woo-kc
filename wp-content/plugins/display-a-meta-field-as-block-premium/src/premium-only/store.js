/**
 * External dependencies
 */
import { isEmpty } from "lodash";

/**
 * WordPress dependencies
 */
import { createReduxStore, register } from "@wordpress/data";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { toType } from "../utils";

/**
 * Constants
 */
const storeName = "mfb/store";
const initialState = {
  ACFGlobalFields: {},
  ACFFields: {},
  entities: {},
};

const getACFGlobalFieldsPath = "mfb/v1/getACFGlobalFields";
const getACFFieldByKeyPath = "mfb/v1/getACFFieldByKey";
const getEntityByIdPath = "mfb/v1/getEntityById";

/**
 * Register store
 */
export const store = createReduxStore(storeName, {
  selectors: {
    getACFGlobalFields(state) {
      return state?.ACFGlobalFields ?? {};
    },
    getACFField(state, key) {
      return state?.ACFFields[key] ?? null;
    },
    getEntity(state, key) {
      return state?.entities[key] ?? null;
    },
  },
  actions: {
    loadACFGlobalFields() {
      return async ({ select, dispatch }) => {
        let ACFGlobalFields = select.getACFGlobalFields();

        if (ACFGlobalFields && !isEmpty(ACFGlobalFields)) {
          return ACFGlobalFields;
        }

        const res = await apiFetch({
          path: getACFGlobalFieldsPath,
        });

        dispatch({ type: "UPDATE_ACFGLOBALFIELDS", payload: res });

        return res;
      };
    },
    loadACFField(key, id) {
      return async ({ select, dispatch }) => {
        if (!key) {
          return;
        }

        let field = select.getACFField(key);

        if (field) {
          return field;
        }

        const res = await apiFetch({
          path: addQueryArgs(getACFFieldByKeyPath, {
            key,
            id,
          }),
        });

        if (toType(res) === "object" && res?.field) {
          dispatch({ type: "UPDATE_ACFFIELDS", payload: { key: res } });
        }

        return res;
      };
    },
    loadEntity({ id, type }) {
      return async ({ select, dispatch }) => {
        if (!id || !type) {
          return;
        }

        const key = `${type}_${id}`;

        let entity = select.getEntity(key);

        if (entity) {
          return entity;
        }

        const res = await apiFetch({
          path: addQueryArgs(getEntityByIdPath, { id, type }),
        });

        const result = { ...res, metaType: type };

        if (result) {
          dispatch({
            type: "UPDATE_ENTITY",
            payload: { [key]: result },
          });
        }

        return result;
      };
    },
  },
  reducer: (state = initialState, action) => {
    switch (action.type) {
      case "UPDATE_ACFGLOBALFIELDS":
        return {
          ...state,
          ACFGlobalFields: { ...action.payload },
        };

      case "UPDATE_ACFFIELDS":
        return {
          ...state,
          ACFFields: { ...state.ACFFields, ...action.payload },
        };

      case "UPDATE_ENTITY":
        return {
          ...state,
          entities: { ...state.entities, ...action.payload },
        };

      default:
        return state;
    }
  },
});

register(store);
