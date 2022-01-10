<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/sanddance">SandDance</router-link> |
    <router-link to="/particlesglobe">ParticlesGlobe</router-link> |
    <router-link to="/imageDanmaku">imageDanmaku</router-link>
  </div>
  <router-view />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #333;
  color: #fff;
}

#nav {
  padding: 30px;
  position: fixed;
  z-index: 1;

  a {
    font-weight: bold;
    color: #fff;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
