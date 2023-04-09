import { useGLTF } from '@react-three/drei'
import React from 'react'

export default function Bird(props) {
  const { nodes, materials } = useGLTF('/models/Flying_gull.glb')
  
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Flying_seagull.geometry}
        scale={0.5}
      >
        <meshStandardMaterial
          {...materials['lambert5SG']}
          transparent
          opacity={props.opacity}
        />
      </mesh>      
    </group>
  )
}

useGLTF.preload('/models/Flying_gull.glb')
