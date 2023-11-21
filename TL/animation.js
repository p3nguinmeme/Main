//This is a bad idea
canvas = document.getElementById("animate-container");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//TODO
//implement dynamic framerate assignment based on a dummy render

//This is the object that is a WIP
let obj = {
    id: 0,
    target: document.getElementById("animate1"),
    posx: 0,
    posy: 0,
    velocity: 10,
    speed: 1,
    sprite: "",
    framerate: 30, //This is a delay between frames, Not FPS // Its important enough delay is given for the CPU to handle instructions
    direction: "",
    vecx: 0,
    vecy: 0,
    stepCount: 0,
    stepLength: 0,
    up: async function(length) {
      this.stepCount = Math.ceil(length / (this.velocity * this.speed))
      this.stepLength = length / this.stepCount
      this.direction = "up"
      this.frame(this)
      await sleep((this.framerate + 5) * this.stepCount)
      
    },
    down: async function(length) {
      this.stepCount = Math.ceil(length / (this.velocity * this.speed))
      this.stepLength = length / this.stepCount
      this.direction = "down"
      this.frame(this)
      await sleep((this.framerate + 5) * this.stepCount)
      
    },
    left: async function(length) {
      this.stepCount = Math.ceil(length / (this.velocity * this.speed))
      this.stepLength = length / this.stepCount
      this.direction = "left"
      this.frame(this)//, stepCount, stepLength, direction)
      await sleep((this.framerate + 5) * this.stepCount)
      
    },
    right: async function(length) {
      this.stepCount = Math.ceil(length / (this.velocity * this.speed))
      this.stepLength = length / this.stepCount
      this.direction = "right"
      this.frame(this)
      await sleep((this.framerate + 5) * this.stepCount)
      
    },
    vector: async function(lenx, leny) {
      length = Math.sqrt((Math.abs(lenx) ** 2) + (Math.abs(leny) ** 2));  //wow higher math and basic trig did me wonders for once
      this.stepCount = Math.ceil(length / (this.velocity * this.speed))
      this.vecx = lenx / this.stepCount
      this.vecy = leny / this.stepCount
      //this.stepLength = length / this.stepCount
      this.direction = "vector"
      this.frame(this)
      await sleep((this.framerate + 5) * this.stepCount)
      
    },
    frame: async function() {
      while (true){
      if (this.stepCount > 0) {
        await sleep(this.framerate)
        console.log(this.id, "moving", this.direction)

        switch(this.direction) {
          case "up":
            this.posy = this.posy - this.stepLength
            break;
          case "down":
            this.posy = this.posy + this.stepLength
            break;
          case "left":
            this.posx = this.posx - this.stepLength
            break;
          case "right":
            this.posx = this.posx + this.stepLength
            break;
          case "vector":
            this.posx = this.posx + this.vecx
            this.posy = this.posy + this.vecy
            break;
          default:
            console.log("This shouldnt fire");
        }
        this.stepCount = this.stepCount - 1

        this.target.style.top = this.posy + "px"
        this.target.style.left = this.posx + "px"

      } else{
        console.log("Ended", this.direction )
        return "done"
      }}
      
  }
};

//This section is used to initialise Any animated object and any specific propertiess

//obj1  =Main character to be moved
let obj1 = Object.create(obj);
obj1.id = "neco";
obj1.posx = -300 - 100
obj1.posy = 200

//obj2 =links 
let obj2 = Object.create(obj);
obj2.target = document.getElementById("animate2")
obj2.id = "image";
obj2.posx = -300

//We're So back!
//await is used to wait for a thing to finish

//scrolling image = funny
//consider updating what the width of the screen is to fix some bugs :thumbs-up:
async function marquee() {
  obj1.right(350 + 100 + window.innerWidth)
  await obj2.right(350 + window.innerWidth)
  obj1.posx = -300 - 100
  obj2.posx = -300


  marquee()
}

async function run() {
  //these two will fire in parralel
  //dont move the same object twice at the same time, Will cause unexpected behaviour!
  marquee()

  
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

run()
