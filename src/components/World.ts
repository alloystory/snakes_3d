import { Mesh, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import camera from './camera'
import floor from './floor'
import renderer from './renderer'
import scene from './scene'
import snake from './snake'

export default class World {
  private scene: Scene
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer
  private snake: Mesh
  private controls: OrbitControls

  constructor(container: HTMLElement) {
    const { clientWidth: width, clientHeight: height } = container

    this.scene = scene.create()
    this.camera = camera.create(width, height)
    this.renderer = renderer.create(width, height)

    this.snake = snake.create()
    this.scene.add(this.snake)

    this.scene.add(floor.create())

    container.append(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.autoRotate = true
  }

  render() {
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera)
      this.controls.update()
      // this.cube.rotateX(0.005)
      // this.cube.rotateZ(0.005)
    })
  }
}
