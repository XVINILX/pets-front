import { Form, Modal, Button as AntButton, Input, Button } from "antd";

import { useAuth } from "contexts/AuthContext";
import React from "react";
import { loginAdminDto } from "services/authService";

interface ModalProps {
  setModalState: (value: boolean) => void;
  isModalOpen: boolean;
}

const AdminAuth: React.FC<ModalProps> = ({ setModalState, isModalOpen }) => {
  const [form] = Form.useForm();
  const { login } = useAuth();

  const handleIsModalOpen = (value: boolean) => {
    setModalState(value);
  };

  const redirectToServer = () => {
    console.log("Button clicked");
    handleIsModalOpen(false);
    window.location.href = "http://localhost:8080/auth";
  };
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
    <Modal
      open={isModalOpen}
      onCancel={() => handleIsModalOpen(false)}
      footer={null}
      title="Faça Login!"
      style={{ textAlign: "center" }} // Center modal content
    >
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
          <AntButton
            htmlType="submit"
            style={{ width: "100%" }}
            className="custom-button-primary"
          >
            ENTRAR
          </AntButton>
        </Form.Item>
        <Button
          onClick={(e) => {
            e.stopPropagation(); // Ensure it doesn't prevent click behavior
            redirectToServer();
          }}
        >
          Entrar com o Google
        </Button>
      </Form>
    </Modal>
  );
};

export default AdminAuth;
