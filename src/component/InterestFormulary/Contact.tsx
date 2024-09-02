import React, { useState } from "react";
import { List, Pagination, Input, Button, Form, Select } from "antd";

const ContactQuestions: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      <Form.Item name={"tellphone"} label="Telefone">
        <Input></Input>
      </Form.Item>
    </div>
  );
};

export default ContactQuestions;
