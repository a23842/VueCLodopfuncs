<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  .size{
    width: 100%;
    height: 100%;
  }
  html,body{
  .size;
    margin: 0;
    padding: 0;
  }
  .avatar{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    vertical-align: middle;
    margin-right: 4px;
  }
  #app {
  .size;
  }
</style>
