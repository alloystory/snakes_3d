import { PerspectiveCamera } from 'three'
import { WORLD_INFO } from './World'

export default function Camera(width: number, height: number) {
  const fov = 75
  const aspectRatio = width / height
  const near = 0.1
  const far = 1000

  const camera = new PerspectiveCamera(fov, aspectRatio, near, far)
  camera.position.z = WORLD_INFO.depth / 2
  return camera
}
