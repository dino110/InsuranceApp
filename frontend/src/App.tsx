import React from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import MainForm from "./components/MainForm";
import Calculations from "./components/Calculations";
import { InsuranceContextProvider } from "./InsuranceContext";

function App() {
  return (
    <InsuranceContextProvider>
      <Header />
      <SideBar />
      <MainForm />
      <Calculations />
    </InsuranceContextProvider>
  );
}

export default App;
