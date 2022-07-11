import React from "react";
import Wrapper from "./Wrapper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {UsersContextProvider} from "../src/components/listOfUsers/UsersContextProvider.js";
import { AuthProvider } from "./hoc/auth";
import ExhibitsContextProvider from "./features/exhibits/ExhibitsContextProvider";
import Snackbar from './components/snackBar/Snackbar'



const App = () => {
  return (
    <ExhibitsContextProvider>
      <AuthProvider>
        <UsersContextProvider>
          <Router>
            <Wrapper />
          </Router>
        </UsersContextProvider>
      </AuthProvider>
    </ExhibitsContextProvider>
  );
};

export default App;
