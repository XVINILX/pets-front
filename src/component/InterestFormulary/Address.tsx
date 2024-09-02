import React, { useState } from "react";
import { List, Pagination, Input, Button, Form, Select } from "antd";
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

const AddressQuestions: React.FC = () => {
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
        <Form.Item name={"cep"} label="CEP">
          <Input></Input>
        </Form.Item>
        <Form.Item name={"country"} label="País">
          <Input></Input>
        </Form.Item>
        <Form.Item name={"city"} label="Cidade">
          <Input></Input>
        </Form.Item>
        <Form.Item name={"street"} label="Rua">
          <Input></Input>
        </Form.Item>
        <Form.Item name={"number"} label="Número">
          <Input></Input>
        </Form.Item>
        <Form.Item name={"complement"} label="Complemento">
          <Input></Input>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddressQuestions;
