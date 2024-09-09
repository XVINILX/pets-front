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
import { CreateAnimal, CreateAnimalForm } from "domain/entities/Animals";
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
import dayjs from "dayjs";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const NewPetsManagementPage: React.FC = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string>();
  const [breedlist, setBreedlist] = React.useState<{ breeds: string[] }>();

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

  const handleFinish = async (values: CreateAnimalForm) => {
    //TODO se tiver algum arquivo na lista de fileList, passar por cada um deles e
    // após, enviar todas as imagens e infos pro back
    let principalPicture = "";
    let listOfPicturesResponse: string[] = [];
    if (
      values.principalPictureUuid &&
      values.principalPictureUuid.originFileObj
    ) {
      const file = await uploadFile(values.principalPictureUuid.originFileObj);
      let principalPicture = file.id;
    }

    if (values.imagesList && values.imagesList.length) {
      let fileList = await Promise.all(
        values.imagesList.map((file) => {
          if (file.originFileObj) return uploadFile(file.originFileObj);
        })
      );

      listOfPicturesResponse = fileList
        .filter((file) => file !== undefined)
        .map((file) => file.id);
    }

    const {
      principalPictureUuid,
      imagesList,
      birthday,
      initialDateAtDonation,
      adoptedAt,
      weight,
      ...data
    } = values;

    const animalInfoMetadata: CreateAnimal = {
      principalPictureUuid: principalPicture,
      imagesList: listOfPicturesResponse,
      birthday: birthday ? new Date(birthday) : null,
      weight: weight ? Number(weight) : 0,
      adoptedAt: adoptedAt ? new Date(adoptedAt) : null,
      initialDateAtDonation: initialDateAtDonation
        ? new Date(initialDateAtDonation)
        : null,
      ...data,
    };

    const newAnimal = await createAnimal(animalInfoMetadata);
  };

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "error") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const onChangeAnimalType = async (value: string) => {
    const breeds = await getBreedsByType(value);
    setBreedlist(breeds);
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

      <Form<CreateAnimalForm>
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        style={{ width: "100%" }}
      >
        <Form.Item<CreateAnimalForm>
          name={"principalPictureUuid"}
          getValueFromEvent={(e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload
            name="principalPicture"
            listType="picture-circle"
            showUploadList={false}
            maxCount={1}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                style={{
                  borderRadius: "100%",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
                src={imageUrl}
                alt="avatar"
              />
            ) : (
              uploadButton
            )}
          </Upload>
          <Form.Item<CreateAnimalForm> name={"name"} label="Nome do PET">
            <Input className="input-style"></Input>
          </Form.Item>
          <div className="flex flex-wrap">
            <Form.Item<CreateAnimalForm>
              name={"birthday"}
              label="Data de nascimento"
              className="lg:w-1/3 w-full justify-start flex"
            >
              <input className="input-style-date" type="date"></input>
            </Form.Item>

            <Form.Item<CreateAnimalForm>
              name={"type"}
              label="Tipo"
              className="lg:w-1/3 w-full px-[25px]"
            >
              <Select
                className="input-style-select"
                onChange={onChangeAnimalType}
                options={[
                  { value: "dog", label: "Cachorro" },
                  { value: "cat", label: "Gato" },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item<CreateAnimalForm>
              name={"race"}
              label="Raça"
              className="lg:w-1/3 w-full px-[25px]"
            >
              <Select
                className="input-style-select"
                options={breedlist?.breeds.map((value) => {
                  return { value: value, label: value };
                })}
              ></Select>
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item<CreateAnimalForm>
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
        <div className="flex flex-wrap">
          <Form.Item<CreateAnimalForm>
            name={"adoptedAt"}
            label="Adotado Em"
            className="lg:w-1/3 w-full justify-start flex"
          >
            <input type="date" className="input-style-date"></input>
          </Form.Item>

          <Form.Item<CreateAnimalForm>
            name={"status"}
            label="Status"
            className="lg:w-1/3 w-full px-[25px]"
          >
            <Select
              className="input-style-select"
              options={[
                { value: "available", label: "Disponível" },
                { value: "adopted", label: "Adotado" },
                { value: "other", label: "Outro" },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item<CreateAnimalForm>
            name={"activate"}
            label="Ativo"
            valuePropName="checked"
            className="lg:w-1/3 w-full justify-start flex"
          >
            <Checkbox />
          </Form.Item>
        </div>
        <Form.Item<CreateAnimalForm>
          name={"specialTreatment"}
          label="Descrição de Tratamentos especiais necessários"
        >
          <Input.TextArea className="input-style" />
        </Form.Item>
        <div className="flex flex-wrap">
          <Form.Item<CreateAnimalForm>
            name={"initialDateAtDonation"}
            label="Foi recolhido em"
            className="lg:w-1/3 w-full justify-start flex"
          >
            <input type="date" className="input-style-date"></input>
          </Form.Item>

          <Form.Item<CreateAnimalForm>
            name={"gender"}
            label="Gênero"
            className="lg:w-1/3 w-full px-[25px]"
          >
            <Select
              className="input-style-select"
              options={[
                { value: "male", label: "Macho" },
                { value: "female", label: "Fêmea" },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item<CreateAnimalForm>
            name={"castrated"}
            label="Castrado"
            valuePropName="checked"
            className="lg:w-1/3 w-full justify-start flex"
          >
            <Checkbox />
          </Form.Item>
        </div>

        <Form.Item<CreateAnimalForm>
          name={"healthHistory"}
          label="Histórico de saúde: vacinas, cirurgias, etc"
        >
          <Input.TextArea className="input-style" />
        </Form.Item>

        <div className="flex flex-wrap">
          <Form.Item<CreateAnimalForm>
            name={"initialDateAtDonation"}
            label="Foi recolhido em"
            className="lg:w-1/3 w-full justify-start flex"
          >
            <input type="date" className="input-style-date"></input>
          </Form.Item>

          <Form.Item<CreateAnimalForm>
            name={"gender"}
            label="Gênero"
            className="lg:w-1/3 w-full px-[25px]"
          >
            <Select
              className="input-style-select"
              options={[
                { value: "male", label: "Macho" },
                { value: "female", label: "Fêmea" },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item<CreateAnimalForm>
            name={"weight"}
            label="Peso"
            className="lg:w-1/3 w-full justify-start flex"
          >
            <Input type="number" className="input-style w-full" />
          </Form.Item>
        </div>
        <h3 className="lg:w-1/3 w-full text-left">Lista de Imagens do PET</h3>
        <Form.Item<CreateAnimalForm>
          name={"imagesList"}
          valuePropName="fileList"
          label=""
          className="flex flex-col w-[100%] flex-wrap"
          getValueFromEvent={(e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload
            name="imagesList"
            showUploadList={false}
            maxCount={5}
            multiple
            beforeUpload={() => false}
            onChange={handleUpload}
            className="w-full flex justify-end"
          >
            <Button icon={<UploadOutlined />}>Adicionar</Button>
          </Upload>
        </Form.Item>
        <div className="100%">
          <DragDropContext onDragEnd={onDragEnd}>
            <DraggableImagesToUpload pictures={pictures} />
          </DragDropContext>
        </div>

        <Button htmlType="submit">Adicionar</Button>
      </Form>
    </div>
  );
};

export default NewPetsManagementPage;
