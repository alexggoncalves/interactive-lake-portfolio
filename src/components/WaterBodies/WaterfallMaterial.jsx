import vertexShader from "../../shaders/waterfall/vertex.glsl";
import fragmentShader from "../../shaders/waterfall/fragment.glsl";

import * as THREE from "three";
class WaterfallMaterial extends THREE.ShaderMaterial {
    constructor() {
        const uniforms = {
                time: {
                    value: 0,
                },
                tNoise: {
                    value: null,
                },
                tDudv: {
                    value: null,
                },
                topDarkColor: {
                    value: new THREE.Color(0x4e7a71),
                },
                bottomDarkColor: {
                    value: new THREE.Color(0x0e7562),
                },
                topLightColor: {
                    value: new THREE.Color(0xb0f7e9),
                },
                bottomLightColor: {
                    value: new THREE.Color(0x14c6a5),
                },
                foamColor: {
                    value: new THREE.Color(0xffffff)
                }
            }

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
                uniforms,
            ]),
        });
    }
}

export { WaterfallMaterial };
