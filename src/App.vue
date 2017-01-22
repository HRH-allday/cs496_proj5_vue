<template>
  <div id="app" :style="changeBG">
    <div class="ui secondary menu" >
      <a class="item active brown"
      v-on:click="status = 'mainpage'" >
        Home
      </a>
      <a class="item"
          v-on:click="status = 'skillbook'">
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
    <MainPage v-if="status == 'mainpage'"></MainPage>
    <SkillBook v-else-if="status == 'skillbook'"></SkillBook>
  </div>
</template>

<script>
/* eslint-disable */
import MainPage from './components/MainPage'
import SkillBook from './components/SkillBook'

export default {
  name: 'app',
  components: {
    MainPage,
    SkillBook
  },
  data: function () {
    return ({
      status: 'mainpage'
    })
  },
  computed: {
    changeBG: function(){
      switch(this.status){
        case "mainpage":
          return "background-image :url('/static/hhj2.jpg');"
        case "skillbook":
          return "background-image :url('/static/hhj3.jpg');"
      }
    },
    changeMenuColor: function(){
      switch(this.status){
        case "mainpage":
          return "background-image :url('/static/hhj2.jpg');"
        case "skillbook":
          return "background-image :url('/static/hhj3.jpg');"
      }
    }
  },
  mounted: function(){
    $(document).ready(function(){
      $('.ui.secondary.menu a.item').on('click', function(){
        $(this).addClass('active brown').siblings().removeClass('active brown');
      });
    });
  }
}

</script>

<style>


#app {
  height:100%;
  width:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-repeat: no-repeat;
  background-size:cover;
}

.ui.secondary.menu{
  background-color: #ffe1e1;
  height:50px;
}

.ui.secondary.menu .item{
  color:#ffffff;
  font-size: 20px;
}

.ui.secondary.menu a.item:hover{
  color: brown;
}

</style>
