import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Common/Navbar";
import Homepage from "./pages/Home/Home";
import Footer from "./components/Common/Footer";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
