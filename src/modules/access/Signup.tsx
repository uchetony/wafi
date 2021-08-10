import React from "react";
import { Link, useHistory } from "react-router-dom";
import { addUser, IUser } from "../../server";
import "./styles/SignupPage.scss";

const Signup = (): JSX.Element => {
  const history = useHistory();

  const signupFormInput = [
    {
      label: "First Name",
      name: "first_name",
      type: "text",
      placeholder: "First name",
    },
    {
      label: "Last Name",
      name: "last_name",
      type: "text",
      placeholder: "Last name",
    },
    {
      label: "Email",
      name: "email",
      type: "text",
      placeholder: "Email address",
    },
    {
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Username",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  const handleSignupFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signupFormValues: Record<string, string> = {};

    ["first_name", "last_name", "email", "username", "password"].forEach(
      (key) => {
        signupFormValues[key] = event.currentTarget[key]?.value || "";
      }
    );
    addUser(signupFormValues as Omit<IUser, "wallet_balance">);
    history.push("/app");
  };

  return (
    <div className="signup-page-wrapper">
      <div className="signup-form-holder">
        <form onSubmit={handleSignupFormSubmit} className="form">
          <div className="header">
            <h1>Wafi Sign up</h1>
          </div>
          {signupFormInput.map((item) => (
            <div key={item.label} className="formGroup">
              <label>{item.label}</label>
              <div className="input-field">
                <input
                  type={item.type}
                  placeholder={item.placeholder}
                  name={item.name}
                />
              </div>
            </div>
          ))}
          <button type="submit">Signup</button>
        </form>
        <small className="no-account">
          Already have an account? <Link to="/login">Sign in</Link>
        </small>
      </div>
    </div>
  );
};

export default Signup;
