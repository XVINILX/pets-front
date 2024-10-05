import React, { useState } from "react";
import { List, Pagination, Input, Button } from "antd";
import CardLandingPage from "component/Cards/CardLandingPage";
import InterestedQuestionaryPreview from "component/InterestFormulary/Questionary";
import QuestionaryEditor from "component/InterestFormulary/Editor";
import { QuestionDTO } from "domain/entities/Questions";

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
  const [questionList, setQuestionList] = useState<QuestionDTO[]>([]);

  const addQuestionToList = (question: QuestionDTO) => {
    setQuestionList((previous) => [...previous, question]);
  };

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
