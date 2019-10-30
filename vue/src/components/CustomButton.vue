/* eslint-disable */
<template>
  <div>
    <h1>Inside header</h1>
    <button @click="handleClick()">
      <slot>{{label}}</slot>: {{clicksCt}}
    </button>
  </div>
</template>
<style> 
  h1 {
    color:blue;
  }
</style>
<script>
  export default {
    props: { label: { default: 'default label' } },
    data: () => ({
      clicksCt: 0
    }),
    methods: {
      handleClick() {
        this.clicksCt++;
        this.$emit('action', this.clicksCt);
      }
    }
  }
</script>