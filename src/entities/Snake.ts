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

  addNewSegment(): void {
    const newSegmentId = Math.random().toString()
    this.segmentIds.push(newSegmentId)
    this.segments.add(new SnakeSegment(newSegmentId).get())
  }

  static getName(): string {
    return Snake.NAME
  }
}

export default Snake
