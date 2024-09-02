import React from "react";
import { QuestionType, ReadQuestionsDto } from "domain/entities/questions";
import AddressQuestions from "./Address";
import ContactQuestions from "./Contact";
import EmailQuestions from "./Email";
import { Form, Input } from "antd";

export interface QuestionaryEditorProps {
  questions: ReadQuestionsDto[];
}

const InterestedQuestionaryPreview: React.FC<QuestionaryEditorProps> = ({
  questions,
}) => {
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
                    <AddressQuestions />
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
                    <Form.Item name={"text"} label={question.label}>
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
