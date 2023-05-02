import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, NearestFilter } from "three";
import { useMemo, useState, createRef } from "react";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";

import Lake from "./Lake";
import Waterfall from "./Waterfall";
import WaterParticles from "./WaterParticles";

export default function ({ waterfallModel }) {
    const { size, gl,camera } = useThree();
    const pixelRatio = window.devicePixelRatio;

    // gl.preserveDrawingBuffer = true;

    const [depthTexture, setDepthTexture] = useState();

    const waterfall = createRef();
    const particles = createRef();
    const lake = createRef();

    const noiseMap = useLoader(
        TextureLoader,
        "https://i.imgur.com/gPz7iPX.jpg"
    );
    const dudvMap = useLoader(TextureLoader, "https://i.imgur.com/hOIsXiZ.png");
    noiseMap.wrapS = noiseMap.wrapT = RepeatWrapping;
    noiseMap.minFilter = NearestFilter;
    noiseMap.magFilter = NearestFilter;
    dudvMap.wrapS = dudvMap.wrapT = RepeatWrapping;

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
            type: THREE.HalfFloatType,
            anisotropy: 0
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

    return (
        <>
            <Lake ref={lake} dudvMap={dudvMap} depthTexture={depthTexture} size={size}/>
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
