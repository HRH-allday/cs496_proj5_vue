<template>
  <div class="projectbook">
    <div class="ui top attached tabular menu">
      <a class="item" v-for="(code, index) in codes" v-on:click="onItemClick($event, index)">{{code.title}}</a>
      <div class="right menu">
        <a id="addButton" class="ui item" @click="showModal"><i class="add icon"></i></a>
      </div>
    </div>
    <div v-for="(code, index) in codes" v-if="index == idx" class="ui bottom attached active tab segment">
      <div class="highlight" style="margin:0px;">
        <pre style="height: 100%; margin-top:0px;">
          <code id="editor" style="font-family: 'Consolas';">{{code.code}}</code>
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
          <div class="ui header">Show your fantastic code to everyone!

          </div>
            <select id="selectBox" class="ui selection dropdown" style="height:100%" @change="onSelectionChange($event)">
              <option value="" v-on:click="modalStatus = 'written'">작성한 코드</option>
              <option v-for="(codeupload, index) in codeUploads" :value="index">{{codeupload.title}}</option>
            </select>
          <div class="content">
            <br>
            <div class="ui form">
              <div class="field">
                <label>제목 </label>
                <input class="fluid" v-if="modalStatus == 'written'" v-model="newTitle" ></input>
                <input class="fluid" v-if="modalStatus == 'upload'" v-model="codeSelected.title" ></input>
              </div>
              <div class="field">
                <label>코드 </label>
                <textarea class="fluid" v-if="modalStatus == 'written'" v-model="newCode" rows="20"></textarea>
                <textarea class="fluid" v-if="modalStatus == 'upload'" v-model="codeSelected.code" rows="20"></textarea>
              </div>
              <div class="field">
                <label>파일 첨부 </label>
                <div class="ui file input action">
                  <input type="text" id="numOfFiles" readonly v-model="numOfFilesText">
                  <input type="file" ref="files" multiple="multiple" @change="onFileChange($event)" style="display: none">
                  <div class="ui button" @click="onSelectFileClick">
                    파일 선택
                  </div>
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
        codeUploads: [],
        codeSelected: null,
        modalStatus:"written",
        idx: -1,
        numOfFiles: 0
      })
    },
    props:['project'],
    computed: {
      numOfFilesText: function () {
        if(this.numOfFiles == 0) {
          return '선택된 파일 없음'
        } else {
          return this.numOfFiles + '개 파일 선택됨'
        }
      }
    },

    methods:{
      showModal: function(){
        $('#addNewCode').modal('show');
      },
      addNewCode: function () {
        this.$http.post('http://52.79.155.110:3000/addCode', {newTitle: this.newTitle, newCode: this.newCode , projectID: this.project._id, codeUploads : this.codeUploads}).then((response) => {
          this.newCode = "";
          this.newTitle = "";
          this.codeUploads=[];
          this.numOfFiles = 0;
          console.log(response);
          // this.codes.splice(0, this.codes.length, response.body.projects.Codes)
          this.codes = response.body.project.Codes
        })
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        console.log(files)
        this.codeUploads = [];
        for(var i = 0 ; i < files.length ; i++){
          var reader = new FileReader();
          reader.readAsText(files[i]);
          reader.onload = (function(newfile){
            var filename = newfile.name;
            return function(event) {
              var contents = event.target.result;
              console.log({title : filename, code : contents});
              this.codeUploads.push({title : filename, code : contents});
            }.bind(this)
          }.bind(this))(files[i]);

          reader.onerror = function(event) {
            console.error("File could not be read! Code " + event.target.error.code);
          };
          
        }
        this.numOfFiles = files.length
      },

      onItemClick: function(ev, index) {
        this.idx = index
      },

      onSelectionChange: function(ev) {
        var selectBox = document.getElementById("selectBox");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        if(selectedValue == ""){
          this.modalStatus = "written";
        }
        else{
          this.codeSelected = this.codeUploads[selectedValue];
          this.modalStatus = "upload";
        }
      },
      onSelectFileClick: function () {
        this.$refs.files.click()
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

      $('#selectBox').dropdown()
    },
    updated: function(){      
      $(function() {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block)
        })
      })

      this.codes = this.project.Codes
    },
    watch:{
      project: function(newProject){
        this.idx = -1;
        this.codes = this.project.Codes
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




</style>
