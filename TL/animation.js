//This is a bad idea
canvas = document.getElementById("animate-container");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//This is the object that is a WIP
let obj = {
    target: document.getElementById("animate1"),
    posx: 0,
    posy: 0,
    velocity: 10,
    speed: 1,
    sprite: "",
    up: async function(length) {
      console.log("up")
      stepCount = Math.ceil(length / (this.velocity * this.speed))
      stepLength = length / stepCount
      direction = "up"
      this.frame(this, stepCount, stepLength, direction)
      sleep(100 * stepCount)
      //id1 = setInterval(this.frame.bind(this, stepCount, stepLength, direction), 100);
      
    },
    down: async function(length) {
      console.log("down")
      stepCount = Math.ceil(length / (this.velocity * this.speed))
      stepLength = length / stepCount
      direction = "down"
      this.frame(this, stepCount, stepLength, direction)
      sleep(100 * stepCount)
      //id1 = setInterval(this.frame.bind(this, stepCount, stepLength, direction), 100);
      
    },
    frame: async function() {
      while (true){
      if (stepCount > 0) {
        await sleep(100)
        console.log("moving", direction)

        switch(direction) {
          case "up":
            this.posy = this.posy - stepLength
            break;
          case "down":
            this.posy = this.posy + stepLength
            break;
          case "left":
            this.posx = this.posx - stepLength
            break;
          case "right":
            this.posx = this.posx + stepLength
            break;
          default:
            console.log("This shouldnt fire");
        }
        stepCount = stepCount - 1

        //These two lines suffer the issue that im struggling to fix
        this.target.style.top = this.posy + "px"
        this.target.style.left = this.posx + "px"

      } else{
        console.log("Ended", direction )
        return "done"
      }}
      
  }
};
//inherits base values given
let obj1 = Object.create(obj);
//overwriting position
obj1.posx = 2;


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Im loosing the plot as we speak
async function run() {
  await obj.up(200)

  await obj.down(100)
}



run()
console.log("This should be seen after everything!")
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