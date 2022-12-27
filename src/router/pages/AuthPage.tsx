import React from "react";
import axios from "axios";
import * as Form from "../../components/form";

async function submit(data: { [p: string]: FormDataEntryValue }) {
  const result = await axios.post("http://localhost:5005/auth/login", data, {
    withCredentials: true,
  });
  return result?.data;
}

function AuthPage() {
  return (
    <div>
      <Form.Form
        onSubmit={(e) => submit(e)}
        initialValues={{ username: "", password: "" }}
      >
        <Form.FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
        />
        <Form.FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <Form.FormSubmit>Log-In</Form.FormSubmit>
      </Form.Form>
    </div>
  );
}

export default AuthPage;
