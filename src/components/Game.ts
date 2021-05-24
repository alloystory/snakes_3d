import { Scene } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { startAnimation } from './Animator'
import Camera from './Camera'
import Light from './Light'
import Renderer from './Renderer'
import Snake from './Snake'
import World from './World'

export function startGame(container: HTMLElement) {
  const { clientWidth, clientHeight } = container
  const scene = new Scene()
  const camera = Camera(clientWidth, clientHeight)
  const renderer = Renderer(clientWidth, clientHeight)
  const orbitor = new OrbitControls(camera, container)

  container.append(renderer.domElement)
  scene.add(...[World(), Snake(), Light()])

  renderer.setAnimationLoop(() => {
    startAnimation(scene)
    orbitor.update()
    renderer.render(scene, camera)
  })
}
