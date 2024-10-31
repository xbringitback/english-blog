import Login from "./Login";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
