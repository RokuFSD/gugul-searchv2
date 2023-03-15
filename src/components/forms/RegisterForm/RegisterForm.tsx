import React from "react";
import { useNavigate } from "react-router-dom";
import * as Form from "../index";
import ArrowSvg from "../../svgs/ArrowSvg";
import validations from "../../../utils/validations";
import UserService from "../../../services/User";
import { PublicRoutes } from "../../../models/routes";

function RegisterForm() {
  const navigate = useNavigate();
  return (
    <Form.Form
      className="max-w-xs flex items-center justify-center flex-wrap gap-4 basis-full relative"
      onSubmit={(e) => UserService.create(e)}
      initialValues={{ name: "", password: "", email: "" }}
      validations={validations}
      path="/login"
    >
      <div className="absolute bottom-full -left-5 md:left-[unset] md:right-full">
        <button type="button" onClick={() => navigate(-1)} title="Go back">
          <ArrowSvg rotate={90} size="large" />
        </button>
      </div>
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
      <Form.FormSubmit
        className="w-full border rounded h-10 my-6 transition-colors hover:bg-gray-300 hover:text-gray-600 focus:outline-blue-100">
        Sign Up
      </Form.FormSubmit>
      <div className="w-full flex flex-col items-center gap-2">
        <h2 className="text-gray-400">Already have an account?</h2>
        <button
          type="button"
          onClick={() => navigate(PublicRoutes.LOGIN)}
          className="duration-200 bg-neutral-200 rounded px-2 py-1 text-black shadow-lg border border-neutral-500 transition-colors hover:border-blue-500 hover:text-blue-500"
        >
          Log in here!
        </button>
      </div>
    </Form.Form>
  );
}

export default RegisterForm;
