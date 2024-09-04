import React from "react";
import { Input, Form } from "antd";

const AddressQuestions: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Form.Item
        name={"zipCode"}
        label="CEP"
        className="lg:w-1/2 w-full p-[0px] lg:pe-[10px]"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name={"country"}
        label="País"
        className="lg:w-1/2 w-full p-[0px] lg:ps-[10px]"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name={"city"}
        label="Cidade"
        className="lg:w-1/2 w-full p-[0px] lg:pe-[10px]"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name={"street"}
        label="Rua"
        className="lg:w-1/2 w-full p-[0px] lg:ps-[10px]"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name={"number"}
        label="Número"
        className="lg:w-1/2 w-full p-[0px] lg:pe-[10px]"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name={"complement"}
        label="Complemento"
        className="lg:w-1/2 w-full p-[0px] lg:ps-[10px]"
      >
        <Input></Input>
      </Form.Item>
    </div>
  );
};

export default AddressQuestions;
