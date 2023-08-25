/**
 * @description gives get request params excluding falsy values
 * @param {Object} params
 * @returns {String} formatted query params
 */
export const setParamsForGetRequest = (params) => {
  const paramKeys = Object.keys(params);
  const paramValues = Object.values(params);
  const param = paramKeys.map((key, index) => {
    if (![null, ''].includes(paramValues[index])) {
      return `${key}=${paramValues[index]}`;
    } else {
      return null;
    }
  });
  const filteredParams = param.filter((i) => i !== null);
  return `?${filteredParams.join('&')}`;
};
