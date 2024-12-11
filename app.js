// Board Code
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

// Dino Code
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImage;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}

 // Cactus Code
 let cactusArray = [];

 let cactus1Width = 34;
 let cactus2Width = 69;
 let cactus3Width = 102;

 let cactusHeight = 70;
 let cactusX = 700;
 let cactusY = boardHeight - cactusHeight;

 let cactus1Image;
 let cactus2Image;
 let cactus3Image;

 // Movement and Game Code
 let velocityX = 8;
 let velocityY = 0;
 let gravity = .4;

 let gameOver = false;
 let score = 0;

 window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");


    dinoImage = new Image();
    dinoImage.src = "./images/dino.png";
    dinoImage.onload = function() {
        context.drawImage(dinoImage, dino.x, dino.y, dino.width, dino.height);
    }


     cactus1Image = new Image();
     cactus1Image.src = "./images/cactus1.png";

     cactus2Image = new Image();
     cactus2Image.src = "./images/cactus2.png";

     cactus3Image = new Image();
     cactus3Image.src = "./images/cactus3.png";

     requestAnimationFrame(update);
     setInterval(placeCactus, 1000);
     document.addEventListener("keydown", moveDino);
 }

 function update() {
     requestAnimationFrame(update);
     if (gameOver) {
         return;
     }
     context.clearRect(0, 0, board.width, board.height);

     // Dino Stuff
     velocityY += gravity;
     dino.y = Math.min(dino.y + velocityY, dinoY);
     context.drawImage(dinoImage, dino.x, dino.y, dino.width, dino.height);

     // Cactus Stuff
     for (let i = 0; i < cactusArray.length; i++) {
         let cactus = cactusArray[i];
         cactus.x += velocityX;
         context.drawImage(cactus.Image, cactus.x, cactus.y, cactus.width, cactus.height);

         if(detectCollision(dino, cactus)) {
             gameOver = true;
             dinoImage.src = ".images/dinodead.png";
             dinoImage.onload = function() {
                 context.drawImage(dinoImage, dino.x, dino.y, dino.width, dino.height);
             }
         }
     }

     //Score Code
     context.fillstyle="black";
     context.font="20px courier";
     score++;
     context.fillText(score, 5, 20);
 }

 function moveDino(e) {
     if(gameOver) {
         return;
     }

     if((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
         velocityY = -10;
     }

     else if (e.code == "ArrowDown" && dino.y == dinoY) {

     }
 }

 function placeCactus() {
     if (gameOver) {
         return;
     }

     let cactus = {
         image : null,
         x : cactusX,
         y : cactusY,
         width : null,
         height: cactusHeight
     }

     let placeCactusChance = Math.random();

     if (placeCactusChance > .90) {
         cactus.image = cactus3Image;
         cactus.width = cactus3Width;
         cactusArray.push(cactus);
     }

     else if (placeCactusChance > .70) {
         cactus.image = cactus2Image;
         cactus.width = cactus2Width;
         cactusArray.push(cactus);
     }

     else if (placeCactusChance > .50) {
         cactus.image = cactus1Image;
         cactus.width = cactus1Width;
         cactusArray.push(cactus);
     }

     if (cactusArray.length > 5) {
         cactusArray.shift();
     }
 }

 function detectCollision(a, b) {
     return a.x < b.x + b.width &&
             a.x + a.width > b.x &&
             a.y < b.y + b.height &&
             a.y + a.height > b.y;
 }