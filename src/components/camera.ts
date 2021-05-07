import { PerspectiveCamera } from 'three'

function create(width: number, height: number) {
  const fov = 75
  const aspectRatio = width / height
  const near = 0.1
  const far = 1000

  const camera = new PerspectiveCamera(fov, aspectRatio, near, far)

  // Set initial position to a z-index > 0, otherwise no objects
  // in the scene can be seen.
  camera.position.set(0, 0, 15)
  return camera
}

export default { create }
