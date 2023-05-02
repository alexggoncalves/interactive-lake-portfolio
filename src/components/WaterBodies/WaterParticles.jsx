import { useFrame } from "@react-three/fiber";
import {forwardRef} from "react"
import * as THREE from 'three'
import { ParticleSystem, Particle } from "./ParticleSystem";

const WaterParticles = forwardRef(({noiseMap,position,rotation},ref)=>{
    var emissionTime = 0, nextEmissionTime = 0;
    
    const particleSystem = new ParticleSystem()

    var particleGeometry = new THREE.SphereGeometry(1, 16, 8);
    particleGeometry = particleGeometry.toNonIndexed();

    var particleMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      alphaMap: noiseMap,
      transparent: true
    });
  
    particleMaterial.onBeforeCompile = function (shader) {
      shader.vertexShader =
        "attribute float t;\nvarying float vT;\nvarying vec2 vUv;\n" + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        [
          "vec3 transformed = vec3( position );",
          "transformed.y += t * 0.25;",
          "vT = t;",
          "vUv = uv;"
        ].join("\n")
      );
      shader.fragmentShader = "varying float vT;\nvarying vec2 vUv;\n" + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <alphamap_fragment>",
        [
          "float dissolve = abs( sin( 1.0 - vT ) ) - texture2D( alphaMap, vUv ).g;",
          "if ( dissolve < 0.01 ) discard;"
        ].join("\n")
      );
    };  

    particleSystem.init(particleGeometry, particleMaterial, 250);
    
   
    useFrame((state,delta)=>{
      if(ref.current){
        ref.current.boundingSphere.radius = 7.5
      }
        emissionTime += delta;

        if (emissionTime > nextEmissionTime) {
          const particlePerSecond = 60;
          const t = 1 / particlePerSecond;
      
          nextEmissionTime = emissionTime + t / 2 + (t / 2) * Math.random();
      
          // emit new particle
      
          const particle = new Particle();
          particle.position.x = Math.sin(2 * Math.PI * Math.random())*7.5;
          particle.position.y = 0;
          particle.position.z = Math.cos(2 * Math.PI * Math.random());
          particle.lifetime = Math.random() * 0.2 + 1.5;
          particle.size = Math.random() * 0.5 + 1.2;
      
          particleSystem.add(particle);

        }

        particleSystem.update(delta);
    })

    return <primitive 
      ref={ref} 
      object={particleSystem._instancedMesh}
      position={position}
      rotation={rotation}
    />
})

export default WaterParticles