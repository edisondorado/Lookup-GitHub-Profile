import { useEffect, useState } from "react";

const LoadingDots = () => {
    const [dots, setDots] = useState(".");
    const [way, setWay] = useState<"front" | "back">("front");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (way === "front") {
                if (dots.length === 3) {
                    setWay("back"); 
                } else {
                    setDots(dots + "."); 
                }
            } else {
                setDots(".");
                setWay("front");
            }
        }, 1000);

        return () => clearTimeout(timer);

    }, [dots, way]);

    return (
        <div>
            {dots}
        </div>
    );
}

export default LoadingDots;
