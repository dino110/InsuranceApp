import React from "react";
import { Container } from "@mui/material";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import MainForm from "./components/MainForm";
import Calculations from "./components/Calculations";
import { InsuranceContextProvider } from "./InsuranceContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <InsuranceContextProvider>
      <QueryClientProvider client={queryClient}>
        <Container>
          <Header />
          <SideBar />
          <MainForm />
          <Calculations />
        </Container>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </InsuranceContextProvider>
  );
}

export default App;
