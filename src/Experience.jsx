import {
  ContactShadows,
  Environment,
  Float,
  Html,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";

import { Leva, useControls } from "leva";
import React from "react";
import * as THREE from "three";

export default function Experience() {
  const phone = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf"
  );

  const { distanceFactor, positionY, positionX, positionZ, lightness } =
    useControls({
      distanceFactor: { value: 1.0, min: 0.5, max: 2, step: 0.01 },
      positionY: { value: 1.3, min: -2, max: 2, step: 0.01 },
      positionX: { value: 0.17, min: -2, max: 2, step: 0.01 },
      positionZ: { value: 0.07, min: -2, max: 2, step: 0.01 },
      lightness: { value: 13, min: 0, max: 100, step: 0.1 },
    });

  React.useEffect(() => {
    if (phone) {
      phone.scene.traverse((child) => {
        if (child.isMesh && child.material.name === "Display.002") {
          child.material = new THREE.MeshBasicMaterial({
            color: `hsl(242, 20%, 18%)`,
          });
        }
      });
    }
  }, [phone, lightness]);
  console.log(phone.materials);
  return (
    <>
      <Environment preset="city" />
      <color args={["#293133"]} attach="background" />
      <ContactShadows position-y={-1.8} opacity={0.4} scale={5} blur={2.4} />
      <PresentationControls
        global
        polar={[-0.4, 0.2]}
        azimuth={[-0.75, 0.75]}
        config={{
          mass: 2,
          tension: 400,
        }}
        snap
      >
        <Float rotationIntensity={0.4}>
          <primitive object={phone.scene} position-y={-1.2} rotation-x={-0.15}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={distanceFactor}
              position={[positionX, positionY, positionZ]}
            >
              <iframe src="https://droniu.dev/" />
            </Html>
          </primitive>
        </Float>
      </PresentationControls>
    </>
  );
}
