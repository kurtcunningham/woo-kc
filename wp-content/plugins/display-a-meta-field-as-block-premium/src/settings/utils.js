/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

/**
 * Internal dependencies
 */

/**
 * For debug purposes
 *
 * @param {Mixed} data
 * @param {String} type
 * @returns
 */
export const log = (data, type = "log") => {
  if (!data) {
    return;
  }

  if (window?.MFBLOG?.environmentType === "development") {
    if (
      ["log", "info", "warn", "error", "debug", "dir", "table"].includes(type)
    ) {
      console[type](data);
    } else {
      console.log(data);
    }
  }
};

/**
 * Premium customers?
 */
export const isPremium = (() => {
  let isPremium = false;
  try {
    isPremium = MFB.isPremium;
  } catch (error) {}

  return isPremium;
})();

/**
 * Manage data with localStorage
 *
 * @param {String} key
 * @param {Object} defaultValue
 * @returns {Array}
 */
export const useLocalStorage = (key, defaultValue = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const savedValue = JSON.parse(localStorage.getItem(key));
      if (isNil(savedValue)) {
        return defaultValue;
      }

      return savedValue;
    } catch (error) {
      log(error, "error");
      return defaultValue;
    }
  });

  const setValue = (value) => {
    setStoredValue(value);

    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

/**
 * Build a hook for apiFetch
 */
const DEFAULT_FETCH_OPTIONS = {
  headers: { "Content-Type": "application/json" },
  method: "GET",
};

export const useApiFetch = (path, options = {}, dependencies = []) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setData(undefined);

    apiFetch({ path, ...{ ...DEFAULT_FETCH_OPTIONS, ...options } })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, data };
};

/**
 * URL parser
 */
export class SearchParams {
  constructor(url = "") {
    if (!url) {
      url = window.location.href;
    }
    this.parsedURL = new URL(url);
  }

  get(prop, defaultVal = null) {
    const value = this.parsedURL.searchParams.get(prop);

    if (value) {
      return value;
    }

    return defaultVal;
  }
  set(prop, value, pushState = true) {
    this.parsedURL.searchParams.set(prop, value);
    if (pushState && history.pushState) {
      history.pushState({}, null, this.parsedURL.href);
    }
  }
  delete(prop, pushState = true) {
    this.parsedURL.searchParams.delete(prop);
    if (pushState && history.pushState) {
      history.pushState({}, null, this.parsedURL.href);
    }
  }
  reload() {
    if (history?.go) {
      history.go();
    } else {
      window.location.reload();
    }
  }
  getHref() {
    return this.parsedURL.href;
  }
}

export const useGlobalData = () => {
  const { loading, error, data: { data } = {} } = useApiFetch("mfb/v1/getDocs");

  return { loading, error, data };
};

export const DataContext = createContext();
