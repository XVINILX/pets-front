import {
  Button,
  Carousel,
  Form,
  Input,
  List,
  message,
  Pagination,
  Steps,
} from "antd";

import React, { useState } from "react";

import CompanyCreationPage from "./CompanyCreation";
import { SolutionOutlined, UserOutlined } from "@ant-design/icons";

import LayoutLandingPage from "Layouts/LayoutLanding";
import { useAuth } from "contexts/AuthContext";

import LoginRegisterUserAbrigo from "component/LoginRegisterAbrigo";
import { useNavigate } from "react-router-dom";

const RegisterOng: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onCreationOngAction = () => {
    message.success("Instituição cadastrada com sucesso!");
    navigate("/");
  };

  const steps = [
    {
      title: "Login",
      icon: <UserOutlined />,
      content: (
        <LoginRegisterUserAbrigo
          authenticated={isAuthenticated}
          onFinish={next}
          logout={logout}
        />
      ),
    },
    {
      title: "Formulário de inscrição",
      icon: <SolutionOutlined />,
      content: (
        <CompanyCreationPage onCreationOngAction={onCreationOngAction} />
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  return (
    <LayoutLandingPage>
      <h1>Registre seu abrigo ou entidade!</h1>

      <Steps items={items} />
      <div>{steps[current].content}</div>

      <div style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </LayoutLandingPage>
  );
};

export default RegisterOng;
