/* eslint no-console: 0 */

export const stateValidation = value => {
  console.log("stateValidation", value);
};

export const zipCodeValidation = value => {
  const usValidZipCodeRegExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  return usValidZipCodeRegExp.test(value);
};

export const phoneValidation = value => {
  console.log("phoneValidation", value);
};
