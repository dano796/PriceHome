import { useState } from "react";
import { motion } from 'framer-motion'
import logoTipo from "../assets/priceHomeLogotipo.png";

const colombianCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const FormSection = () => {
  const [area, setArea] = useState(0);
  const [baths, setBaths] = useState(0);
  const [city, setCity] = useState("");
  const [garages, setGarages] = useState(0);
  const [isNew, setIsNew] = useState(false);
  const [neighborhood, setNeighborhood] = useState("");
  const [rooms, setRooms] = useState(0);
  const [stratum, setStratum] = useState("");
  const [type, setType] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(0);

  const isFormValid =
    area > 19 &&
    baths > 0 &&
    city.trim() !== "" &&
    neighborhood.trim() !== "" &&
    rooms > 0 &&
    stratum.trim() !== "" &&
    type.trim() !== "";

  const estimarPrecio = async () => {
    const resultObject = {
      area: Number(area) || 0,
      baths: Number(baths) || 0,
      city,
      garages: Number(garages) || 0,
      is_new: isNew ? 1 : 0,
      neighbourhood: neighborhood,
      rooms: Number(rooms) || 0,
      stratum,
      property_type: type,
    };

    const respuesta = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultObject),
    });

    const data = await respuesta.json();
    setPredictedPrice(data.predicted_price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await estimarPrecio();
  };

  // Función de cambio de valor que permite "" en lugar de 0
  const handleNumberChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value === "" ? "" : Number(value));
  };

  return (
    <main id="home" className="flex-grow container mx-auto my-12 pb-24">
      <motion.img 
      whileInView={{opacity: 1, y: 0}}
      initial={{opacity: 0, y: -50}}
      transition={{duration: 1.5}}
      className="w-96 mx-auto pt-4" 
      src={logoTipo} 
      alt="Logo" 
      />
      <div className="font-bold flex flex-col gap-3 max-w-md mx-auto mt-10">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <motion.label 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="px-10">
            Área:
            <input
              className="border-2 rounded-lg p-2 w-full mt-1 font-medium"
              type="number"
              value={area}
              onChange={handleNumberChange(setArea)}
            />
          </motion.label>
          <motion.label 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="px-10">
            Baños:
            <input
              className="border-2 rounded-lg p-2 w-full mt-1 font-medium"
              type="number"
              value={baths}
              onChange={handleNumberChange(setBaths)}
            />
          </motion.label>
          <motion.label 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="px-10">
            Ciudad:
            <input
              className="border-2 rounded-lg p-2 w-full mt-1 font-medium"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </motion.label>
          <motion.label 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="px-10">
            Garajes:
            <input
              className="border-2 rounded-lg p-2 w-full mt-1 font-medium"
              type="number"
              value={garages}
              onChange={handleNumberChange(setGarages)}
            />
          </motion.label>
          <motion.label 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="px-10">
            ¿Es nuevo?
            <input
              className="border-2 rounded-lg p-2 ml-2 mt-1 font-medium"
              type="checkbox"
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
            />
          </motion.label>
          <motion.label 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="px-10">
            Barrio:
            <input
              className="border-2 rounded-lg p-2 w-full mt-1 font-medium"
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            />
          </motion.label>
          <motion.label 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="px-10">
            Habitaciones:
            <input
              className="border-2 rounded-lg p-2 w-full mt-1 font-medium"
              type="number"
              value={rooms}
              onChange={handleNumberChange(setRooms)}
            />
          </motion.label>
          <motion.label 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="px-10">
            Estrato:
            <input
              className="border-2 rounded-lg p-2 w-full mt-1 font-medium"
              type="text"
              value={stratum}
              onChange={(e) => setStratum(e.target.value)}
            />
          </motion.label>
          <motion.label 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="px-10">
            Tipo de propiedad:
            <input
              className="border-2 rounded-lg p-2 w-full mb-10 mt-1 font-medium"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </motion.label>
          <motion.button
            whileInView={{opacity: 1, y: 0}}
            initial={{opacity: 0, y: 50}}
            transition={{duration: 1}}
            viewport={{ once: true }}
            className={`mx-auto px-28 py-[10px] text-white rounded ${
              isFormValid ? "bg-red-800 hover:bg-red-900" : "bg-gray-200 text-zinc-950"
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            Estimar
          </motion.button>
          <div className="flex justify-between gap-4 mt-10 px-4">
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1.5 }}
              className="bg-gray-200 p-6 rounded-lg w-1/2 text-center text-2xl">
              <h1 className="font-bold">Precio de venta:</h1>
              <p>{colombianCOP.format(predictedPrice)}</p>
            </motion.div>
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1.5 }}
              className="bg-gray-200 p-6 rounded-lg w-1/2 text-center text-2xl">
              <h1 className="font-bold">Precio de arriendo:</h1>
              <p>{colombianCOP.format(predictedPrice / 10 / 12)}</p>
            </motion.div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default FormSection;
