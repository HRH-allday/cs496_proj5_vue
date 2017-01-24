<template>
  <div id="app" class="clearfix" :style="changeBG">
    <div class="ui secondary menu">
      <a class="item active brown"
      v-on:click="status = 'mainpage'" >
        Home
      </a>
      <a class="item"
          v-on:click="status = 'skillbook'">
      SkillBook
      </a>
    </div>
    <div id="contents">
      <MainPage v-if="status == 'mainpage'" @skillView="onSkillView"></MainPage>
      <SkillBook v-else-if="status == 'skillbook'" :skill="skill"></SkillBook>
    </div>
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
  methods: {
    onSkillView: function (skill) {
      // console.log(skill)
      this.skill = skill
      this.status = 'skillbook'
    }
  },
  data: function () {
    return ({
      status: 'mainpage',
      skill: null
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

.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
#app {
  min-height:100%;
  font-family: "맑은 고딕", sans-serif;
  width:100%; 
  text-align: center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size:cover;
  background-attachment: fixed;
}
#contents {
  min-height: 100%;
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
