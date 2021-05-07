import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

const NAME = 'snake'

function create() {
  const snakeGeometry = new BoxGeometry()
  const snakeMaterial = new MeshBasicMaterial()

  const snake = new Mesh(snakeGeometry, snakeMaterial)
  snake.position.z += 0.5
  snake.name = NAME
  return snake
}

export default { create, NAME }
