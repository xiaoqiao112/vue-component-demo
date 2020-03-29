var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  strokeStyleSelect = document.getElementById('strokeStyleSelect'),    //画图的描边颜色
  fillStyleSelect = document.getElementById('fillStyleSelect'),       //画图填充颜色
  drawRadio = document.getElementById('drawRadio'),                   //画图按钮
  eraserRadio = document.getElementById('eraserRadio'),              //橡皮擦按钮  
  eraserShapeSelect = document.getElementById('eraserShapeSelect'),  //橡皮擦形状
  eraserWidthSelect = document.getElementById('eraserWidthSelect'), //橡皮擦宽度
  ERASER_LINE_WIDTH = 1,
  drawingSurfaceImageData,
  lastX,
  lastY,
  mousedown = {},
  rubberbandRect = {},
  dragging = false

function windowToCanvas(x, y) {  //这个函数的作用是捕捉鼠标点在canvas上的坐标
  var bbox = canvas.getBoundingClientRect()
  return {
    x: x - bbox.left,
    y: y - bbox.top
  }

}
function saveDrawingSurface() {   //这个函数的作用是初始化读取画布信息并储存起来
  drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height)
}
function restoreDrawingSurface() {  //这个函数的作用是读取画布信息
  context.putImageData(drawingSurfaceImageData, 0, 0)
}

function drawGrid() {  //这个函数的作用是填充进橡皮擦的剪辑区域
  context.save()
  context.fillStyle = "#fff"
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.restore()
}
function drawrubber(x, y) {
  context.beginPath()
  context.arc(x, y, eraserWidthSelect.value, 0, Math.PI * 2, false)
  context.clip()
}
function drawCri(x, y) {
  var x_width = Math.abs(x - mousedown.x)
  var y_width = Math.abs(y - mousedown.y)
  var radius = Math.sqrt(x_width * x_width + y_width * y_width)

  context.save()
  context.beginPath()
  context.fillStyle = fillStyleSelect.value;
  context.arc(mousedown.x, mousedown.y, radius, 0, Math.PI * 2, false)
  context.fill()
  context.restore()


}


canvas.onmousedown = function (e) {

  var loc = windowToCanvas(e.clientX, e.clientY)


  mousedown.x = loc.x
  mousedown.y = loc.y

  lastX = loc.x
  lastY = loc.y
  saveDrawingSurface()
  dragging = true
}
canvas.onmousemove = function (e) {


  if (dragging) {
    var loc = windowToCanvas(e.clientX, e.clientY)
    if (drawRadio.checked) { //如果是画图状态
      // 
      restoreDrawingSurface()
      drawCri(loc.x, loc.y)

    } else { //如果是橡皮擦状态
      context.save()
      drawrubber(loc.x, loc.y)
      drawGrid()
      context.restore()


    }


  }



}
canvas.onmouseup = function (e) {
  dragging = false;
  var loc = windowToCanvas(e.clientX, e.clientY)

  if (drawRadio.checked) {
    lastX = loc.x;
    lastY = loc.y;
    restoreDrawingSurface()
    drawCri(lastX, lastY)


  } else {
    context.save()
    drawrubber(loc.x, loc.y)
    drawGrid()
    context.restore()
  }


}