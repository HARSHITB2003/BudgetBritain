import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { BUDGET_CATEGORIES, TOTAL_BUDGET } from '../data/budgetData';

interface BudgetSphereProps {
  allocations: Record<string, number>;
}

const Segment: React.FC<{ startAngle: number; angle: number; color: string; index: number }> = ({ startAngle, angle, color, index }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetScale = useMemo(() => 0.8 + (angle / 360) * 2, [angle]);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial 
          color={color} 
          speed={2} 
          distort={0.3} 
          radius={1} 
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
};

const BudgetGlobe: React.FC<BudgetSphereProps> = ({ allocations }) => {
  const segments = useMemo(() => {
    let currentAngle = 0;
    return BUDGET_CATEGORIES.map((cat) => {
      const val = allocations[cat.id] || cat.actual;
      const angle = (val / TOTAL_BUDGET) * 360;
      const res = { ...cat, startAngle: currentAngle, angle };
      currentAngle += angle;
      return res;
    });
  }, [allocations]);

  return (
    <div className="w-full h-[500px] relative group cursor-grab active:cursor-grabbing">
      <div className="absolute inset-0 bg-radial-gradient from-westminster-green/5 to-transparent rounded-full blur-3xl" />
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <group rotation={[0, 0, 0]}>
          {segments.map((seg, i) => (
            <group key={seg.id} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
              <Segment 
                startAngle={seg.startAngle} 
                angle={seg.angle} 
                color={seg.color} 
                index={i} 
              />
            </group>
          ))}
        </group>

        <Environment preset="city" />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      </Canvas>
      
      {/* Overlay legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 flex-wrap justify-center max-w-lg pointer-events-none">
        {BUDGET_CATEGORIES.map(cat => (
          <div key={cat.id} className="flex items-center gap-1.5 px-2 py-1 rounded-full glass text-[10px] font-bold uppercase tracking-wider border border-white/20">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
            {cat.name.split(' ')[0]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetGlobe;
