import { Group, Object3D } from 'three'
import SnakeSegment from './SnakeSegment'

class Snake {
  private static NAME = 'snake'

  // private snekScore: SnekScore
  private segments: Object3D
  private segmentIds: string[] = []

  constructor() {
    this.segments = new Group()
    this.segments.name = Snake.NAME
    this.addNewSegment()
  }

  get(): Object3D {
    return this.segments
  }

  getNumSegments(): number {
    return this.segments.children.length
  }

  addNewSegment(): void {
    const newSegmentId = Math.random().toString()
    const newSegment = new SnakeSegment(newSegmentId).get()

    if (this.getNumSegments() > 0) {
      const prevSegmentId = this.segmentIds[this.segmentIds.length - 1]
      const prevSegment = this.segments.getObjectByName(SnakeSegment.getNameById(prevSegmentId))
      if (!prevSegment) {
        throw new Error(`Expected segment id ${prevSegmentId} not found!`)
      }
      newSegment.position.z = prevSegment.position.z + SnakeSegment.getDimensions().depth
    }

    this.segmentIds.push(newSegmentId)
    this.segments.add(newSegment)
  }

  static getName(): string {
    return Snake.NAME
  }
}

export default Snake
