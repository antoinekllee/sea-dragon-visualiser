import asyncio
import numpy as np
import cv2
import websockets
import base64

async def send_camera_feed(websocket, path):
    cap = cv2.VideoCapture(0)

    while cap.isOpened():
        ret, frame = cap.read()
        if ret:
            # Encode the frame to JPEG format
            _, buffer = cv2.imencode('.jpg', frame)
            jpg_bytes = base64.b64encode(buffer)

            # Send the frame to connected clients
            await websocket.send(jpg_bytes)
            
            # Wait for 1 second before sending the next frame
            await asyncio.sleep(1)
        else:
            print("Camera disconnected.")
            break

    cap.release()

async def main():
    async with websockets.serve(send_camera_feed, "localhost", 8765):
        print("WebSocket server running...")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())

