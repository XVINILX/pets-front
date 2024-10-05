import React, { useEffect, useState } from "react";
import { List, Pagination, Input, Button, Table } from "antd";

import { QuestionnairyConfigDTO } from "domain/entities/questionnairyConfig";
import { Animal } from "domain/entities/Animals";

const { Search } = Input;

const FormularyList: React.FC = () => {
  const [questionList, setQuestionList] = useState<QuestionnairyConfigDTO[]>(
    []
  );
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalInfo, setTotalInfo] = useState<number>(0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const addQuestionToList = (question: QuestionnairyConfigDTO) => {
    setQuestionList((previous) => [...previous, question]);
  };

  useEffect(() => {}, []);

  const columns = [
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Data de Criação",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: Date) => new Date(createdAt).toLocaleDateString(),
    },

    {
      title: "Animais",
      dataIndex: "animals",
      key: "animals",
      render: (animals: Animal[]) =>
        animals.map((animal) => animal.name).join(", "),
    },
  ];

  //TODO make the post to create the questionConfig and then, add the questions

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      <Table dataSource={questionList} columns={columns}></Table>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={totalInfo}
        onChange={handlePageChange}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default FormularyList;
