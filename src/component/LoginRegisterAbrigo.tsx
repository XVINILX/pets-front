import { Button, Form, Input } from "antd";
import { useAuth } from "contexts/AuthContext";
import React from "react";

import { loginAdminDto } from "services/authService";

interface PunchClockTimerProps {
  onFinish: () => void;
  logout: () => void;
  authenticated: boolean;
}

const LoginRegisterUserAbrigo: React.FC<PunchClockTimerProps> = ({
  onFinish,
  authenticated,
  logout,
}) => {
  const redirectToServer = () => {
    window.location.href = "http://localhost:8080/auth";
  };

  const [form] = Form.useForm();
  const { login, authUser } = useAuth();

  const handleFormSubmit = async (values: any) => {
    try {
      const authResponse = await loginAdminDto({
        password: values.password,
        email: values.email,
      });
      if (authResponse) {
        form.resetFields();
        login(authResponse);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {!authenticated ? (
        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout="vertical"
          style={{ maxWidth: 400, margin: "0 auto" }} // Center form and set max width
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter your email" className="rounded-none" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input
              type="password"
              placeholder="Enter your password"
              className="rounded-none"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              style={{ width: "100%" }}
              className="custom-button-primary"
            >
              ENTRAR
            </Button>
          </Form.Item>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              redirectToServer();
              onFinish();
            }}
          >
            Entrar com o Google
          </Button>
        </Form>
      ) : (
        <div>
          <p>Olá {authUser?.email}</p>
          <p>Gostaria de criar uma conta de abrigo com esse usuário?</p>
          <div>
            <button onClick={() => onFinish()}>Sim</button>
            <button onClick={() => logout()}>Não</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginRegisterUserAbrigo;
