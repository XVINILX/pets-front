import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnimalBySlug } from "services/animal.service";
import { Carousel, Form, Input, Button } from "antd";
import { QuestionDTO, QuestionType } from "domain/entities/Questions";
import { Animal } from "domain/entities/Animals";
import AnimalTypeComponent from "component/AnimalType";

const loadQuestionnaire = async (): Promise<QuestionDTO[]> => {
  // Simulação de dados carregados da API (você pode usar uma chamada real)
  return [
    { id: "1", question: "Qual seu nome?", type: QuestionType.text },
    { id: "2", question: "Qual seu email?", type: QuestionType.email },
    { id: "3", question: "Qual seu telefone?", type: QuestionType.tellphone },
  ];
};

const PetsDetails: React.FC = () => {
  const { slug } = useParams();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [questions, setQuestions] = useState<QuestionDTO[]>([]);

  // Carregar informações do animal
  useEffect(() => {
    const getAnimalInfo = async () => {
      if (slug && !Array.isArray(slug)) {
        const response = await getAnimalBySlug(slug);
        setAnimal(response);
      }
    };

    getAnimalInfo();
  }, [slug]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const loadedQuestions = await loadQuestionnaire();
      setQuestions(loadedQuestions);
    };

    fetchQuestions();
  }, []);

  if (!animal) {
    return <div>Loading...</div>;
  }

  const renderFormFields = () => {
    return questions.map((question) => {
      switch (question.type) {
        case QuestionType.text:
          return (
            <Form.Item key={question.id} label={question.question}>
              <Input className="input-style" />
            </Form.Item>
          );
        case QuestionType.email:
          return (
            <Form.Item key={question.id} label={question.question}>
              <Input type="email" className="input-style" />
            </Form.Item>
          );
        case QuestionType.tellphone:
          return (
            <Form.Item key={question.id} label={question.question}>
              <Input className="input-style" />
            </Form.Item>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: "100%",
            gap: "35px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#a5d6a7",
            padding: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>{animal.name}</h1>
            <AnimalTypeComponent
              type={animal.type}
              iconProps={{ size: "45px" }}
            />
          </div>

          <Carousel autoplay>
            {animal.imagesList.map((image) => (
              <div key={image.id}>
                <img
                  src={`${image.url}`}
                  alt={animal.name}
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </Carousel>

          <div
            dangerouslySetInnerHTML={{ __html: animal.description || "" }}
            style={{ width: "100%" }}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignContent: "start",
            marginTop: "35px",
          }}
        >
          <h2 style={{ textAlign: "start" }}>Informações adicionais</h2>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <address style={{ textAlign: "start" }}>{animal.city}</address>
            <address style={{ textAlign: "start" }}>{animal.state}</address>
          </div>
          <div>{animal.company}</div>
        </div>
      </div>

      <Form
        layout="vertical"
        style={{ backgroundColor: "white", padding: "25px", width: "50%" }}
      >
        <h1 style={{ marginBottom: "25px" }}>Formulário de adoção</h1>
        {renderFormFields()}
        <Form.Item>
          <Button className="custom-button-primary" htmlType="submit">
            ENVIAR
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PetsDetails;
