import { useRef, useEffect } from "react";
import { useFrame, useThree, useLoader, extend } from "@react-three/fiber";
import * as THREE from "three";

import waterVertexShader from "./shaders/water/vertex.glsl";
import waterFragmentShader from "./shaders/water/fragment.glsl";
import { shaderMaterial } from "@react-three/drei";


const Lake = (props) => {
    
    const { gl, camera, size } = useThree();
    const pixelRatio = window.devicePixelRatio;
    const water = useRef();
    
    const noiseMap = useLoader(
        THREE.TextureLoader,
        "https://i.imgur.com/gPz7iPX.jpg"
    );
    const dudvMap = useLoader(
        THREE.TextureLoader,
        "https://i.imgur.com/hOIsXiZ.png"
    );
    noiseMap.wrapS = noiseMap.wrapT = THREE.RepeatWrapping;
    noiseMap.minFilter = THREE.NearestFilter;
    noiseMap.magFilter = THREE.NearestFilter;
    dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;
    
    

    const waterUniforms = {
        time: {
            value: 0,
        },
        threshold: {
            value: 0.4,
        },
        tDudv: {
            value: null,
        },
        tDepth: {
            value: null,
        },
        cameraNear: {
            value: 0,
        },
        cameraFar: {
            value: 0,
        },
        resolution: {
            value: new THREE.Vector2(),
        },
        foamColor: {
            value: new THREE.Color(0xffffff),
        },
        waterColor: {
            value: new THREE.Color(0x14c6a5),
        }
        
    };

    var renderTarget = new THREE.WebGLRenderTarget(
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
        }
    );
    
    
    var depthMaterial = new THREE.MeshDepthMaterial();
    depthMaterial.depthPacking = THREE.RGBADepthPacking;
    depthMaterial.blending = THREE.NoBlending;
    
    
    
    const waterMaterial = new THREE.ShaderMaterial(
        {
            defines: {
                DEPTH_PACKING: 1,
                ORTHOGRAPHIC_CAMERA: 0,
            },
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib["fog"],
                waterUniforms,
            ]),
            vertexShader:waterVertexShader,
            fragmentShader:waterFragmentShader,
            fog: true,
            transparent: true
        }
    )

    

    

    useFrame(({ gl, scene, camera }, delta) => {
        scene.overrideMaterial = depthMaterial;
        water.current.material.visible = false;

        gl.setRenderTarget(renderTarget);
        gl.render(scene, camera);
        waterMaterial.uniforms.tDepth.value = renderTarget.texture;
        gl.setRenderTarget(null);

        scene.overrideMaterial = null;
        water.current.material.visible = true;

        waterMaterial.uniforms.time.value += delta / 6;
    });

    waterMaterial.uniforms.cameraNear.value = camera.near;
    waterMaterial.uniforms.cameraFar.value = camera.far;
    waterMaterial.uniforms.resolution.value.set(
        window.innerWidth * pixelRatio,
        window.innerHeight * pixelRatio
    );
    waterMaterial.uniforms.tDudv.value = dudvMap;
    waterMaterial.uniforms.tDepth.value = renderTarget.texture;

    return (
        <>
            <mesh
                ref={water}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                material={waterMaterial}
            >
                <planeGeometry args={[160, 160]} />
            </mesh>
        </>
    );
};

export default Lake;
