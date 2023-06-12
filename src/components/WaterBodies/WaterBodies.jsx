import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, NearestFilter } from "three";
import { useMemo, useState, createRef, useEffect } from "react";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";

import Lake from "./Lake";
import Waterfall from "./Waterfall";
import WaterParticles from "./WaterParticles";

import useApp from "../../stores/useApp";

const isTouchScreen = "ontouchstart" in window;

export default function WaterBodies({ waterfallModel, boatCutOut ,noiseMap,dudvMap}) {
    const unpause = useApp((state) => state.unpause)
    

    const { size, gl, camera } = useThree();
    const pixelRatio = window.devicePixelRatio;

    // gl.preserveDrawingBuffer = true;

    const [depthTexture, setDepthTexture] = useState();

    const waterfall = createRef();
    const particles = createRef();
    const lake = createRef();

    //!! TEMPORARY
    const depthTextureType = isTouchScreen
        ? THREE.ByteType
        : THREE.HalfFloatType;

    const renderTarget = useFBO(
        size.width * pixelRatio,
        size.height * pixelRatio,
        {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            generateMipmaps: false,
            stencilBuffer: false,
            format: THREE.RGBAFormat,
            depthBuffer: true,
            depthTexture: new THREE.DepthTexture(),
            samples: 8,
            type: depthTextureType,
            anisotropy: 0,
        }
    );

    const depthMaterial = useMemo(() => {
        const depthMaterial = new THREE.MeshDepthMaterial();
        depthMaterial.depthPacking = THREE.RGBADepthPacking;
        depthMaterial.blending = THREE.NoBlending;
        return depthMaterial;
    }, []);

    useFrame(({ gl, scene, camera }, delta) => {
        camera.updateProjectionMatrix();
        scene.overrideMaterial = depthMaterial;

        // Hide meshes to be ignored in the depth map
        waterfall.current.material.visible = false;
        particles.current.material.visible = false;
        lake.current.material.visible = false;

        // Render depthMap to render target
        gl.setRenderTarget(renderTarget);
        gl.render(scene, camera);
        setDepthTexture(renderTarget.texture);
        gl.setRenderTarget(null);

        scene.overrideMaterial = null;

        // Show hidden meshes for the default render
        lake.current.material.visible = true;
        waterfall.current.material.visible = true;
        particles.current.material.visible = true;
    });

    useEffect(()=>{
        unpause()
    },[])

    return (
        <>
            <Lake
                ref={lake}
                dudvMap={dudvMap}
                depthTexture={depthTexture}
                size={size}
                boatCutOut={boatCutOut}
            />
            <Waterfall
                ref={waterfall}
                waterfallModel={waterfallModel}
                noiseMap={noiseMap}
                dudvMap={dudvMap}
            />
            <WaterParticles
                ref={particles}
                noiseMap={noiseMap}
                position={waterfallModel.position}
                rotation={waterfallModel.rotation}
            />
        </>
    );
}
