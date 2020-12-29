//Create variables here
var dog, happyDog, database, foodS, foodStock
var dogIMG, happyDogIMG
var milk, milkIMG
var backgroundIMG

function preload()
{
  //load images here
  dogIMG = loadImage("images/dogImg.png");
  happyDogIMG = loadImage("images/dogImg1.png");
  milkIMG = loadImage("images/milk.png");
  backgroundIMG = loadImage("images/background_canvas.jpg")
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(800,800);

  dog=createSprite(400,600);
  dog.addImage(dogIMG);
  dog.scale=0.3;

  foodStock = database.ref("Food");
  foodStock.on("value", readStock, showError);
  console.log(foodStock);
 
 
  
  milk=createSprite(300,640);
  milk.addImage(milkIMG);
  milk.scale=0.15;
  milk.visible=false;
  

  for(var i=10;i<=800;i=i+15)
  {
    var dots=createSprite(i,10,5,5);
    dots.shapeColor="white";
  }
  for(var i=10;i<=800;i=i+15)
  {
    var dots1=createSprite(i,790,5,5);
    dots1.shapeColor="white";
  }

  for(var i=10;i<=800;i=i+15)
  {
    var dots2=createSprite(10,i,5,5);
    dots2.shapeColor="white";
  }

  for(var i=10;i<=800;i=i+15)
  {
    var dots3=createSprite(790,i,5,5);
    dots3.shapeColor="white";
  }
 
  
}


function draw() {  

  
  //add styles here

 // background(46, 139, 87);
    background(backgroundIMG);
  

  
  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDogIMG);
    milk.visible=true;
  }

  if(keyWentUp(UP_ARROW))
  {
    dog.addImage(dogIMG);
    milk.visible=false;
  }

  drawSprites();

  strokeWeight(2);
  stroke("black")
  textSize(24);
  fill("white");
  text("Food Remaining : "+ foodS,130,140);
  textSize(20);
  text("NOTE: Press UP ARROW Key To Feed The Dog!",25,50);

  if(foodS === 0 || foodS === 20){
    foodS = 20;
  
    text("Food refilled!!", 300, 400)
  }


}

//function to read value from database
function readStock(data)
{ 
  foodS=data.val();
}

 function writeStock(x)
{
  
  if(x<=0)
  {
    x=0;
  }
  else
  {
    x=x-1;
  }

  database.ref('/').set(
    {
      Food:x
    }
  )

}

function showError()
{
  text("Server is not working, Try again later!",200,200);
}








