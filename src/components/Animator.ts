import { Scene, PerspectiveCamera } from 'three'
import Snake from './Snake'

function animate(scene: Scene) {
  const snake = scene.getObjectByName(Snake.NAME)
  snake?.rotateZ(-0.1)
}

export default { animate }
