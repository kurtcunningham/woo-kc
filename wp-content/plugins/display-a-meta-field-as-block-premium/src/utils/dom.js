// Shout-out Angus Croll (https://goo.gl/pxwQGp)
export const toType = (object) => {
  if (object === null || object === undefined) {
    return `${object}`;
  }

  return Object.prototype.toString
    .call(object)
    .match(/\s([a-z]+)/i)[1]
    .toLowerCase();
};
