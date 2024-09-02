import React from "react";
import {
  Input,
  Button,
  Form,
  Select,
  Checkbox,
  Upload,
  UploadFile,
} from "antd";
import { CreateAnimal } from "domain/entities/Animals";
import AddressQuestions from "component/InterestFormulary/Address";
import { UploadOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DraggableImagesToUpload from "component/DrangAndDrop/DrangAndDropImages";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewPetsManagementPage: React.FC = () => {
  const [form] = Form.useForm();

  const [pictures, setPictures] = React.useState<UploadFile[]>([]);

  const [description, setDescription] = React.useState<string>("");

  const handleUpload = ({ fileList }: any) => {
    console.log(fileList, "fileList");
    setPictures(fileList);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedPictures = Array.from(pictures);
    const [removed] = reorderedPictures.splice(result.source.index, 1);
    reorderedPictures.splice(result.destination.index, 0, removed);

    setPictures(reorderedPictures);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

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
      <h1>Novo PET</h1>
      <Form<CreateAnimal>
        layout="vertical"
        form={form}
        style={{ width: "100%" }}
      >
        <Form.Item<CreateAnimal> name={"name"} label="Nome do PET">
          <Input></Input>
        </Form.Item>
        <Form.Item<CreateAnimal>
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
        <AddressQuestions />
        <Form.Item<CreateAnimal> name={"adoptedAt"} label="Adotado Em">
          <input type="date"></input>
        </Form.Item>

        <Form.Item<CreateAnimal> name={"status"} label="Status">
          <Select
            options={[
              { value: "available", label: "Disponível" },
              { value: "adopted", label: "Adotado" },
              { value: "other", label: "Outro" },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item<CreateAnimal> name={"activate"} label="Ativo">
          <Checkbox />
        </Form.Item>
        <Form.Item<CreateAnimal>
          name={"principalPictureUuid"}
          label="Imagem Principal do Pet"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload
            name="principalPicture"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Escolher Imagem Principal</Button>
          </Upload>
        </Form.Item>

        <Form.Item<CreateAnimal>
          name={"listOfPictures"}
          label="Lista de Imagens do Pet"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload
            name="listOfPictures"
            listType="picture"
            multiple
            beforeUpload={() => false}
            onChange={handleUpload}
          >
            <Button icon={<UploadOutlined />}>Escolher Imagens</Button>
          </Upload>

          <DragDropContext onDragEnd={onDragEnd}>
            <DraggableImagesToUpload pictures={pictures} />
          </DragDropContext>
        </Form.Item>

        <Button htmlType="submit">Adicionar</Button>
      </Form>
    </div>
  );
};

export default NewPetsManagementPage;
