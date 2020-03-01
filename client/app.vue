<template>
  <div id="app">
    <div id="cover" />
    <Header />
    <p>{{fullName}} {{counter}}</p>
    <!-- <p>{{textC}} {{textPlus}}</p> -->
    <router-link to="/app/123">app123</router-link>
    <router-link to="/app/456">app456</router-link>
    <router-link to="/login">login</router-link>
    <!-- <Todo /> -->
    <transition name="fade">
      <router-view />
    </transition>
    <Footer />
    <!-- <router-view name="a" /> -->
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

console.log(Header.__docs)

export default {
  metaInfo: {
    title: 'Jiaan\'s Todo App'
  },
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {
    console.log(this.$store, this['a/textPlus'])
    this.updateCountAsync({
      num: 5,
      time: 2000
    })
    // this.$store.state.count = 5
    // let i = 1
    // setInterval(() => {
    //   this.updateCount(i++)
    //   // this.$store.commit('updateCount', i++)
    // }, 1000)
    // this['a/updateText']('123')
    // this['a/add']()
    // this.testAction()
  },
  computed: {
    // textA () {
    //   return this.$store.state.a.text
    // },
    // ...mapState(['count']),
    ...mapState({
      counter: (state) => state.count
      // textA: state => state.a.text,
      // textC: state => state.c.text
    }),
    // count () {
    //   return this.$store.state.count
    // },
    // ...mapGetters(['fullName', 'a/textPlus'])
    ...mapGetters({
      fullName: 'fullName'
      // textPlus: 'a/textPlus'
    })
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateCount'])
    // ...mapActions(['updateCountAsync', 'a/add', 'testAction']),
    // ...mapMutations(['updateCount', 'a/updateText'])
  }
}
</script>

<style lang="stylus" scoped>
 #app{
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
  }
  #cover {
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    background-color: #999
    opacity: .5
    z-index: -1
  }
</style>
