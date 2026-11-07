import React from "react";
import Navbar from "../Navbar/Navbar";
import Slider from "../Slider/Slider";
import FeaturesSection from "../Features/FeaturesSection";
import NavigateButtons from "../NavigateButtons/NavigateButtons";
import ProductSection from "../ProductSection/ProductSection";
import BrandStory from "../BrandStory/BrandStory";
import Testimonials from "../Testimonials/Testimonials";
import Footer from "../Footer/Footer";

const Main = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between">
      <Navbar />
      <main>
        <Slider />
        <FeaturesSection />
        <NavigateButtons />
        <ProductSection />
        <BrandStory />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
