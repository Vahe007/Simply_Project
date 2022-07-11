import React from "react";
import Wrapper from "./Wrapper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hoc/auth";
import ExhibitsContextProvider from "./features/exhibits/ExhibitsContextProvider";
import Snackbar from "./components/snackBar/Snackbar";
import SearchParamsContextProvider from "./components/listOfUsers/SearchParamsContext";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Snackbar />
        <ExhibitsContextProvider>
          <SearchParamsContextProvider>
            <Wrapper />
          </SearchParamsContextProvider>
        </ExhibitsContextProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
