import React from "react";

interface ButtonProps {
    name: string;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ name, onClick, className = "" }) => {
    return (
        <div 
            onClick={onClick}
            className={`cursor-pointer rounded-md py-2 w-full flex justify-center bg-purple-700 text-white font-bold ${className}`}
        >
            {name}
        </div>
    );
};

export default Button;
