import React from "react";

interface InputRef {
    changeable: boolean;
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBar: React.FC<InputRef> = ({ changeable, value, onChange }) => {

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (changeable) onChange(event.target.value);
    // };

    return (
        <div>
            <input
                type="text"
                value={value}
                className="w-full bg-transparent text-black text-sm border border-slate-700 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                onChange={onChange}
                disabled={!changeable}
            />
        </div>
    )
}
export default InputBar;