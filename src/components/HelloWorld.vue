<template>
  <div class="hello">
    <div class="box">
      <div class="type-title">vue实现拖拽功能</div>
      <div>1.vue自定义指令实现拖拽</div>
      <div class="dragAndDrop" style="width:250px;height:250px;background:pink;margin:0 auto 20px;">
        <div class="pull" v-drag>拖拽我</div>
      </div>
      <div>2.vue第三方组件(vue-drag-resize)实现拖拽元素</div>
      <div style="width:400px;height:400px;background:pink;margin:0 auto;position:relative">
        <vue-drag-resize
          :x="50"
          :y="50"
          :isActive="true"
          :isResizable="false"
          style="position:absolute;width:0px;height:0;"
        >
          <div class="com">
            <div>拖拽元素</div>
          </div>
        </vue-drag-resize>
      </div>
    </div>
    <div class="box">
      <div class="type-title">canvas实现图片旋转</div>
      <div class="rotate-img">
        <button @click="rotateImg('testImg', 'left')" style="margin-bottom:10px;">向左旋转</button>
        <button @click="rotateImg('testImg', 'right')" style="margin-bottom:10px;">向右旋转</button>
        <br />
        <img src="./../assets/img/car.png" id="testImg" />
      </div>
    </div>
    <div class="box">
      <div class="type-title">文字拖拽、放大缩小</div>
      <div class="tuo-zhuai">
        <vue-drag-resize
          :isActive="true"
          :w="200"
          :h="40"
          :x="50"
          :y="100"
          v-on:resizing="resize"
          v-on:dragging="resize"
          class="drag-box-one"
        >
          <el-input v-model="input" placeholder="请输入内容" :style="contentStyleObj"></el-input>
          <!-- <div style="background:red;" :style="contentStyleObj">哈哈</div> -->
        </vue-drag-resize>
      </div>
    </div>
    <div class="box">
      <div class="type-title">vue-drag-resize-rotate插件实现拖拽、旋转、缩放</div>
      <div @click="goToFontEvent" style="cursor:pointer">1.图片拖拽、缩放、旋转</div>
      <div @click="goToFontEvent" style="cursor:pointer">2.文字双击编辑，可执行拖拽、缩放、旋转</div>
    </div>
    <div class="box">
      <div class="type-title">基于 Vue 的颜色选择器插件vColorPicker</div>
      <colorPicker v-model="color" v-on:change="headleChangeColor"></colorPicker>
    </div>
    <div class="box">
      <div class="type-title">点击图片放大</div>
      <img
        v-image-preview
        src="http://img3.imgtn.bdimg.com/it/u=196236122,768477067&fm=26&gp=0.jpg"
      />

      <div>
        <img
          src="http://img3.imgtn.bdimg.com/it/u=196236122,768477067&fm=26&gp=0.jpg"
          height="200"
          @click="previewImage('http://img3.imgtn.bdimg.com/it/u=196236122,768477067&fm=26&gp=0.jpg')"
        />
      </div>
      <div v-if="preview">
        <imgPreview :src="src" :onClick="closeImgPreview" :onKeydown="keydownCloseImgPreview"></imgPreview>
      </div>
    </div>

    <div
      class="box"
      style="height:560px; display:flex;flex-direction:column;align-items:center;justify-content:center;"
    >
      <div class="type-title">canvas实现图片裁剪</div>
      <canvasClip :data="slideCanvas"></canvasClip>
    </div>

    <div
      class="box"
      style="height:600px; display:flex;flex-direction:column;align-items:center;justify-content:center;"
    >
      <div class="type-title">图片叠加，上面图片设置透明度，放在原图上面</div>
      <div class="img-content">
        <img src="../../src/assets/img/WechatIMG329.png" alt style="opacity: 0.4" />
      </div>
    </div>

    <div class="box" style="margin-top:50px;">
      <div class="type-title">两张图片叠加</div>
      <div class="bg-bottom">
        <!-- <img src="./../assets/image/line@2x.png" alt /> -->
        <div class="img-box">
          <img src="./../assets/img/car.png" alt />
          <img src="./../assets/img/car.png" alt />
          <img src="./../assets/img/car.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextBox from './common/TextBox'
import catu from './common/catu'
import imgPreview from './common/imgEnlarge'
import canvasClip from './common/canvasClip'
export default {
  name: 'HelloWorld',
  data() {
    return {
      input: '',
      contentStyleObj: {
        height: 40 + 'px',
        width: 200 + 'px'
      },
      color: '#ff0000',
      preview: false,
      src: '',
      slideCanvas: {
        img_url:
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1763702671,2268528495&fm=26&gp=0.jpg'
      }
    }
  },
  components: {
    TextBox,
    catu,
    imgPreview,
    canvasClip
  },
  methods: {
    previewImage(src) {
      this.preview = true
      this.src = src
    },
    keydownCloseImgPreview(e) {
      if (e && e.keyCode == 27) {
        this.preview = false
      }
    },
    closeImgPreview() {
      this.preview = false
    },
    // canvas实现图片裁剪
    goToFontEvent() {
      this.$router.push({
        path: '/edit'
      })
    },
    resize(newRect) {
      this.contentStyleObj.height = newRect.height + 'px'
      this.contentStyleObj.width = newRect.width + 'px'
    },
    headleChangeColor(color) {
      console.log(color, '当前选中颜色')
    },
    // 将base64转换为文件
    dataURLtoFile(dataurl, filename) {
      // eslint-disable-next-line one-var
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
    rotateImg(pid, direction) {
      // 最小与最大旋转方向，图片旋转4次后回到原方向
      // eslint-disable-next-line camelcase
      let min_step = 0
      // eslint-disable-next-line camelcase
      let max_step = 3
      let img = document.getElementById(pid)
      let base64, urlFile
      if (img == null) return
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = img.getAttribute('step')
      console.log(step, '获取step')
      if (step == null) {
        // eslint-disable-next-line camelcase
        step = min_step
      }
      if (direction === 'right') {
        step++
        // 旋转到原位置，即超过最大值
        // eslint-disable-next-line camelcase
        step > max_step && (step = min_step)
      } else {
        step--
        // eslint-disable-next-line camelcase
        step < min_step && (step = max_step)
      }
      img.setAttribute('step', step)
      let canvas = document.getElementById('pic_' + pid)
      if (canvas == null) {
        img.style.display = 'none'
        canvas = document.createElement('canvas')
        canvas.setAttribute('id', 'pic_' + pid)
        img.parentNode.appendChild(canvas)
      }
      // 旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
      base64 = canvas.toDataURL('image/jpeg', 0.92)
      urlFile = this.dataURLtoFile(base64)
      console.log(base64, '获取旋转之后的base64')
      console.log(urlFile, '获取旋转之后的file文件流')
      return base64
    }
  }
}
</script>
<style lang="less">
.hello {
  position: relative;
}
.box {
  margin-bottom: 10px;
}
.type-title {
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
}
.pull {
  cursor: move;
  width: 200px;
  height: 200px;
  background: burlywood;
  display: flex;
  justify-content: center;
  align-items: center;
}
.com {
  width: 300px;
  height: 300px;
  cursor: move;
  background: #00b7ee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* 暂时注释掉，影响擦图样式 */
/* input {
  border: none !important;
  outline: none !important;
  height: 100% !important;
  background: deepskyblue !important;
  cursor: move;
} */
.tuo-zhuai {
  width: 300px;
  height: 300px;
  background: pink;
  cursor: move;
  position: relative;
  margin: 0 auto;
}
.drag-box-one {
  position: absolute;
}
.rubbers {
  display: flex;
  color: #2e344a;
  font-size: 14px;
  margin-top: 40px;
}
.rubbers div {
  flex: 1;
}
.rubbers .second {
  flex: 5;
}
.rubbers .second input {
  /*滑动条的样式 */
  width: 100%;
  -webkit-appearance: none;
  height: 3px;
  border-radius: 5px;
  vertical-align: super;
  background-color: #2e344a;
}
.rubbers .second input::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 25px;
  width: 25px;
  background-color: #eb4985;
  border-radius: 50%;
}
.rubbers last {
  text-align: right;
}
.img-content {
  height: 600px;
  background: url('https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1763702671,2268528495&fm=26&gp=0.jpg')
    no-repeat;
  background-size: 100% 100%;
  text-align: center;
  background-position: center;
}
.bg-bottom {
  height: 496px;
  width: 1239px;
  background: url('./../assets/image/bg@2x.png') no-repeat;
  background-size: auto;
  background-position: center;
  text-align: center;
  position: relative;
  img {
    z-index: 1000;
  }
  .img-box {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    width: 100%;
    img {
      width: 413px;
      height: auto;
    }
  }
}
</style>
