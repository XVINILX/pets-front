import React, { useEffect } from "react";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const AboutPage: React.FC = () => {
  //TODO get the jwt from frontend url
  // add this jwt to a cookie
  // make user be redirected to the initial page

  const { setLoginCookie } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("accessToken");
    if (token) {
      setLoginCookie(token);
      navigate("/");
    }
  }, [navigate]);

  return <div></div>;
};

export default AboutPage;
