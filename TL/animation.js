//This is a bad idea
canvas = document.getElementById("animate-container");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//create html element to work with or smth
//idk
let obj = {
    posx: 0,
    posy: 0,
    speed: 1,
    sprite: "",
    up: function(length) {
        while (true){
            for (let i = 1; i <= length; i++){
                console.log("up");
                this.posy = this.posy - 1;

            }
            break
        }
    }
};
//inherits base values given
let obj1 = Object.create(obj);
//overwriting position
obj1.posx = 2;
//call function with argument
obj1.up(4);



var id = null;
function myMove() {
  var obj = document.getElementById("animate"); 
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

myMove();

