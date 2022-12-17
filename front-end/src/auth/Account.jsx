import React from "react";
import { useNavigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const Account = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const history = useNavigate();

  if (!authState) {
    return <div>Loading ...</div>;
  }

  const handleLogin = async () => history("/e-commerce-app-584/login");

  const handleLogout = async () => oktaAuth.signOut();

  return (
    <div>
      {authState.isAuthenticated ? (
        <span onClick={handleLogout}>Logout</span>
      ) : (
        <span onClick={handleLogin}>Login</span>
      )}
    </div>
  );
};

export default Account;
