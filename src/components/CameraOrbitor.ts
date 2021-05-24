import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function CameraOrbitor(camera: PerspectiveCamera, container: HTMLElement) {
  const controls = new OrbitControls(camera, container)
  return controls
}
