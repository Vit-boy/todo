import Vue from 'vue'

var globalVar = '111' // eslint-disable-line

new Vue({
  el: '#root',
  template: `
    <div :id="aaa" @click="handleClick" :class="{ active: !isActive}">
      {{isActive ? 'active' : 'not active'}}
      <br/>
      {{arr.join(' ')}}
      <br/>
      {{Date.now()}}
      <p v-html="html" :style="[styles, styles2]"></p>
      <p>{{getJoinedArr(arr)}}</p>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main',
    styles: {
      color: 'red'
    },
    styles2: {
      color: 'blue'
    }
  },
  methods: {
    handleClick () {
      alert('clicked') // eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join(' ')
    }
  }
})
