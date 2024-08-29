import React, { useState } from "react";

const HomePage: React.FC = () => {
  const [authType, setAuthType] = useState<string>("initial");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        gap: "25px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      ></div>
    </div>
  );
};

export default HomePage;
