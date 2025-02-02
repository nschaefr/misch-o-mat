import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import liquids from "../../../backend/database/liquids.json";

function Ingredients() {
  const location = useLocation();
  const navigate = useNavigate();
  const { drink, drinks, category, random, strength } = location.state;

  const ingredients = Object.entries(drink.zutaten).map(([id, amount]) => ({
    name: liquids[id]?.name || `Unbekannte Zutat (${id})`,
    amount: amount,
  }));

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center p-2 mt-[-10px]">
      <h2 className="text-2xl font-bold text-white mb-4">
        {drink.name} besteht aus..
      </h2>
      <ul className="text-white text-lg mb-4">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="mb-0">
            {ingredient.name}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold text-white mb-4">Zubereiten?</h2>
      <div className="flex items-center justify-center gap-4">
        <button
          className="w-[100px] h-[42px] cursor-pointer rounded-full transition-all duration-75 bg-[#1fe0a6] text-[#12211d] text-base font-bold leading-normal tracking-[0.015em]"
          onClick={() =>
            navigate("/preparation", {
              state: {
                drink: drink,
                drinks: drinks,
                category: category,
                random: random,
                strength: strength,
                route: "preparation",
              },
            })
          }
        >
          Ja
        </button>
        <button
          className="w-[100px] h-[42px] cursor-pointer rounded-full transition-all duration-75 bg-[#25463c] text-base font-bold leading-normal tracking-[0.015em]"
          onClick={() => navigate("/")}
        >
          Nein
        </button>
      </div>
    </div>
  );
}

export default Ingredients;
