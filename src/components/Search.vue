<template>
<div id="search">
  <h1> 여러분의 스킬을 저장하세요 </h1>
  <div class="ui left icon action input">
    <i class="search icon"></i>
    <input type="text" placeholder="Search Your Skill" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" v-on:keyup.enter="$emit('mySearch')">
    <div class="ui brown submit button" @click="$emit('mySearch')">Search</div>
  </div>
</div>
</template>

<script scoped>
export default {
  name: 'search',
  props: ['value'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
h1 {
  color : #ffffff ;
  font-size : 90px;
  margin-bottom : 50px;
  alpha: 0.5;
}

#search{
  margin-top: 50px;
}

.ui.input {
  color: #42b983;
  width: 1000px;
}
</style>
