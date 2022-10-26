import _ from 'lodash'
import { Camera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import SnekAnimator from './SnekAnimator'
import SnekScore from './SnekScore'

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

  animate(scene: Scene, camera: Camera, orbitor: OrbitControls, animator: SnekAnimator): void {
    this.renderer.setAnimationLoop(() => {
      animator.start()
      orbitor.update()
      this.renderer.render(scene, camera)
    })
  }
}

export default SnekRenderer
