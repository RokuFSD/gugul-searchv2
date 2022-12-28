import React from "react";
import * as Form from "../../components/form";
import { login, logout } from "../../redux/features/auth/thunkActions";
import { useAppDispatch } from "../../redux/hooks/store";

function AuthPage() {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Form.Form
        onSubmit={(e) => dispatch(login(e))}
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
      <button type="button" onClick={() => dispatch(logout())}>
        Log out
      </button>
    </div>
  );
}

export default AuthPage;
