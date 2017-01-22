<template>
<div class="ui secondary menu">
  <a class="item active brown">
    Home
  </a>
  <a class="item" style 
  v-on:click="">
    SkillBook
  </a>
  <a class="item">
    Friends
  </a>
  <div class="right menu">
    <a class="ui item">
      Logout
    </a>
  </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'menubar',
  data () {
    return {
    }
  },
  methods:{
    goSkillBook: function(){
      
    }
  }
}
</script>

<style scoped>

.ui.secondary.menu{
  height:50px;
}

.ui.secondary.menu .item{
  color:#ffffff;
  font-size: 20px;
}

.ui.secondary.menu .item:hover{
  color: brown;
}


</style>