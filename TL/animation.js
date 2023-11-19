//This is a bad idea
canvas = document.getElementById("animate-container");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//This is the object that is a WIP
let obj = {
    id: 0,
    target: document.getElementById("animate1"),
    posx: 0,
    posy: 0,
    velocity: 10,
    speed: 1,
    sprite: "",
    framerate: 45,
    direction: "",
    stepCount: 0,
    stepLength: 0,
    up: async function(length) {
      this.stepCount = Math.ceil(length / (this.velocity * this.speed))
      this.stepLength = length / this.stepCount
      this.direction = "up"
      this.frame(this)
      await sleep((this.framerate + 5) * this.stepCount)
      //id1 = setInterval(this.frame.bind(this, stepCount, stepLength, direction), 100);
      
    },
    down: async function(length) {
      this.stepCount = Math.ceil(length / (this.velocity * this.speed))
      this.stepLength = length / this.stepCount
      this.direction = "down"
      this.frame(this)
      await sleep((this.framerate + 5) * this.stepCount)
      //id1 = setInterval(this.frame.bind(this, stepCount, stepLength, direction), 100);
      
    },
    left: async function(length) {
      this.stepCount = Math.ceil(length / (this.velocity * this.speed))
      this.stepLength = length / this.stepCount
      this.direction = "left"
      this.frame(this)//, stepCount, stepLength, direction)
      await sleep((this.framerate + 5) * this.stepCount)
      //id1 = setInterval(this.frame.bind(this, stepCount, stepLength, direction), 100);
      
    },
    right: async function(length) {
      this.stepCount = Math.ceil(length / (this.velocity * this.speed))
      this.stepLength = length / this.stepCount
      this.direction = "right"
      this.frame(this)
      await sleep((this.framerate + 5) * this.stepCount)
      //id1 = setInterval(this.frame.bind(this, stepCount, stepLength, direction), 100);
      
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
          default:
            console.log("This shouldnt fire");
        }
        this.stepCount = this.stepCount - 1

        //These two lines suffer the issue that im struggling to fix
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
obj1.id = 1;

//obj2 =links 
let obj2 = Object.create(obj);
obj2.target = document.getElementById("links")
obj2.id = 2;
obj2.posy = canvas.height

//We're So back!
//await is used to wait for a thing to finish
async function run() {
  //these two will fire in parralel
  obj1.down(200)
  await obj2.up(200)

  await obj1.right(200)
  await obj1.left(100)
  
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


run()

//You can ignore essentially everything below here, Its only being used as a reference at the moment so try to keep it in
