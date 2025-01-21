import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Configuration() {
  const [liquids, setLiquids] = useState([]);
  const [size, setSize] = useState();

  useEffect(() => {
    const json_file = "liquids";
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/liquids`);
        setLiquids(Object.values(response.data));

        const response_2 = await axios.get(
          `http://127.0.0.1:5000/drinks/longdrinks`
        );
        setSize(Object.values(response_2.data)[1]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const updateData = async (val, idx, cat, file) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/update/${file}`,
        {
          value: val,
          index: idx,
          category: cat,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const changeValue = (ev, idx, cat) => {
    if (cat === 0) {
      const updatedLiquids = [...liquids];
      updatedLiquids[idx].anschlussplatz = ev;
      setLiquids(updatedLiquids);

      updateData(ev, idx + 1, "anschlussplatz", "liquid");
    } else if (cat === 1) {
      const updatedLiquids = [...liquids];
      updatedLiquids[idx].fuellstand_ml = ev;
      setLiquids(updatedLiquids);

      updateData(ev, idx + 1, "fuellstand_ml", "liquid");
    } else {
      setSize(ev);
      updateData(ev, idx, "gesamtmenge_ml", "longdrinks");
    }
  };

  return (
    <div className="pt-4 font-sans">
      <div className="flex items-center mb-2">
        <NavLink to="/settings">
          <ArrowBackIcon
            className="active:scale-95 transition-all duration-100"
            sx={{ fontSize: 40 }}
          />
        </NavLink>
      </div>
      <div
        className="overflow-y-auto h-[410px] scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="px-1 text-[18px] font-normal mb-4 mt-2">
              Bechergröße
            </div>
            <div className="px-1 text-[13px] text-[#95c6b7] mt-[-16px] mb-4">
              {size}ml
            </div>
          </div>
          <div className="flex gap-2">
            <div
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg ${
                size === 250 ? "bg-[#1fe0a6] text-[#12211d]" : "bg-[#25463c]"
              } pl-4 pr-4 active:scale-95 transition-all duration-100`}
              onClick={() => changeValue(250, 0, 2)}
            >
              <p
                className={`text-sm ${
                  size === 250 ? "font-bold" : "font-medium"
                } leading-normal`}
              >
                250ml
              </p>
            </div>
            <div
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg ${
                size === 300 ? "bg-[#1fe0a6] text-[#12211d]" : "bg-[#25463c]"
              } pl-4 pr-4 active:scale-95 transition-all duration-100`}
              onClick={() => changeValue(300, 0, 2)}
            >
              <p
                className={`text-sm ${
                  size === 300 ? "font-bold" : "font-medium"
                } leading-normal`}
              >
                300ml
              </p>
            </div>
            <div
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg ${
                size === 350 ? "bg-[#1fe0a6] text-[#12211d]" : "bg-[#25463c]"
              } pl-4 pr-4 active:scale-95 transition-all duration-100`}
              onClick={() => changeValue(350, 0, 2)}
            >
              <p
                className={`text-sm ${
                  size === 350 ? "font-bold" : "font-medium"
                } leading-normal`}
              >
                350ml
              </p>
            </div>
            <div
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg ${
                size === 400 ? "bg-[#1fe0a6] text-[#12211d]" : "bg-[#25463c]"
              } pl-4 pr-4 active:scale-95 transition-all duration-100`}
              onClick={() => changeValue(400, 0, 2)}
            >
              <p
                className={`text-sm ${
                  size === 400 ? "font-bold" : "font-medium"
                } leading-normal`}
              >
                400ml
              </p>
            </div>
            <div
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg ${
                size === 450 ? "bg-[#1fe0a6] text-[#12211d]" : "bg-[#25463c]"
              } pl-4 pr-4 active:scale-95 transition-all duration-100`}
              onClick={() => changeValue(450, 0, 2)}
            >
              <p
                className={`text-sm ${
                  size === 450 ? "font-bold" : "font-medium"
                } leading-normal`}
              >
                450ml
              </p>
            </div>
            <div
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg ${
                size === 500 ? "bg-[#1fe0a6] text-[#12211d]" : "bg-[#25463c]"
              } pl-4 pr-4 active:scale-95 transition-all duration-100 mr-1`}
              onClick={() => changeValue(500, 0, 2)}
            >
              <p
                className={`text-sm ${
                  size === 500 ? "font-bold" : "font-medium"
                } leading-normal`}
              >
                500ml
              </p>
            </div>
          </div>
        </div>
        <div className="px-1 text-[20px] font-bold mb-2">Getränke</div>
        <div className="px-1">
          {liquids.map((item, index) => {
            const assignedAnschlussplaetze = liquids.map(
              (liquid) => liquid.anschlussplatz
            );
            const options =
              item.belegungswert === 0
                ? [0, ...Array.from({ length: 9 }, (_, i) => i + 1)].filter(
                    (option) =>
                      !assignedAnschlussplaetze.includes(option) ||
                      item.anschlussplatz === option ||
                      option === 0
                  )
                : [0, ...Array.from({ length: 10 }, (_, i) => i + 10)].filter(
                    (option) =>
                      !assignedAnschlussplaetze.includes(option) ||
                      item.anschlussplatz === option ||
                      option === 0
                  );

            const options_2_base = [0, 250, 500, 750, 1000, 1250, 1500, 2000];
            const options_2 = options_2_base.includes(item.fuellstand_ml)
              ? options_2_base
              : [...options_2_base, item.fuellstand_ml].sort((a, b) => a - b);

            const sliderMin = Math.min(...options_2);
            const sliderMax = Math.max(...options_2);
            const sliderStep = options_2[1] - options_2[0];

            return (
              <div
                key={index}
                className="flex flex-row items-center mb-4 justify-between"
              >
                <div className="text-[18px] font-normal">
                  {item.name}
                  <br></br>
                  <div className="text-[13px] text-[#95c6b7]">
                    {item.fuellstand_ml}ml
                  </div>
                  <br></br>
                  <div className="text-[13px] text-[#95c6b7] mt-[-28px]">
                    Position {item.anschlussplatz}
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center justify-center">
                    <input
                      type="range"
                      min={sliderMin}
                      max={sliderMax}
                      step={sliderStep}
                      value={item.fuellstand_ml}
                      onChange={(ev) =>
                        changeValue(Number(ev.target.value), index, 1)
                      }
                      className="w-[415px] accent-[#1fe0a6]"
                    />
                  </div>
                  <select
                    className="text-sm rounded-lg block w-[60px] p-2.5 border-r-4 border-transparent dark:bg-[#1fe0a6] dark:placeholder-[#12211d] dark:text-[#12211d] dark:focus:ring-[#1fe0a6] bg-[#1fe0a6] text-[#12211d] font-bold"
                    defaultValue={item.anschlussplatz}
                    onChange={(ev) =>
                      changeValue(Number(ev.target.value), index, 0)
                    }
                  >
                    {options.map((option) => (
                      <option
                        key={option}
                        value={option}
                        className="font-semibold"
                      >
                        {option === 0 ? "-" : option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Configuration;
