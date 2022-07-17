import React from "react";
import Wrapper from "./Wrapper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hoc/auth";
import ExhibitsContextProvider from "./redux/features/exhibits/ExhibitsContextProvider";
import Snackbar from "./components/snackBar/Snackbar";
import SearchParamsContextProvider from "./components/listOfUsers/SearchParamsContext";
import Navbar from "./components/Navbar";
import ImageUploadContextProvider from "./components/Dropzone/ImageUploadContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Snackbar />
        <ImageUploadContextProvider>
          <ExhibitsContextProvider>
            <SearchParamsContextProvider>
              <Wrapper />
            </SearchParamsContextProvider>
          </ExhibitsContextProvider>
        </ImageUploadContextProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
