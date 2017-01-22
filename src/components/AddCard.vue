<template>
  <div class="AddCard">
    <div class="ui card" v-on:click="addNew">
     <i id="addIcon" class="add icon"></i>
      <div class="image">
        <img src = "/static/default.png"  style="height:200px;">
      </div>
      <div class="content">
        <div class="header">
          <div class="ui transparent input">
            <input type="text" placeholder="Title">
          </div>
        </div>
        <div class="description">
          <div class="ui transparent input">
            <textarea placeholder="Description"></textarea>
          </div>
        </div>
      </div>
      <div class="extra content">
        <div class="ui label">
          Adrienne
          <i class="delete icon"></i>
        </div>
        <div class="ui label">
          Zoe
          <i class="delete icon"></i>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'AddCard',
    data () {
      return {
      }
    },
    methods:{
      addNew: function(){
        this.$emit('addNew');
      }
    },
    components: {
    }
  }
</script>

<style scoped>

  .AddCard{
    margin : 5px;
    opacity: 0.7;

  }

  #addIcon{
  position:absolute;
  z-index:20;
  height: 100%;
  width: 100%;
  font-size: 150px;
  color: gray;
  margin-top: 250px;
  }


</style>