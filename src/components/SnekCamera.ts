import { Camera, PerspectiveCamera } from 'three'
import World from '../entities/World'

class SnekCamera {
  private static FOV: number = 75
  private static NEAR_DISTANCE: number = 0.1
  private static FAR_DISTANCE: number = 1000

  private camera: Camera

  constructor(width: number, height: number) {
    const aspectRatio = width / height
    this.camera = new PerspectiveCamera(SnekCamera.FOV, aspectRatio, SnekCamera.NEAR_DISTANCE, SnekCamera.FAR_DISTANCE)
    this.camera.position.z = World.getDimensions().depth / 2
    this.camera.lookAt(0, -World.getDimensions().height / 2, 0) // Temp edit to lock the camera at the snake.
  }

  get(): Camera {
    return this.camera
  }
}

export default SnekCamera
