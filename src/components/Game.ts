import { Scene } from 'three'
import { startAnimation } from './Animator'
import Camera from './Camera'
import CameraOrbitor from './CameraOrbitor'
import Light from './Light'
import Renderer from './Renderer'
import Snake from './Snake'
import World from './World'

export function startGame(container: HTMLElement) {
  const { clientWidth, clientHeight } = container
  const scene = new Scene()
  const camera = Camera(clientWidth, clientHeight)
  const renderer = Renderer(clientWidth, clientHeight)

  container.append(renderer.domElement)
  const orbitor = CameraOrbitor(camera, container)
  scene.add(...[World(), Snake(), Light()])

  renderer.setAnimationLoop(() => {
    startAnimation(scene)
    orbitor.update()
    renderer.render(scene, camera)
  })
}
