<template>
  <div id="app">
    <my-element 
      :audienceProp.prop="audience"
      :framework-attr="framework"
      @customEvent="handleEvent($event)"
      ></my-element>
  </div>
</template>

<script>
import './my-element.js';

export default {
  name: 'app',
  data() {
    return {
      audience: { audience: 'world' },
      framework: 'Vue'
    }
  },
  methods: {
    handleEvent(evt) {
      alert('Hello' + evt.detail);
    }
  }
}
</script>
