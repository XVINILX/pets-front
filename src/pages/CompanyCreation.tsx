import React from "react";
import { Input, Button, Form, UploadProps, GetProp, message } from "antd";

import AddressQuestions from "component/InterestFormulary/Address";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CreateEnterpriseDTO } from "domain/entities/Enterprises";
import { createEnterprise } from "services/enterprise.service";

interface Props {
  onCreationOngAction?: () => void;
}

const CompanyCreationPage: React.FC<Props> = ({
  onCreationOngAction,
}: Props) => {
  const [form] = Form.useForm();

  const [description, setDescription] = React.useState<string>("");

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleFinish = async (values: CreateEnterpriseDTO) => {
    try {
      const newAnimal = await createEnterprise(values);
      if (onCreationOngAction) {
        onCreationOngAction();
      }
    } catch (e) {
      console.error(e);
    }
  };

  /* TODO load the info from backend to this formulary
   */

  return (
    <div
      style={{
        display: "flex",

        justifyContent: "space-between",
        flexDirection: "column",

        width: "100%",
        gap: "25px",
        paddingTop: "25px",
      }}
    >
      <h1>Institucional</h1>

      <Form<CreateEnterpriseDTO>
        layout="vertical"
        form={form}
        onFinish={handleFinish}
      >
        <div className="flex flex-wrap">
          <Form.Item<CreateEnterpriseDTO>
            name={"razaoSocial"}
            label="Razão Social"
            className="lg:w-1/2 w-full lg:pe-[10px]"
          >
            <Input className="input-style"></Input>
          </Form.Item>

          <Form.Item<CreateEnterpriseDTO>
            name={"nomeFantasia"}
            label="Nome Fantasia ou do abrigo"
            className="lg:w-1/2 w-full lg:ps-[10px]"
          >
            <Input className="input-style"></Input>
          </Form.Item>
        </div>
        <div className="flex flex-wrap">
          <Form.Item<CreateEnterpriseDTO>
            name={"cnpj"}
            label="CNPJ"
            className="lg:w-2/3 w-full lg:pe-[10px]"
          >
            <Input className="input-style"></Input>
          </Form.Item>

          <Form.Item<CreateEnterpriseDTO>
            name={"openingDate"}
            label="Data de Início do Projeto"
            className="lg:w-1/3 w-full lg:ps-[10px]"
          >
            <input
              style={{ width: "100%" }}
              type="date"
              className="input-style-date"
            ></input>
          </Form.Item>
        </div>
        <Form.Item<CreateEnterpriseDTO>
          name={"description"}
          style={{ height: "320px" }}
          label="Descrição"
        >
          <ReactQuill
            value={description}
            onChange={handleDescriptionChange}
            theme="snow"
            style={{ height: "250px" }}
          />
        </Form.Item>
        <AddressQuestions form={form} />
        <Button htmlType="submit">Adicionar</Button>
      </Form>
    </div>
  );
};

export default CompanyCreationPage;
