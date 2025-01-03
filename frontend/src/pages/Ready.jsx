import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

function Ready() {
    const navigate = useNavigate();

    useEffect(() => {
        const fireConfetti = () => {
            confetti({
                particleCount: 20,
                spread: 50,
                origin: { y: 0.8 },
            });
        };

        fireConfetti();

        setTimeout(() => {
            navigate('/');
        }, 5000);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="text-center p-6 rounded-lg">
                <h1 className="text-[28px] font-bold">
                    Dein Getränk wurde erfolgreich <br /> zubereitet
                </h1>
            </div>
        </div>
    );
}

export default Ready;
