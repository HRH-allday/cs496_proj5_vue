<template>
  <div class="projectbook">
    <div class="ui top attached tabular menu">
      <a class="item" v-for="(code, index) in codes" v-on:click="onItemClick($event, index)">{{code.title}}</a>
      <div class="right menu">
        <a id="addButton" class="ui item" @click="showModal"><i class="add icon"></i></a>
      </div>
    </div>
    <div v-for="(code, index) in codes" v-if="index == idx" class="ui bottom attached active tab segment">
      <div class="highlight" >
        <pre>
          <code id="editor" style="font-family: 'Consolas'">
{{code.code}}</code>
        </pre>
      </div>
    </div>

    <div id="addNewCode" class="ui modal">
      <i class="close icon"></i>
      <div class="header">
        New Code
      </div>
      <div class="content">
        <div class="description">
          <div class="ui header">Show your fantastic code to everyone!</div>
          <div class="content">
            <div class="ui form">
              <div class="field">
                <label>제목 </label>
                <input class="fluid" v-model="newTitle" ></input>
              </div>
              <div class="field">
                <label>코드 </label>
                <textarea class="fluid" v-model="newCode" rows="20"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui black deny button">
          Cancel
        </div>
        <div class="ui positive right labeled icon button" @click="addNewCode">
          Ready
          <i class="checkmark icon"></i>
        </div>
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
        text:"",
        codes: this.project.Codes,
        newCode:"",
        newTitle:"",
        idx: -1
      })
    },
    props:['project'],

    methods:{
      showModal: function(){
        $('#addNewCode').modal('show');
      },
      addNewCode: function () {
        this.$http.post('http://52.79.155.110:3000/addCode', {newTitle: this.newTitle, newCode: this.newCode , projectID: this.project._id}).then((response) => {
          this.newCode = "";
          console.log(response);
          // this.codes.splice(0, this.codes.length, response.body.projects.Codes)
          this.codes = response.body.project.Codes
        })
      },
      getCodes: function(){
      },
      onItemClick: function(ev, index) {
        this.idx = index
      }

    },

    mounted: function(){
      $(document).ready(function(){
        $('.ui.top.attached.tabular.menu a.item').on('click', function(){
          $(this).addClass('active brown').siblings().removeClass('active brown');
          $('#addButton').removeClass('active brown');
        });
      });

      hljs.initHighlightingOnLoad()
      $(function() {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block)
        })
      })

      this.codes = this.project.Codes
    },
    updated: function(){      
      $(function() {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block)
        })
      })
      console.log(this.text)
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
