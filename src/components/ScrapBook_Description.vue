<template>
  <div class="sb_description">
    <form class="ui form">
      <div class="field">
        <label>개발 순서</label>
        <textarea style="font-size:15px;"></textarea>
      </div>
      <div class="field">
        <label>예시 코드</label>
        <textarea style="font-size:15px;"></textarea>
      </div>
      <div class="field">
        <label>예시 레이아웃</label>
        <div class="ui link cards">
          <div class="card">
            <div class="image">
              <img src="/images/avatar2/large/matthew.png">
            </div>
            <div class="content">
              <div class="header">Matt Giampietro</div>
              <div class="meta">
                <a>Friends</a>
              </div>
              <div class="description">
                Matthew is an interior designer living in New York.
              </div>
            </div>
            <div class="extra content">
              <span class="right floated">
                Joined in 2013
              </span>
              <span>
                <i class="user icon"></i>
                75 Friends
              </span>
            </div>
          </div>
          <div class="card">
            <div class="image">
              <img src="/images/avatar2/large/molly.png">
            </div>
            <div class="content">
              <div class="header">Molly</div>
              <div class="meta">
                <span class="date">Coworker</span>
              </div>
              <div class="description">
                Molly is a personal assistant living in Paris.
              </div>
            </div>
            <div class="extra content">
              <span class="right floated">
                Joined in 2011
              </span>
              <span>
                <i class="user icon"></i>
                35 Friends
              </span>
            </div>
          </div>
          <div class="card">
            <div class="image">
              <img src="/images/avatar2/large/elyse.png">
            </div>
            <div class="content">
              <div class="header">Elyse</div>
              <div class="meta">
                <a>Coworker</a>
              </div>
              <div class="description">
                Elyse is a copywriter working in New York.
              </div>
            </div>
            <div class="extra content">
              <span class="right floated">
                Joined in 2014
              </span>
              <span>
                <i class="user icon"></i>
                151 Friends
              </span>
            </div>
          </div>
        </div>
        Content

        Content Block
        A card can contain blocks of content

        Project Timeline
      </div>
      <button class="ui button" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'sb_description',
    data () {
      return {
      }
    },
    props: ['skill'],
    methods:{
      goSkillBook: function(){

      }
    },
    components: {
    }
  }
</script>

<style scoped>



</style>
