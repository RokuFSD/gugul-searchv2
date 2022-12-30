import React from "react";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import RegisterForm from "../../components/forms/RegisterForm/RegisterForm";
import DualView from "../../components/utils/DualView";

function AuthPage() {
  return <DualView first={<LoginForm />} second={<RegisterForm />} />;
}

export default AuthPage;
