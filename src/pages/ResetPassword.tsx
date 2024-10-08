import React from "react";
import { Form, Input, Button, message } from "antd";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "services/authService";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [form] = Form.useForm();

  const onFinish = async (values: {
    password: string;
    confirmationPassword: string;
  }) => {
    if (!token) {
      message.error("Token is missing!");
      return;
    }

    try {
      await resetPassword({ ...values, token });
      message.success("Password reset successfully!");
    } catch (error) {
      message.error("Error resetting password. Please try again.");
    }
  };

  const validatePasswords = (_: any, value: string) => {
    if (value && value !== form.getFieldValue("password")) {
      return Promise.reject(new Error("The two passwords do not match!"));
    }
    return Promise.resolve();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <img
        width={"50%"}
        height={"100%"}
        style={{ objectFit: "cover" }}
        src="/images/vira-lata.jpg"
      ></img>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        <h1>Mudar senha</h1>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Nova Senha"
            name="password"
            rules={[
              { required: true, message: "Please input your new password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter your new password" />
          </Form.Item>

          <Form.Item
            label="Confirme sua Senha"
            name="confirmationPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              { validator: validatePasswords },
            ]}
          >
            <Input.Password placeholder="Confirm your new password" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">CONFIRMAR</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
