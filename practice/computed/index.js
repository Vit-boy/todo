import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>Number: {{number}}</p>
      <p>FullName: {{fullName}}</p>
      <p><input type="text" v-model="number" /></p>
      <p>FirstName: <input type="text" v-model="firstName" /></p>
      <p>LastName: <input type="text" v-model="lastName" /></p>
      <p>Obj.a: <input type="text" v-model="obj.a" /></p>
    </div>
  `,
  data: {
    firstName: 'Jiaan',
    lastName: 'Cui',
    number: 0,
    fullName: '',
    obj: {
      a: 0
    }
  },
  computed: { // 依赖计算值有变化才会重新计算,不要在computed和watch里做变量或者对象的属性修改
    name () {
      console.log('new name')
      return `${this.firstName} ${this.lastName}`
    }
  },
  watch: {
    firstName (newName, oldName) {
      this.fullName = newName + ' ' + this.lastName
    },
    'obj.a': {
      handler () {
        console.log('obj.a changed')
      },
      immediate: true
    }
  },
  methods: {
    getName () {
      console.log('getName invoked')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
