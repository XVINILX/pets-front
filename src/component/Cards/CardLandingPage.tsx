import { Button } from "antd";
import AnimalTypeComponent from "component/AnimalType";
import { AnimalType } from "domain/entities/Animals";
import { FileEntity } from "domain/entities/file";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type TextAlign =
  | "left"
  | "right"
  | "center"
  | "justify"
  | "initial"
  | "inherit";

interface CardProps {
  text: string;
  images: FileEntity[];
  description: string;
  tag: AnimalType;
  url: string;
  backgroundColor?: string;
  initialWidth?: number;
  hoveredWidth?: number;
  initialHeight?: number;
  hoveredHeight?: number;
  textAlign?: TextAlign | undefined;
}

type Action = { type: "INCREMENT" } | { type: "DECREMENT" };

const imageIndexReducer = (state: number, action: Action): number => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const CardLandingPage: React.FC<CardProps> = ({
  text,
  images,
  description,
  tag,
  backgroundColor = "lightpink",
  initialWidth = 300,
  hoveredWidth = 310,
  initialHeight = 300,
  hoveredHeight = 310,
  textAlign = "center",
  url,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: initialWidth,
        height: initialHeight,
        backgroundColor: "lightsalmon",

        zoom: hovered ? "normal" : "initial",
        transition: "width 0.3s, height 0.3s",
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <div
        style={{
          backgroundColor: "lightsalmon",
          backgroundImage: `url(${images[imageIndex]?.url})`,

          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px",
          display: "flex",
          alignItems: "end",
          padding: "15px",
          color: "black",
        }}
      >
        <div
          style={{
            minHeight: "70px",
            display: "flex",
            flexDirection: "column",
            alignContent: "end",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FaArrowLeft
              onClick={() => {
                setImageIndex(
                  (prevIndex) => (prevIndex - 1 + images.length) % images.length
                );
              }}
              style={{
                cursor: "pointer",
                color: "white",
                filter: "drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))",
              }}
            />
            <FaArrowRight
              onClick={() => {
                setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
              }}
              style={{
                cursor: "pointer",
                color: "white",
                filter: "drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <AnimalTypeComponent type={tag} iconProps={{ size: "20px" }} />
          </div>
        </div>
      </div>

      <div
        style={{
          padding: 15,
          backgroundColor: "lightskyblue",
        }}
      >
        <h1
          style={{
            margin: 0,
            padding: 0,
            textAlign: textAlign,
            color: "black",
          }}
        >
          {text}
        </h1>
        <p
          style={{ textAlign: "left", color: "black" }}
          dangerouslySetInnerHTML={{ __html: description ?? "" }}
        ></p>
        <Button onClick={() => navigate(url)}>Veja mais</Button>
      </div>
    </div>
  );
};

export default CardLandingPage;
