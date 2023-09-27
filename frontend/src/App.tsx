import React from "react";
import { Container } from "@mui/material";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import MainForm from "./components/MainForm";
import Calculations from "./components/Calculations";
import { InsuranceContextProvider } from "./InsuranceContext";

function App() {
  return (
    <InsuranceContextProvider>
      <Container>
        <Header />
        <SideBar />
        <MainForm />
        <Calculations />
      </Container>
    </InsuranceContextProvider>
  );
}

export default App;
