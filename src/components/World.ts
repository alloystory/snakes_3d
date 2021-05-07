import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import camera from './camera'
import floor from './floor'
import renderer from './renderer'
import scene from './scene'
import snake from './snake'

export default class World {
  private scene: Scene
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer

  constructor(container: HTMLElement) {
    const { clientWidth, clientHeight } = container
    this.scene = scene.create()
    this.camera = camera.create(clientWidth, clientHeight)
    this.renderer = renderer.create(clientWidth, clientHeight)

    // Add renderer.
    container.append(this.renderer.domElement)

    // Add Objects.
    this.scene.add(...[snake.create(), floor.create()])
  }

  render() {
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera)
    })
  }
}
