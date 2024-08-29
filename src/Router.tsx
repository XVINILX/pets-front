import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/HomePage";

import LayoutLandingPage from "./Layouts/LayoutLanding";
import { useAuth } from "contexts/AuthContext";

import AdminPage from "pages/AdminPage";
import DonatorInitialPage from "pages/DonatorInitialPage";
import AuthenticatedLayout from "Layouts/AuthenticatedLayout";
import PetsManagementPage from "pages/PetsManagement";

const AppRouter: React.FC = () => {
  const { isAuthenticated, authUser } = useAuth();

  return (
    <Router>
      <Routes>
        {isAuthenticated && (
          <Route
            path="/*"
            element={
              <LayoutLandingPage>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                </Routes>
              </LayoutLandingPage>
            }
          />
        )}

        {!isAuthenticated && (
          <Route
            path="/*"
            element={
              <AuthenticatedLayout>
                <Routes>
                  <Route path="/user" element={<DonatorInitialPage />} />
                  <Route path="/user/pets" element={<PetsManagementPage />} />
                  <Route path="/donator" element={<AdminPage />} />
                </Routes>
              </AuthenticatedLayout>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
