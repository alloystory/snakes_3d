import { WebGLRenderer } from 'three'

export default function Renderer(width: number, height: number) {
  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  return renderer
}
