<template>
  <form class="login-form">
    <h1>
      <span>Login</span>
      <span class="error-msg">{{errorMsg}}</span>
    </h1>
  </form>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      errorMsg: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-form
  display flex
  flex-direction column
  align-items flex-start
  width 350px
  margin 0 auto
  padding 20px
  background-color #fff
  h1
    font-weight 100
    color #3d3d3d
.error-msg
  font-size 12px
  color red
</style>
