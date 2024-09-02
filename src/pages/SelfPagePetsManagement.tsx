import React, { useState } from "react";
import { List, Pagination, Input, Button, Upload } from "antd";
import CardLandingPage from "component/Cards/CardLandingPage";

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

const SelfPetsManagementPage: React.FC = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const filteredData = mockData.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "25px",
      }}
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
            backgroundColor: "ButtonFace",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button>
              <Upload multiple={false}>Adicionar Logo</Upload>
            </Button>
          </div>
          <Button>
            <Upload multiple={false}>Adicionar Imagem de Fundo</Upload>
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ width: "100%", textAlign: "left" }}>Nome da ONG</h2>
          <Button>Contatos</Button>
        </div>
        <div dangerouslySetInnerHTML={{ __html: "Sobre a ONG" }}></div>

        <h3>Pets</h3>
        <Search placeholder="Search by description" onSearch={handleSearch} />
        <List
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
        />
      </div>
    </div>
  );
};

export default SelfPetsManagementPage;
