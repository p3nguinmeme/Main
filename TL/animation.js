//This is a bad idea
canvas = document.getElementById("animate-container");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//This is the object that is a WIP
let obj = {
    object: document.getElementById("animate1"),
    posx: 0,
    posy: 0,
    velocity: 10,
    speed: 1,
    sprite: "",
    up: function(length) {
        stepCount = Math.ceil(length / (this.velocity * this.speed))
        stepLength = length / stepCount
        for (let i = 0; i < stepCount; i++) {
          this.posy = this.posy - stepLength

          this.object.style.top = this.posy + "px"
          this.object.style.left = this.posx + "px"


          console.log(this.posy)
          //console.log(stepCount)
          //console.log(stepLength)
        }
    },
    down: function(length) {
      stepCount = Math.ceil(length / (this.velocity * this.speed))
      stepLength = length / stepCount

      id1 = setInterval(this.frame, 100);
      
      
    
    },
    frame: function() {
      if (stepCount > 0) {
        console.log(stepCount)
        stepCount = stepCount - 1
        
        this.posy = this.posy + stepLength

        //These two lines suffer the issue that im struggling to fix
        this.object.style.top = this.posy + "px"
        this.object.style.left = this.posx + "px"

      } else{
        clearInterval(id1)
        console.log("Ended")
        
      }
      
  }
};
//inherits base values given
let obj1 = Object.create(obj);
//overwriting position
obj1.posx = 2;
//call function with argument
obj1.down(100);


//You can ignore essentially everything below here, Its only being used as a reference at the moment so try to keep it in
var id = null;
function myMove() {
  var obj = document.getElementById("animate1"); 
  var frame = 0; 
  var posx = 0;
  var posy = 0;
  id = setInterval(getframe, 10);



  
  function getframe() {
      if (frame < 100){
        frame++;

        posx++;
        obj.style.top = posx + "px";
        obj.style.left = posy + "px";

      } else{
        clearInterval(id);
      }
      drawCharacters();
  }
  function drawCharacters(){
    obj.style.top = posx + "px";
    obj.style.left = posy + "px";
  }

  /* This section is to create a movement system to help animate */
  function moveup(object, amount){
    object.style.top
  }
}

//myMove();

function draw(object, posx, posy){
  object.object.style.top = posy + "px"
  object.object.style.left = posx + "px"
}