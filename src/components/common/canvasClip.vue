<template>
  <div class="rc-cropper-canvas">
    <el-col :span="12">
      <canvas :id="data.img_url"></canvas>
      <el-button type="danger" size="small" @click="cropImg()" class="rc-crop__iconCropCanvas">裁剪</el-button>
    </el-col>
  </div>
</template>
<script>
export default {
  name: 'cropper-canvas',
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  mounted () {
    this.drawImg()
  },
  methods: {
    drawImg () {
      this.$nextTick(() => {
        console.log('canvas画布上绘制图片, drawImg====');
        let canvas = document.getElementById(this.data.img_url)
        if (canvas) {
          // 画布大小宽高460px
          canvas.width = 460
          canvas.height = 460
          let ctx = canvas.getContext('2d')
          ctx.clearRect(0, 0, canvas.width, canvas.height) // 在给定矩形内清空一个矩形
          let img = new Image()
          img.crossOrigin = 'Anonymous'
          img.src = this.data.img_url
          img.onload = function () {
            // drawImage在画布上绘制图像
            // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
            // sx开始剪切的 x坐标位置
            // swidth被剪切图像的宽度
            // x 在画布上放置图像的 x坐标位置
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          }
        }
      })
    },
    cropImg () {
      console.log('点击裁剪按钮cropImg------');
      let canvas = document.getElementById(this.data.img_url)
      let ctx = canvas.getContext('2d') // 返回一个用于在画布上绘图的环境
      let img = new Image()
      img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
      img.src = this.data.img_url
      let drag = false // 是否拖动矩形
      let flag = false // 是否绘制矩形
      let rectWidth = 0 // 绘制矩形的宽
      let rectHeight = 0 // 绘制矩形的高
      let clickX = 0 // 矩形开始绘制X坐标
      let clickY = 0 // 矩形开始绘制Y坐标
      let dragX = 0 // 当要拖动矩形点击时X坐标
      let dragY = 0 // 当要拖动矩形点击时Y坐标
      let newRectX = 0 // 拖动变化后矩形开始绘制的X坐标
      let newRectY = 0 // 拖动变化后矩形开始绘制的Y坐标
      // 鼠标按下
      canvas.onmousedown = e => {
        console.log('鼠标开始绘制矩形框时，onmousedown======');
        ctx.beginPath() // 方法开始一条路径，或重置当前的路径
        ctx.setLineDash([6, 6]) // 在填充线时使用虚线模式。 它使用一组值来指定描述模式的线和间隙的交替长度
        ctx.moveTo(newRectX, newRectY) // context.moveTo(x,y);路径的目标位置的 x 坐标
        // 绘制矩形
        ctx.lineTo(newRectX + rectWidth, newRectY) //lineTo() 方法添加一个新点，然后创建从该点到画布中最后指定点的线条（该方法并不会创建线条）
        ctx.lineTo(newRectX + rectWidth, newRectY + rectHeight)
        ctx.lineTo(newRectX, newRectY + rectHeight)
        ctx.lineTo(newRectX, newRectY)

        ctx.strokeStyle = 'green' // 设置或返回用于笔触的颜色、渐变或模式
        ctx.stroke() // 会实际地绘制出通过moveTo()和lineTo()方法定义的路径。默认颜色是黑色

        // isPointInPath() 方法返回true，如果指定的点位于当前路径中；否则返回 false
        if (ctx.isPointInPath(e.offsetX, e.offsetY)) { // 拖动操作，判断当前点是否在矩形中
          drag = true
          dragX = e.offsetX
          dragY = e.offsetY
          clickX = newRectX
          clickY = newRectY
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          flag = true
          clickX = e.offsetX
          clickY = e.offsetY
          newRectX = e.offsetX
          newRectY = e.offsetY
        }
      }
      // 鼠标抬起
      canvas.onmouseup = () => {
        console.log('绘制矩形操作之后onmouseup=====');
        if (flag) {
          flag = false
          this.sureCrop(clickX, clickY, rectWidth, rectHeight)
        }
        if (drag) {
          drag = false
          this.sureCrop(newRectX, newRectY, rectWidth, rectHeight)
        }
      }
      // 鼠标移动
      canvas.onmousemove = (e) => {
        console.log('onmousemove======');
        if (flag) { // 是否绘制矩形
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          // 获取绘制矩形的宽高
          rectWidth = e.offsetX - clickX
          rectHeight = e.offsetY - clickY

          ctx.beginPath()
          ctx.strokeStyle = '#FF0000'
          ctx.strokeRect(clickX, clickY, rectWidth, rectHeight) // 绘制矩形（无填充），笔触的默认颜色是黑色
          ctx.closePath()
        }
        if (drag) { // 是否拖动矩形
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          ctx.beginPath()
          newRectX = clickX + e.offsetX - dragX
          newRectY = clickY + e.offsetY - dragY
          ctx.strokeStyle = 'yellow'
          ctx.strokeRect(newRectX, newRectY, rectWidth, rectHeight)
          ctx.closePath() // 创建从当前点到开始点的路径
        }
      }
    },
    sureCrop (x, y, width, height) {
      console.log('sureCrop-----');
      console.log(x,y,width, height, '获取元素位置即框的宽高');
    }
  }
}
</script>
<style>
.rc-cropper-canvas {
  position: relative;
}

img {
  width: 100%;
  height: 100%;
}

.rc-crop__iconCropCanvas {
  position: absolute;
  left: 44%;
  top: 4%;
}

.el-button {
  margin: 20px 0;
  display: block;
  z-index: 10000;
}
</style>
