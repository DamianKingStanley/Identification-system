import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Common/Navbar";
import Homepage from "./pages/Home/Home";
import Identify from "./pages/Identify/Identify";
import Login from "./pages/SignUp/Login";
import Register from "./pages/SignUp/Register";
import Footer from "./components/Common/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/identify-user" element={<Identify />} />

          <Route element={<ProtectedRoute />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
