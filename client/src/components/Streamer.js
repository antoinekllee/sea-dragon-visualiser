import React, { useEffect, useRef } from "react";

const Streamer = () => 
{
    const imageRef = useRef(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8765');
    
        ws.onopen = () => {
            console.log('Connected to the WebSocket server.');
        }
    
        ws.binaryType = 'blob';

        ws.onmessage = function(event) {
            const blob = event.data;
            const reader = new FileReader();
    
            reader.onloadend = function() 
            {
                const base64data = reader.result.split(",")[1];
                const data = 'data:image/jpeg;base64,' + atob(base64data);
                console.log (data);
                imageRef.current.src = data; 
            };
    
            reader.readAsDataURL(blob);
        };
    
        ws.onerror = (error) => {
            console.error('WebSocket Error: ', error);
        };
    
        ws.onclose = (event) => {
            if (event.wasClean) {
                console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
            } else {
                console.error(`Connection died`);
            }
        };
    
        return () => {
            ws.close();
        }
    }, []); 


    return (
        <div>
            <h2>Image</h2>
            <img ref={imageRef} />
        </div>
    );
};

export default Streamer;
