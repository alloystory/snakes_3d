import _ from 'lodash'
import { Color, DirectionalLight, Group, Light, Object3D, PointLight } from 'three'
import World from '../entities/World'
import { Coordinates } from '../types'

class SnekLights {
  private static LIGHT_COLOR = new Color('white')
  private static NAME_TEMPLATE = 'light-{}'
  private lights: Object3D

  constructor() {
    this.lights = new Group()
    this.lights.add(...this.getCeilingLights())
  }

  get() {
    return this.lights
  }

  // private getSnakeDirectionalLight() {
  //   const intensity = 0.2
  //   const light = new DirectionalLight(SnekLights.LIGHT_COLOR, intensity)
  //   light.position.set(0, 1, 1)
  //   light.castShadow = true
  //   light.target = snake
  //   return light
  // }

  private getCeilingLights(): Light[] {
    const lightIntensity = 0.2
    const maxLightDistance = World.getDimensions().height * 1.5

    const numCeilingLightsInRow = 3
    const numCeilingLightsInCol = 3
    const ceilingLightPositions = SnekLights.calculateCeilingLightPositions(
      numCeilingLightsInRow,
      numCeilingLightsInCol
    )

    return ceilingLightPositions.map((position) => {
      const light = new PointLight(SnekLights.LIGHT_COLOR, lightIntensity, maxLightDistance)
      light.position.x = position.x
      light.position.y = position.y
      light.position.z = position.z
      light.castShadow = true
      light.name = SnekLights.NAME_TEMPLATE.replace('{}', Math.random().toString())
      return light
    })
  }

  private static calculateCeilingLightPositions(numLightsOnWidth: number, numLightsOnDepth: number): Coordinates[] {
    const worldDimensions = World.getDimensions()

    // Spread coordinates equally across the range.
    const widthPositions: number[] = _.range(
      -worldDimensions.width / 2,
      worldDimensions.width / 2 + 1,
      worldDimensions.width / (numLightsOnWidth + 1)
    ).slice(1, -1)
    const depthPositions: number[] = _.range(
      -worldDimensions.depth / 2,
      worldDimensions.depth / 2 + 1,
      worldDimensions.depth / (numLightsOnDepth + 1)
    ).slice(1, -1)

    const positions: Coordinates[] = []
    for (const widthPosition of widthPositions) {
      for (const depthPosition of depthPositions) {
        positions.push({
          x: widthPosition,
          // Translated slightly below the ceiling to give ceiling some light.
          y: worldDimensions.height / 4,
          z: depthPosition,
        })
      }
    }

    return positions
  }
}

export default SnekLights
