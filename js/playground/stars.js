var playgroundStars = {
  id: null,

  init: function() {

    // MIT License | http://codepen.io/akm2/pen/rHIsa
    // Xanmia      - https://github.com/Xanmia
    //

    var totalObjects = 1200;
    var maxVelocity = 0.15;
    var starSize = 1;
    var twinkleFreq = 30000;
    var shootingStarFreq = 200;
    var shootingStarVelocity = 100;
    var shootingStarSize = 1;

    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                setInterval(callback, 75);
              };
    })();

    window.cancelRequestAnimFrame = ( function() {
        return window.cancelAnimationFrame          ||
            window.webkitCancelRequestAnimationFrame    ||
            window.mozCancelRequestAnimationFrame       ||
            window.oCancelRequestAnimationFrame     ||
            window.msCancelRequestAnimationFrame        ||
            clearTimeout
    } )();

    var canvas = document.getElementById('stars');
    if (!canvas){
        canvas = document.createElement('canvas');
        canvas.id = 'stars';
        $('body').prepend(canvas);
    }
    canvas.width = window.innerWidth || 1024;
    canvas.height = 300 || 768;
    var ctx = canvas.getContext("2d");



    var stars = [];
    var shootingStars = [];
    start();

    setInterval(update, 30);
    playgroundStars.id = requestAnimFrame(draw);

    function start() {
      for(i=0;i<totalObjects;i++){
        stars.push(new Star());
      }
    }

    function draw() {
      playgroundStars.id = requestAnimFrame(draw);
      ctx.clearRect(0,0,canvas.width,canvas.height);
       for(f=0;f<stars.length;f++)
       {
         stars[f].Update();
         stars[f].Draw();
       }
       for(f=0;f<shootingStars.length;f++)
       {
         shootingStars[f].Update();
         shootingStars[f].Draw();
       }
    }

    function update()
    {
      if(Math.round((Math.random()*shootingStarFreq))==1){
        shootingStars.push(new ShootingStar());
      }
       for(f=0;f<shootingStars.length;f++)
       {
         if (shootingStars[f].X < -1000)
         {
           shootingStars.splice(f,1);
         }
       }
    }


    function Star(){
      this.X = Math.random()*canvas.width;
      this.Y = Math.random()*canvas.height;
      this.Velocity = (Math.random()*maxVelocity);
      this.Opacity = (((Math.random()*10)+1)*.1);
      
      this.Update = function() {
        this.X -= this.Velocity;
        if(this.X<0){ ///reset
          this.X = canvas.width+1;
        }
      }
      
      this.Draw = function() {
        ctx.fillStyle = "rgba(255,255,255," + this.Opacity + ")";
        if(Math.round((Math.random()*twinkleFreq))==1){
          ctx.fillRect(this.X,this.Y,starSize+2,starSize+2);
        }
        else{
          ctx.fillRect(this.X,this.Y,starSize,starSize);
        }
      }
    }

    function ShootingStar() {
        this.X = 2000;
        this.Y = Math.random()*canvas.height;;
        this.Length = 1000
      
      this.Update = function(){
        this.X -= shootingStarVelocity;
      }
      
      this.Draw = function() {
        for (var i = 0; i < this.Length; i++){
          opacity = (0.8 - (.001 * i));
          ctx.fillStyle = "rgba(255,255,255," + opacity + ")";
          ctx.fillRect(this.X+i,this.Y,shootingStarSize,shootingStarSize);
        }
      }
    }
  },

  destroy: function(){
    if (playgroundStars.id){
        window.cancelRequestAnimFrame(playgroundStars.id);
        playgroundStars.id = null;
        $('#stars').remove();
    }
  }
}