import React from "react";
import { Container } from "@mui/material";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import MainForm from "./components/MainForm";
import Calculations from "./components/Calculations";
import { InsuranceContextProvider } from "./InsuranceContext";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

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
      </QueryClientProvider>
    </InsuranceContextProvider>
  );
}

export default App;
