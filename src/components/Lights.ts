import _ from 'lodash'
import { Color, DirectionalLight, PointLight, SpotLight } from 'three'
import { WORLD_INFO } from './World'

const LIGHT_COLOR = new Color('white')

export default function Lights() {
  const ceilingLights = getCeilingLights()
  const cameraLight = getCameraLight()

  return ceilingLights
}

function getCameraLight() {
  const lightIntensity = 0.4
  const light = new DirectionalLight(LIGHT_COLOR, lightIntensity)
  light.position.set(0, -1, 1)
  return light
}

function getCeilingLights() {
  const lightIntensity = 0.1
  const maxLightDistance = 60

  const numCeilingLightsInRow = 4
  const numCeilingLightsInCol = 4
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
      positions.push({ x: widthPosition, y: WORLD_INFO.height / 2, z: depthPosition })
    }
  }

  return positions
}
