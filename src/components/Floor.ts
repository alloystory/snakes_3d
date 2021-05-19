import { Color, Mesh, MeshNormalMaterial, MeshStandardMaterial, PlaneGeometry } from 'three'

const NAME = 'floor'

function create() {
  const floorGeometry = new PlaneGeometry(16, 16)
  const floorMaterial = new MeshStandardMaterial({ color: new Color('slateblue') })
  const floor = new Mesh(floorGeometry, floorMaterial)
  floor.name = NAME
  return floor
}

export default { create, NAME }
