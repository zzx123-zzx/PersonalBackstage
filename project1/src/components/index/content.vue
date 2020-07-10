<template>
  <div>内容----{{id}}</div>
</template>

<script>
  export default{
    data(){
      return {
        id:this.$route.params.id
      }
    }
  }
</script>

<style>
</style>
