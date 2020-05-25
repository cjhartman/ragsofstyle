<template>
  <div id="app">
    <HeaderNav></HeaderNav>
    <div id="content">
      <router-view></router-view>
    </div>
    <FooterNav></FooterNav>
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav'
import FooterNav from './components/FooterNav'
export default {
  name: 'App',
  components: {
    'HeaderNav': HeaderNav,
    'FooterNav': FooterNav
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;

  #content {
    min-height: 67vh;
  }
}
</style>
