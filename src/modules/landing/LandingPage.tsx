import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { seedDb } from "../../server";
import "./styles/LandingPage.scss";

const LandingPage = (): JSX.Element => {
  const db = localStorage.getItem("wafi-test-database");
  const history = useHistory();

  useEffect(() => {
    if (!db) seedDb();
  }, [db]);

  useEffect(() => {
    const timer = setTimeout(() => {
      history.replace({ pathname: "/app" });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [history]);

  return (
    <div className="landing-wrapper">
      <div className="landing-container">
        <div className="logo-holder">
          <h1>Wafi</h1>
        </div>
        <div className="company-description-holder">
          <span>by Wafi Inc.</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
