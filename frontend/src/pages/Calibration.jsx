import React from "react";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Calibration() {
  const [clicked, setClicked] = useState(false);
  const arrowStyle = { fontSize: 40 };

  const handleAction = async () => {
    console.log("Calibrating...");
    setClicked(true);
    try {
      const response = await axios.post(`http://127.0.0.1:5000/calibrate`);
      setClicked(false);
    } catch (err) {
      console.log(err);
      setClicked(false);
    }
  };

  return (
    <div className="pt-4 font-sans">
      <div>
        <NavLink to="/settings">
          <ArrowBackIcon
            className="active:scale-95 transition-all duration-100"
            sx={arrowStyle}
          />
        </NavLink>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-normal mt-32 text-[22px]">
          <div className="text-center">
            Bitte legen Sie das Kalibriergewicht auf die Waage bevor Sie den
            Vorgang starten.
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
      </div>
    </div>
  );
}

export default Calibration;
