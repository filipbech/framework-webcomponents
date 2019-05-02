import Vue from 'vue'
import wrap from '@vue/web-component-wrapper';
import CustomButton from './components/CustomButton.vue';

const CustomElement = wrap(Vue, CustomButton);
window.customElements.define('custom-button', CustomElement);

Vue.config.productionTip = false