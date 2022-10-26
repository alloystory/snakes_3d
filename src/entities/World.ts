import { BackSide, BoxGeometry, Color, Mesh, MeshStandardMaterial, Object3D } from 'three'
import { ThreeDimension } from '../types'

class World {
  private static DIMENSIONS: ThreeDimension = { width: 32, height: 24, depth: 32 }
  private static NAME = 'world'

  private entity: Object3D

  constructor() {
    const geometry = new BoxGeometry(World.DIMENSIONS.width, World.DIMENSIONS.height, World.DIMENSIONS.depth)

    const ceilingMaterial = new MeshStandardMaterial({ color: new Color('white') })
    const wallMaterial = new MeshStandardMaterial({ color: new Color('salmon') })
    const floorMaterial = new MeshStandardMaterial()

    // Arrange the materials.
    const worldLeftMaterial = wallMaterial
    const worldRightMaterial = wallMaterial
    const worldInnerMaterial = wallMaterial
    const worldOuterMaterial = wallMaterial
    const worldTopMaterial = ceilingMaterial
    const worldBottomMaterial = floorMaterial
    const materials = [
      worldRightMaterial,
      worldLeftMaterial,
      worldTopMaterial,
      worldBottomMaterial,
      worldOuterMaterial,
      worldInnerMaterial,
    ]

    materials.forEach((material) => {
      // Only render the inner faces of the cube.
      material.side = BackSide
    })

    this.entity = new Mesh(geometry, materials)
    this.entity.name = World.NAME
  }

  get(): Object3D {
    return this.entity
  }

  static getName(): string {
    return this.NAME
  }

  static getDimensions(): ThreeDimension {
    return this.DIMENSIONS
  }
}

export default World
