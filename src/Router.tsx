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
import GoogleAuthReal from "pages/GoogleAuthReal";
import CompanyCreationPage from "pages/CompanyCreation";
import FormularyList from "pages/FormularyList";
import RegisterOng from "pages/RegisterOng";
import ResetPassword from "pages/ResetPassword";
import ResetPasswordEmail from "pages/ResetPasswordEmail";
import PetsDetails from "pages/PetsDetails";
import Dashboard from "pages/Dashboard";
import AbrigosDetails from "pages/AbrigosDetails";

const AppRouter: React.FC = () => {
  const { isAuthenticated, authUser } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/google"
          element={<GoogleAuthReal></GoogleAuthReal>}
        ></Route>

        {!isAuthenticated && (
          <Route
            path="/*"
            element={
              <LayoutLandingPage>
                <Routes>
                  <Route
                    path="/registro/abrigo"
                    element={<RegisterOng />}
                  ></Route>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/mudar-senha" element={<ResetPasswordEmail />} />
                  <Route path="/pets/:slug" element={<PetsDetails />} />
                  <Route path="/abrigos/:slug" element={<AbrigosDetails />} />
                </Routes>
              </LayoutLandingPage>
            }
          />
        )}

        {isAuthenticated && (
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
                  <Route path="/dashboard" element={<Dashboard />}></Route>
                  <Route
                    path="/user/admin"
                    element={<SelfPetsManagementPage />}
                  />
                  <Route
                    path="/user/formulario-de-interesse"
                    element={<InterestedFormulary />}
                  />
                  <Route
                    path="/user/lista-formulario-de-interesse"
                    element={<FormularyList />}
                  />
                  <Route
                    path="/user/novo-pet"
                    element={<NewPetsManagementPage />}
                  />
                  <Route
                    path="/institucional"
                    element={<CompanyCreationPage />}
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
