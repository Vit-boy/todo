import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text" />
      <span @click="handleChange2">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  mounted () {
    console.log('comp mounted')
  },
  methods: {
    handleChange2 () {
      this.$emit('change')
    }
  }
}

const parent = new Vue({
  name: 'parent'
})

const component2 = {
  parent: parent,
  extends: component,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    this.$parent.text = '123456'
    console.log(this.$parent.$options.name)
  }
}

// const CompVue = Vue.extend(component)

// new CompVue({
//   el: '#root',
//   propsData: {
//     propOne: 'xxx'
//   },
//   data: {
//     text: '123'
//   },
//   mounted () {
//     console.log('instance mounted')
//   }
// })

new Vue({
  parent: parent,
  name: 'Root',
  el: '#root',
  components: {
    Comp: component2
  },
  data: {
    text: 2333
  },
  template: `
    <div>
      <span>{{text}}</span>
      <comp></comp>
    </div>
  `,
  mounted () {
    this.$parent.text = '123456'
    console.log(this.$parent.$options.name)
  }
})
