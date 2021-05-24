import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three'

export const NAME = 'snake'
export const WIDTH = 2
export const HEIGHT = 1
export const DEPTH = 1

export default function Snake() {
  const snakeGeometry = new BoxGeometry(WIDTH, HEIGHT, DEPTH)
  // // Translate to ensure that anchor point is on the left face of the cube.
  // snakeGeometry.translate(WIDTH / 2, 0, 0)

  const snakeMaterial = new MeshStandardMaterial()

  const snake = new Mesh(snakeGeometry, snakeMaterial)
  // snake.position.x -= WIDTH / 2
  // snake.position.z += WIDTH / 2
  snake.name = NAME
  return snake
}
