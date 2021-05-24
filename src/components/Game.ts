import { PerspectiveCamera, Scene as ThreeScene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Animator from './Animator'
import Camera from './Camera'
import CameraOrbitor from './CameraOrbitor'
import Floor from './Floor'
import Light from './Light'
import Renderer from './Renderer'
import Scene from './Scene'
import Snake from './Snake'

export default class Game {
  private scene: ThreeScene
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer
  private orbitor: OrbitControls

  constructor(container: HTMLElement) {
    const { clientWidth, clientHeight } = container
    this.scene = Scene.create()
    this.camera = Camera.create(clientWidth, clientHeight)
    this.renderer = Renderer.create(clientWidth, clientHeight)

    container.append(this.renderer.domElement)
    this.orbitor = CameraOrbitor.create(this.camera, container)
    this.scene.add(...[Snake.create(), Floor.create(), Light.create()])
  }

  render() {
    this.renderer.setAnimationLoop(() => {
      Animator.animate(this.scene)
      this.orbitor.update()
      this.renderer.render(this.scene, this.camera)
    })
  }
}
