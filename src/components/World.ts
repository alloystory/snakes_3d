import { BoxBufferGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'

export default class World {
  private scene: Scene
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer
  private cube: Mesh

  constructor(container: HTMLElement) {
    const { clientWidth: width, clientHeight: height } = container

    this.scene = new Scene()

    const fov = 75
    const aspectRatio = width / height
    const near = 0.1
    const far = 1000
    this.camera = new PerspectiveCamera(fov, aspectRatio, near, far)

    this.renderer = new WebGLRenderer()
    this.renderer.setSize(width, height)

    const cubeGeometry = new BoxBufferGeometry()
    const cubeMaterial = new MeshNormalMaterial()
    this.cube = new Mesh(cubeGeometry, cubeMaterial)
    this.scene.add(this.cube)

    container.append(this.renderer.domElement)
  }

  render() {
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera)
    })
  }
}
