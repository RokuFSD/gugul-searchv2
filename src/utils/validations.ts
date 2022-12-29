function validateLength(length: number, str: string): boolean {
  return str.length >= length;
}

function validatePassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password);
}

const validations = [
  ({ username }: { username: string }) =>
    validateLength(8, username) || {
      username: "Username must be at least 8 characters",
    },

  ({ password }: { password: string }) =>
    validatePassword(password) || {
      password:
        "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter and one number",
    },
];

export default validations;
