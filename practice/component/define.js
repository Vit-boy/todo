import Vue from 'vue'

const component = {
  props: {
    active: {
      type: Boolean,
      // required: true,
      default: false
    },
    propOne: String,
    onChange: Function
  },
  template: `
    <div>
      <input type="text" v-model="text" />
      <span @click="handleChange1">{{propOne}}</span>
      <span @click="handleChange2">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  methods: {
    handleChange1 () {
      this.onChange()
    },
    handleChange2 () {
      this.$emit('change')
    }
  }
}

// Vue.component('CompOne', component)

new Vue({
  components: {
    CompOne: component
  },
  data: {
    prop1: 'text1'
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  },
  mounted () {
    console.log(this.$refs.comp1)
  },
  el: '#root',
  template: `
    <div>
      <comp-one ref="comp1" :active="true" :prop-one="prop1" @change="handleChange" :on-change="handleChange"></comp-one>
      <comp-one :active="false" propOne="text2"></comp-one>
    </div>
  `
})
