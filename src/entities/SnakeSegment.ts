import { BoxGeometry, Color, Mesh, MeshStandardMaterial, Object3D } from 'three'
import { ThreeDimension } from '../types'

class SnakeSegment {
  private static NAME_TEMPLATE = 'snake-segment-{}'
  private static DIMENSIONS: ThreeDimension = { width: 1, height: 1, depth: 1 }

  private entity: Object3D

  constructor(id: string) {
    const geometry = new BoxGeometry(
      SnakeSegment.DIMENSIONS.width,
      SnakeSegment.DIMENSIONS.height,
      SnakeSegment.DIMENSIONS.depth
    )
    const material = new MeshStandardMaterial({ color: new Color('aqua') })
    this.entity = new Mesh(geometry, material)
    this.entity.name = SnakeSegment.getNameById(id)
  }

  get(): Object3D {
    return this.entity
  }

  static getNameById(id: string) {
    return SnakeSegment.NAME_TEMPLATE.replace('{}', id)
  }

  static getDimensions(): ThreeDimension {
    return this.DIMENSIONS
  }
}

export default SnakeSegment
