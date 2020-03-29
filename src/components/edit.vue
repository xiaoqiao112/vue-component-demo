/* eslint-disable camelcase */
<template>
  <div class="container">
    <div class="box">
      <div>1.vue-drag-resize-rotate图片拖拽、缩放、旋转</div>
      <div clss="drag-resize-rotate" style="width:600px;height:400px;background:pink;position:relative;margin: 0 auto;">
        <drr
        :x="300"
        :y="200"
        :w="400"
        :h="267"
        :aspectRatio="true">
          <img src="./../assets/img/8s.jpg" class="image"/>
        </drr>
      </div>
    </div>
    <div class="box">
      <div>2.vue-drag-resize-rotate文字双击编辑，可执行拖拽、缩放、旋转</div>
      <div class="drag-one">
          <drr
            :x="150"
            :y="100"
            :w="200"
            :h="96"
            :hasActiveContent="true">
            <TextBox @inputVal="inputValEvent"/>
          </drr>
      </div>
    </div>
  </div>
</template>

<script>
import TextBox from './common/TextBox'
import drr from './common/drr'
export default {
  name: "edit",
  data() {
    return {
      
    };
  },
  components: {
    TextBox,
    drr
  },
  methods: {
    inputValEvent (val) {
      console.log(val, '获取input输入值')
    }
  }
}
</script>
<style lang="less">
  .drag-one{
    width:300px;
    height:200px;
    background: pink;
    margin:auto;
    position: relative;
  }
  .drr{
    position: absolute;
  }
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  input {
    border: none!important;
    outline: none!important;
    height:100%!important;
    background: deepskyblue!important;
    cursor: move;
  }
</style>
