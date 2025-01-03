import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";
import axios from "axios";

function Settings() {
    const handleShutdown = async () => {
        const confirmShutdown = window.confirm("Möchten Sie das System wirklich herunterfahren?");
        if (confirmShutdown) {
            try {
                await axios.post('http://127.0.0.1:5000/shutdown');
            } catch (error) {
                console.error("Fehler beim Herunterfahren:", error);
            }
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
            <div className='mt-12 flex flex-col items-center'>
                <NavLink to="/configuration">
                    <div className='bg-[#25463c] py-[12px] px-8 rounded-lg text-[19px] font-normal w-[400px] text-center transition-all duration-75 active:scale-95'>
                        Konfiguration
                    </div>
                </NavLink>
                <div className='mt-4 bg-[#25463c] py-[12px] px-8 rounded-lg text-[19px] font-normal w-[400px] text-center transition-all duration-75 active:scale-95'>
                    Reinigung
                </div>
                <div className='mt-4 bg-[#25463c] py-[12px] px-8 rounded-lg text-[19px] font-normal w-[400px] text-center transition-all duration-75 active:scale-95'>
                    Kalibrierung
                </div>
                <div className='mt-4 bg-[#f63737] py-[12px] px-8 rounded-lg text-[19px] font-normal w-[400px] text-center transition-all duration-75 active:scale-95'
                    onClick={() => handleShutdown()}>
                    Ausschalten
                </div>
            </div>
        </div>
    )
}

export default Settings