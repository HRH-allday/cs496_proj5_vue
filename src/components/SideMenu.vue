<template>
<div class="ui visible sidebar inverted vertical menu"
v-on:click="showMenu">
    <a class="item">
      1
    </a>
    <a class="item">
      2
    </a>
    <a class="item">
      3
    </a>
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'sidemenu',
  data () {
    return {
    }
  },

  methods: {
    showMenu: function() {
    console.log("fired");
    $('.ui.sidebar')
  .sidebar('toggle');
    }
  }
}

</script>

<style scoped>
.ui.secondary.menu .item{
  color:#ffffff;
}


</style>