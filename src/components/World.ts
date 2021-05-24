import {
  BackSide,
  BoxGeometry,
  Color,
  Mesh,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
} from 'three'

export const WORLD_INFO = {
  name: 'world',
  width: 32,
  height: 24,
  depth: 32,
}

export default function World() {
  const worldGeometry = new BoxGeometry(WORLD_INFO.width, WORLD_INFO.height, WORLD_INFO.depth)

  const ceilingMaterial = new MeshStandardMaterial({ color: new Color('white') })
  const wallMaterial = new MeshStandardMaterial({ color: new Color('salmon') })
  const floorMaterial = new MeshStandardMaterial()

  const worldLeftMaterial = wallMaterial
  const worldRightMaterial = wallMaterial
  const worldInnerMaterial = wallMaterial
  const worldOuterMaterial = wallMaterial
  const worldTopMaterial = ceilingMaterial
  const worldBottomMaterial = floorMaterial
  const worldMaterials = [
    worldRightMaterial,
    worldLeftMaterial,
    worldTopMaterial,
    worldBottomMaterial,
    worldOuterMaterial,
    worldInnerMaterial,
  ]

  worldMaterials.forEach((material) => {
    // Only render the inner faces of the cube.
    material.side = BackSide
  })

  const world = new Mesh(worldGeometry, worldMaterials)
  world.name = WORLD_INFO.name
  return world
}
