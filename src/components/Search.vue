<template>
  <div id="search">
    <div class="ui container">
      <h1> 여러분의 스킬을 저장하세요 </h1>
      <div class="ui fluid action input">
        <input type="text" placeholder="Search Your Skill" v-model="searchString" v-on:keyup.enter="onMySearch">
        <div class="ui brown button" @click="onMySearch">Search</div>
      </div>
      <div v-if="searchSubmitted" class="ui raised segment" id="searchResults">
        <div class="ui inverted relaxed divided list">
          <div v-for="skill in searchResults" class="item">
            <div class="content">
              <a class="ui header" v-on:click="onItemClick(skill)">{{skill.name}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'search',
  props: ['value'],
  data () {
    return {
      searchString: '',
      searchSubmitted: false,
      searchResults: []
    }
  },
  methods: {
    onMySearch: function () {
      this.$http.get('http://52.79.155.110:3000/searchSkill/' + this.searchString).then((response) => {
        this.searchSubmitted = true
        this.searchResults = response.body
      })
    },
    onItemClick: function(skill) {
      this.$emit('goSkill', skill)
    }
  },
  mounted: function () {
    $('#searchbox').dropdown()
  }
}
</script>

<style scoped>
h1 {
  color : #ffffff ;
  font-size : 90px;
  margin-bottom : 50px;

}

#search{
  margin-top: 50px;
}

.ui.input {
  color: #42b983;
  opacity: 0.8
}

#searchResults {
  opacity: 0.8;
  text-align: left;
  padding-left:3%
}

</style>
