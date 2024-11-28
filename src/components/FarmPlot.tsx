import React, { useState, useEffect } from "react";

interface FarmPlotProps {
  fieldIndex: number;
  crops: { name: string; buyPrice: number; growthTime: number }[];
  barn: { [key: string]: number };
  onHarvest: (cropName: string, amount: number) => void;
  onPlant: (cropName: string) => boolean;
}

const FarmPlot: React.FC<FarmPlotProps> = ({
  fieldIndex,
  crops,
  barn,
  onHarvest,
  onPlant,
}) => {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [isGrowing, setIsGrowing] = useState(false);
  const [growthProgress, setGrowthProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGrowing) {
      interval = setInterval(() => {
        setGrowthProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10; // Growth speed
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGrowing]);

  const handlePlantCrop = () => {
    if (selectedCrop && onPlant(selectedCrop)) {
      setIsGrowing(true);
      setGrowthProgress(0);
    } else {
      alert("Not enough seeds in the Barn!");
    }
  };

  const handleHarvest = () => {
    if (growthProgress === 100 && selectedCrop) {
      onHarvest(selectedCrop, 2); // Harvest 2 crops instead of 1
      setIsGrowing(false);
      setGrowthProgress(0);
      setSelectedCrop(null);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-green-100 text-center max-sm:flex max-sm:flex-col">
      <h3 className="font-bold">Field {fieldIndex + 1}</h3>
      {isGrowing ? (
        growthProgress === 100 ? (
          <button
            onClick={handleHarvest}
            className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
          >
            Ready for Harvest
          </button>
        ) : (
          <p>
            Growing {selectedCrop}: {growthProgress.toFixed(0)}%
          </p>
        )
      ) : (
        <>
          <select
            value={selectedCrop || ""}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="border p-2 rounded border-amber-600 outline-none flex gap-3"
          >
            <option value="">Select Crop</option>
            {Object.entries(barn).map(([crop, quantity]) =>
              quantity > 0 ? (
                <option key={crop} value={crop}>
                  {crop} ({quantity} seeds available)
                </option>
              ) : null
            )}
          </select>
          <button
            onClick={handlePlantCrop}
            disabled={!selectedCrop}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Plant
          </button>
        </>
      )}
    </div>
  );
};

export default FarmPlot;
