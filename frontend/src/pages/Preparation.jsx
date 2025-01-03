import React, { useState, useEffect } from 'react';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import WineBarIcon from '@mui/icons-material/WineBar';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';

export default function Preparation() {
    const [icons, setIcons] = useState([]);
    const navigate = useNavigate();

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

        const timer = setTimeout(() => {
            navigate('/ready');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
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
