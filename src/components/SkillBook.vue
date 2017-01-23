<template>
  <div class="skillbook">
    <div class="ui vertical menu">
      <div class="ui top attached tabular menu">
        <div class="active item">Skills</div>
        <div class="item">Projects</div>
      </div>

      <a class="item" v-on:click="addNewSkill">
        <b>Add New</b>
        <i class="add icon"></i>
      </a>

      <div id="addNewModal" class="ui small modal">
        <i class="close icon"></i>
        <div class="header">
          New Skill
        </div>
        <div class="content">
          <div class="description">
            <div class="ui header">Make your own skill</div>
            <div class="content">
              <div class="ui form">
                <div class="field">
                  <label>분야 이름</label>
                  <input class="fluid" v-model="newField" ></input>
                </div>
                <div class="field">
                  <label>스킬 이름</label>
                  <input class="fluid" v-model="newTitle" ></input>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="actions">
          <div class="ui black deny button">
            Cancel
          </div>
          <div class="ui positive right labeled icon button"
          @click="makeNewSkill">
          Ready
          <i class="checkmark icon"></i>
        </div>
      </div>
    </div>

    <div class="item" v-for="field in fields">
      <div clsss="header">{{ field.name }} </div>
      <div class="menu">
        <a class="item" v-for="skill in field.skills" @click="targetSkill = skill"> {{ skill.name }}</a>
      </div>
    </div>
  </div>
  <ScrapBook v-if="targetSkill != null" :skill="targetSkill"></ScrapBook>

      <!--<div class="item">
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
      </div>-->
    </div>
  </template>

  <script>
    /* eslint-disable */
  /*
  let skill = function (name, field) {
    this.name = name
    this.id = Array(11).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, 10)
  }
  let field = function (name) {
    this.name = name
    this.skills = []
  }
  */
  import ScrapBook from './ScrapBook'

  export default {
    name: 'skillbook',
    data () {
      return {
        fields: [],
        targetSkill: null,
        newField: "",
        newTitle: "",
      }
    },

    methods:{
      addNewSkill: function(){
        $('#addNewModal').modal('show');
      },
      makeNewSkill: function(){
        this.$http.post('http://52.79.155.110:3000/createSkill', {fieldName: this.newField, skillName: this.newTitle}).then((response) => {
          console.log(response)
          this.$http.get('http://52.79.155.110:3000/getFields').then((response) => {
            this.fields = response.body
          })
        })
      }
    },
    components: {
      ScrapBook
    },
    mounted: function () {
      this.$http.get('http://52.79.155.110:3000/getFields').then((response) => {
        this.fields = response.body
      })
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

  .ui.top.attached.tabular.menu .active.item{
    background-color: #ffc1c1;
    width: 50%;
    text-align: center;
  }

  .ui.top.attached.tabular.menu .item{
    background-color: #ffe1e1;
    width: 50%;
  }




</style>
