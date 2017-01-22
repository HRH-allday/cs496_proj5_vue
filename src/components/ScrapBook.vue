<template>
  <div class="scrapbook">
    <div class="ui top attached tabular menu">
      <a class="item active brown"
      v-on:click="SBstatus = 'Scrap'">
        Scrap
      </a>
      <a class="item"
      v-on:click="SBstatus = 'Description'">
        Description
      </a>
      <div class="right menu">
        <div class="item">
          <div class="ui transparent icon input">
            <input type="text" placeholder="Search data...">
            <i class="search link icon" style="color:pink;"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="ui bottom attached segment">
      <sb_description v-if="SBstatus == 'Description'"></sb_description>
      <sb_scrap v-if="SBstatus == 'Scrap'"></sb_scrap>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import sb_description from "./ScrapBook_Description"
  import sb_scrap from "./ScrapBook_Scrap"

  export default {
    name: 'scrapbook',
    data: function () {
    return ({
      SBstatus: 'Scrap'
    })
  },
    methods:{
      goSkillBook: function(){

      }
    },
    components: {
      sb_description,
      sb_scrap
    },
    mounted: function(){
      $(document).ready(function(){
        $('.ui.top.attached.tabular.menu a.item').on('click', function(){
          $(this).addClass('active brown').siblings().removeClass('active brown');
        });
      });
    }
  }
</script>

<style scoped>

  .scrapbook{
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