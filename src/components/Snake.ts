import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three'
import { WORLD_INFO } from './World'

export const SNAKE_INFO = {
  name: 'snake',
  width: 1,
  height: 1,
  depth: 1,
}

export default function Snake() {
  const snakeGeometry = new BoxGeometry(SNAKE_INFO.width, SNAKE_INFO.height, SNAKE_INFO.depth)
  const snakeMaterial = new MeshStandardMaterial()
  const snake = new Mesh(snakeGeometry, snakeMaterial)

  // Ensure that the snake is on the floor of the world.
  snake.position.y = -WORLD_INFO.height / 2 + SNAKE_INFO.height / 2
  snake.name = SNAKE_INFO.name
  return snake
}
