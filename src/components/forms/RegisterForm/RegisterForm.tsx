import React from "react";
import { useAppDispatch } from "../../../redux/hooks/store";
import { login } from "../../../redux/features/auth/thunkActions";
import * as Form from "../index";

function RegisterForm() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex h-screen items-center justify-center">
      <Form.Form
        className="max-w-xs flex items-center justify-center flex-wrap gap-4"
        onSubmit={(e) => dispatch(login(e))}
        initialValues={{ name: "", password: "", email: "" }}
      >
        <Form.FormInput
          name="name"
          type="text"
          placeholder="Name"
          className="transition-colors basis-full h-10 px-2 mb-2 text-sm border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-600"
          required
        />
        <Form.FormInput
          name="email"
          type="email"
          placeholder="Email"
          className="transition-colors basis-full h-10 px-2 mb-2 text-sm border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-600"
          required
        />
        <Form.FormInput
          name="password"
          type="password"
          placeholder="Password"
          className="transition-colors basis-full h-10 px-2 mb-2 text-sm border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-600"
          required
        />
        {/* The ! tag is used because framer motion */}
        <Form.FormSubmit className="w-full border rounded h-10 my-6 transition-colors hover:bg-gray-300 hover:text-gray-600 focus:outline-blue-100">
          Log-In
        </Form.FormSubmit>
      </Form.Form>
    </div>
  );
}

export default RegisterForm;
