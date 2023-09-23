import React from "react";
import { Container } from "@mui/material";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import MainForm from "./components/MainForm";

function App() {
  return (
    <Container>
      <Header />
      <SideBar />
      <MainForm />
    </Container>
  );
}

export default App;
