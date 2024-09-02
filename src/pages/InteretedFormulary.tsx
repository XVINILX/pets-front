import React, { useState } from "react";
import { List, Pagination, Input, Button } from "antd";
import CardLandingPage from "component/Cards/CardLandingPage";
import InterestedQuestionaryPreview from "component/InterestFormulary/Questionary";
import QuestionaryEditor from "component/InterestFormulary/Editor";
import { ReadQuestionsDto } from "domain/entities/questions";

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

const InterestedFormulary: React.FC = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [questionList, setQuestionList] = useState<ReadQuestionsDto[]>([]);

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

  const addQuestionToList = (question: ReadQuestionsDto) => {
    setQuestionList((previous) => [...previous, question]);
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
      <Button style={{ alignSelf: "flex-end" }}>Editar</Button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <QuestionaryEditor addQuestionList={addQuestionToList} />
        <InterestedQuestionaryPreview questions={questionList} />
      </div>
    </div>
  );
};

export default InterestedFormulary;
