import { Camera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class SnekRenderer {
  private renderer: WebGLRenderer

  constructor(width: number, height: number) {
    this.renderer = new WebGLRenderer({ antialias: true })
    this.renderer.setSize(width, height)
  }

  get(): WebGLRenderer {
    return this.renderer
  }

  getDomElement(): HTMLElement {
    return this.renderer.domElement
  }

  animate(scene: Scene, camera: Camera, orbitor: OrbitControls): void {
    this.renderer.setAnimationLoop(() => {
      // startAnimation(scene)
      orbitor.update()
      this.renderer.render(scene, camera)
    })
  }
}

export default SnekRenderer
