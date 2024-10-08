import { Button, Form, Input, message } from "antd";
import { useSearchParams } from "react-router-dom";
import { sendRecoverEmail } from "services/authService";

const ResetPasswordEmail = () => {
  const [searchParams] = useSearchParams();

  const [form] = Form.useForm();
  const sendEmail = async (formValues: any) => {
    try {
      const sentEmail = await sendRecoverEmail(formValues.email);
      if (sentEmail) {
        message.success(`Verifique seu email ${formValues.email}`);
      }
    } catch (err) {
      console.error(err);
    }
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
        <h1>Receber e-mail de confirmação de senha</h1>
        <Form
          form={form}
          onFinish={sendEmail}
          layout="vertical"
          className="w-[250px]"
        >
          <Form.Item name={"email"} label="E-mail">
            <Input name="email"></Input>
          </Form.Item>
          <Button htmlType="submit">ENVIAR</Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordEmail;
