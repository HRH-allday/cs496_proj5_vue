<template>
  <div class="sb_description">
    <form class="ui form" @submit.prevent>
      <div class="field">
        <label>개발 순서</label>
        <textarea style="font-size:15px;"
        v-model="timeline"></textarea>
      </div>
      <div class="field">
        <label>예시 코드</label>
        <div id="codemenu" class="ui top attached tabular menu">
          <a class="item" v-for="(code, index) in codes" v-on:click="onItemClick($event, index)" v-bind:class="{active:index==idx}">{{code.title}}</a>
          <div class="right menu">
            <a id="addButton" class="ui item" @click="showModal"><i class="add black icon"></i></a>
          </div>
        </div>
        <div v-for="(code, index) in codes" v-if="index == idx" class="ui bottom attached active tab segment">
          <div class="highlight" style="margin:0px;">
            <pre style="height: 100%; margin-top:0px;">
              <code id="editor" style="font-family: 'Consolas';">{{code.code}}</code>
            </pre>
          </div>
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
                      <input type="file" ref="fileUploads" multiple="multiple" @change="onFileChangeCode($event)" style="display: none">
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


        <div class="field">
          <label>예시 레이아웃</label>
          <br>
          <div class="ui link cards">
          <!-- <DescriptionCard
            v-on:deleteCard="deleteCard"
            v-for="(card, index) in cardlist" :card="card" :index="index" :key="card.id"></DescriptionCard> -->
            <div class="DescriptionCard"
            v-for="(card, index) in cardlist" :key="card.id">
            <div class="ui card">
             <i id="deletecard" class="delete icon" v-on:click="deleteCard(index)"></i>


             <div class="dropzone-area" 
             v-bind:style="{ 'background-image': 'url(' + card.image + ')' }">
             <div class="dropzone-text">
             </div>
             <input type="file" @change="onFileChange($event, index)">
           </div>



           <div class="content">
            <div class="header">
              <div class="ui transparent input">
                <input type="text" placeholder="Title" 
                v-model="card.title">
              </div>
            </div>
            <div class="description">
              <div class="ui transparent input">
                <textarea placeholder="Description" 
                v-model="card.description"></textarea>
              </div>
            </div>
          </div>
          <div class="extra content">
            <div class="ui orange label">
              {{ card.tag }}
              <i class="delete icon"></i>
            </div>
          </div>
        </div>

      </div>
      <AddCard v-on:addNew="addNewCard"></AddCard>
    </div>
  </div>
  <br>

  <button class="ui button" v-on:click="sendDescription">Submit</button>
</form>
</div>
</template>

<script>
  /* eslint-disable */
  import DescriptionCard from './DescriptionCard'
  import AddCard from './AddCard.vue'
  import hljs from 'jspath/highlight.pack.js'


  var Card = function(image, title, description, tag){
    this.id = this.cid++;
    this.image = image || './static/default.png';
    this.title = title;
    this.description = description;
    this.tag = tag;

  }




  export default {
    name: 'sb_description',
    data () {
      return {
        timeline: "",
        codes: [],
        cardlist: [new Card('./static/hhj2.jpg','test', 'about what', 'proj1')],
        cid: 0,
        newCode:"",
        newTitle:"",
        codeUploads: [],
        codeSelected: null,
        modalStatus:"written",
        idx: -1,
        numOfFiles: 0
      }
    },
    props:['skill'],
    mounted: function(){
      this.drawDescription();

      $(document).ready(function(){
        $('#codemenu a.item').on('click', function(){
          console.log("wtf");
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


      $('#selectBox').dropdown()
    },
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
        // this.codes.splice(0, this.codes.length, response.body.projects.Codes)
        console.log("addNewCard");
        if(this.newTitle != "")
          this.codes.push({title : this.newTitle, code : this.newCode});
        this.codes = this.codes.concat(this.codeUploads);
        this.newCode = "";
        this.newTitle = "";
        this.codeUploads = [];
        this.numOfFiles = 0;
      },
      drawDescription(){
        var httpPost = new XMLHttpRequest(),
        path = "http://ec2-52-79-155-110.ap-northeast-2.compute.amazonaws.com:3000/getDescription/",
        data = JSON.stringify({skillID : this.skill._id});
        httpPost.onreadystatechange = function(err) {
          if (httpPost.readyState == 4 && httpPost.status == 200){
            var res = httpPost.response;
            console.log(res);
            var json = JSON.parse(res);
            var des = json.description;
            console.log(des);
            this.cardlist = des.cardlist;
            this.timeline = des.timeline;
            this.codes = des.codes;
            this.cid = des.cardlist.length;
            this.idx = -1;

          } else {
            console.log(err);
          }

        }.bind(this);
        // Set the content type of the request to json since that's what's being sent
        httpPost.open("POST", path, true);
        httpPost.setRequestHeader('Content-Type', 'application/json');
        httpPost.send(data);

      },
      onFileChangeCode(e) {
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
      onFileChange(e, index) {
        console.log(e, index)
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files[0], index);

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
        this.$refs.fileUploads.click()
      },

      createImage(file, index) {
        var image = new Image();
        var reader = new FileReader();

        reader.onload = (e) => {
          this.cardlist[index].image = e.target.result;
        };
        reader.readAsDataURL(file);
      },


      addNewCard: function(){

        console.log('clicked');
        this.cardlist.push(new Card());
      },

      deleteCard: function(index){
        console.log('delete?' + index);
        this.cardlist.splice(index, 1);
      },

      sendDescription: function(){
        var httpPost = new XMLHttpRequest(),
        path = "http://ec2-52-79-155-110.ap-northeast-2.compute.amazonaws.com:3000/submitDescription/",
        data = JSON.stringify({skillID: this.skill._id, cardlist: this.cardlist, timeline: this.timeline, codes: this.codes});
        httpPost.onreadystatechange = function(err) {
          if (httpPost.readyState == 4 && httpPost.status == 200){
            var res = httpPost.responseText;
            console.log(res);
          } else {
            console.log(err);
          }
        };
        // Set the content type of the request to json since that's what's being sent
        httpPost.open("POST", path, true);
        httpPost.setRequestHeader('Content-Type', 'application/json');
        httpPost.send(data);
      }
    },
    components: {
      DescriptionCard,
      AddCard
    },
    watch: {
      skill: function(newSkill){
        console.log("watched skill");
        this.drawDescription(newSkill);
      }
    },
    updated: function(){      
      $(function() {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block)
        })
      })
    }
  }
</script>

<style scoped>

  .DescriptionCard{
    margin : 5px;
  }

  #deletecard {
    position:absolute;
    top:0;
    right:0;
    z-index:20;
  }

  .dropzone-area {
    background-size: 100% 100%;
    width: 100%;
    height: 200px;
    position: relative;
  }

  .dropzone-area input {
    position: absolute;
    cursor: pointer;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .ui.top.attached.tabular.menu a.item{
    color: black;
  }

  .ui.bottom.attached.segment {
    text-align: left;
  }



</style>
