/* eslint-disable */
<template>
  <div>
    <h1>My Vue Web Component</h1>
    <div>{{ msg }}</div>
    <slot></slot>

  </div>
</template>
<style>
  h1 {
    color:blue;
  }
</style>
<script>
  export default {
    props: ['msg'],
    created() {
      setTimeout(() => {
        this.$emit('myEvent', {something:true});
      }, 5000);
    }
  }
</script>