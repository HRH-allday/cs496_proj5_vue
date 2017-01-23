<template>
  <div class="skillbook">
    <div class="ui vertical menu">
      <div class="ui top attached tabular menu">
        <div class="active item" @click="tabStatus = 'Skills' , targetProject = null"><h3>Skills</h3></div>
        <div class="item" @click="tabStatus = 'Projects' , targetSkill = null"><h3>Projects</h3></div>
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
                  <input class="fluid" v-model="newField"></input>
                </div>
                <div class="field">
                  <label>스킬 이름</label>
                  <input class="fluid" v-model="newTitle"></input>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="actions">
          <div class="ui black deny button">
            Cancel
          </div>
          <div class="ui positive right labeled icon button" @click="makeNewSkill">
            Ready
            <i class="checkmark icon"></i>
          </div>
        </div>
      </div>

      <div id="addNewProj" class="ui small modal">
        <i class="close icon"></i>
        <div class="header">
          New Project
        </div>
        <div class="content">
          <div class="description">
            <div class="ui header">Share your own project</div>
            <div class="content">
              <div class="ui form">
                <div class="field">
                  <label>프로젝트 이름</label>
                  <input class="fluid" v-model="newProjectName" ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="actions">
          <div class="ui black deny button">
            Cancel
          </div>
          <div class="ui positive right labeled icon button" @click="addNewProject">
            Ready
            <i class="checkmark icon"></i>
          </div>
        </div>
      </div>


      <div class="item" v-if="tabStatus == 'Skills'" v-for="field in fields">
        <div clsss="header">{{ field.name }} </div>
        <div class="menu">
          <a class="item" v-for="skill in field.skills" @click="targetSkill = skill"> {{ skill.name }}</a>
        </div>
      </div>

      <a class="item" v-if="tabStatus == 'Projects'" v-for="project in projects" @click="targetProject = project" > {{ project.Name }}</a>

    </div>
    <ScrapBook v-if="(tabStatus == 'Skills') && (targetSkill != null) " :skill="targetSkill"></ScrapBook>
    <ProjectBook v-if="(tabStatus == 'Projects') && (targetProject != null) " :project="targetProject"></ProjectBook>
      
  </div>
</template>

<script>
  /* eslint-disable */
  import ScrapBook from './ScrapBook'
  import ProjectBook from './ProjectBook'

  export default {
    name: 'skillbook',
    data () {
      return {
        tabStatus: 'Skills',
        fields: [],
        targetSkill: null,
        newField: "",
        newTitle: "",
        projects: [],
        targetProject: null,
        newProjectName: "",
      }
    },

    methods:{
      addNewSkill: function(){
        if(this.tabStatus == 'Skills') $('#addNewModal').modal('show');
        else $('#addNewProj').modal('show');
      },
      makeNewSkill: function(){
        this.$http.post('http://52.79.155.110:3000/createSkill', {fieldName: this.newField, skillName: this.newTitle}).then((response) => {
          this.newField = "";
          this.newTitle = "";
          console.log(response)
          this.$http.get('http://52.79.155.110:3000/getFields').then((response) => {
            this.fields = response.body
          })
        })
      },
      addNewProject: function(){
        this.$http.post('http://52.79.155.110:3000/createProject', {name : this.newProjectName}).then((response) => {
          this.newProjectName = "";
          console.log(response)
          this.$http.get('http://52.79.155.110:3000/getProjects').then((response) => {
            this.projects = response.body
          })
        })
      }
    },
    components: {
      ScrapBook,
      ProjectBook
    },
    mounted: function () {
      this.$http.get('http://52.79.155.110:3000/getFields').then((response) => {
        this.fields = response.body
      })

      this.$http.get('http://52.79.155.110:3000/getProjects').then((response) => {
        this.projects = response.body
      })

      $(document).ready(function(){
        $('.ui.top.attached.tabular.menu .item').on('click', function(){
          $(this).addClass('active').siblings().removeClass('active');
        });
      });
    }
  }
</script>

<style scoped>
  #scrapbook {
    min-height: 100%;
  }
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
