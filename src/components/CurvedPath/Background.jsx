import { Box, Environment, Sphere, useTexture } from '@react-three/drei'
import React from 'react'

export default function Background() {
  return (
    <>
      <Environment files='/models/industrial_sunset_puresky_4k.hdr' background/>
      <Sphere scale={[200, 200, 200]}>
        {/* <LayerMaterial
          lighting='physical'
          transmission={1}
          side={THREE.BackSide}
          >
          
          <Gradient colorA={"blue"} colorB={"white"} axes={"y"} start={0} end={-5}/>
        </LayerMaterial> */}
      </Sphere>
    </>
  )
}
