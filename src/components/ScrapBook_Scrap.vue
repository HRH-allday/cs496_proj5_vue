<template>
  <div id="divc" class="sb_scrap">
    <canvas id="canvas" width="1200" height="500"
      v-on:selectstart.prevent
      v-on:mousedown="onMouseDown"
      v-on:mousemove="onMouseMove"
      v-on:mouseup="onMouseUp">
      This text is displayed if your browser does not support HTML5 Canvas.
    </canvas>
    <button id="temp"
    v-on:click="DrawSquare"></button>
  </div>
</template>

<script>
  /* eslint-disable */
  var Shape = function(x, y, w, h, fill) {
      // This is a very simple and unsafe constructor.
      // All we're doing is checking if the values exist.
      // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
      this.x = x || 0;
      this.y = y || 0;
      this.w = w || 1;
      this.h = h || 1;
      this.fill = fill || '#AAAAAA';
    }

    Shape.prototype.draw = function(ctx) {
      ctx.fillStyle = this.fill;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    Shape.prototype.contains = function(mx, my){
      return (this.x < mx && mx < this.x + this.w && this.y < my && my < this.y + this.h);
    }


export default {
  name: 'sb_scrap',
  data () {
    return {
        valid : true, // when set to true, the canvas will redraw everything
        shapes : [],  // the collection of things to be drawn
        dragging : false, // Keep track of when we are dragging
      // the current selected object.
      // In the future we could turn this into an array for multiple selection
        selection : null,
        dragoffx : 0, // See mousedown and mousemove events for explanation
        dragoffy : 0
    }
  },
  methods:{

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
        if (shapes[i].contains(mx, my)) {
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
      if(this.dragging){
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
      this.dragging = false;
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
    }
  },
  components: {
  }
}


</script>

<style scoped>



</style>