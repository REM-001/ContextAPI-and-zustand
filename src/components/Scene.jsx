// Scene.jsx
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';

function Image() {
  const { viewport } = useThree();
  const mesh = useRef();
  const texture = useTexture('/owl.png');
  
  // Fix texture encoding
  texture.encoding = THREE.sRGBEncoding;
  texture.needsUpdate = true;

  // Create ripple shader material
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [texture]
  );

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform sampler2D uTexture;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      
      float frequency = 10.0;
      float amplitude = 0.005;
      float speed = 2.0;
      
      float distanceFromCenter = length(uv - 0.5);
      float ripple = sin(distanceFromCenter * frequency - uTime * speed);
      
      vec2 rippleUv = uv + ripple * amplitude;
      
      vec4 texture = texture2D(uTexture, rippleUv);
      
      // Adjust gamma correction for better contrast
      vec3 color = pow(texture.rgb, vec3(0.95));
      gl_FragColor = vec4(color, texture.a);
    }
  `;

  useFrame(({ clock }) => {
    if (uniforms.uTime) uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={[viewport.width / 2, viewport.width / 2.5, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className='test' style={{ width: '100vw', height: '100vh', background: 'transparent' }}>
      <Canvas
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding
        }}
        camera={{
          position: [0, 0, 2],
          fov: 75,
        }}
      >
        <Suspense fallback={null}>
          <Image />
        </Suspense>
      </Canvas>
    </div>
  );
}