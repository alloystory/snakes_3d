import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three'

const NAME = 'snake'

function create() {
  const width = 2
  const height = 1
  const depth = 1
  const snakeGeometry = new BoxGeometry(width, height, depth)
  // Translate to ensure that anchor point is on the left face of the cube.
  snakeGeometry.translate(width / 2, 0, 0)

  const snakeMaterial = new MeshStandardMaterial()

  const snake = new Mesh(snakeGeometry, snakeMaterial)
  snake.position.x -= width / 2
  snake.position.z += width / 2
  snake.name = NAME
  return snake
}

export default { create, NAME }
