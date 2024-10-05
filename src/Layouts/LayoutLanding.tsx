import { Button, Drawer, Layout, Menu, MenuProps, Tooltip } from "antd";

import { useAuth } from "contexts/AuthContext";
import AdminAuth from "pages/AdminAuth";
import { ReactNode, useContext, useEffect, useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import {
  AppstoreOutlined,
  MailOutlined,
  MenuOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const LayoutLandingPage: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const menuItems = [
    {
      label: "Inicio",
      key: "init",
      onClick: () => navigate("/"),
    },
    {
      label: "Sobre nós",
      key: "about",

      onClick: () => navigate("/sobre"),
    },
    {
      label: "Adotar",
      key: "adotar",

      onClick: () => navigate("/adotar"),
    },
    {
      label: "Abrigos",
      key: "abrigo",

      onClick: () => navigate("/abrigos"),
    },
  ];

  const handleMenuClick = (key: string) => {
    const menuItem = menuItems.find((item) => item?.key === key);
    if (menuItem && menuItem.onClick) {
      menuItem.onClick();
    }
    setDrawerVisible(false);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          justifyContent: "space-between",
        }}
        className="bg-skyblue"
      >
        {isMobile && (
          <>
            <MenuOutlined
              style={{ fontSize: "24px", color: "white", cursor: "pointer" }}
              onClick={() => setDrawerVisible(true)}
            />
            <Drawer
              title="Menu"
              placement="right"
              onClose={() => setDrawerVisible(false)}
              visible={drawerVisible}
            >
              <Menu
                mode="vertical"
                items={menuItems}
                onClick={({ key }) => handleMenuClick(key)}
              />
            </Drawer>
          </>
        )}
        <>
          <h1
            style={{
              fontFamily: "Montserrat",
              fontWeight: 300,
              fontSize: "25px",

              color: "white",
              textAlign: "left",
            }}
          >
            Pet
            <b style={{ fontWeight: 800 }}> Donations</b>
          </h1>
        </>
        {!isMobile && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Menu
              mode="horizontal"
              items={menuItems}
              style={{
                backgroundColor: "transparent",
                color: "white",
                width: "900px",
                display: "flex",
                justifyContent: "center",
              }}
              className="text-white"
            ></Menu>
          </div>
        )}
        <div>
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
        </div>
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
