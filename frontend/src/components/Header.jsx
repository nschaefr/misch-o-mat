import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <div className='w-full grid grid-cols-2 pt-4 pb-2 items-center'>
            <div className='font-sans font-bold text-[28px]'>Mischomat</div>
            <div className='ml-auto active:scale-95 transition-all duration-100'><NavLink to="/pin"><SettingsIcon sx={{ fontSize: 25 }} /></NavLink></div>
        </div>
    )
}

export default Header