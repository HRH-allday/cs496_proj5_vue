<template>
  <div class="skillbook">
    <div class="ui vertical menu">
      <div class="item">
        <div class="header">Android</div>
        <div class="menu">
          <a class="item">Enterprise</a>
          <a class="item">Consumer</a>
        </div>
      </div>
      <div class="item">
        <div class="header">Node.JS</div>
        <div class="menu">
          <a class="item">Rails</a>
          <a class="item">Python</a>
          <a class="item">PHP</a>
        </div>
      </div>
      <div class="item">
        <div class="header">Machine Learning</div>
        <div class="menu">
          <a class="item">Shared</a>
          <a class="item">Dedicated</a>
        </div>
      </div>
      <div class="item">
        <div class="header">Vue.JS</div>
        <div class="menu">
          <a class="item">E-mail Support</a>
          <a class="item">FAQs</a>
        </div>
      </div>
    </div>
    <ScrapBook></ScrapBook>
  </div>
</template>

<script>
  /* eslint-disable */
  import ScrapBook from './ScrapBook'

  export default {
    name: 'skillbook',
    data () {
      return {
      }
    },

    methods:{
      goSkillBook: function(){

      }
    },
    components: {
      ScrapBook
    }
  }
</script>

<style scoped>

  .ui.vertical.menu{
    background: #ffe1e1;
    height: 100%;
    opacity: 0.8;
    float:left;
  }


</style>