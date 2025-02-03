/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { useEntityProp } from "@wordpress/core-data";
import { store as editorStore } from "@wordpress/editor";
import { useState, useEffect, useCallback } from "@wordpress/element";
import { addQueryArgs } from "@wordpress/url";
import apiFetch from "@wordpress/api-fetch";

/**
 * Internal dependencies
 */

/**
 * A custom hook for dynamic fields
 *
 * @param {Object} attributes
 * @param {Object} args
 * @param {Array} dependencies
 * @returns
 */
export const useDynamicValue = (attributes, args = {}, dependencies = []) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();

  dependencies = [
    attributes["fieldType"],
    attributes["fieldName"],
    ...dependencies,
  ];

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setData(undefined);

    apiFetch({
      path: addQueryArgs("/mfb/v1/getDynamicField", { attributes, ...args }),
      headers: { "Content-Type": "application/json" },
      method: "GET",
    })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies);

  useEffect(() => {
    if (
      "dynamic" === (attributes["fieldType"] ?? "") &&
      (attributes["fieldName"] ?? "")
    ) {
      callbackMemoized();
    } else {
      if (error) {
        setError(undefined);
      }

      if (data) {
        setData(undefined);
      }
    }
  }, [callbackMemoized]);

  return { loading, error, data };
};

/**
 * Debounce a value
 *
 * @param {Mixed} rawValue
 * @param {int} delay
 * @returns
 */
export const useDebounceValue = (rawValue, delay = 500) => {
  const [value, setValue] = useState(rawValue);
  let timeoutId;
  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      setValue(rawValue);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [rawValue, delay]);

  return value;
};

/**
 * Debounce a setting field
 *
 * @param {Object}
 */
export const useDebounceField = ({ value, onChange, delay = 500 }) => {
  const [tmpValue, setTmpValue] = useState(value);
  const debounceValue = useDebounceValue(tmpValue, delay);
  const onChangeCached = useCallback(onChange);

  useEffect(() => {
    if (debounceValue !== value) {
      onChangeCached(debounceValue);
    }
  }, [debounceValue, value, onChangeCached]);

  return [tmpValue, setTmpValue];
};

/**
 * Make current post type and Id as the fallback if there is no postId, postType from the context
 *
 * @param {Object} { postType, postId }
 * @returns {Object}
 */
export const useMaybeCurrentPost = ({ postType, postId }) => {
  const { getCurrentPostId, getCurrentPostType } = useSelect(editorStore);

  // If there is no post type, post id from the context then fallback to current post type, post id.
  if (!postType) {
    const currentPostType = getCurrentPostType();
    if (!["wp_template", "wp_template_part"].includes(currentPostType))
      postType = currentPostType;
  }

  if (!postId) {
    let currentPostId = getCurrentPostId();
    currentPostId = parseInt(currentPostId);
    if (currentPostId && !isNaN(currentPostId)) {
      postId = currentPostId;
    }
  }

  return { postType, postId };
};

/**
 * Load all available data for the block
 *
 * @param {Object}
 * @returns {Object}
 */
export const useMFBData = ({ kind = "postType", name, id, fieldName }) => {
  const [ACFFields] = useEntityProp(kind, name, "acf", id);

  const [metaFields] = useEntityProp(kind, name, "meta", id);

  const [restFieldNames] = useEntityProp(kind, name, "mfb_rest_fields", id);

  const [restFieldValue] = useEntityProp(kind, name, fieldName, id);

  return { ACFFields, metaFields, restFieldNames, restFieldValue };
};
