import React, { useState } from "react";
import {
  List,
  Pagination,
  Input,
  Button,
  Form,
  Select,
  UploadFile,
} from "antd";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface DraggableImage {
  pictures: UploadFile[];
}

const DraggableImagesToUpload: React.FC<DraggableImage> = ({ pictures }) => {
  return (
    <Droppable droppableId="droppable">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ marginTop: "16px" }}
        >
          {pictures.map((file, index) => (
            <Draggable key={file.uid} draggableId={file.uid} index={index}>
              {(provided) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      marginBottom: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      ...provided.draggableProps.style,
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "8px",
                        display: "flex",

                        alignItems: "center",
                      }}
                    >
                      <img
                        src={
                          file.originFileObj
                            ? URL.createObjectURL(file.originFileObj)
                            : undefined
                        }
                        alt={file.name}
                        style={{ width: "100px", marginRight: "8px" }}
                      />
                      <span>{file.name}</span>
                    </div>
                    <span>Foto {index + 1}</span>
                  </div>
                );
              }}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DraggableImagesToUpload;
