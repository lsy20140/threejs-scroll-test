import React, { Suspense, useState } from 'react'
import { ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Experience from './components/CurvedPath/Experience'
import LoadingScreen from './components/CurvedPath/LoadingScreen'

export default function AppPath() {
  const [start, setStart] = useState(false)

  return (
    <>
      <Canvas>
        {/* <axesHelper scale={100}/> */}
        <color attach="background" arg={["#f59f9f"]}/>
        <ScrollControls pages={5} damping={1}>
          <Suspense fallback={null}>
            {start && <Experience/> }
          </Suspense>
        </ScrollControls>
      </Canvas>
      <LoadingScreen started={start} text={'Start Flight!!'} onStarted={() => setStart(true)}/>

    </>
  )
}
