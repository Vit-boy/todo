// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app',
    path: '/app/:id', // 通过路由传参
    props: true, // 如果这里声明为true，那么这里的id会作为props传到这个组件里面
    // props: { // 在这里自定义参数的键值
    //   id: '456'
    // },
    // props: (route) => ({ id: route.query.b }),
    component: () => import('../views/todo/todo.vue'), // 异步加载组件
    // component: Todo,
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    name: 'app', // 给路由命名，可以通过这个名字实现路由跳转
    meta: { // 可以通过this.$route.meta拿到这个信息
      title: 'this is app',
      description: '这里是描述'
    },
    beforeEnter (to, from, next) {
      console.log('app route before enter')
      next()
    }
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
    // components: {
    //   default: Login,
    //   a: Todo
    // }
  }
]
