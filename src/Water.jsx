import * as THREE from "three";
import { shaderMaterial, useFBO } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import waterVertexShader from "./shaders/water/vertex.glsl";
import waterFragmentShader from "./shaders/water/fragment.glsl";
import { useEffect, useRef, useState } from "react";

const textureLoader = new THREE.TextureLoader();

const waterNormals = textureLoader.load("/water_normal.jpg");
waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

const foamTexture = textureLoader.load("/water_foam.jpg");
foamTexture.wrapS = foamTexture.wrapT = THREE.RepeatWrapping;

const WaterShaderMaterial = shaderMaterial(
    {
        time: 0,
        normalSampler: waterNormals,
        sunDirection: new THREE.Vector3(10, -5, -8),
        sunColor: new THREE.Color("#ffffff"),
        eye: new THREE.Vector3(0, 0, 0),
    },
    waterVertexShader,
    waterFragmentShader
);

extend({ WaterShaderMaterial });

export default function Water({ waterProps }) {
    const { gl, scene, camera } = useThree();
    // gl.autoClear = false;
    gl.localClippingEnabled = true

    const water = useRef();
    const material = useRef();
    const screen = useRef();
    const clippingPlane = new THREE.Plane(new THREE.Vector3(0,1,0),0)


    const targetA = useFBO({
        format: gl.RGBAFormat,
        stencilBuffer: false,
        depthBuffer: true
    })

    useFrame(
        (state, delta) => {

            material.current.time += delta;
            material.current.eye = state.camera.position;
            gl.setRenderTarget(targetA)
            gl.clear();
            gl.render(scene, camera)
            
            gl.setRenderTarget(null)
            
        },
        [waterProps]
    );

    return (<>
        <mesh ref={water} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry
                args={[
                    waterProps.waterScale.x,
                    waterProps.waterScale.y,
                    waterProps.waterSegments.x,
                    waterProps.waterSegments.y,
                ]}
            />
            <waterShaderMaterial
                ref={material}
                side={THREE.DoubleSide}
                transparent={true}
            />
        </mesh>
        <mesh rotation={[0, 0, 0]}
        >
            <planeGeometry
                args={[20,20]}
            />
            <meshStandardMaterial map={targetA.texture} />
        </mesh>
    </>


       
        
    );
}
