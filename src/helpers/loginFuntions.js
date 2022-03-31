export const validateEmail = (email) => {
  const expression = /^([\.\_a-zA-Z0-9]+)@([a-zA-A]+)\.([a-zA-Z]){2,8}/;

  if (!email) {
    return false;
  }

  return typeof email === "string"
    ? expression.test(email.trim())
    : expression.test(`${email}`);
};

export const validateEmailDomains = (name) => {
  // ! buena abajo
  const expression = /\w+([-+.]\w+)*@(yahoo\.com|gmail\.com)/;

  return expression.test(name);
};

// const prueba = "miriana@yahoo.com";
// console.log("dominio?, ", validateEmailDomains(prueba));

export const validateName = (name) => {
  const expression = /^[a-zA-Z\s]*$/;

  return expression.test(name);
};

export const validatePassword = (pwd) => {
  return pwd.trim().length >= 6;
};
console.log("valida psw, ", validatePassword("168"));
