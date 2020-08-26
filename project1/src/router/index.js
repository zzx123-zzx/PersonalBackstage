import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import FatherPlate from '@/components/fatherPlate.vue'
import fatherModuleAdd from '@/components/fatherModuleAdd.vue'
import fatherModuleUpdate from '@/components/fatherModuleUpate.vue'
import sonModuleAdd from '@/components/sonModuleAdd.vue'
import sonPlate from '@/components/sonPlate.vue'
import sonModuleUpdate from '@/components/sonModuleUpdate.vue'
import banner from '@/components/banner.vue'
import recommend from '@/components/recommend.vue'

import reg from '@/components/reg.vue'
import login from '@/components/login.vue'

import publish from '@/components/publish.vue'
import allArticle from '@/components/allArticle.vue'
import evaluate from '@/components/evaluate.vue'

// import homePage from '@/components/index/homePage.vue'
// import content from '@/components/index/content.vue'
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path:'/index',
      name: 'index',
      component: Index,
      children:[
        {path:'fatherPlate',name:'fatherPlate',component:FatherPlate},
        {path:'fatherModuleAdd',name:'fatherModuleAdd',component:fatherModuleAdd},
        {path:'fatherModuleUpdate/:id',name:'fatherModuleUpdate',component:fatherModuleUpdate},
        {path:'sonModuleAdd',name:'sonModuleAdd',component:sonModuleAdd},
        {path:'sonPlate',name:'sonPlate',component:sonPlate},
        {path:'sonModuleUpdate/:id',name:'sonModuleUpdate',component:sonModuleUpdate},
        {path:'publish',name:'publish',component:publish},
        {path:'banner',name:'banner',component:banner},
        {path:'allArticle',name:'allArticle',component:allArticle},
        {path:'recommend',name:'recommend',component:recommend},
        {path:'evaluate',name:'evaluate',component:evaluate}
      ]
    },
    {
      path:'/reg',
      name:'reg',
      component:reg
    },
    {
      path:'/',
      name:'login',
      component:login
    }
  ]
})
router.beforeEach((to,from,next)=>{
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 是一个函数，表示放行

  //如果访问login那就直接放行
  var i = 2;
  // for(var i=0;i<10;i++){

  // }
  //运行着三个页面直接访问
  if(to.path === '/') return next()

  const tokenStr = sessionStorage.getItem('token')
  if(tokenStr==''||tokenStr==null) return next('/')

  //如果都可以就直接访问
  next()
})

export default router;
