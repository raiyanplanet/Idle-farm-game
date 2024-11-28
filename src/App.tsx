import React, { useState } from "react";
import FarmPlot from "./components/FarmPlot";
import Market from "./components/Market";
import Barn from "./components/Barn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faTractor } from "@fortawesome/free-solid-svg-icons";

const App: React.FC = () => {
  const [coins, setCoins] = useState(500);
  const [barn, setBarn] = useState<{ [key: string]: number }>({});
  const [fields, setFields] = useState<number[]>([0]); // Array to track field states (0 = empty)

  const crops = [
    { name: "Wheat", buyPrice: 500, sellPrice: 2000, growthTime: 10 },
    { name: "Potato", buyPrice: 700, sellPrice: 2500, growthTime: 15 },
    { name: "Carrot", buyPrice: 1000, sellPrice: 3000, growthTime: 20 },
    { name: "Beans", buyPrice: 1200, sellPrice: 3500, growthTime: 25 },
    { name: "Canola", buyPrice: 1500, sellPrice: 4000, growthTime: 30 },
  ];

  const handleBuySeed = (cropName: string, cost: number) => {
    if (coins >= cost) {
      setBarn((prevBarn) => ({
        ...prevBarn,
        [cropName]: (prevBarn[cropName] || 0) + 1,
      }));
      setCoins((prevCoins) => prevCoins - cost);
    } else {
      alert("Not enough coins!");
    }
  };

  const handleSellCrop = (cropName: string, amount: number, price: number) => {
    if (barn[cropName] >= amount) {
      setBarn((prevBarn) => ({
        ...prevBarn,
        [cropName]: prevBarn[cropName] - amount,
      }));
      setCoins((prevCoins) => prevCoins + price * amount);
    } else {
      alert("Not enough crops to sell!");
    }
  };

  const handlePlantCrop = (cropName: string) => {
    if (barn[cropName] > 0) {
      setBarn((prevBarn) => ({
        ...prevBarn,
        [cropName]: prevBarn[cropName] - 1,
      }));
      return true;
    }
    return false;
  };

  const handleHarvestCrop = (cropName: string, amount: number) => {
    setBarn((prevBarn) => ({
      ...prevBarn,
      [cropName]: (prevBarn[cropName] || 0) + amount,
    }));
  };

  const handleBuyField = () => {
    const newFieldCost = 2000;
    if (coins >= newFieldCost) {
      setFields((prevFields) => [...prevFields, 0]);
      setCoins((prevCoins) => prevCoins - newFieldCost);
    } else {
      alert("Not enough coins to buy a new field!");
    }
  };

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4 text-green-500"> <FontAwesomeIcon className=" text-amber-500" icon={ faTractor}/> Farming Game</h1>
      <p className="text-xl font-bold text-yellow-600 mb-6 text-center flex items-center justify-center gap-1">
        <FontAwesomeIcon icon={faCoins}/>
        Coins: {coins}
      </p>
      <div className="grid grid-cols-2 gap-4 max-sm:flex max-sm:flex-col">
        <Barn barn={barn} />
        <Market
          crops={crops}
          barn={barn}
          onBuySeed={handleBuySeed}
          onSellCrop={handleSellCrop}
        />
      </div>
      <h2 className="font-bold text-2xl mt-8 mb-4">Fields</h2>
      <div className="grid grid-cols-3 gap-4">
        {fields.map((_, index) => (
          <FarmPlot
            key={index}
            fieldIndex={index}
            crops={crops}
            barn={barn}
            onHarvest={handleHarvestCrop}
            onPlant={handlePlantCrop}
          />
        ))}
      </div>
      <button
        onClick={handleBuyField}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Buy New Field (2000 Coins)
      </button>
    </div>
  );
};

export default App;
