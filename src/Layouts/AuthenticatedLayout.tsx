import { Button, Layout, Menu, Tooltip } from "antd";

import { useAuth } from "contexts/AuthContext";
import AdminAuth from "pages/AdminAuth";
import { ReactNode, useContext, useState } from "react";
import { VscSignOut } from "react-icons/vsc";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const AuthenticatedLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { logout, isAuthenticated } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = location.pathname;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider collapsible trigger={null} collapsed={collapsed}>
        <div style={{ padding: "20px 0px" }}>
          <img
            src="/logotipo.png"
            alt="Logo"
            style={{ height: "70px", objectFit: "contain" }} // Ajuste o tamanho da imagem conforme necessário
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]}
          onClick={(item) => navigate(item.key)}
          items={[
            {
              key: "/user/pets",
              icon: <UserOutlined />,
              label: "Pets",
            },
            {
              key: "/user/interessados",
              icon: <VideoCameraOutlined />,
              label: "Contatos",
            },
            {
              key: "/user/admin",
              icon: <UploadOutlined />,
              label: "Editar Página",
            },
            {
              key: "/institucional",
              icon: <UploadOutlined />,
              label: "Institucional",
            },
          ]}
        />
      </Layout.Sider>

      <Layout>
        <Layout.Header className="flex justify-between align-center items-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              color: "white",
              height: 64,
            }}
          />
          <Tooltip title="Sair">
            <VscSignOut
              style={{ cursor: "pointer", color: "white" }}
              size={"20px"}
              onClick={() => logout()}
            />
          </Tooltip>
        </Layout.Header>
        <Layout.Content style={{ padding: 50 }}>{children}</Layout.Content>
        <Layout.Footer>Layout.Footer</Layout.Footer>
      </Layout>
    </Layout>
  );
};
export default AuthenticatedLayout;
