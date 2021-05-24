import _ from 'lodash'
import { AmbientLight, Color, DirectionalLight, Object3D, PointLight, SpotLight } from 'three'
import { WORLD_INFO } from './World'

const LIGHT_COLOR = new Color('white')

export default function Lights(snake: Object3D) {
  const ceilingLights = getCeilingLights()
  const directionalLight = new DirectionalLight(LIGHT_COLOR, 0.3)
  directionalLight.position.set(0, 1, 1)
  directionalLight.castShadow = true
  directionalLight.target = snake
  return [ceilingLights, directionalLight]
}

function getCeilingLights() {
  const lightIntensity = 0.2
  const maxLightDistance = WORLD_INFO.height * 1.5

  const numCeilingLightsInRow = 3
  const numCeilingLightsInCol = 3
  const ceilingLightPositions = getCeilingLightPositions(numCeilingLightsInRow, numCeilingLightsInCol)

  return ceilingLightPositions.map((position) => {
    const light = new PointLight(LIGHT_COLOR, lightIntensity, maxLightDistance)
    light.position.x = position.x
    light.position.y = position.y
    light.position.z = position.z
    light.castShadow = true
    return light
  })
}

function getCeilingLightPositions(numLightsOnWidth: number, numLightsOnDepth: number) {
  // Spread coordinates equally across the range.
  const widthPositions = _.range(
    -WORLD_INFO.width / 2,
    WORLD_INFO.width / 2 + 1,
    WORLD_INFO.width / (numLightsOnWidth + 1)
  ).slice(1, -1)
  const depthPositions = _.range(
    -WORLD_INFO.depth / 2,
    WORLD_INFO.depth / 2 + 1,
    WORLD_INFO.depth / (numLightsOnDepth + 1)
  ).slice(1, -1)

  const positions: { x: number; y: number; z: number }[] = []
  for (const widthPosition of widthPositions) {
    for (const depthPosition of depthPositions) {
      positions.push({
        x: widthPosition,
        // Translated slightly below the ceiling to give ceiling some light.
        y: WORLD_INFO.height / 4,
        z: depthPosition,
      })
    }
  }

  return positions
}
