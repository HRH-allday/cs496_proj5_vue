<template>
  <div class="project">
  <div class="ui top attached tabular menu">
    <div class="active item">Tab</div>
  </div>
  <div class="ui bottom attached active tab segment">
    <p></p>
    <p></p>
  </div>
  </div>
</template>

<script>
/* eslint-disable */

  export default {
    name: 'project',
    data: function () {
      return ({
      })
    },
    props:['project'],

    methods:{


    },


    components: {

    },

    mounted: function(){
      $(document).ready(function(){
        $('.ui.top.attached.tabular.menu a.item').on('click', function(){
          $(this).addClass('active brown').siblings().removeClass('active brown');
        });
      });
    }
  }
</script>

<style scoped>

  .ui.top.attached.tabular.menu a.item{
    color: white;
  }

  .ui.bottom.attached.segment {
    text-align: left;
  }



</style>
