import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshNormalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class World {
  private scene: Scene
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer
  private cube: Mesh
  private controls: OrbitControls

  constructor(container: HTMLElement) {
    const { clientWidth: width, clientHeight: height } = container

    this.scene = new Scene()
    this.scene.background = new Color('salmon')

    const fov = 75
    const aspectRatio = width / height
    const near = 0.1
    const far = 1000
    this.camera = new PerspectiveCamera(fov, aspectRatio, near, far)
    this.camera.position.set(0, 0, 15)

    this.renderer = new WebGLRenderer({ antialias: true })
    this.renderer.setSize(width, height)

    const cubeGeometry = new BoxGeometry()
    const cubeMaterial = new MeshBasicMaterial()
    this.cube = new Mesh(cubeGeometry, cubeMaterial)
    this.cube.position.z += 0.5
    this.scene.add(this.cube)

    const planeGeometry = new PlaneGeometry(16, 16)
    const planeMaterial = new MeshNormalMaterial()
    const plane = new Mesh(planeGeometry, planeMaterial)
    this.scene.add(plane)

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
