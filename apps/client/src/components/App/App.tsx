import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  PageContainer,
  PageWrapper,
} from "@styles/StyledComponents/Containers";
// import { H1Typography } from "@components/Typography/Typography";
import { AppProvider } from "./AppProvider";
import { LoginPage } from "@pages/LoginPage";

import { PageHeader } from "@components/Header/PageHeader ";
import { UserChat } from "@pages/UserChat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App(): React.ReactNode {
  return (
    <AppProvider>
      <Router>
        <ToastContainer />
        <PageContainer>
          <PageWrapper>
            <PageHeader />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/user/:userId" element={<UserChat />} />
              {/* <Route path="*" element={<ErrorPage />} /> */}
            </Routes>
          </PageWrapper>
        </PageContainer>
      </Router>
    </AppProvider>
  );
}
