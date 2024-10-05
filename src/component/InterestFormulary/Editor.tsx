import React from "react";
import { Input, Button, Form, Select } from "antd";
import { QuestionDTO } from "domain/entities/Questions";

interface Props {
  addQuestionList: (questions: QuestionDTO) => void;
}

const QuestionaryEditor: React.FC<Props> = ({ addQuestionList }) => {
  const [form] = Form.useForm();

  const handleAddQuestion = (question: QuestionDTO) => {
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
      <Form<QuestionDTO>
        layout="vertical"
        form={form}
        onFinish={handleAddQuestion}
      >
        <Form.Item<QuestionDTO> name={"type"} label="Tipo de pergunt">
          <Select
            options={[
              { value: "address", label: "Endereço" },
              { value: "text", label: "Texto" },
              { value: "email", label: "E-mail" },
              { value: "tellphone", label: "Telefone" },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item<QuestionDTO> name={"question"} label="Título da pergunta">
          <Input></Input>
        </Form.Item>
        <Button htmlType="submit">Adicionar</Button>
      </Form>
    </div>
  );
};

export default QuestionaryEditor;
