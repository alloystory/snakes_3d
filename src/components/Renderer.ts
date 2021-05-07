import { WebGLRenderer } from 'three'

function create(width: number, height: number) {
  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  return renderer
}

export default { create }
