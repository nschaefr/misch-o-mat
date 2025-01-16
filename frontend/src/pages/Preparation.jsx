import React, { useState, useEffect, useRef } from "react";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import WineBarIcon from "@mui/icons-material/WineBar";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Preparation() {
  const [icons, setIcons] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { drink, drinks, category, random, strength } = location.state;
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
    console.log(location);
    const randomDrink = random
      ? drinks[Math.floor(Math.random() * drinks.length)]
      : drinks.find((d) => d.name === drink);
    const randomStrength = random
      ? ["schwach", "mittel", "stark"][Math.floor(Math.random() * 3)]
      : strength;

    try {
      await axios.post("http://127.0.0.1:5000/preparation", {
        drink: randomDrink.name,
        strength: randomStrength,
        category: category,
      });

      navigate("/ready");
    } catch (err) {
      console.error("Error during preparation:", err);
    }
  };

  return (
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
  );
}
