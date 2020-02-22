import Vue from 'vue'

var globalVar = '111' // eslint-disable-line

new Vue({
  el: '#root',
  template: `
    <div :id="aaa" v-on:click="handleClick">
      {{isActive ? 'active' : 'not active'}}
      <br/>
      {{arr.join(' ')}}
      <br/>
      {{Date.now()}}
      <p v-html="html"></p>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main'
  },
  methods: {
    handleClick () {
      alert('clicked') // eslint-disable-line
    }
  }
})
