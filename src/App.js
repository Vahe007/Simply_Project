import Login from "./Pages/Login.jsx"
import Signup from "./Pages/Signup.jsx"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
      <Router>
        <Routes>
          <Route path="login" element={<Login type="login"/>}/>
          <Route path="signup" element={<Signup type="signup"/>}/>
        </Routes>
      </Router>
  );
}

export default App;
