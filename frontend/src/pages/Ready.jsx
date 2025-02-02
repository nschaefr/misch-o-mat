import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import confetti from "canvas-confetti";

function Ready() {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.state.url;
  const name = location.state.name;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center gap-6 text-center p-2 rounded-lg mt-[-10px]">
        <div className="px-4">
          <div
            className={`w-[180px] h-[180px] bg-center bg-no-repeat aspect-square bg-cover rounded-full border-0`}
            style={{ backgroundImage: `url(${url})` }}
          ></div>
        </div>
        <div className="text-[22px] font-medium">
          <span className="font-extrabold text-[24px]">{name}</span> wurde
          erfolgreich <br /> zubereitet <span className="text-[26px]">🎉</span>
        </div>
      </div>
    </div>
  );
}

export default Ready;
