import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function create(camera: PerspectiveCamera, container: HTMLElement) {
  const controls = new OrbitControls(camera, container)
  return controls
}

export default { create }
