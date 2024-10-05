import React, { useState } from "react";
import { Input, Form, message } from "antd";
import { getAddressByCEP } from "services/address.service";

interface Props {
  form: any;
}

const AddressQuestions: React.FC<Props> = ({ form }) => {
  const [cep, setCep] = useState<string>("");

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCep = formatCep(e.target.value);

    setCep(formattedCep);
    form.setFieldValue("zipCode", formattedCep);
  };

  const handleCepBlur = async () => {
    if (cep.length === 9) {
      try {
        const address = await getAddressByCEP(cep);
        message.success("Endereço encontrado com sucesso!");
        form.setFieldsValue({
          country: "Brasil",
          city: address.result.city,
          street: address.result.street,
          state: address.result.state,
          complement: address.result.complement,
        });
      } catch (error) {
        message.error("Erro ao buscar o endereço.");
      }
    }
  };

  const formatCep = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove qualquer coisa que não seja número
      .replace(/(\d{5})(\d{1,3})/, "$1-$2") // Formata para 14020-620
      .slice(0, 9); // Limita o comprimento total para 9 caracteres
  };

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
        <Input
          className="input-style"
          value={cep}
          onChange={handleCepChange}
          onBlur={handleCepBlur}
          maxLength={9}
          placeholder="14020-620"
        ></Input>
      </Form.Item>
      <Form.Item
        name={"country"}
        label="País"
        className="lg:w-1/2 w-full p-[0px] lg:ps-[10px]"
      >
        <Input disabled className="input-style"></Input>
      </Form.Item>
      <Form.Item
        name={"state"}
        label="Cidade"
        className="lg:w-1/2 w-full p-[0px] lg:pe-[10px]"
      >
        <Input disabled className="input-style"></Input>
      </Form.Item>
      <Form.Item
        name={"city"}
        label="Cidade"
        className="lg:w-1/2 w-full p-[0px] lg:ps-[10px]"
      >
        <Input disabled className="input-style"></Input>
      </Form.Item>
      <Form.Item
        name={"street"}
        label="Rua"
        className="lg:w-1/2 w-full p-[0px] lg:pe-[10px]"
      >
        <Input disabled className="input-style"></Input>
      </Form.Item>
      <Form.Item
        name={"number"}
        label="Número"
        className="lg:w-1/2 w-full p-[0px] lg:pe-[10px]"
      >
        <Input className="input-style"></Input>
      </Form.Item>
      <Form.Item
        name={"complement"}
        label="Complemento"
        className="lg:w-1/2 w-full p-[0px] lg:ps-[10px]"
      >
        <Input className="input-style"></Input>
      </Form.Item>
    </div>
  );
};

export default AddressQuestions;
