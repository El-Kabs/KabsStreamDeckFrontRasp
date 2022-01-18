<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style>
html{
  background-color: #012340;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 800px;
  height: 480px;
  overflow-x: hidden;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.vs-dialog{
  background-color: #011826!important;
}

.vs-input-content{
  width: 275px;
}

.vs-input {
  width: 100% !important;
}

.vs-select-content{
  width: 275px!important;
  max-width: 275px!important;
}

.vs-option{
  width: 100% !important;
}
</style>
