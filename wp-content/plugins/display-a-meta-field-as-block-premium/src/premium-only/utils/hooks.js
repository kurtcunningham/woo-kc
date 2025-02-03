/**
 * External dependencies
 */
import { isEmpty, omit } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  useEntityProp,
  useEntityRecord,
  store as coreStore,
} from "@wordpress/core-data";
import { useSelect, useDispatch } from "@wordpress/data";
import { useState, useEffect } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { isACFFieldKey } from "./blocks";
import { toType, useMFBData } from "../../utils";
import { store as MFBStore } from "../store";
import { ExcludeSettingFields } from "./constants";

/**
 * Load setting data for the block
 *
 * @param {Object}
 * @returns {Object}
 */
export const useSettingData = ({ metaType, fieldName, fieldType }) => {
  const [settingFieldValue] = useEntityProp(
    "root",
    "site",
    metaType === "option" ? fieldName : "",
  );

  const { record } = useEntityRecord("root", "site");

  const settingFieldNames =
    toType(record) === "object" ? omit(record, ExcludeSettingFields) : false;

  const { ACFGlobalFields, isLoadingACFGlobalFields } = useACFGlobalFields({
    isFetchData: metaType === "option" && fieldType === "acf",
  });

  return {
    settingFieldValue,
    settingFieldNames:
      toType(settingFieldNames) === "object"
        ? Object.keys(settingFieldNames).filter(
            (key) =>
              !["object", "array"].includes(toType(settingFieldNames[key])),
          )
        : false,
    ACFGlobalFields,
    isLoading: isLoadingACFGlobalFields,
  };
};

const getEntityObject = (rawValue, fieldName) => {
  const {
    acf: ACFFields,
    meta: metaFields,
    mfb_rest_fields: restFieldNames = {},
  } = rawValue ?? {};

  const restFieldValue = restFieldNames[fieldName] ?? "";

  return {
    ACFFields,
    metaFields,
    restFieldNames,
    restFieldValue,
  };
};

/**
 * Load all available data for the block
 *
 * @param {Object}
 * @returns {Object}
 */
export const useMFBDataPro = ({
  metaType,
  postType,
  postId,
  fieldName,
  fieldType,
  objectId = 0,
  isCustomSource = false,
  postParamId,
}) => {
  let kind, name, id, acfId;

  const currentUser = useSelect(
    (select) => select(coreStore).getCurrentUser(),
    [],
  );

  const isCustomPost = metaType === "post" && isCustomSource;

  if (metaType === "user") {
    kind = "root";
    name = "user";
    id = objectId;
    acfId = id ? `user_${id}` : `user_${currentUser ? currentUser?.id : 0}`;
  } else if (metaType === "term") {
    kind = "taxonomy";
    id = objectId;
    acfId = `term_${id}`;
  } else {
    kind = "postType";

    if (isCustomPost || !postId) {
      id = objectId;
    } else {
      id = postId;
      name = postType;
    }

    acfId = id;
  }

  if (metaType === "option") {
    acfId = "option";
  }

  const isFetchEntity =
    "option" !== metaType &&
    (["user", "term"].includes(metaType) || isCustomPost || !postId);

  let customEntityId;
  if (["user", "term"].includes(metaType) || isCustomPost) {
    customEntityId = objectId;
  } else {
    customEntityId = postParamId ? postParamId : objectId;
  }
  const entityType = !metaType ? "post" : metaType;

  const { entity: customEntity, isLoadingEntity } = useCustomEntity({
    type: entityType,
    id: customEntityId,
    isFetchData: isFetchEntity,
  });

  let entity = useMFBData({
    kind,
    name: isFetchEntity && customEntity ? customEntity?.name : name,
    id,
    fieldName,
  });

  if (["user", "term"].includes(metaType)) {
    if (customEntity) {
      entity = getEntityObject(customEntity);
    } else if (metaType === "user") {
      entity = getEntityObject(currentUser);
    }
  } else if ((isCustomPost || !postId) && customEntity) {
    entity = getEntityObject(customEntity);
  }

  const { ACFFields, metaFields, restFieldNames, restFieldValue } = entity;

  const {
    settingFieldValue,
    settingFieldNames,
    ACFGlobalFields,
    isLoading: isLoadingSettingData,
  } = useSettingData({ metaType, fieldName, fieldType });

  // Get field value object by key
  const { isLoadingACFField, ACFFieldObject } = useACFField({
    key: fieldName,
    id: acfId,
    isFetchData: fieldType === "acf" && isACFFieldKey(fieldName),
  });

  return {
    metaFields,
    restFieldNames,
    restFieldValue,
    settingFieldNames,
    settingFieldValue,
    ACFFields: metaType === "option" ? ACFGlobalFields : ACFFields,
    ACFFieldObject,
    customEntity,
    isLoading: isLoadingSettingData || isLoadingACFField || isLoadingEntity,
  };
};

/**
 * Load ACFGlobalFields from store
 *
 * @param {Object}
 * @returns {Array}
 */
export const useACFGlobalFields = ({ isFetchData }) => {
  const { loadACFGlobalFields } = useDispatch(MFBStore);

  const [isLoadingACFGlobalFields, setIsLoadingACFGlobalFields] =
    useState(false);
  const [ACFGlobalFields, setACFGlobalFields] = useState(null);

  if (isFetchData && !isLoadingACFGlobalFields && isEmpty(ACFGlobalFields)) {
    setIsLoadingACFGlobalFields(true);
    loadACFGlobalFields()
      .then((res) => {
        setACFGlobalFields(res);
      })
      .finally(() => setIsLoadingACFGlobalFields(false));
  }

  return { isLoadingACFGlobalFields, ACFGlobalFields };
};

/**
 * Load an ACF Field by key from store
 *
 * @param {Object}
 * @returns {Array}
 */
export const useACFField = ({ key, id, isFetchData }) => {
  const { loadACFField } = useDispatch(MFBStore);

  const [isLoadingACFField, setIsLoadingACFField] = useState(false);
  const [ACFFieldObject, setACFFieldObject] = useState(null);

  useEffect(() => {
    if (isFetchData && key) {
      setIsLoadingACFField(true);
      loadACFField(key, id)
        .then((res) => {
          if (res?.field) {
            setACFFieldObject(res);
          }
        })
        .finally(() => setIsLoadingACFField(false));
    }
  }, [key, id, isFetchData]);

  return { isLoadingACFField, ACFFieldObject };
};

/**
 * Load custom entity
 *
 * @param {Object}
 * @returns {Array}
 */
export const useCustomEntity = ({ type, id, isFetchData }) => {
  const { loadEntity } = useDispatch(MFBStore);

  const [isLoadingEntity, setIsLoadingEntity] = useState(false);
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    if (isFetchData && type && id) {
      setIsLoadingEntity(true);
      loadEntity({ type, id })
        .then((res) => {
          if (res) {
            setEntity(res);
          }
        })
        .finally(() => setIsLoadingEntity(false));
    }
  }, [type, id, isFetchData]);

  return { isLoadingEntity, entity };
};
