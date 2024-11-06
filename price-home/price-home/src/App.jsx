import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import FormSection from "./components/FormSection";
import { useState } from "react";

export const App = () => {
  return (
    <div className="overflow-x-hidden text-black antialiased selection:bg-gray-300 selection:text-black">
      <div className="font-sans min-h-screen flex flex-col">
        <Navbar />
        <AboutUs />
        <FormSection />
        <Footer />   
      </div>
    </div>
  );
};

export default App;
