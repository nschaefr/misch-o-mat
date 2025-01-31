import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Settings() {
  const navigate = useNavigate();

  const handleAction = async (action) => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/${action}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigateToClean = () => {
    navigate("/preparation", {
      state: {
        drink: "someDrink",
        drinks: ["drink1", "drink2"],
        category: "someCategory",
        random: false,
        strength: "mittel",
        route: "clean",
      },
    });
  };

  return (
    <div className="pt-4 font-sans">
      <div>
        <NavLink to="/">
          <ArrowBackIcon
            className="active:scale-95 transition-all duration-100"
            sx={{ fontSize: 40 }}
          />
        </NavLink>
      </div>
      <div className="mt-6 flex flex-col items-center">
        <NavLink to="/configuration">
          <div className="bg-[#25463c] py-[12px] px-8 rounded-full text-[19px] font-normal w-[300px] text-center transition-all duration-75 active:scale-95">
            Konfiguration
          </div>
        </NavLink>
        <div
          onClick={() => handleNavigateToClean()}
          className="cursor-pointer mt-3 bg-[#25463c] py-[12px] px-8 rounded-full text-[19px] font-normal w-[300px] text-center transition-all duration-75 active:scale-95"
        >
          Reinigung
        </div>
        <div
          onClick={() => handleAction("reset")}
          className="cursor-pointer mt-3 bg-[#25463c] py-[12px] px-8 rounded-full text-[19px] font-normal w-[300px] text-center transition-all duration-75 active:scale-95"
        >
          Hardware Reset
        </div>
        <NavLink to="/calibration">
          <div
            onClick={() => handleAction("tare")}
            className="mt-3 bg-[#25463c] py-[12px] px-8 rounded-full text-[19px] font-normal w-[300px] text-center transition-all duration-75 active:scale-95"
          >
            Kalibrierung
          </div>
        </NavLink>
        <div
          onClick={() => handleAction("shutdown")}
          className="cursor-pointer mt-3 bg-[#f63737] py-[12px] px-8 rounded-full text-[19px] font-normal w-[300px] text-center transition-all duration-75 active:scale-95"
        >
          Ausschalten
        </div>
      </div>
    </div>
  );
}

export default Settings;
