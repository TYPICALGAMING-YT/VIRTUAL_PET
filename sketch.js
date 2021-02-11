var dog, happyDog, database, foodStock;
var dogImage1, dogImage2, name;
var fedTime, lastFed, foodObj;
var milk,milk2,milk3,milk4,milk5;
var milk6,milk7,milk8,milk9,milk10;
var milk11,milk12,milk13,milk14;
var milkImage;
var feedPetButton, addFoodButton;
var g;
var ground;

var position;




function preload() {
  dogImage1 = loadImage("images/dogImg.png"); 
  dogImage2 = loadImage("images/dogImg1.png");
  milkImage = loadImage("images/milk.png");
}






function setup() {
  createCanvas(1000, 600);
  
ground = createSprite(500,500,1000,200);
ground.shapeColor = "forestgreen ";
  database = firebase.database();
  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  foodsRef = database.ref("Food");
  foodsRef.on("value",function(data){
    foodStock = data.val();
  });
  
  dog = createSprite(800,450,10,10);
  dog.addImage(dogImage1);
  dog.scale = 0.3;

  foodObj = new Food();
  

  var nameInput = createInput("NAME THE DOG");
  nameInput.position(200,40);
  var saveNameButton = createButton("SAVE NAME");
  saveNameButton.position(380,40);
  saveNameButton.mousePressed(function(){
    var name = nameInput.value();
    database.ref("/").update({
      Name: name
    })
  })

  addFoodButton = createButton("ADD FOOD");
  addFoodButton.position(600,40);
  addFoodButton.mousePressed(addFoods);
  feedPetButton = createButton("FEED DOG");
  feedPetButton.position(700,40);
  feedPetButton.mousePressed(feedDog);

}

function draw() {  
  background("skyblue");

  foodObj.display();
  foodObj.getFoodStock();

  drawSprites();

  textFont("impact");
  fill(255);
  strokeWeight(3);
  stroke(0);
  if(foodStock !== undefined) {
    textSize(35);
    fill("white")
    text("Food Remaining: "+foodStock, 250, 480);
  }
  if(lastFed>=12) {
    text("Last Fed: "+lastFed%12+" PM", 280, 540);
  } else if(lastFed===0) {
    text("Last Fed: Never", 280, 400);
  } 
}

function addFoods() {

  dog.addImage(dogImage1);
  foodStock++;
  database.ref("/").update({
    Food: foodStock
  });
}

function feedDog() {

  dog.addImage(dogImage2);
  foodObj.deductFood(foodStock);
  database.ref("/").update({
    Food: foodStock,
    feedTime: hour()
  });
  milk.visible=true;
}
