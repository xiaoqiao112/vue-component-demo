// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueTouch from 'vue-touch'
import VueDragResize from 'vue-drag-resize'
import vcolorpicker from 'vcolorpicker'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer);

Vue.use(vcolorpicker)
Vue.use(VueTouch, { name: 'v-touch' })
Vue.component('vue-drag-resize', VueDragResize)
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.directive('drag', {
  //1.指令绑定到元素上回立刻执行bind函数，只执行一次
  //2.每个函数中第一个参数永远是el，表示绑定指令的元素，el参数是原生js对象
  //3.通过el.focus()是无法获取焦点的，因为只有插入DOM后才生效

  bind: function (el) { },
  //inserted表示一个元素，插入到DOM中会执行inserted函数，只触发一次

  inserted: function (el) {
    let dragBox = el; //获取当前元素
    dragBox.style.position = 'absolute';
    dragBox.onmousedown = e => {
      //算出鼠标相对元素的位置
      let disX = e.clientX - dragBox.offsetLeft;
      let disY = e.clientY - dragBox.offsetTop;
      document.onmousemove = e => {
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        //移动当前元素
        dragBox.style.left = left + 'px';
        dragBox.style.top = top + 'px';
      };
      document.onmouseup = e => {
        //鼠标弹起来的时候不再移动
        document.onmousemove = null;
        //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
        document.onmouseup = null;
      };
    };
  },

  //当VNode更新的时候会执行updated，可以触发多次
  updated: function (el) { }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
