<template>
  <div class="preview" @click="onClick" @keydown="onKeydown">
    <div class="preview-img" >
      <img :src="src" alt />
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      src: {
        type: String,
        default: "",
        required: true
      },
      onClick: { type: Function, default: () => {}, required: true },
      onKeydown: { type: Function, default: () => {}, required: true }
    }
  };
</script>
<style lang="less" scoped>
  .preview {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    overflow: scroll;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .preview-img {
    padding: 20px;
    display: inline-block;
    margin: auto;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
