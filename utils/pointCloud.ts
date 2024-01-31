let width: number, height: number
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

export function handleResize() {
  const oldWidth = width
  const oldHeight = height

  // update canvas dimensions
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height

  // update max point positions
  Point.maxX = width
  Point.maxY = height
  // scale point dimensions according to change
  const widthScalar = width / oldWidth
  const heightScalar = height / oldHeight
  Point.all.forEach((point) => {
    point.scalePosition(widthScalar, heightScalar)
  })

  updateDrawVars()
  renderFrame()
}

export function initCanvas(_canvas: HTMLCanvasElement) {
  width = window.innerWidth
  height = window.innerHeight

  canvas = _canvas
  canvas.width = width
  canvas.height = height
  ctx = canvas.getContext('2d')!
  initPoints()
  initDrawVars(ctx)
}

function initPoints(numPoints: number = 50, maxSpeed: number = 0.5) {
  Point.all = []
  Point.maxX = width
  Point.maxY = height
  Point.maxSpeed = maxSpeed

  Array.from({ length: numPoints }).forEach(() => new Point())
}

export function renderFrame() {
  ctx.clearRect(0, 0, width, height)

  Point.all.forEach(point => point.step())
  Point.all.forEach(point => point.render())
}
