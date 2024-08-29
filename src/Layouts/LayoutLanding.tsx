import { Button, Layout, Tooltip } from "antd";

import { useAuth } from "contexts/AuthContext";
import AdminAuth from "pages/AdminAuth";
import { ReactNode, useContext, useState } from "react";
import { VscSignOut } from "react-icons/vsc";

const LayoutLandingPage: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { logout, isAuthenticated } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Layout style={{ minHeight: "100vh" }} className="bg-white">
      <AdminAuth
        isModalOpen={isModalOpen}
        setModalState={setIsModalOpen}
      ></AdminAuth>
      <Layout.Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
        className="bg-skyblue"
      >
        <>
          <h1
            style={{
              fontFamily: "Montserrat",
              fontWeight: 300,
              fontSize: "25px",
              width: "100%",
              color: "white",
              textAlign: "left",
            }}
          >
            Pet
            <b style={{ fontWeight: 800 }}> Donations</b>
          </h1>
        </>
        {isAuthenticated ? (
          <Tooltip title="Sair">
            <VscSignOut
              style={{ cursor: "pointer", color: "white" }}
              size={"20px"}
              onClick={() => logout()}
            />
          </Tooltip>
        ) : (
          <Button
            className="custom-button-primary"
            onClick={() => setIsModalOpen(true)}
          >
            ENTRAR
          </Button>
        )}
      </Layout.Header>
      <Layout.Content
        style={{
          backgroundColor: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          padding: "50px",
          alignItems: "center",
        }}
      >
        {children}
      </Layout.Content>
    </Layout>
  );
};
export default LayoutLandingPage;
