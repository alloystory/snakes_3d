import { flattenDeep } from 'lodash'
import { Object3D, Scene } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { startAnimation } from './Animator'
import Camera from './Camera'
import Lights from './Lights'
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

  const components = flattenDeep<Object3D>([World(), Snake(), Lights()])
  scene.add(...components)

  renderer.setAnimationLoop(() => {
    startAnimation(scene)
    orbitor.update()
    renderer.render(scene, camera)
  })
}
