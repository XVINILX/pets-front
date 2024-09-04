import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/HomePage";

import LayoutLandingPage from "./Layouts/LayoutLanding";
import { useAuth } from "contexts/AuthContext";

import AuthenticatedLayout from "Layouts/AuthenticatedLayout";
import PetsManagementPage from "pages/PetsManagement";
import InterestedPetsManagementPage from "pages/InterestedPetsManagement";
import SelfPetsManagementPage from "pages/SelfPagePetsManagement";
import InterestedFormulary from "pages/InteretedFormulary";
import NewPetsManagementPage from "pages/NewPet";

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
                  <Route path="/user/pets" element={<PetsManagementPage />} />
                  <Route
                    path="/user/interessados"
                    element={<InterestedPetsManagementPage />}
                  />
                  <Route
                    path="/user/admin"
                    element={<SelfPetsManagementPage />}
                  />
                  <Route
                    path="/user/formulario-de-interesse"
                    element={<InterestedFormulary />}
                  />
                  <Route
                    path="/user/novo-pet"
                    element={<NewPetsManagementPage />}
                  />
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
