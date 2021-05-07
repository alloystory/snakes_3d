import { Mesh, MeshNormalMaterial, PlaneGeometry } from 'three'

function create() {
  const floorGeometry = new PlaneGeometry(16, 16)
  const floorMaterial = new MeshNormalMaterial()
  const floor = new Mesh(floorGeometry, floorMaterial)
  return floor
}

export default { create }
