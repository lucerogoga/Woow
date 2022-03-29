export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const expression = /^([\.\_a-zA-Z0-9]+)@([a-zA-A]+)\.([a-zA-Z]){2,8}/;

  if (!email) {
    return false;
  }

  return typeof email === "string"
    ? expression.test(email.trim())
    : expression.test(`${email}`);
};
