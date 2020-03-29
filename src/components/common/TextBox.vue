<template>
  <div class="text" @active="onActive()" v-if="!textActive">
    {{text}}
  </div>
  <!-- <textarea ref="area" v-model="text" class="textarea" @blur="onBlur" v-else>
  </textarea> -->
  <el-input ref="area" v-model="text" placeholder="请输入内容" class="textarea" @blur="onBlur" v-else></el-input>
</template>

<script>
  export default {
    data() {
      return {
        text: 'Double click me to edit',
        textActive: false
      }
    },
    mounted() {
      this.$on('active', this.onActive)
    },
    methods: {
      onActive() {
        console.log(111111);
        this.textActive = true
        this.$nextTick(() => {
          this.$refs.area.focus()
          this.text = 'Now you can edit me. Click outside when finished.'
        })

      },
      onBlur () {
        console.log(2222)
        this.textActive = false
        this.$parent.$emit('content-inactive')
        this.$emit('inputVal', this.text)
      }
    }
  }
</script>

<style>
  .text {
    width: 100%;
    height: 100%;
    border: 1px solid lightgrey;
  }

  .textarea {
    width: 100%;
    height: 100%;
  }
</style>
