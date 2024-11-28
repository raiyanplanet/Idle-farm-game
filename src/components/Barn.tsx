import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface BarnProps {
  barn: { [key: string]: number };
}

const Barn: React.FC<BarnProps> = ({ barn }) => (
  <div className="p-4 border rounded-lg bg-blue-100">
    <h2 className="font-bold text-xl mb-4 text-center"> <FontAwesomeIcon icon={faStore}/> Barn</h2>
    {Object.entries(barn).length === 0 ? (
      <p>No items in the Barn.</p>
    ) : (
      <ul>
        {Object.entries(barn).map(([item, quantity]) => (
          <li key={item}>
            {item}: {quantity}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Barn;
