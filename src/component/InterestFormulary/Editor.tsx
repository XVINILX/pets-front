import React, { useState } from "react";
import { List, Pagination, Input, Button, Form, Select } from "antd";
import CardLandingPage from "component/Cards/CardLandingPage";
import { ReadQuestionsDto } from "domain/entities/questions";

interface Props {
  addQuestionList: (questions: ReadQuestionsDto) => void;
}

const QuestionaryEditor: React.FC<Props> = ({ addQuestionList }) => {
  const [form] = Form.useForm();

  const handleAddQuestion = (question: ReadQuestionsDto) => {
    console.log(question);
    addQuestionList(question);
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
      <Form<ReadQuestionsDto>
        layout="vertical"
        form={form}
        onFinish={handleAddQuestion}
      >
        <Form.Item<ReadQuestionsDto> name={"type"} label="Tipo de pergunt">
          <Select
            options={[
              { value: "address", label: "Endereço" },
              { value: "text", label: "Texto" },
              { value: "email", label: "E-mail" },
              { value: "tellphone", label: "Telefone" },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item<ReadQuestionsDto> name={"label"} label="Título da pergunta">
          <Input></Input>
        </Form.Item>
        <Button htmlType="submit">Adicionar</Button>
      </Form>
    </div>
  );
};

export default QuestionaryEditor;
