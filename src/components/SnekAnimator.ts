import _ from 'lodash'
import { Scene } from 'three'
import Snake from '../entities/Snake'
import SnekScore from './SnekScore'

class SnekAnimator {
  private scene: Scene
  private snekScore: SnekScore
  private snake: Snake

  constructor(scene: Scene, snekScore: SnekScore, snake: Snake) {
    this.scene = scene
    this.snekScore = snekScore
    this.snake = snake
  }

  start() {
    const currentScore = this.snekScore.get()
    const numSnakeSegments = this.snake.getNumSegments()
    console.log(`currentScore: ${currentScore}, numSnakeSegments: ${numSnakeSegments}`)
    if (numSnakeSegments < currentScore) {
      this.snake.addNewSegment()
    }

    this.throttledSnekScoreInc()

    // const snakeEntity = this.scene.getObjectByName(Snake.getName())

    // if (!snakeEntity) return

    // if (snakeEntity.children.length < )
    // const newSegment = getSnakeSegmentEntity(currentScore)
    // const prevSegment = snakeEntity.getObjectByName(`snake-${currentScore - 1}`)
    // if (prevSegment) {
    //   newSegment.position.z = prevSegment.position.z + 1
    // }
    // snakeEntity.add(newSegment)
  }

  private throttledSnekScoreInc = _.throttle(() => {
    this.snekScore.inc()
  }, 1000)
}

export default SnekAnimator
