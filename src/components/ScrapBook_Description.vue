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
        <textarea style="font-size:15px;"
        v-model="code"></textarea>
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
        code: "",
        cardlist: [new Card('./static/hhj2.jpg','test', 'about what', 'proj1')],
        cid: 0
      }
    },
    props:['skill'],
    mounted: function(){
      this.drawDescription();
    },
    props: ['skill'],
    methods:{
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
            this.code = des.code;
            this.cid = des.cardlist.length;

          } else {
            console.log(err);
          }

        }.bind(this);
        // Set the content type of the request to json since that's what's being sent
        httpPost.open("POST", path, true);
        httpPost.setRequestHeader('Content-Type', 'application/json');
        httpPost.send(data);

      },
      onFileChange(e, index) {
        console.log(e, index)
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files[0], index);

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
        data = JSON.stringify({skillID: this.skill._id, cardlist: this.cardlist, timeline: this.timeline, code: this.code});
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



</style>
