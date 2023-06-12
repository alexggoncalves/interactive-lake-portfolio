
import vertexShader from "../../shaders/water/vertex.glsl";
import fragmentShader from "../../shaders/water/fragment.glsl";

import * as THREE from "three";
class WaterMaterial extends THREE.ShaderMaterial {
    constructor() {
        const uniforms = {
            time: {
                value: 0,
            },
            threshold: {
                value: 0.5,
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
            },
        };

        super({
            vertexShader,
            fragmentShader,
            fog: true,
            transparent: true,
            defines: {
                DEPTH_PACKING: 1,
                ORTHOGRAPHIC_CAMERA: 0,
            },
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib["fog"],
                uniforms
            ])
        });
    }
}

export {WaterMaterial}
