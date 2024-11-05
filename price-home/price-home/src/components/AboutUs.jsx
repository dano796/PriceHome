// src/components/AboutUs.jsx
import aboutImg from "../assets/aboutAnimation.svg";

const AboutUs = () => (
  <section id="about" className="bg-white border-b border-neutral-100 pb-10">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-medium pb-4">
        ¿Quienes{" "}
        <span className="bg-gradient-to-r from-red-700 via-orange-800 to-red-900 bg-clip-text tracking-tight text-transparent font-semibold">
          Somos?
        </span>
      </h2>
    </div>

    <div className="container mx-auto flex flex-wrap items-center px-8">
      <div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 1.5 }}
        className="w-full lg:w-1/2 lg:p-8 flex justify-center lg:justify-end"
      >
        <img className="rounded-2xl w-4/5 -my-16 pb-12" src={aboutImg} alt="About Us" />
      </div>

      <div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 1.5 }}
        className="w-full lg:w-1/2 text-center lg:text-left"
      >
      <div className="flex justify-center lg:justify-start font-semibold text-[17px]">
        <p className="max-w-xl py-6 tracking-normal">
          PriceHome es una herramienta intuitiva y accesible que permite a los usuarios obtener una estimación rápida del valor comercial de sus propiedades, bien sea si desean arrendarla o venderla. PriceHome hace uso de un modelo de predicción, el cual, ingresados ciertos parámetros, predice el valor comercial aproximado de la propiedad, tomando como referencia datos del mercado inmobiliario.
        </p>
      </div>
      </div>
    </div>
  </section>
);

export default AboutUs;
