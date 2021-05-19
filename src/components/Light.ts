import { AmbientLight, Color } from 'three'

function create() {
  const lightColor = new Color('white')
  const light = new AmbientLight(lightColor)

  return light
}

export default { create }
