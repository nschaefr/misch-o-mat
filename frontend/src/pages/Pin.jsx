import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";

function Pin() {
    const [pin, setPin] = useState('');
    const correctPin = "1234";
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value.length <= 4) {
            setPin(value);
        }

        if (value === correctPin) {
            navigate('/settings');
        }
    };

    const addDigit = (digit) => {
        const newPin = pin + digit;
        if (newPin.length <= 4) {
            setPin(newPin);
        }

        if (newPin === correctPin && newPin.length === 4) {
            navigate('/settings');
        }

        if (newPin !== correctPin && newPin.length === 4) {
            setPin("")
        }
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
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center">
                    <div className="flex w-[240px] px-4 py-3">
                        <label className="flex flex-col flex-1">
                            <input
                                className="form-input flex w-full flex-1 resize-none overflow-hidden rounded-xl text-white-white text-center text-[25px] focus:outline-0 focus:ring-0 border border-[#366356] bg-[#1b322b] focus:border-[#366356] placeholder:text-white-[#95c6b7] p-[10px] text-white-base font-normal leading-normal"
                                type="password"
                                value={pin}
                                onChange={(ev) => handleInputChange}
                            />
                        </label>
                    </div>

                    <div className="flex px-4">
                        <div className="group flex-1">
                            <button
                                onClick={() => addDigit('1')}
                                className="text-white text-[25px] font-normal font-sans leading-normal tracking-[0.015em] flex h-20 w-20 items-center justify-center truncate text-white-center rounded-full active:bg-[#25463c] active:scale-95 transition-all duration-75 p-12"
                            >
                                1
                            </button>
                            <button
                                onClick={() => addDigit('4')}
                                className="text-white text-[25px] font-normal font-sans leading-normal tracking-[0.015em] flex h-20 w-20 items-center justify-center truncate text-white-center rounded-full active:bg-[#25463c] active:scale-95 transition-all duration-75 p-12"
                            >
                                4
                            </button>
                            <button
                                onClick={() => addDigit('7')}
                                className="text-white text-[25px] font-normal font-sans leading-normal tracking-[0.015em] flex h-20 w-20 items-center justify-center truncate text-white-center rounded-full active:bg-[#25463c] active:scale-95 transition-all duration-75 p-12"
                            >
                                7
                            </button>
                        </div>
                        <div className="group flex-1">
                            <button
                                onClick={() => addDigit('2')}
                                className="text-white text-[25px] font-normal font-sans leading-normal tracking-[0.015em] flex h-20 w-20 items-center justify-center truncate text-white-center rounded-full active:bg-[#25463c] active:scale-95 transition-all duration-75 p-12"
                            >
                                2
                            </button>
                            <button
                                onClick={() => addDigit('5')}
                                className="text-white text-[25px] font-normal font-sans leading-normal tracking-[0.015em] flex h-20 w-20 items-center justify-center truncate text-white-center rounded-full active:bg-[#25463c] active:scale-95 transition-all duration-75 p-12"
                            >
                                5
                            </button>
                            <button
                                onClick={() => addDigit('8')}
                                className="text-white text-[25px] font-normal font-sans leading-normal tracking-[0.015em] flex h-20 w-20 items-center justify-center truncate text-white-center rounded-full active:bg-[#25463c] active:scale-95 transition-all duration-75 p-12"
                            >
                                8
                            </button>
                        </div>
                        <div className="group flex-1">
                            <button
                                onClick={() => addDigit('3')}
                                className="text-white text-[25px] font-normal font-sans leading-normal tracking-[0.015em] flex h-20 w-20 items-center justify-center truncate text-white-center rounded-full active:bg-[#25463c] active:scale-95 transition-all duration-75 p-12"
                            >
                                3
                            </button>
                            <button
                                onClick={() => addDigit('6')}
                                className="text-white text-[25px] font-normal font-sans leading-normal tracking-[0.015em] flex h-20 w-20 items-center justify-center truncate text-white-center rounded-full active:bg-[#25463c] active:scale-95 transition-all duration-75 p-12"
                            >
                                6
                            </button>
                            <button
                                onClick={() => addDigit('9')}
                                className="text-white text-[25px] font-normal font-sans leading-normal tracking-[0.015em] flex h-20 w-20 items-center justify-center truncate text-white-center rounded-full active:bg-[#25463c] active:scale-95 transition-all duration-75 p-12"
                            >
                                9
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pin;
