import React, { useEffect, useState } from "react";
import { List, Pagination, Input, Button } from "antd";
import CardLandingPage from "component/Cards/CardLandingPage";
import { getAllAnimals, getAllAnimalsAuth } from "services/animal.service";
import { Animal } from "domain/entities/Animals";
import { useNavigate } from "react-router-dom";

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

const PetsManagementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedData, setPaginatedDate] = useState<Animal[]>();
  const [total, setTotal] = useState<number>(0);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getAnimalList = async () => {
      try {
        const animal = await getAllAnimalsAuth(itemsPerPage, currentPage, "");
        setPaginatedDate(animal.data);
        setTotal(animal.total);
      } catch (error) {
        console.error(error);
      }
    };

    getAnimalList();
  }, [currentPage]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      <Button
        style={{ alignSelf: "flex-end", width: "150px" }}
        onClick={() => navigate("/user/novo-pet")}
      >
        Novo PET
      </Button>
      <Search
        placeholder="Search by description"
        onSearch={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={paginatedData}
        renderItem={(item) => (
          <List.Item>
            <CardLandingPage
              text={item.name}
              images={item.imagesList}
              description={item.description}
              tag={item.type}
              url={`/pets/${item.slug}`}
            />
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={total}
        onChange={handlePageChange}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default PetsManagementPage;
