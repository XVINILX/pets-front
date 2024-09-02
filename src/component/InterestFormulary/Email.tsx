import React, { useState } from "react";
import { List, Pagination, Input, Button, Form, Select } from "antd";

const EmailQuestions: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      <Form.Item name={"email"} label="Telefone">
        <Input type="email"></Input>
      </Form.Item>
    </div>
  );
};

export default EmailQuestions;
