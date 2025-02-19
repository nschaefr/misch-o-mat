import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Calibration() {
  const [clicked, setClicked] = useState(false);
  const [success, setSuccess] = useState(null); // Initialize as null to handle both success and failure states
  const arrowStyle = { fontSize: 40 };

  const handleAction = async () => {
    setClicked(true);
    setSuccess(null);
    try {
      const response = await axios.post(`http://127.0.0.1:5000/calibrate`);
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
            Kalibriergewicht auf die Waage legen bevor <br /> der Vorgang
            gestartet wird.
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
          <p className={`text-md font-bold leading-normal`}>Kalibrieren</p>
        </button>
        {success !== null && (
          <span className="mt-3 font-normal text-xs">
            {success ? "✅ Erfolgreich kalibriert" : "❌ Fehlgeschlagen"}
          </span>
        )}
      </div>
    </div>
  );
}

export default Calibration;
