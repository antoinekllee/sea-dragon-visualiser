import React, { useRef, forwardRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three';

const MySpecialGeometry = forwardRef((props, ref) => {
    return <primitive ref={ref} object={new THREE.BoxGeometry(0.5, 0.5, 1)} {...props} />;
});

const Sphere = ({ yaw, pitch, roll }) => {
    const ref = useRef();

    useFrame(() => {
        ref.current.rotation.y = yaw * (Math.PI / 180);
        ref.current.rotation.x = pitch * (Math.PI / 180);
        ref.current.rotation.z = roll * (Math.PI / 180);    
    });

    return (
        <mesh ref={ref}>
            <MySpecialGeometry />
            <meshStandardMaterial color="hotpink" />
        </mesh>
    );
};

const SphereRotation = ({ yaw = 0, pitch = 0, roll = 0 }) => (
    <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Sphere yaw={yaw} pitch={pitch} roll={roll} />
    </Canvas>
);

export default SphereRotation;
