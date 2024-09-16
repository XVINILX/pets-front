import React from "react";
import { Modal, Form, Input, Upload, Button, DatePicker } from "antd";
import { CreatePageConfigDTO, PageConfigDTO } from "domain/entities/PageConfig";

interface ModalWithFormProps {
  visible: boolean;
  onCancel: (values: CreatePageConfigDTO) => void;
  initialValues?: PageConfigDTO;
}

const ModalWithForm: React.FC<ModalWithFormProps> = ({
  visible,
  onCancel,
  initialValues,
}) => {
  const [formInsideModal] = Form.useForm();

  return (
    <Modal title="Contatos" open={visible} footer={null} width={800}>
      <Form
        layout="vertical"
        form={formInsideModal}
        onFinish={onCancel}
        style={{
          justifyContent: "end",
          alignItems: "end",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Form.Item label="WhatsApp" className="w-full" name="whatsApp">
          <Input className="input-style" />
        </Form.Item>

        <Form.Item label="Instagram" className="w-full" name="instagram">
          <Input className="input-style" />
        </Form.Item>

        <Form.Item label="Facebook" className="w-full" name="facebook">
          <Input className="input-style" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Fechar</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalWithForm;
