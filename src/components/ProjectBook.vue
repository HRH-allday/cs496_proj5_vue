<template>
  <div class="projectbook">
    <div class="ui top attached tabular menu">
      <a class="active brown item">Tab1</a>
      <a class="item">Tab2 </a>
      <a class="item">Tab3 </a>
    </div>
    <div class="ui bottom attached active tab segment">
        <div class="highlight">
        <pre>
          <code id="editor" class="javascript" contenteditable="true"
            v-model="text">
          </code>
        </pre>
      </div>
  </div>
</div>
</template>

<script>
  /* eslint-disable */
import hljs from 'jspath/highlight.pack.js'

  export default {
    name: 'projectbook',
    data: function () {
      return ({
        text:""
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

      hljs.initHighlightingOnLoad()
      $(function() {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block)
        })
      })
    },
    watch: {
      text : function(newText){
        var cursorPosition = document.getElementById('editor').selectionEnd;
        console.log(cursorPosition)
        $(function() {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block)
        })
      })
      }
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

  .highlight {
    font-family: 'Courier New';
  }



</style>
