import React from "react";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../../server";
import "./styles/LoginPage.scss";

const Login = (): JSX.Element => {
  const history = useHistory();

  const loginFormInput = [
    {
      label: "Email",
      type: "text",
      placeholder: "Email address",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  const handleLoginFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginFormValues: Record<string, string> = {};

    ["email", "password"].forEach((key) => {
      loginFormValues[key] = event.currentTarget[key]?.value || "";
    });
    loginUser(loginFormValues as { email: string; password: string });
    history.push("/app");
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-form-holder">
        <form onSubmit={handleLoginFormSubmit} className="form">
          <div className="header">
            <h1>Wafi Login</h1>
          </div>
          {loginFormInput.map((item) => (
            <div key={item.label} className="formGroup">
              <label>{item.label}</label>
              <div className="input-field">
                <input
                  type={item.type}
                  placeholder={item.placeholder}
                  name={item.label.toLowerCase()}
                />
              </div>
            </div>
          ))}
          <button type="submit">login</button>
        </form>
        <small className="no-account">
          Don't have an account? <Link to="/signup">Sign up</Link>{" "}
        </small>
      </div>
    </div>
  );
};

export default Login;
