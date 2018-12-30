/* eslint no-console: 0 */

export const stateValidation = () => {
  // As the state is a dropdown there is no validation needed
  return true;
};

export const zipCodeValidation = value => {
  const format = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  return format.test(value);
};

export const phoneValidation = value => {
  const format = /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/;
  return format.test(value);
};
