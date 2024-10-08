import { Carousel, List, Pagination } from "antd";
import CardLandingPage from "component/Cards/CardLandingPage";
import { Animal } from "domain/entities/Animals";
import React, { useEffect, useState } from "react";
import { FaHandsHelping } from "react-icons/fa";
import { FaHandsHoldingCircle } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAllAnimals } from "services/animal.service";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "500px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const HomePage: React.FC = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedData, setPaginatedDate] = useState<Animal[]>();
  const [total, setTotal] = useState<number>(0);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getAnimalList = async () => {
      try {
        const animal = await getAllAnimals(itemsPerPage, currentPage, "");
        setPaginatedDate(animal.data);
        setTotal(animal.total);
      } catch (error) {
        console.error(error);
      }
    };

    getAnimalList();
  }, [currentPage]);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        justifyContent: "end",

        width: "100%",
        gap: "25px",
      }}
    >
      <div style={{ height: "500px", backgroundColor: "beige" }}>
        <Carousel
          afterChange={onChange}
          dotPosition="top"
          autoplay
          style={{ minHeight: "100%" }}
        >
          <div>
            <h3
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/pet-hero1.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "500px",
                display: "flex",
                alignItems: "end",
                padding: "25px",
              }}
            >
              <p
                style={{
                  color: "black",
                  backgroundColor: "beige",

                  padding: "15px",
                }}
              >
                Adote um filhote!
              </p>
            </h3>
          </div>
          <div>
            <h3
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/abrigo-de-gatos.jpeg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "500px",
                display: "flex",
                alignItems: "end",
                padding: "25px",
              }}
            >
              <p
                style={{
                  color: "black",
                  backgroundColor: "beige",

                  padding: "15px",
                }}
              >
                Encontre um abrigo de gatos!
              </p>
            </h3>
          </div>
        </Carousel>
      </div>
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
          pageSize={itemsPerPage}
          total={total}
          onChange={handlePageChange}
          style={{ marginTop: "20px", textAlign: "center" }}
        />
      </div>
      <div style={{ width: "100%" }}>
        <div
          style={{
            backgroundColor: "greenyellow",
            width: "100%",

            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "60px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "35px",
            }}
          >
            <h2>Quero doar</h2>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                style={{
                  height: "100px",
                  width: "46%",
                  backgroundColor: "white",
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                onClick={() => navigate("/registro/abrigo")}
              >
                <FaHandsHoldingCircle size={"40px"} color="orange" />
                Sou uma ONG/abrigo
              </button>
              <button
                style={{
                  height: "100px",
                  width: "46%",
                  backgroundColor: "white",
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                onClick={() => navigate("/registro/pessoa-fisica")}
              >
                <FaHandsHelping size={"40px"} color="orange" />
                Sou uma pessoa física
              </button>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "35px",
            }}
          >
            <h2>Quero adotar</h2>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                style={{
                  height: "100px",
                  width: "100%",
                  backgroundColor: "white",
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <MdOutlinePets size={"40px"} color="orange" />
                Conheça os PETs disponíveis
              </button>
            </div>
          </div>
        </div>
      </div>
      {/**
       * Lista de entidades
       */}

      {/**
       * Resultados
       */}

      {/**
       * Quem somos
       */}

      {/**
       * Como ajudar
       */}
    </div>
  );
};

export default HomePage;
