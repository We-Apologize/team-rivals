const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASS_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const emailValidation = (email) => {
  if (email.toLowerCase().match(EMAIL_REGEX)) return { valid: true, msg: "" };
  if (email.length <= 0) return { valid: false, msg: "*Email is required!" };
  else if (email.length < 5 || email.length > 50)
    return {
      valid: false,
      msg: "*Email should be between 5 and 50 characters",
    };
  else {
    return {
      valid: false,
      msg: "*Invalid Email Address",
    };
  }
};

const passwordStrength = (password) => {
  if (password.length < 8 || password.length > 60) return true;
  return false;
};
module.exports = { emailValidation, passwordStrength };
