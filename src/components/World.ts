import { PerspectiveCamera, Scene as ThreeScene, WebGLRenderer } from 'three'
import Animator from './Animator'
import Camera from './Camera'
import Floor from './Floor'
import Renderer from './Renderer'
import Scene from './Scene'
import Snake from './Snake'

export default class World {
  private scene: ThreeScene
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer

  constructor(container: HTMLElement) {
    const { clientWidth, clientHeight } = container
    this.scene = Scene.create()
    this.camera = Camera.create(clientWidth, clientHeight)
    this.renderer = Renderer.create(clientWidth, clientHeight)

    // Add renderer.
    container.append(this.renderer.domElement)

    // Add Objects.
    this.scene.add(...[Snake.create(), Floor.create()])
  }

  render() {
    this.renderer.setAnimationLoop(() => {
      Animator.animate(this.scene, this.camera)
      this.renderer.render(this.scene, this.camera)
    })
  }
}
