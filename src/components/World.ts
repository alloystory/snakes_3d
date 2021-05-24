import { BackSide, BoxGeometry, Mesh, MeshStandardMaterial } from 'three'

export const NAME = 'world'
export const WIDTH = 32
export const HEIGHT = 24
export const DEPTH = 32

export default function World() {
  const worldGeometry = new BoxGeometry(WIDTH, HEIGHT, DEPTH)
  const worldMaterial = new MeshStandardMaterial()
  worldMaterial.side = BackSide

  const world = new Mesh(worldGeometry, worldMaterial)
  world.position.y += 12
  world.name = NAME
  return world
}
