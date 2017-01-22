<template>
  <div class="skillbook">
    <div class="ui vertical menu">
      <div class="item" v-for="field in fields">
        <div clsss="header">{{ field.name }} </div>
        <div class="menu">
          <a class="item" v-for="skill in skills" @click=>
        </div>
      </div>
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
    <ScrapBook :skill="targetSkill"></ScrapBook>
  </div>
</template>

<script>
  /* eslint-disable */
  let skill = function (name, field) {
    this.name = name
    this.id = Array(11).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, 10)
  }
  let field = function (name) {
    this.name = name
    this.skills = []
  }
  import ScrapBook from './ScrapBook'

  export default {
    name: 'skillbook',
    data () {
      return {
        fields: [],
        targetSkill: null
      }
    },

    methods:{
      createField: function (name) {
        this.$http.post('http://52.79.155.110:3000/createFields', {name: name}).then((response) => {
          console.log(response)
        })
      },
      createSkill: function (fieldName, skillName, id) {
        this.$http.post('http://52.79.155.110:3000/createFields', {fieldName: fieldName, skillName: skillName, id: id}).then((response) => {
          console.log(response)
        })
      },
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


</style>
