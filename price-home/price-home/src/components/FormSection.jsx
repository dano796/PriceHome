// src/components/FormSection.jsx
import { useState } from "react";
import logoTipo from "../assets/priceHomeLogotipo.png";

const colombianCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
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

  const estimarPrecio = async () => {
    const resultObject = {
      area,
      baths,
      city,
      garages,
      is_new: isNew ? 1 : 0,
      neighbourhood: neighborhood,
      rooms,
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

  return (
    <main id="home" className="flex-grow container mx-auto my-12 pb-24">
      <img className="w-96 mx-auto pt-4" src={logoTipo} alt="Logo" />
      <div className="font-bold flex flex-col gap-3 max-w-md mx-auto mt-10">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <label className="px-10">
            Área:
            <input
              className="border-2 rounded-lg p-2 w-full"
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </label>
          <label className="px-10">
            Baños:
            <input
              className="border-2 rounded-lg p-2 w-full"
              type="number"
              value={baths}
              onChange={(e) => setBaths(e.target.value)}
            />
          </label>
          <label className="px-10">
            Ciudad:
            <input
              className="border-2 rounded-lg p-2 w-full"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label className="px-10">
            Garajes:
            <input
              className="border-2 rounded-lg p-2 w-full"
              type="number"
              value={garages}
              onChange={(e) => setGarages(e.target.value)}
            />
          </label>
          <label className="px-10">
            ¿Es nuevo?
            <input
              className="border-2 rounded-lg p-2 ml-2"
              type="checkbox"
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
            />
          </label>
          <label className="px-10">
            Barrio:
            <input
              className="border-2 rounded-lg p-2 w-full"
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            />
          </label>
          <label className="px-10">
            Habitaciones:
            <input
              className="border-2 rounded-lg p-2 w-full"
              type="number"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
            />
          </label>
          <label className="px-10">
            Estrato:
            <input
              className="border-2 rounded-lg p-2 w-full"
              type="text"
              value={stratum}
              onChange={(e) => setStratum(e.target.value)}
            />
          </label>
          <label className="px-10">
            Tipo de propiedad:
            <input
              className="border-2 rounded-lg p-2 w-full"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </label>
          <button
            className="mx-auto px-28 py-[10px] bg-red-700 hover:bg-red-800 text-white rounded"
            type="submit"
          >
            Estimar
          </button>
          <div className="flex justify-between gap-6 mt-10">
            <div className="bg-gray-200 p-6 rounded-lg w-1/2 text-center text-2xl">
              <h1 className="font-bold">Precio de venta:</h1>
              <p>{colombianCOP.format(predictedPrice)}</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg w-1/2 text-center text-2xl">
              <h1 className="font-bold">Precio de arriendo:</h1>
              <p>{colombianCOP.format(predictedPrice / 10 / 12)}</p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default FormSection;
