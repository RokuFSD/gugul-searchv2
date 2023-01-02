import React from "react";
import { useAppDispatch } from "../../../redux/hooks/store";
import { login } from "../../../redux/features/auth/thunkActions";
import * as Form from "../index";
import selectView from "../../../services/selectView";

function LoginForm() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex h-screen items-center justify-center">
      <Form.Form
        className="max-w-xs flex items-center justify-center flex-wrap gap-4"
        onSubmit={(e) => dispatch(login(e))}
        initialValues={{ email: "", password: "" }}
        path="/"
      >
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
          Log In
        </Form.FormSubmit>
        <div className="w-full flex flex-col items-center gap-2">
          <h2 className="text-gray-400">Don&apos;t have an account?</h2>
          <button
            type="button"
            onClick={() => selectView.setSubject(true)}
            className="duration-200 bg-neutral-200 rounded px-2 py-1 text-black shadow-lg border border-neutral-500 transition-colors hover:border-blue-500 hover:text-blue-500"
          >
            Sign up for free!
          </button>
        </div>
      </Form.Form>
    </div>
  );
}

export default LoginForm;
