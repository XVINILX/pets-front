import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllAnimalsCompanyId,
  getAnimalBySlug,
} from "services/animal.service";
import { Carousel, Form, Input, Button, List, Pagination } from "antd";
import { QuestionDTO, QuestionType } from "domain/entities/Questions";
import { Animal } from "domain/entities/Animals";
import AnimalTypeComponent from "component/AnimalType";
import { getEnterpriseBySlug } from "services/enterprise.service";
import { EnterpriseDTO } from "domain/entities/Enterprises";
import CardLandingPage from "component/Cards/CardLandingPage";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const loadQuestionnaire = async (): Promise<QuestionDTO[]> => {
  // Simulação de dados carregados da API (você pode usar uma chamada real)
  return [
    { id: "1", question: "Qual seu nome?", type: QuestionType.text },
    { id: "2", question: "Qual seu email?", type: QuestionType.email },
    { id: "3", question: "Qual seu telefone?", type: QuestionType.tellphone },
  ];
};

const AbrigosDetails: React.FC = () => {
  const { slug } = useParams();
  const [enterprise, setEnterprise] = useState<EnterpriseDTO | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedData, setPaginatedDate] = useState<Animal[]>();
  const [total, setTotal] = useState<number>(0);

  // Carregar informações do animal
  useEffect(() => {
    const getEnterpriseInfo = async () => {
      if (slug && !Array.isArray(slug)) {
        const response = await getEnterpriseBySlug(slug);
        setEnterprise(response);
      }
    };

    getEnterpriseInfo();
  }, [slug]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (enterprise) {
        const animalCompanies = await getAllAnimalsCompanyId(
          enterprise?.id,
          3,
          currentPage,
          ""
        );
        setPaginatedDate(animalCompanies.data);
        setTotal(animalCompanies.total);
      }
    };

    fetchQuestions();
  }, [enterprise, currentPage]);

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
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
              width: "100%",
              height: "250px",
              border: "solid",

              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              backgroundImage: `url(${enterprise?.pageConfig?.backgroundImage?.url})`,
            }}
          >
            <img
              style={{
                borderRadius: "100%",
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              src={enterprise?.pageConfig?.avatarImage?.url}
              alt="avatar"
            />
            {enterprise?.pageConfig?.whatsApp && (
              <a
                href={`https://wa.me/${enterprise.pageConfig?.whatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={24} color="#25D366" />
              </a>
            )}
            {enterprise?.pageConfig?.instagram && (
              <a
                href={enterprise.pageConfig?.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} color="#E1306C" />
              </a>
            )}
            {enterprise?.pageConfig?.facebook && (
              <a
                href={enterprise.pageConfig?.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} color="#3b5998" />
              </a>
            )}
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: enterprise?.description || "" }}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            justifyContent: "end",
            alignContent: "center",
            width: "100%",
            gap: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "end",
              justifyContent: "end",
              alignContent: "end",
            }}
          >
            <List
              dataSource={paginatedData}
              grid={{ column: 3 }}
              style={{
                width: "100%",
                justifyContent: "end",
                display: "flex",
                flexDirection: "column",
              }}
              renderItem={(item) => (
                <List.Item>
                  <CardLandingPage
                    text={item.name}
                    images={item.imagesList}
                    description={item.description}
                    tag={item.type}
                    url={`/pets/${item.slug}`}
                  />
                </List.Item>
              )}
            />
          </div>
          <Pagination
            current={currentPage}
            pageSize={3}
            total={total}
            onChange={setCurrentPage}
            style={{ marginTop: "20px", textAlign: "center" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AbrigosDetails;
