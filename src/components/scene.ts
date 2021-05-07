import { Color, Scene } from 'three'

function create() {
  const scene = new Scene()
  scene.background = new Color('salmon')
  return scene
}

export default { create }
