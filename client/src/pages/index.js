import React, { useEffect, useRef, useState } from "react";
import Streamer from "../components/streamer";
import SphereRotation from "../components/SphereRotation";

const pageStyles = {
    color: "#232129",
    padding: 96,
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
    marginTop: 0,
    marginBottom: 64,
    maxWidth: 320,
};

const IndexPage = () => 
{
    const [yaw, setYaw] = useState(0);
    const [pitch, setPitch] = useState(0);
    const [roll, setRoll] = useState(0);

    useEffect(() => {
        const yawIncrement = 1;
        const pitchIncrement = 2;
        const rollIncrement = 3;

        const id = setInterval(() => {
            setYaw(prevYaw => prevYaw + yawIncrement);
            setPitch(prevPitch => prevPitch + pitchIncrement);
            setRoll(prevRoll => prevRoll + rollIncrement);
        }, 10); 

        return () => clearInterval(id); 
    }, []);

    return (
        <main style={pageStyles}>
            <h1 style={headingStyles}>BOBOT</h1>
            {/* <Streamer /> */}
            <SphereRotation yaw={yaw} pitch={pitch} roll={roll} />
        </main>
    );
};

export default IndexPage;
