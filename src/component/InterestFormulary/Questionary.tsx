import React from "react";

import AddressQuestions from "./Address";
import ContactQuestions from "./Contact";
import EmailQuestions from "./Email";
import { Form, Input } from "antd";
import { QuestionDTO, QuestionType } from "domain/entities/Questions";

export interface QuestionaryEditorProps {
  questions: QuestionDTO[];
}

const InterestedQuestionaryPreview: React.FC<QuestionaryEditorProps> = ({
  questions,
}) => {
  const [form] = Form.useForm();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      <Form layout="vertical">
        {questions.length > 0 &&
          questions.map((question, index) => {
            switch (question.type) {
              case QuestionType["address"]:
                return (
                  <div key={index}>
                    <AddressQuestions form={form} />
                  </div>
                );
              case QuestionType["tellphone"]:
                return (
                  <div key={index}>
                    <ContactQuestions />
                  </div>
                );
              case QuestionType["email"]:
                return (
                  <div key={index}>
                    <EmailQuestions />
                  </div>
                );
              case QuestionType["text"]:
                return (
                  <div key={index}>
                    <Form.Item name={"text"} label={question.question}>
                      <Input></Input>
                    </Form.Item>
                  </div>
                );
            }
          })}
      </Form>
    </div>
  );
};

export default InterestedQuestionaryPreview;
