function setup(){
  //createCanvas(windowWidth, windowHeight, WEBGL);
  createCanvas(400, 400, WEBGL);

}

//TO DO
// OPTIONAL: PROGRAM GUI FOR SYMBOL SELECTION
// OPTIONAL: MAKE FULL SCREEN / RESPONSIVE 
// OPTIONAL: PROGRAM TWO-PLAYER MODE
// OPTIONAL: PROGRAM SCORE BOARD AND RESET
// OPTIONAL: RANDOMIZE PLAYER START VS COMPUTER RESTART
// OPTIONAL: IMPROVE AI WITH CONTIGUOUS-VALUE DETECTION

var gameStatus = [ [0,0,0,], [0,0,0,], [0,0,0,] ];
var userChoice;
var doRestart = 0;
var frameTimer = 0;


while (userChoice != 'circle' && userChoice != 'square'){
  var userChoice = prompt("Welcome to Tic-Tac-Toe. Type 'circle or 'square.'");
}
if(userChoice == 'square'){
  userChoice = 1;
}
if(userChoice == 'circle'){
  userChoice = 2;
}

var angle = 0;
function draw(){
  background(25);
  noStroke();
  directionalLight(240, 240, 240, -1, -1, 1);
  ambientMaterial(235);
  translate(-width/2, -height/2, 0);
  for(i=0; i<gameStatus.length; i++){
    translate(100, 0, 0);
    for(j=0; j<gameStatus[i].length; j++){
      translate(0,100,0);
      if(gameStatus[i][j] == 0){
        sphere(10);
      }else if(gameStatus[i][j] == 1){
        directionalLight(240, 50, 50, -1, -0.75, 1);
        rotateY(angle);
        box(50);
        rotateY(-angle);
      }else if(gameStatus[i][j] == 2){
        directionalLight(100, 240, 100, -1, -0.75, 1);
        rotateY(angle);
        torus(25);
        rotateY(-angle);
      }
      if(j == gameStatus[i].length -1){
        translate(0,-gameStatus[i].length*100,0);
      }
      directionalLight(240, 240, 240, -1, -1, 1);
    }
  }
  angle += 0.01;

  if(doRestart != 0){
    frameTimer++;
  }
  if(frameTimer == 30){
    restartGame(doRestart);
    frameTimer = 0;
  }
}

function mouseClicked() {
  alert('click detected');
  //ROW 1
  if( (mouseX > 85) && (mouseX < 115) && (mouseY >85) && (mouseY < 115)){
    if(gameStatus[0][0] == 0){
      gameStatus[0][0] = userChoice;
      gamePlay();
    }
  }
  if( (mouseX > 185) && (mouseX < 215) && (mouseY >85 && mouseY < 115)){
    if(gameStatus[1][0] == 0){
      gameStatus[1][0] = userChoice;
      gamePlay();
    }
  }
  if( (mouseX > 285) && (mouseX < 315) && (mouseY >85 && mouseY < 115)){
    if(gameStatus[2][0] == 0){
      gameStatus[2][0] = userChoice;
      gamePlay();
    }
  }
  //ROW 2
  if( (mouseX > 85) && (mouseX < 115) && (mouseY >185) && (mouseY < 215)){
    if(gameStatus[0][1] == 0){
      gameStatus[0][1] = userChoice;
      gamePlay();
    }
  }
  if( (mouseX > 185) && (mouseX < 215) && (mouseY >185 && mouseY < 215)){
    if(gameStatus[1][1] == 0){
      gameStatus[1][1] = userChoice;
      gamePlay();
    }
  }
  if( (mouseX > 285) && (mouseX < 315) && (mouseY >185 && mouseY < 215)){
    if(gameStatus[2][1] == 0){
      gameStatus[2][1] = userChoice;
      gamePlay();
    }
  }
  //ROW 3
  if( (mouseX > 85) && (mouseX < 115) && (mouseY >285) && (mouseY < 315)){
    if(gameStatus[0][2] == 0){
      gameStatus[0][2] = userChoice;
      gamePlay();
    }
  }
  if( (mouseX > 185) && (mouseX < 215) && (mouseY >285 && mouseY < 315)){
    if(gameStatus[1][2] == 0){
      gameStatus[1][2] = userChoice;
      gamePlay();
    }
  }
  if( (mouseX > 285) && (mouseX < 315) && (mouseY >285 && mouseY < 315)){
    if(gameStatus[2][2] == 0){
      gameStatus[2][2] = userChoice;
      gamePlay();
    }
  }
}

var enemyTurn = function(){
  var enemyChoice;
  if (userChoice == 1){
    enemyChoice = 2
  }
  if (userChoice == 2){
    enemyChoice = 1;
  }
  endTurn = 0;
  while(endTurn == 0){
    var oppMove = [ Math.floor((Math.random() * 3)), Math.floor((Math.random() * 3)) ];
    if(gameStatus[oppMove[0]][oppMove[1]]  == 0){
      gameStatus[oppMove[0]][oppMove[1]] = enemyChoice;
      endTurn = 1;
    }
  }
}

var checkForWin = function(){
  var winner = 0;
  winner += checkVertical();
  winner += checkHorizontal();
  winner += checkDiagonal();
  var mapFull = checkMapFull();
  if( (mapFull == 1) && (winner != 1) && (winner != 2)){
    winner = 3;
  }
  return winner
}

var checkVertical = function(){
  for(i=0; i<3; i++){
    if( (gameStatus[i][0] == gameStatus[i][1]) && (gameStatus[i][1] == gameStatus[i][2]) && (gameStatus[i][0] != 0) ){
      var result = gameStatus[i][0];
      return result
    }
  }
  return 0
}

var checkHorizontal = function(){
  for(i=0; i<3; i++){
    if( (gameStatus[0][i] == gameStatus[1][i]) && (gameStatus[1][i] == gameStatus[2][i]) && (gameStatus[0][i] != 0) ){
      var result = gameStatus[0][i];
      return result
    }
  }
  return 0
}

var checkDiagonal = function(){
  if( ( (gameStatus[0][0] == gameStatus[1][1]) && (gameStatus[1][1] == gameStatus[2][2]) && (gameStatus[1][1] != 0 )) || ((gameStatus[2][0] == gameStatus[1][1]) && (gameStatus[1][1] == gameStatus[0][2]) && (gameStatus[1][1] != 0) ) ){
    var result = gameStatus[1][1];
    return result
  }else{
    return 0
  }
}

var checkMapFull = function(){
  var mapFull = 1;
  for(i=0; i<gameStatus.length; i++){
    for(j=0;j<gameStatus[i].length; j++){
      if(gameStatus[i][j] == 0){
        mapFull = 0;
      }
    }
  }
  return mapFull;
}

var gamePlay = function(){
  var winner = checkForWin();
  if(winner == 0){
    enemyTurn();
    winner = checkForWin();
  }
  if (winner != 0){
    doRestart = winner;
  }
}

var restartGame = function(winner){
  var endMessage = '';
  var enemyChoice;

  if(userChoice == 1){
    enemyChoice = 2;
  }
  if(userChoice == 2){
    enemyChoice == 1;
  }
  if(winner == userChoice){
    endMessage = 'Congrats, you won! ';
  }
  if(winner != userChoice){
    endMessage = 'Computer wins. ';
  }
  if(winner == 3){
    endMessage = 'Draw. ';
  }
  while (userChoice != 'circle' && userChoice != 'square'){
    userChoice = prompt(endMessage + "Type 'circle' or 'square' to play again.");
  }
  if(userChoice == 'square'){
    userChoice = 1;
  }
  if(userChoice == 'circle'){
    userChoice = 2;
  }
  doRestart = 0;
  gameStatus = [ [0,0,0,], [0,0,0,], [0,0,0,] ];
}
