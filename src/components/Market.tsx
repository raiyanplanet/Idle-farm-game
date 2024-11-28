import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faCartShopping, faShop } from "@fortawesome/free-solid-svg-icons"; 

interface MarketProps {
  crops: { name: string; buyPrice: number; sellPrice: number }[];
  barn: { [key: string]: number };
  onBuySeed: (cropName: string, cost: number) => void;
  onSellCrop: (cropName: string, amount: number, price: number) => void;
}

const Market: React.FC<MarketProps> = ({ crops, barn, onBuySeed, onSellCrop }) => (
  <div className="p-4 border rounded-lg bg-yellow-100">
    <h2 className="font-bold text-xl mb-4 text-center"> <FontAwesomeIcon icon={faShop}/> Market</h2>
    <div className="grid grid-cols-5 gap-4 max-sm:grid-cols-2">
      {crops.map((crop) => (
        <div key={crop.name} className="border rounded-lg bg-white p-4 text-center shadow">
          <h3 className="font-bold text-lg">{crop.name}</h3>
          <p>Buy: {crop.buyPrice} Coins</p>
          <p>Sell: {crop.sellPrice} Coins</p>
          <button
            onClick={() => onBuySeed(crop.name, crop.buyPrice)}
            className="bg-green-500 text-white px-2 py-1 rounded mt-2 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={ faCartShopping} />
            Buy Seed
          </button>
          <button
            onClick={() =>
              onSellCrop(crop.name, 1, crop.sellPrice)
            }
            disabled={!barn[crop.name]}
            className="bg-red-500 text-white px-2 py-1 rounded mt-2 flex items-center justify-center"
          > <FontAwesomeIcon icon={faCartArrowDown} />
            Sell Crop
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Market;
