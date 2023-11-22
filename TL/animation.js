//This is a bad idea
canvas = document.getElementById("animate-container");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//TODO
//make links become vertical if on a mobile device to render all objects (low priority)
//implement dynamic framerate assignment based on a dummy render
//add ability for arcs to be done (low priority)
//physics might be really funny

//This is the object that is a WIP
let obj = {
    id: 0,
    target: document.getElementById("animate1"),
    posx: 0,
    posy: 0,
    velocity: 1,
    facing: 1,
    framerate: 30, //This is a delay between frames, Not FPS // Its important enough delay is given for the CPU to handle instructions
    direction: "",
    //vecx and vecy are Steplength for a specific Axis,
    vecx: 0,
    vecy: 0,
    stepCount: 0,
    stepLength: 0,
    up: async function(length) {
      this.stepCount = Math.ceil(length / this.velocity)
      this.stepLength = length / this.stepCount
      this.direction = "up"
      this.frame(this)
      await sleep((this.framerate + 2) * this.stepCount)
      
    },
    down: async function(length) {
      this.stepCount = Math.ceil(length / this.velocity)
      this.stepLength = length / this.stepCount
      this.direction = "down"
      this.frame(this)
      await sleep((this.framerate + 2) * this.stepCount)
      
    },
    left: async function(length) {
      this.stepCount = Math.ceil(length / this.velocity)
      this.stepLength = length / this.stepCount
      this.direction = "left"
      this.frame(this)
      await sleep((this.framerate + 2) * this.stepCount)
      
    },
    right: async function(length) {
      this.stepCount = Math.ceil(length / this.velocity)
      this.stepLength = length / this.stepCount
      this.direction = "right"
      this.frame(this)
      await sleep((this.framerate + 2) * this.stepCount)
      
    },
    vector: async function(lenx, leny) {
      length = Math.sqrt((Math.abs(lenx) ** 2) + (Math.abs(leny) ** 2));  //wow higher math and basic trig did me wonders for once
      this.stepCount = Math.ceil(length / this.velocity)
      this.vecx = lenx / this.stepCount
      this.vecy = leny / this.stepCount
      //this.stepLength = length / this.stepCount
      this.direction = "vector"
      this.frame(this)
      await sleep((this.framerate + 2) * this.stepCount)
      
    },
    frame: async function() {
      while (true){
      if (this.stepCount > 0) {
        await sleep(this.framerate)
        //console.log(this.id, "moving", this.direction)

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

        this.target.style.top = this.posy + "%"
        this.target.style.left = this.posx + "%"

      } else{
        //console.log("Ended", this.direction )
        return "done"
      }}
      
    },
    change: async function(source) {
      // Select the image element using its ID
      this.target.src = source
    },
    flip: async function() {
      this.facing = this.facing * -1
      this.target.style.transform = "scaleX(" + this.facing + ")"
    },
    setPos: async function(x, y) {
      this.posx = x
      this.posy = y
      this.target.style.top = this.posy + "%"
      this.target.style.left = this.posx + "%"
    }
};

//This section is to calculate the sprites Percentage size


//This section is used to initialise Any animated object and any specific propertiess
//obj.width / obj.height are percent values used to be consistent with the canvas no matter the size
//obj1  = Main character to be moved
let obj1 = Object.create(obj);
obj1.id = "neco";
obj1.width =  obj1.target.offsetWidth / canvas.width * 100
obj1.height =  obj1.target.offsetHeight / canvas.height * 100



//obj2 = Image being shoved onto frame 
let obj2 = Object.create(obj);
obj2.target = document.getElementById("animate2")
obj2.id = "image";
obj2.width =  obj2.target.offsetWidth / canvas.width * 100
obj2.height =  obj2.target.offsetHeight / canvas.height * 100


//obj3 = La Cretura
let obj3 = Object.create(obj);
obj3.target = document.getElementById("animate3")
obj3.id = "menace";
obj3.width =  obj3.target.offsetWidth / canvas.width * 100
obj3.height =  obj3.target.offsetHeight / canvas.height * 100
console.log(obj3.width)
console.log(obj3.height)
//obj3.setPos(window.innerWidth + 300, window.innerHeight - 100)


let obj4 = Object.create(obj);
obj4.target = document.getElementById("animate4")
obj4.id = "projectile"
obj4.width =  obj4.target.offsetWidth / canvas.width * 100
obj4.height =  obj4.target.offsetHeight / canvas.height * 100
//obj4.setPos(window.innerWidth, window.innerHeight - 50)

//initialise position for all objects here
obj1.setPos(-obj1.width -obj2.width, 10 + obj2.height - obj1.height )

obj2.setPos(-obj2.width, 10)

obj3.setPos(100, 100 - obj3.height)
obj3.flip()

obj4.setPos(100, 100 - obj4.height)
async function run() {
  obj1.velocity = 0.5
  obj2.velocity = 0.5
  obj3.velocity = 0.5
  obj4.velocity = 1.5


  obj1.right(60 + obj1.width)
  obj2.temp = obj2.posx
  obj3.left(obj3.width + 35).then(function() {
    //ROCK AND STONE
    obj3.change("media/laughing.gif")//if idle obtained, place here
    obj4.setPos(obj3.posx, obj3.posy)
    obj4.vector(-(obj4.posx - obj2.temp - 60), -(obj4.posy - obj2.posy) + obj3.height)
  })
  await obj2.right(60 + obj1.width)
  obj2.velocity = 0.2
  obj2.right(12.5)

  //obj3.change("laughing state")
  obj1.change("media/falling.gif")
  obj1.velocity = 1
  await obj1.vector(obj3.posx - obj1.posx, obj3.posy - obj1.posy)// to obj3
  obj3.change("media/falling.gif")
  obj1.down(obj1.height)
  obj3.down(obj3.height)

  await sleep(3000)
  obj4.up(obj4.posy + obj4.height)
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

run()
