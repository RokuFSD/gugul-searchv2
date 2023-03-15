const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

/* Regex one letter one lowercase and one uppercase */

function matchRegex(value: string, regex: RegExp) {
  return value.length === 0 || regex.test(value);
}

function onlyLetters(value: string) {
  const regex = /^[a-zA-Z]+$/;
  return value.length === 0 || regex.test(value);
}

function validLength(value: string, min: number) {
  return value.length >= min;
}

const validations = [
  ({ name }: { name: string }) =>
    onlyLetters(name) || {
      name: "Only letters are allowed",
    },
  ({ password }: { password: string }) =>
    validLength(password, 8) || {
      password: "Password must be at least 8 characters long",
    },
  ({ password }: { password: string }) =>
    matchRegex(password, passwordRegex) || {
      password:
        "Password must contain at least one lowercase, one uppercase and one number",
    },

  ({ email }: { email: string }) =>
    matchRegex(email, emailRegex) || {
      email: "Invalid email address",
    },
];

export default validations;
