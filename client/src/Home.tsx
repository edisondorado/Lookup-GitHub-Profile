import { useState } from "react";
import Button from "./components/Button";
import InputBar from "./components/InputBar";
import { useNavigate } from "react-router-dom";

function Home() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    return (
        <div className='h-screen bg-white text-black'>
            <div className='w-full h-screen flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-start gap-2'>
                    Write a username:
                    <InputBar changeable={true} value={username} onChange={(event) => setUsername(event.target.value)}  />
                    <Button onClick={() => navigate(`/${username}`)} name='Analyze' />
                </div>
            </div>
        </div>
    )
}

export default Home;