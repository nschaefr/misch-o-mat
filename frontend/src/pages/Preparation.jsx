import React, { useState, useEffect, useRef } from "react";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import WineBarIcon from "@mui/icons-material/WineBar";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Preparation() {
  const [icons, setIcons] = useState([]);
  const [sosClicked, setSosClicked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { drink, drinks, category, random, strength, route } = location.state;
  const hasPrepared = useRef(false);

  useEffect(() => {
    const allIcons = [
      <LocalBarIcon sx={{ fontSize: 50 }} />,
      <WineBarIcon sx={{ fontSize: 50 }} />,
      <SportsBarIcon sx={{ fontSize: 50 }} />,
      <WineBarIcon sx={{ fontSize: 50 }} />,
      <SportsBarIcon sx={{ fontSize: 50 }} />,
      <LocalBarIcon sx={{ fontSize: 50 }} />,
    ];

    setIcons(allIcons);

    if (hasPrepared.current) return;
    hasPrepared.current = true;
    handlePrepare();
  }, []);

  const handlePrepare = async () => {
    if (route === "preparation" || route === "ingredients") {
      if (route === "ingredients") {
        const randomDrink = random
          ? drinks[Math.floor(Math.random() * drinks.length)]
          : drinks.find((d) => d.name === drink);
        const randomStrength = random
          ? ["schwach", "mittel", "stark"][Math.floor(Math.random() * 3)]
          : strength;

        navigate("/ingredients", {
          state: {
            drink: randomDrink,
            drinks: drinks,
            category: category,
            random: random,
            strength: randomStrength,
          },
        });
        return;
      }

      try {
        await axios.post("http://127.0.0.1:5000/preparation", {
          drink: drink.name,
          strength: strength,
          category: category,
        });

        navigate("/ready", {
          state: {
            url: drink.url,
            name: drink.name,
          },
        });
      } catch (err) {
        console.error("Error during preparation:", err);
        navigate("/");
      }
    }
  };

  const handleSOS = async () => {
    setSosClicked(true);
    try {
      await axios.post("http://127.0.0.1:5000/reset", {
        drink: drink.name,
        strength: strength,
        category: category,
      });

      navigate("/");
    } catch (err) {
      console.error("Error during cancellation:", err);
      navigate("/");
    }
  };

  return (
    <div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="flex justify-center gap-3 pt-4">
          {icons.map((Icon, index) => (
            <div
              key={index}
              className="text-center inline-block animate-[spinner-grow_1.5s_linear_infinite] rounded-full bg-transparent opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
              style={{ animationDelay: `${index * 0.2}s` }}
              role="status"
            >
              {Icon}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`absolute bottom-4 left-4 cursor-pointer p-1 rounded-xl ${
          sosClicked ? "bg-gray-500 pointer-events-none" : "bg-[#ba3232]"
        }`}
        onClick={!sosClicked ? handleSOS : null}
      >
        <DoDisturbIcon sx={{ fontSize: 30 }} />
      </div>
    </div>
  );
}
