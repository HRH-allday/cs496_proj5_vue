<template>
  <div class="DescriptionCard">
    <div class="ui card">
     <i id="deletecard" class="delete icon" v-on:click="deleteCard"></i>


     <div class="dropzone-area" drag-over="handleDragOver" @dragenter="hovering = true" @dragleave="hovering = false" :class="{'hovered': hovering}"
        v-bind:style="{ 'background-image': 'url(' + image + ')' }">
      <div class="dropzone-text">
      </div>
      <input type="file" @change="onFileChange">
    </div>



    <div class="content">
      <div class="header">
        <div class="ui transparent input">
          <input type="text" placeholder="Title" 
            v-model="title">
        </div>
      </div>
      <div class="description">
        <div class="ui transparent input">
          <textarea placeholder="Description" 
            v-model="description"></textarea>
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
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'DescriptionCard',
    data () {
      return {
        title: this.card.title,
        description: this.card.description,
        image: this.card.image,
        hovering:false
      }
    },
    props:['card', 'index'],
    methods:{
      onFileChange(e) {

        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files[0]);

      },

      createImage(file) {
        var image = new Image();
        var reader = new FileReader();

        reader.onload = (e) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },

      removeImage: function (e) {
        this.image = '';
      },

      deleteCard: function(){
        this.$emit('deleteCard', this.index);
        this.image = './static/default.png'
      }
    },
    components: {
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
    &.hovered {
      border: 2px dashed #2E94C4;
      .dropzone-title {
        color: #1975A0;
      }

    }
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

  .dropzone-text {
    position: absolute;
    top: 50%;
    text-align: center;
    transform: translate(0, -50%);
    width: 100%;
    span {
      display: block;
      font-family: Arial, Helvetica;
      line-height: 1.9;
    }
  }

  .dropzone-title {
    font-size: 13px;
    color: #787878;
    letter-spacing: 0.4px;
  }
  .dropzone-info {
    font-size: 13px;
    font-size: 0.8125rem;
    color: #A8A8A8;
    letter-spacing: 0.4px;
  }

  .dropzone-button {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
  }

  .dropzone-preview {
    width: 80%;
    position: relative;
    &:hover .dropzone-button {
      display: block;
    }
    img {
      display: block;
      height: auto;
      max-width: 100%;
    }
    
  }



</style>