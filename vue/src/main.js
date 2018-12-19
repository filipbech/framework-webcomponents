import Vue from 'vue'
import App from './App.vue'
import wrap from '@vue/web-component-wrapper';
import HelloWorld from './components/HelloWorld.vue';

const CustomElement = wrap(Vue, HelloWorld);

window.customElements.define('my-vue-wc', CustomElement);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
