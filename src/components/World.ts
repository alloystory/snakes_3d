import { BackSide, BoxGeometry, Mesh, MeshStandardMaterial } from 'three'

export const WORLD_INFO = {
  name: 'world',
  width: 32,
  height: 24,
  depth: 32,
}

export default function World() {
  const worldGeometry = new BoxGeometry(WORLD_INFO.width, WORLD_INFO.height, WORLD_INFO.depth)
  const worldMaterial = new MeshStandardMaterial()
  worldMaterial.side = BackSide

  const world = new Mesh(worldGeometry, worldMaterial)
  world.name = WORLD_INFO.name
  return world
}
