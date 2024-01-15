import * as yup from "yup";

const loginFormSchema = yup
  .object({
    usernameOrEmail: yup
      .string()
      .required("Username or Email is required")
      .test("is-email-or-string", "Enter a valid email or string", (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) || typeof value === "string";
      }),
    password: yup.string().required("password is required"),
  })
  .required();

export default loginFormSchema;
