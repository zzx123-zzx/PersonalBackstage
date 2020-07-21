<template>
  <!-- 头部组件 -->
  <div class="el-header-container">
    <div class="Header">
      <div class="logoContainer">
        <div class="logo">
          <img src="../assets/logo.png">
        </div>
      </div>
    </div>
     <span class="titles">个人博客后台管理系统</span>
    <div class="userStyle">
      <div class="block" v-for="size in sizeList" :key="size">
        <el-avatar :size="size" :src="circleUrl"></el-avatar>
      </div>
      <div>
        {{username}}
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        sizeList: ["medium"]
      }
    },
    props:['username']
  }
</script>

<style lang="less" scoped>
  .el-header-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .Header {
    height: 10vh;
  }

  .Header li {
    flex: 1;
    text-align: center;
    list-style: none;
    line-height: 2.5em;
    font-size: 1.5em;
  }

  .userStyle {
    color: #90EE90;
    font-weight: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logoContainer {
    flex: 1;
    display: flex;
  }

  .logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    border: 3px solid lightgreen;
  }

  .logo img {
    width: 100px;
    height: 100px;
  }

  .titles{
     font-size: 1.5em;
     background-color: lightgreen;
     margin-right: 60%;
     padding: 5px 5px;
  }
</style>
