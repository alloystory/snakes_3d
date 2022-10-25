import _, { flattenDeep } from 'lodash'
import {
  BackSide,
  BoxGeometry,
  Camera,
  Color,
  DirectionalLight,
  Light,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const WORLD_INFO = {
  name: 'world',
  width: 32,
  height: 24,
  depth: 32,
}

const SNAKE_INFO = {
  name: 'snake',
  width: 1,
  height: 1,
  depth: 1,
}

const LIGHT_COLOR = new Color('white')

export function startGame(container: HTMLElement): void {
  const { clientWidth, clientHeight } = container

  // Initialize the base components for the game.
  const scene = new Scene()
  const camera = getCamera(clientWidth, clientHeight)
  const renderer = getRenderer(clientWidth, clientHeight)
  container.append(renderer.domElement)

  // Add an OrbitControls to enable camera movements by dragging.
  const orbitor = new OrbitControls(camera, container)

  // Initialize the entities of the game.
  const worldEntity = getWorld()
  const snakeEntity = getSnake()
  const lightEntities = getLights(snakeEntity)
  const entities = flattenDeep<Object3D>([worldEntity, snakeEntity, lightEntities])
  scene.add(...entities)

  // Start the game. The callback will run on every available frame.
  renderer.setAnimationLoop(() => {
    startAnimation(scene)
    orbitor.update()
    renderer.render(scene, camera)
  })
}

const snakeMover = _.throttle((snake: Object3D) => {
  snake.position.x = Math.random() * WORLD_INFO.width - WORLD_INFO.width / 2
  snake.position.z = Math.random() * WORLD_INFO.depth - WORLD_INFO.depth / 2
}, 3000)

function startAnimation(scene: Scene): void {
  const snake = scene.getObjectByName(SNAKE_INFO.name)
  if (!snake) {
    throw new Error('Missing snake')
  }
  snakeMover(snake)
}

function getCamera(width: number, height: number): Camera {
  const fov = 75
  const aspectRatio = width / height
  const near = 0.1
  const far = 1000

  const camera = new PerspectiveCamera(fov, aspectRatio, near, far)
  camera.position.z = WORLD_INFO.depth / 2
  return camera
}

function getRenderer(width: number, height: number): WebGLRenderer {
  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  return renderer
}

function getSnake(): Mesh {
  const snakeGeometry = new BoxGeometry(SNAKE_INFO.width, SNAKE_INFO.height, SNAKE_INFO.depth)
  const snakeMaterial = new MeshStandardMaterial()
  const snake = new Mesh(snakeGeometry, snakeMaterial)

  // Ensure that the snake is on the floor of the world.
  snake.position.y = -WORLD_INFO.height / 2 + SNAKE_INFO.height / 2
  snake.name = SNAKE_INFO.name
  return snake
}

function getWorld(): Mesh {
  const worldGeometry = new BoxGeometry(WORLD_INFO.width, WORLD_INFO.height, WORLD_INFO.depth)

  const ceilingMaterial = new MeshStandardMaterial({ color: new Color('white') })
  const wallMaterial = new MeshStandardMaterial({ color: new Color('salmon') })
  const floorMaterial = new MeshStandardMaterial()

  const worldLeftMaterial = wallMaterial
  const worldRightMaterial = wallMaterial
  const worldInnerMaterial = wallMaterial
  const worldOuterMaterial = wallMaterial
  const worldTopMaterial = ceilingMaterial
  const worldBottomMaterial = floorMaterial
  const worldMaterials = [
    worldRightMaterial,
    worldLeftMaterial,
    worldTopMaterial,
    worldBottomMaterial,
    worldOuterMaterial,
    worldInnerMaterial,
  ]

  worldMaterials.forEach((material) => {
    // Only render the inner faces of the cube.
    material.side = BackSide
  })

  const world = new Mesh(worldGeometry, worldMaterials)
  world.name = WORLD_INFO.name
  return world
}

function getLights(snake: Object3D): Light[] {
  const ceilingLights = getCeilingLights()
  const directionalLight = new DirectionalLight(LIGHT_COLOR, 0.3)
  directionalLight.position.set(0, 1, 1)
  directionalLight.castShadow = true
  directionalLight.target = snake
  return ceilingLights.concat([directionalLight])
}

function getCeilingLights(): Light[] {
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

type Coordinates = { x: number; y: number; z: number }

function getCeilingLightPositions(numLightsOnWidth: number, numLightsOnDepth: number): Coordinates[] {
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

  const positions: Coordinates[] = []
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
