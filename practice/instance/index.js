import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div ref="div">{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  },
  // 如果在vue里声明watch，当组件销毁时候会自动注销，以免内存泄露
  watch: {
    text (newText, oldText) {
      console.log(`${newText} : ${oldText}`)
    }
  }
})

app.$mount('#root')

// let i = 0 
setInterval(() => {
  // i++
  app.text += 1
  // app.obj.a = i
  // app.$set(app.obj, 'a', i)
  // app.$forceUpdate()
  // app.$options.data.text += 1
  // app.$data.text += 1
}, 1000)

// #属性
// console.log('data', app.$data)
// console.log('props', app.$props)
// console.log('el', app.$el)
// console.log('options', app.$options)
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
// console.log('root', app.$root)
// console.log('children', app.$children)
// console.log('slots', app.$slots)
// console.log('scopedSlots', app.$scopedSlots)
// console.log('ref', app.$refs)
// console.log('isServer', app.$isServer)

// #方法
// 如果这种方式添加watch 需要在组件移除的时候注销掉执行unwatch
// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })
// setTimeout(() => {
//   unWatch()
// }, 2000)

// #on/once----只针对当前监听组件有用
app.$on('test', (a, b) => {
  console.log(`test emited ${a} ${b}`)
})
// app.$emit('test', 1, 2)
// setInterval(() => {
//   app.$emit('test', 1, 2)
// }, 1000)

// 强制组件重新渲染依次----app.$forceUpdate() 不建议一直运行会耗性能
