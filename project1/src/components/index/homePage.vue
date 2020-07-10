<template>
  <div>
    <div class="fatherModuleBox" v-for="item in fatherModule" :key="item.id">
      <div class="fatherModuleTitle">父版块:{{item.module_name}}</div>
      <!-- v-if很关键，这样就可以显示出对应的父板块对应的子版块了 -->
      <div class="sonModuleBox" v-for="sonItem in sonModule" v-if="sonItem.father_module_id==item.id">
        <router-link :to="'/content/'+sonItem.id">{{sonItem.module_name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {stringify} from 'querystring';
  export default{
    data(){
      return {
        fatherModule:[],
        fatherId:[],
        sonModule:[],
        show:false
      }
    },
    async created(){
      this.getAllFatherModule(),
      this.getAllSonModule()
    },
    methods:{
      //获取所有父板块
      async getAllFatherModule(){
        await this.$axios.get("http://localhost/php/sfkbbs/index/getFatherModule.php").then(result=>{
          this.fatherModule = result.data;
          for(var i =0; i<this.fatherModule.length;i++){
            // console.log(this.fatherModule[i].id);
            this.fatherId.push(this.fatherModule[i].id);
            // console.log(this.fatherId);
          }
        })
      },
      async getAllSonModule(){
        await this.$axios.post("http://localhost/php/sfkbbs/index/getSonModule.php").then(result=>{
          console.log(result.data);
          this.sonModule = result.data;
          // console.log(this.fatherId);
        })
      }
    },
    watch:{

    }
  }
</script>

<style scoped>
  .fatherModuleBox{
    background-color: lightblue;
    display: flex;
    flex-wrap: wrap;
  }
  .fatherModuleTitle{
    width: 100%;
    height: 50px;
  }
  .sonModuleBox{
    height: 200px;
    width: 200px;
    background-color: deeppink;
  }
</style>
