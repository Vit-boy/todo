import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    mode: 'history', // 去掉url路径里面的hash
    routes,
    // base: 'base',  // 设置基路径，url每一个路由钱买你都会加上'base'
    linkActiveClass: 'active-link', // 用于页面路由激活状态时的样式修饰
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) {
      // (路由去哪里， 从哪里过去， 保存的路径)
      if (savedPosition) {
        return savedPosition // 如果有保存路径，那么下一次回来的时候定位到这个滚动位置
      } else {
        return { x: 0, y: 0 } // 定位到0，0 位置
      }
    },
    fallback: true // 一般设置为true，当有些浏览器不支持如有跳转的时候设置为true.如果设置为false，那么项目就变成了多页应用
    // parseQuery (qeury) {

    // },
    // stringifyQuery (obj) {

    // }
    // 以上两个方法时对url后面的参数做处理，转成字符串或对象
  })
}
