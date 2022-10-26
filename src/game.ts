import _, { flattenDeep } from 'lodash'
import THREE, {
  BackSide,
  BoxGeometry,
  Camera,
  Color,
  DirectionalLight,
  Group,
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

let currentScore = 0

export function startGame(container: HTMLElement): void {
  const { clientWidth, clientHeight } = container

  // Initialize the base components for the game.
  const scene = new Scene()
  const camera = getCamera(clientWidth, clientHeight)
  const renderer = getRenderer(clientWidth, clientHeight)
  container.append(renderer.domElement)

  // Add an OrbitControls to enable camera movements by dragging.
  // const orbitor = new OrbitControls(camera, container)

  // Initialize the entities of the game.
  const worldEntity = getWorldEntity()
  const snakeEntities = getSnakeEntity()
  const lightEntities = getLights()
  const entities = flattenDeep<Object3D>([worldEntity, snakeEntities, lightEntities])
  scene.add(...entities)

  // Start the game. The callback will run on every available frame.
  renderer.setAnimationLoop(() => {
    startAnimation(scene)
    // orbitor.update()
    renderer.render(scene, camera)
  })
}

const snakeMover = _.throttle((snake: Object3D) => {
  snake.position.x = Math.random() * WORLD_INFO.width - WORLD_INFO.width / 2
  snake.position.z = Math.random() * WORLD_INFO.depth - WORLD_INFO.depth / 2
}, 3000)

const snakeExtender = _.throttle((scene: Scene) => {
  const snakeEntity = scene.getObjectByName('snake')
  if (!snakeEntity) return

  currentScore++
  const newSegment = getSnakeSegmentEntity(currentScore)
  const prevSegment = snakeEntity.getObjectByName(`snake-${currentScore - 1}`)
  if (prevSegment) {
    newSegment.position.z = prevSegment.position.z + 1
  }
  snakeEntity.add(newSegment)
}, 1000)

function startAnimation(scene: Scene): void {
  // const snake = scene.getObjectByName(SNAKE_INFO.name)
  // if (snake == null) {
  //   throw new Error('Missing snake')
  // }
  // snakeMover(snake)
  snakeExtender(scene)
}

function getRenderer(width: number, height: number): WebGLRenderer {
  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  return renderer
}

function getCamera(width: number, height: number): Camera {
  const fov = 75
  const aspectRatio = width / height

  // Objects that are outside of 'near' and 'far' distances will not be rendered.
  // TODO: Update this for performance gains.
  const near = 0.1
  const far = 1000

  const camera = new PerspectiveCamera(fov, aspectRatio, near, far)
  // camera.position.y = -WORLD_INFO.height / 2
  camera.position.z = WORLD_INFO.depth / 2
  camera.lookAt(0, -WORLD_INFO.height / 2, 0) // Temp edit to lock the camera at the snake.
  return camera
}

function getSnakeEntity(): Object3D {
  const numSegments = currentScore + 1
  const snakeEntity = new Group()
  for (let i = 0; i < numSegments; i++) {
    const segment = getSnakeSegmentEntity(i)
    if (i > 0) {
      const prevSegment = snakeEntity.getObjectByName(`snake-${i - 1}`)
      if (prevSegment) {
        segment.position.z = prevSegment.position.z + 1
      }
    }
    snakeEntity.add(segment)
  }
  snakeEntity.name = 'snake'
  return snakeEntity
}

function getSnakeSegmentEntity(id: number): Mesh {
  const width = 1
  const height = 1
  const depth = 1
  const geometry = new BoxGeometry(width, height, depth)
  const material = new MeshStandardMaterial({ color: new Color('aqua') })
  const entity = new Mesh(geometry, material)

  // Ensure that the snake is on the floor of the world.
  entity.position.y = -WORLD_INFO.height / 2 + SNAKE_INFO.height / 2
  entity.name = `snake-${id}`
  return entity
}

function getWorldEntity(): Mesh {
  const geometry = new BoxGeometry(WORLD_INFO.width, WORLD_INFO.height, WORLD_INFO.depth)

  const ceilingMaterial = new MeshStandardMaterial({ color: new Color('white') })
  const wallMaterial = new MeshStandardMaterial({ color: new Color('salmon') })
  const floorMaterial = new MeshStandardMaterial()

  const worldLeftMaterial = wallMaterial
  const worldRightMaterial = wallMaterial
  const worldInnerMaterial = wallMaterial
  const worldOuterMaterial = wallMaterial
  const worldTopMaterial = ceilingMaterial
  const worldBottomMaterial = floorMaterial
  const materials = [
    worldRightMaterial,
    worldLeftMaterial,
    worldTopMaterial,
    worldBottomMaterial,
    worldOuterMaterial,
    worldInnerMaterial,
  ]

  materials.forEach((material) => {
    // Only render the inner faces of the cube.
    material.side = BackSide
  })

  const world = new Mesh(geometry, materials)
  world.name = WORLD_INFO.name
  return world
}

function getLights(): Light[] {
  const ceilingLights = getCeilingLights()
  return ceilingLights
  // const directionalLight = new DirectionalLight(LIGHT_COLOR, 0.3)
  // directionalLight.position.set(0, 1, 1)
  // directionalLight.castShadow = true
  // directionalLight.target = snake
  // return ceilingLights.concat([directionalLight])
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
