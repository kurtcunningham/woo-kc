export function isString(value) {
  return typeof value === 'string';
}

export function isEmptyString(str) {
  return str == null || str.trim() === '';
}

export function isNonEmptyString(str) {
  return isString(str) && !isEmptyString(str);
}
