import { Color, SpotLight } from 'three'

export default function Light() {
  const lightColor = new Color('white')
  const lightIntensity = 1
  const maxLightDistance = 60
  const light = new SpotLight(lightColor, lightIntensity, maxLightDistance)
  light.position.set(0, 0, 20)
  light.castShadow = true

  return light
}
