import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three'

export const SNAKE_INFO = {
  name: 'snake',
  width: 1,
  height: 1,
  depth: 1,
}

export default function Snake() {
  const snakeGeometry = new BoxGeometry(SNAKE_INFO.width, SNAKE_INFO.height, SNAKE_INFO.depth)
  // // Translate to ensure that anchor point is on the left face of the cube.
  // snakeGeometry.translate(WIDTH / 2, 0, 0)

  const snakeMaterial = new MeshStandardMaterial()

  const snake = new Mesh(snakeGeometry, snakeMaterial)
  // snake.position.x -= WIDTH / 2
  // snake.position.z += WIDTH / 2
  snake.name = SNAKE_INFO.name
  return snake
}
