import React from "react";
import HeroSection from "../../components/Home/HeroSection";
import FeaturesSection from "../../components/Home/FeaturesSection";
import HowItWorks from "../../components/Home/HowItWorks";

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
    </div>
  );
};

export default Home;
