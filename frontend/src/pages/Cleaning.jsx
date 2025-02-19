import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Cleaning() {
  const [clicked, setClicked] = useState(false);
  const [success, setSuccess] = useState(null); // Initialize as null to handle both success and failure states
  const arrowStyle = { fontSize: 40 };

  const handleAction = async () => {
    setClicked(true);
    setSuccess(null);
    try {
      const response = await axios.post(`http://127.0.0.1:5000/clean`);
      setClicked(false);
      setSuccess(true); // Set success to true
    } catch (err) {
      console.log(err);
      setClicked(false);
      setSuccess(false); // Set success to false
    }
  };

  return (
    <div className="pt-4 font-sans">
      <div>
        <NavLink
          to="/settings"
          className={clicked ? "pointer-events-none opacity-50" : ""}
        >
          <ArrowBackIcon
            className="active:scale-95 transition-all duration-100"
            sx={arrowStyle}
          />
        </NavLink>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-normal mt-28 text-[22px]">
          <div className="text-center">
            Bitte sicherstellen, dass alle notwendigen Gefäße <br /> befüllt
            sind sowie für den Auslauf bereit stehen.
          </div>
        </div>
        <button
          className={`${
            clicked
              ? "bg-[#25463c] opacity-50 pointer-events-none"
              : "bg-[#1fe0a6]"
          } mt-6 w-[180px] h-[42px] cursor-pointer items-center justify-center rounded-full transition-all duration-75 text-[#12211d] font-bold`}
          onClick={handleAction}
        >
          <p className={`text-md font-bold leading-normal`}>Starten</p>
        </button>
        {success !== null && (
          <span className="mt-3 font-normal text-xs">
            {success ? "✅ Erfolgreich gereinigt" : "❌ Fehlgeschlagen"}
          </span>
        )}
      </div>
    </div>
  );
}

export default Cleaning;
