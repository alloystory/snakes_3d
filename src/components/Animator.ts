import _ from 'lodash'
import { Object3D, Scene } from 'three'
import Snake from './Snake'

const snakeMover = _.throttle((snake: Object3D) => {
  snake.position.x -= 1
}, 1000)

function animate(scene: Scene) {
  const snake = scene.getObjectByName(Snake.NAME)
  if (!snake) {
    throw new Error('Missing snake')
  }
  snakeMover(snake)
}

export default { animate }
