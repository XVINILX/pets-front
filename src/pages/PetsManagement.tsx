import React, { useState } from "react";
import { List, Pagination, Input } from "antd";
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
  // Add more items as needed
];

const PetsManagementPage: React.FC = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Function to handle search input change
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filter the data based on search query
  const filteredData = mockData.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the current items to display
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Search
        placeholder="Search by description"
        onSearch={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      <List
        grid={{ gutter: 16, column: 3 }} // Adjust the grid layout
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
  );
};

export default PetsManagementPage;
