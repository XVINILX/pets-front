import React from "react";
import {
  Input,
  Button,
  Form,
  Select,
  Checkbox,
  Upload,
  UploadFile,
  UploadProps,
  GetProp,
  message,
} from "antd";
import { AnimalListImage, CreateAnimal } from "domain/entities/Animals";
import AddressQuestions from "component/InterestFormulary/Address";
import { UploadOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DraggableImagesToUpload from "component/DrangAndDrop/DrangAndDropImages";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadFile } from "services/files.service";
import { CreateFile } from "domain/entities/file";
import { createAnimal, getBreedsByType } from "services/animal.service";
import { CreateEnterpriseDTO } from "domain/entities/Enterprises";
import { createEnterprise } from "services/enterprise.service";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const CompanyCreationPage: React.FC = () => {
  const [form] = Form.useForm();

  const [description, setDescription] = React.useState<string>("");

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleFinish = async (values: CreateEnterpriseDTO) => {
    try {
      const newAnimal = await createEnterprise(values);
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
        alignItems: "self-start",
        width: "100%",
        gap: "25px",
      }}
    >
      <h1>Institucional</h1>

      <Form<CreateEnterpriseDTO>
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        style={{ width: "100%" }}
      >
        <Form.Item<CreateEnterpriseDTO>
          name={"razaoSocial"}
          label="Razão Social"
          className="lg:w-1/2 w-full justify-start flex"
        >
          <Input className="input-style"></Input>
        </Form.Item>
        <Form.Item<CreateEnterpriseDTO>
          name={"nomeFantasia"}
          label="Nome Fantasia ou do abrigo"
          className="lg:w-1/2 w-full justify-start flex"
        >
          <Input className="input-style"></Input>
        </Form.Item>
        <div className="flex flex-wrap">
          <Form.Item<CreateEnterpriseDTO>
            name={"cnpj"}
            label="CNPJ"
            className="lg:w-1/3 w-full px-[25px]"
          >
            <Input className="input-style"></Input>
          </Form.Item>

          <Form.Item<CreateEnterpriseDTO>
            name={"openingDate"}
            label="Data de Início do Projeto"
            className="lg:w-1/3 w-full px-[25px]"
          >
            <input type="date" className="input-style-date"></input>
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
