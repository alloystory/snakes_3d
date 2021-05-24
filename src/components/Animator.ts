import _ from 'lodash'
import { Object3D, Scene } from 'three'
import { SNAKE_INFO } from './Snake'

// const snakeMover = _.throttle((snake: Object3D) => {
//   snake.position.x -= 1
// }, 1000)

export function startAnimation(scene: Scene) {
  const snake = scene.getObjectByName(SNAKE_INFO.name)
  if (!snake) {
    throw new Error('Missing snake')
  }
  // snakeMover(snake)
}
