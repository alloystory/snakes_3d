import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

function create() {
  const snakeGeometry = new BoxGeometry()
  const snakeMaterial = new MeshBasicMaterial()

  const snake = new Mesh(snakeGeometry, snakeMaterial)
  snake.position.z += 0.5
  return snake
}

export default { create }
