import React, { useState } from "react";
import {
  List,
  Pagination,
  Input,
  Button,
  Upload,
  Form,
  UploadProps,
  GetProp,
  message,
  ColorPicker,
  Modal,
} from "antd";
import CardLandingPage from "component/Cards/CardLandingPage";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { CiEdit } from "react-icons/ci";
import {
  CreatePageConfigDTO,
  CreatePageConfigFormDTO,
} from "domain/entities/PageConfig";
import ReactQuill from "react-quill";
import ModalWithForm from "component/ContactsModal/ContactsModal";
import { uploadFile } from "services/files.service";
import { createPageConfig } from "services/pageConfig.service";

const { Search } = Input;

const mockData = [
  {
    text: "Card 1",
    images: ["https://via.placeholder.com/300"],
    description: "Description for Card 1",
    tag: ["Tag1"],
  },
  {
    text: "Card 2",
    images: ["https://via.placeholder.com/300"],
    description: "Description for Card 2",
    tag: ["Tag2"],
  },
  {
    text: "Card 3",
    images: ["https://via.placeholder.com/300"],
    description: "Description for Card 2",
    tag: ["Tag3"],
  },
  // Add more items as needed
];

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const SelfPetsManagementPage: React.FC = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string>();
  const [description, setDescription] = React.useState<string>("");
  const [backgroundImage, setBackgroundImage] = React.useState<string>();

  const [form] = Form.useForm();

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    getBase64(info.file as FileType, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const handleChangeBackground: UploadProps["onChange"] = (info) => {
    getBase64(info.file as FileType, (url) => {
      setLoading(false);

      setBackgroundImage(url);
    });
  };

  const handleFinish = async (values: CreatePageConfigFormDTO) => {
    let avatarImageId = "";
    if (values.avatarImage && values.avatarImage[0].originFileObj) {
      const file = await uploadFile(values.avatarImage[0].originFileObj);
      avatarImageId = file.id;
    }

    let backgroundImageId = "";
    if (values.backgroundImage && values.backgroundImage[0].originFileObj) {
      const file = await uploadFile(values.backgroundImage[0].originFileObj);
      backgroundImageId = file.id;
    }

    const { backgroundImage, avatarImage, ...data } = values;

    const animalInfoMetadata: CreatePageConfigDTO = {
      ...data,
      colorInfo:
        typeof values.colorInfo === "object"
          ? values.colorInfo
          : values.colorInfo,
      backgroundImage: backgroundImageId,
      avatarImage: avatarImageId,
    };

    await createPageConfig(animalInfoMetadata);
  };

  const filteredData = mockData.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Logo</div>
    </button>
  );

  const uploadButtonBackground = (
    <button style={{ border: 0, background: "none" }} type="button">
      <CiEdit size={25} />
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
    return false;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="flex flex-wrap w-full flex-col"
      >
        <Button style={{ alignSelf: "flex-end", width: "200px" }}>
          Visualizar Página
        </Button>
        <div style={{ gap: "25px", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: "100%",
              height: "250px",
              border: "solid",

              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              backgroundImage: `url(${backgroundImage})`,
            }}
          >
            <Form.Item<CreatePageConfigDTO>
              name={"avatarImage"}
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              getValueFromEvent={(e: any) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
            >
              <Upload
                name="avatarImage"
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
            </Form.Item>
            <Form.Item<CreatePageConfigDTO>
              name={"backgroundImage"}
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "self-start",
              }}
              getValueFromEvent={(e: any) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
            >
              <Upload
                name="backgroundImage"
                showUploadList={false}
                maxCount={1}
                beforeUpload={beforeUpload}
                onChange={handleChangeBackground}
              >
                {uploadButtonBackground}
              </Upload>
            </Form.Item>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ width: "100%", textAlign: "left" }}>Nome da ONG</h2>
            <Button
              onClick={() => {
                setCloseModal(true);
              }}
            >
              Contatos
            </Button>
          </div>

          <Modal
            title="Contatos"
            open={closeModal}
            footer={null}
            width={800}
            onCancel={() => setCloseModal(false)}
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
          </Modal>
          <Form.Item<CreatePageConfigDTO>
            name={"aboutMe"}
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
          <div className="w-full justify-between flex flex-row flex-wrap">
            <Form.Item
              label="Link para doação"
              className="lg:w-1/3 w-full"
              name="donationLink"
            >
              <Input className="input-style" />
            </Form.Item>

            <Form.Item
              label="Cor de fundo"
              className="lg:w-1/3 w-full flex justify-start"
              name="colorInfo"
              getValueFromEvent={(color) => {
                return "#" + color.toHex();
              }}
            >
              <ColorPicker defaultValue="#1677ff" size="large" showText />
            </Form.Item>
          </div>
          <Form.Item>
            <Button htmlType="submit">Salvar</Button>
          </Form.Item>
          <h3>Pets</h3>
          <Search placeholder="Search by description" onSearch={handleSearch} />
          {/* <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={paginatedData}
            renderItem={(item) => (
              <List.Item>
                <CardLandingPage
                  text={item.text}
                  images={item.images}
                  description={item.description}
                  tag={item.tag}
                />
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={filteredData.length}
            onChange={handlePageChange}
            style={{ marginTop: "20px", textAlign: "center" }}
          /> */}
        </div>
      </Form>
    </div>
  );
};

export default SelfPetsManagementPage;
