import _ from 'lodash'
import { Object3D, Scene } from 'three'
import { SNAKE_INFO } from './Snake'
import { WORLD_INFO } from './World'

const snakeMover = _.throttle((snake: Object3D) => {
  snake.position.x = Math.random() * WORLD_INFO.width - WORLD_INFO.width / 2
  snake.position.z = Math.random() * WORLD_INFO.depth - WORLD_INFO.depth / 2
}, 3000)

export function startAnimation(scene: Scene) {
  const snake = scene.getObjectByName(SNAKE_INFO.name)
  if (!snake) {
    throw new Error('Missing snake')
  }
  snakeMover(snake)
}
