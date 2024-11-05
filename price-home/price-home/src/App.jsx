import { useState } from "react";

let colombianCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
});

export const App = () => {
  const [area, setArea] = useState(0);
  const [baths, setBaths] = useState(0);
  const [city, setCity] = useState("");
  const [garages, setGarages] = useState(0);
  const [isNew, setIsNew] = useState(false);
  const [neighborhood, setNeightbodhood] = useState("");
  const [rooms, setRooms] = useState(0);
  const [stratum, setStratum] = useState("");
  const [type, setType] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(0);

  const estimarPrecio = async () => {
    const resultObject = {
      area,
      baths: baths + 0,
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
    <div className="font-bold flex flex-col gap-3 max-w-md mt-10">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <label>
          Area:
          <input
            className="border-2 rounded-lg p-2"
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </label>

        <label>
          Baths:
          <input
            className="border-2 rounded-lg p-2"
            type="number"
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
          />
        </label>

        <label>
          City:
          <input
            className="border-2 rounded-lg p-2"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <label>
          Garages:
          <input
            className="border-2 rounded-lg p-2"
            type="number"
            value={garages}
            onChange={(e) => setGarages(e.target.value)}
          />
        </label>

        <label>
          Is New:
          <input
            className="border-2 rounded-lg p-2"
            type="checkbox"
            checked={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
          />
        </label>

        <label>
          Neighborhood:
          <input
            className="border-2 rounded-lg p-2"
            type="text"
            value={neighborhood}
            onChange={(e) => setNeightbodhood(e.target.value)}
          />
        </label>

        <label>
          Rooms:
          <input
            className="border-2 rounded-lg p-2"
            type="number"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />
        </label>

        <label>
          Stratum:
          <input
            className="border-2 rounded-lg p-2"
            type="text"
            value={stratum}
            onChange={(e) => setStratum(e.target.value)}
          />
        </label>

        <label>
          Type:
          <input
            className="border-2 rounded-lg p-2"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </label>

        <button
          className="p-4 bg-green-500 hover:bg-red-500 rounded"
          type="submit"
        >
          Estimar
        </button>

        <h1>Precio de venta: {colombianCOP.format(predictedPrice)}</h1>
        <h1>
          Precio de arriendo: {colombianCOP.format(predictedPrice / 10 / 12)}
        </h1>
      </form>
    </div>
  );
};
