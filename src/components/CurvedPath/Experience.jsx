import { Float, Line, OrbitControls, useScroll, PerspectiveCamera, Box } from '@react-three/drei'
import React, { useMemo, useRef, useState } from 'react'
import Background from './Background'
import Cloud from './Cloud'
import Bird from './Bird'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const LINE_NB_POINTS = 12000

export default function Experience() {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0,0,0),
      new THREE.Vector3(0,0,-10),
      new THREE.Vector3(-2,0,-20),
      new THREE.Vector3(-3,0,-30),
      new THREE.Vector3(0,0,-40),
      new THREE.Vector3(5,0,-50),
      new THREE.Vector3(7,0,-60),
      new THREE.Vector3(5,0,-70),
      new THREE.Vector3(0,0,-80),
      new THREE.Vector3(0,0,-90),
      new THREE.Vector3(0,0,-100),
    ],
    false,
    "catmullrom",
    0.2)
  }, [])

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS)
  }, [curve])

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -2)
    shape.lineTo(0, 0.2)
    
    return shape
  }, [curve])


  const cameraGroup = useRef();
  const scroll = useScroll();

  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    )
    const curPoint = linePoints[curPointIndex]
    // curve 방향 따라 Bird model이 바라보는 방향 틀기
    const pointAhead = linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];
    
    const xDisplacement = (pointAhead.x - curPoint.x) * 80

    // Math.PI / 2 -> LEFT
    // -Math.PI / 2 -> RIGHT

    const angleRotation = (xDisplacement < 0 ? 1 : -1) * 
    Math.min(Math.abs(xDisplacement), Math.PI / 5)

    const targetBirdQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        bird.current.rotation.x,
        bird.current.rotation.y,
        angleRotation,
      )
    )

    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        cameraGroup.current.rotation.x,
        cameraGroup.current.rotation.z,
        angleRotation,
      )
    )

    bird.current.quaternion.slerp(targetBirdQuaternion, delta * 2)
    cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2)

    cameraGroup.current.position.lerp(curPoint, delta*24)
  })

  const bird = useRef();

  return (
    <>
      
      {/* <OrbitControls enableZoom={false}/> */}
      <group ref={cameraGroup}>
        <Background/>
        <PerspectiveCamera position={[-2, 5, 40]} fov={60} makeDefault />
        <group ref={bird}>
          <Float floatIntensity={10} speed={10}>
            <Bird 
              rotation-y={Math.PI / 2} 
              scale={[0.2, 0.2, 0.2]} 
              position={[0, 2, 0]} 
              opacity={0.2} />
          </Float>
        </group>

      </group>

      {/* <Line
          points={linePoints}
          color={"white"}
          opacity={0.7}
          transparent
          lineWidth={10}
      /> */}

      <group position={[0, 1, 0]}>
        <mesh>
          <extrudeGeometry
            args={[
              shape, 
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              }
            ]} />
            <meshStandardMaterial color={"white"} opacity={0} transparent/>
        </mesh>
      </group>

      <Cloud 
        opacity={0.7} 
        scale={[2, 2, 2]} 
        rotation-y={Math.PI / 9}
        position={[-10, -4, -2]} 
      />        
      <Cloud 
        opacity={0.6} 
        scale={[3, 3, 4]} 
        position={[10, 5, -4]} 
      />
      <Cloud 
        opacity={0.4} 
        scale={[1, 1, 1]}
        position={[-5, 5, -10]} 
      />
      <Cloud 
        opacity={0.4} 
        scale={[1, 1, 1]}
        position={[5, 2, -30]} 
      />
      <Cloud 
        opacity={0.4} 
        scale={[1, 1, 1]}
        position={[7, 10, -50]} 
      />

    </>
  )
}
