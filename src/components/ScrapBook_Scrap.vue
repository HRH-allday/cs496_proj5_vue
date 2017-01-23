<template>
  <div id="divc" class="sb_scrap">
    <canvas id="canvas" width="1200" height="800"
    v-on:selectstart.prevent
    v-on:mousedown="onMouseDown"
    v-on:mousemove="onMouseMove"
    v-on:mouseup="onMouseUp"
    v-on:dragover.prevent
    v-on:drop.prevent="onDrop"
    v-on:dblclick="onClick"
    @contextmenu.prevent="onDblClick">
    This text is displayed if your browser does not support HTML5 Canvas.
  </canvas>
  <div v-for="shape in shapes" class="ui modal" :id="shape.id">
    <i class="close icon"></i>
    <div class="header">
      설명
    </div>
    <div class="image content">
      <div class="ui image">
        <img :src="shape.imgSrc">
      </div>
    </div>
    <div class="content">
      <div class="ui form">
        <div class="field">
          <label>간단한 설명을 써 주세요.</label>
          <textarea class="fluid" v-model="shape.description" rows="5"></textarea>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui positive right labeled icon button" v-on:click="onSaveClick">
        저장
        <i class="checkmark icon"></i>
      </div>
    </div>
  </div>
    <!--<button id="temp"
    v-on:click="DrawSquare"></button>-->
  </div>
</template>

<script>
  /* eslint-disable */
  var Shape = function(x, y, w, h, imgSrc, description) {
      // This is a very simple and unsafe constructor.
      // All we're doing is checking if the values exist.
      // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
      this.x = x || 0;
      this.y = y || 0;
      this.w = w;
      this.h = h;
      this.imgSrc = imgSrc
      let tokens =  imgSrc.split('/')
      this.id = tokens[tokens.length - 1].split('.')[0]
      this.description = description ? description : ''
      // this.img = null
      // this.img = new Image()
      // this.img.addEventListener('load', () => {
      //   this.w = this.img.width
      //   this.h = this.img.height
      // })
      // this.img.src = imgSrc
    }

    Shape.prototype.draw = function(ctx) {
      if(this.img == null){
        let img = new Image()
        img.addEventListener('load', () => {
          this.w = this.w >= 0 ? this.w : img.width * 0.5
          this.h = this.h >= 0 ? this.h : img.height * 0.5
          ctx.drawImage(img, this.x, this.y, this.w, this.h);
          ctx.fillRect(this.x + this.w - 2, this.y + this.h - 2, 4, 4)
        })
        img.src = this.imgSrc
        this.img = img
      } else {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        ctx.fillRect(this.x + this.w - 2, this.y + this.h - 2, 4, 4)
      }
      // 
    }

    Shape.prototype.contains = function(mx, my){
      return (this.x < mx && mx < this.x + this.w && this.y < my && my < this.y + this.h);
    }

    Shape.prototype.resizeClick = function (mx, my) {
      return (this.x + this.w - 2 < mx && mx < this.x + this.w + 2 && this.y + this.h - 2 < my && my < this.y + this.h + 2)
    }


    export default {
      name: 'sb_scrap',
      props: ['skill'],
      data () {
        return {
      valid : true, // when set to true, the canvas will redraw everything
      shapes : [],  // the collection of things to be drawn
      dragging : false, // Keep track of when we are dragging
    // the current selected object.
    // In the future we could turn this into an array for multiple selection
    resizing: false,
    selection : null,
      dragoffx : 0, // See mousedown and mousemove events for explanation
      dragoffy : 0,
      maxHeight: 1200
    }
  },
  mounted: function () {
    this.drawScrap(this.skill);
  },
  methods:{

    drawScrap: function(skill2){
      this.shapes.splice(0, this.shapes.length);
      var s = document.getElementById('canvas');
      var ctx = s.getContext('2d');
      ctx.clearRect(0,0,s.width, s.height);
      this.$http.get('http://52.79.155.110:3000/getPosition/'+ skill2._id).then((response) => {
        let list = response.data
        let maxHeight = 500
        for(let i = 0; i< list.length; i++) {
          let newImg = new Shape(list[i].posX, list[i].posY, list[i].width, list[i].height, decodeURIComponent(list[i].imgURL), list[i].description)
          this.shapes.push(newImg)
          if(newImg.y + newImg.h * 3 > maxHeight) {
            maxHeight = newImg.y + newImg.h * 3
          }
        }
        var s = document.getElementById('canvas');
        this.maxHeight = maxHeight
        for(var i = 0 ; i < this.shapes.length ; i++){
          this.shapes[i].draw(ctx);
        }
      }, (response) => {
        console.log(response)
      })
    },

    DrawSquare: function (){
      var s = document.getElementById('canvas');
      var d = document.getElementById('divc');
      var ctx = canvas.getContext("2d");
      var sh = new Shape(0,0,100,200,'#ffe1e1');
      //sh.draw(ctx);
      this.shapes.push(sh);
      this.valid = false;
      var rect = s.getBoundingClientRect();

      console.log(rect.top, rect.right, rect.bottom, rect.left);
    },

    onMouseDown: function(e){
      console.log("mousedown");
      var s = document.getElementById('canvas');
      var rect = s.getBoundingClientRect();
      var mx = e.pageX - rect.left;
      var my = e.pageY - rect.top;
      var shapes = this.shapes;
      var l = shapes.length;
      for (var i = l-1; i >= 0; i--) {
        if(shapes[i].resizeClick(mx, my)) {
          let mySel = shapes[i]
          this.selection = mySel
          this.valid = false
          this.resizing = true
        }
        else if (shapes[i].contains(mx, my)) {
          var mySel = shapes[i];
          // Keep track of where in the object we clicked
          // so we can move it smoothly (see mousemove)
          this.dragoffx = mx - mySel.x;
          this.dragoffy = my - mySel.y;
          this.dragging = true;
          this.selection = mySel;
          this.valid = false;
          return;
        }
      }
    },

    onMouseMove: function(e){
      if(this.resizing) {
        var s = document.getElementById('canvas');
        var rect = s.getBoundingClientRect();
        var mx = e.pageX - rect.left;
        var my = e.pageY - rect.top;

        this.selection.w = mx - this.selection.x
        this.selection.h = my - this.selection.y
        this.valid = false
      }
      else if(this.dragging){
        console.log("mousemove");
        var s = document.getElementById('canvas');
        var rect = s.getBoundingClientRect();
        var mx = e.pageX - rect.left;
        var my = e.pageY - rect.top;

        this.selection.x = mx - this.dragoffx;
        this.selection.y = my - this.dragoffy;
        this.valid = false; // Something's dragging so we must redraw 
      }
    },

    onMouseUp: function(e){
      console.log("mouseup");
      if(this.resizing) {
        this.$http.put('http://52.79.155.110:3000/updateSize/' + encodeURIComponent(this.selection.imgSrc), {width: this.selection.w, height:this.selection.h}).then((response) => {
          console.log('resize success...?')
        })
        this.resizing = false
      }
      if(this.dragging){
        this.$http.put('http://52.79.155.110:3000/updatePosition/' + encodeURIComponent(this.selection.imgSrc), {posX: this.selection.x, posY:this.selection.y}).then((response) => {
          console.log('put success...?')
        })
        this.dragging = false;
      }
      
    },

    onDrop: function (e) {
      // console.log(e.dataTransfer.items)
      var s = document.getElementById('canvas');
      var rect = s.getBoundingClientRect();
      e.dataTransfer.items[0].getAsString((s) => {
        let filename = encodeURIComponent(s)
        let posX = e.pageX - rect.left
        let posY = e.pageY - rect.top
        let newImg = new Shape(posX, posY, -1, -1, s, '')
        this.shapes.push(newImg)
        this.$http.post('http://52.79.155.110:3000/savePosition/' + filename, {posX: posX, posY: posY, width:-1, height: -1, skillID: this.skill._id , description: ''}).then((response) => {
          console.log('success...?')
        })
        this.valid = false
      })
      if(e.dataTransfer.files.length > 0){
        let reader = new FileReader()
        console.log(e.dataTransfer.files[0])
        reader.onload = () => {
          console.log(reader.result.substring(0, 30))
          let img = reader.result.replace(/^data:image\/(png|jpeg);base64,/, "")
          console.log(img.substring(0, 30))
          let body = 
          {
            image: img,
            ref: 'localhost'
          }
          
          this.$http.post('http://52.79.155.110:3000/uploadImage/', body).then((response) => {
            let filename = encodeURIComponent(response.body.imgURL)
            console.log(response.body.imgURL)

            let posX = e.pageX - rect.left
            let posY = e.pageY - rect.top
            let newImg = new Shape(posX, posY, -1, -1, response.body.imgURL, '')
            this.shapes.push(newImg)
            this.$http.post('http://52.79.155.110:3000/savePosition/' + filename, {posX: posX, posY: posY, width:-1, height: -1, skillID: this.skill._id, description: ''}).then((response) => {
              console.log('success...?')
              this.valid = false
            })
            
          })
        }
        reader.readAsDataURL(e.dataTransfer.files[0])
      }
    },
    onDblClick: function (e) {
      let l = this.shapes.length
      var s = document.getElementById('canvas');
      var rect = s.getBoundingClientRect();
      let mx = e.pageX - rect.left
      let my = e.pageY - rect.top
      for (var i = l-1; i >= 0; i--) {
        if (this.shapes[i].contains(mx, my)) {
          this.$http.delete('http://52.79.155.110:3000/deletePosition/'+encodeURIComponent(this.shapes[i].imgSrc)).then((response) => {
            this.shapes.splice(i, 1)
            this.valid = false
          })
          return;
        }
      }
    },
    onClick: function(e) {
      let l = this.shapes.length
      var s = document.getElementById('canvas');
      var rect = s.getBoundingClientRect();
      let mx = e.pageX - rect.left
      let my = e.pageY - rect.top
      for (var i = l-1; i >= 0; i--) {
        if (this.shapes[i].contains(mx, my)) {
          this.selection = this.shapes[i]
          $('#'+this.shapes[i].id).modal('show')
          return;
        }
      }
    },
    onSaveClick: function(e) {
      console.log(this.selection.description)
      this.$http.put('http://52.79.155.110:3000/updateDescription/' + encodeURIComponent(this.selection.imgSrc), {description: this.selection.description}).then((response) => {
        console.log('put success...?')
      })
    }



  },
  watch: {
    valid: function(newValid){
      console.log("watched");
      if(!newValid){
        var s = document.getElementById('canvas');
        var ctx = s.getContext('2d');
        ctx.clearRect(0,0,s.width, s.height);
        var shapelist = this.shapes;
        for(var i = 0 ; i < shapelist.length ; i++){
          shapelist[i].draw(ctx);
        }
      }

      this.valid = true;
    },
    skill: function(newSkill){
      console.log("watched skill");
      this.drawScrap(newSkill);
    }
  },
  components: {
  }
}


</script>

<style scoped>



</style>
