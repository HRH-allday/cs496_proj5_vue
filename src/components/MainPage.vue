<template>
<div id="mainpage">
  <div class="ui center aligned basic segment">
    <Search v-model="queryString" v-on:mySearch="onMySearch"></Search>
    <br/>
  </div>
  <div v-if="searchSubmitted" class="ui text container">
    <div class="ui raised segment" id="searchResults">
      <div class="ui inverted relaxed divided list">
        <div v-for="skill in searchResults" class="item">
          <div class="content">
            <a class="ui header" v-on:click="onItemClick(skill)" >{{skill.name}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */
import Search from './Search'

export default {
  name: 'menubar',
  data () {
    return {
      queryString: '',
      searchSubmitted: false,
      searchResults: []
    }
  },
  methods:{
    goSkillBook: function(){
      
    },
    onMySearch: function () {
      this.$http.get('http://52.79.155.110:3000/searchSkill/' + this.queryString).then((response) => {
        this.searchSubmitted = true
        this.searchResults = response.body
      })
    },
    onItemClick: function (skill) {
      this.$emit('skillView', skill)
      // console.log(skill)
    }
  },
  components: {
    Search
  }
}
</script>

<style scoped>
#searchResults {
  opacity: 0.9
}
</style>
