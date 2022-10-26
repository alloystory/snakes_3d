import { Scene } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Snake from '../entities/Snake'
import World from '../entities/World'
import SnekAnimator from './SnekAnimator'
import SnekCamera from './SnekCamera'
import SnekLights from './SnekLights'
import SnekRenderer from './SnekRenderer'
import SnekScore from './SnekScore'

class SnekGame {
  private htmlContainer: HTMLElement
  private scene: Scene
  private snekScore: SnekScore

  constructor(container: HTMLElement) {
    this.htmlContainer = container
    this.scene = new Scene()
    this.snekScore = new SnekScore()
  }

  start() {
    const camera = new SnekCamera(this.htmlContainer.clientWidth, this.htmlContainer.clientHeight)
    const renderer = new SnekRenderer(this.htmlContainer.clientWidth, this.htmlContainer.clientHeight)

    // Add the renderer to the HTML container.
    this.htmlContainer.append(renderer.getDomElement())

    // Add an OrbitControls to enable camera movements by dragging.
    const orbitor = new OrbitControls(camera.get(), this.htmlContainer)

    // Initialize the entities of the game.
    const world = new World()
    const snake = new Snake()
    this.scene.add(world.get(), snake.get())

    // Add lights to the scene
    const snekLights = new SnekLights()
    this.scene.add(snekLights.get())

    const animator = new SnekAnimator(this.scene, this.snekScore, snake)

    // Start the animation
    renderer.animate(this.scene, camera.get(), orbitor, animator)
  }
}

export default SnekGame
