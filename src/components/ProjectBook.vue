<template>
  <div class="projectbook">
    <div class="ui top attached tabular menu">
      <a class="active brown item">Tab1</a>
      <a class="item">Tab2 </a>
      <a class="item">Tab3 </a>
    </div>
    <div class="ui bottom attached active tab segment">
      <pre>
        <code class="Java">
          package com.example.q.pacemaker;

          import java.util.ArrayList;

          public class CustomizeData {



        }

      </code>
    </pre>
  </div>
</div>
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'projectbook',
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

      highlight.initHighlightingOnLoad();
    }
  }
</script>

<style scoped>

  .projectbook{
    float:left;
    width:83%;
    margin-left: 30px;
    opacity: 0.9;
  }
  .ui.top.attached.tabular.menu a.item{
    color: white;
  }

  .ui.bottom.attached.segment {
    text-align: left;
  }



</style>
