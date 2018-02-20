function setup(){
  //createCanvas(windowWidth, windowHeight, WEBGL);
  createCanvas(500, 400, WEBGL);

}

//TO DO
// DONE: PROGRAM GUI FOR SYMBOL SELECTION
// OPTIONAL: MAKE FULL SCREEN / RESPONSIVE 
// OPTIONAL: PROGRAM TWO-PLAYER MODE
// DONE: PROGRAM SCORE BOARD AND RESET
// OPTIONAL: RANDOMIZE PLAYER START VS COMPUTER RESTART
// OPTIONAL: IMPROVE AI WITH CONTIGUOUS-VALUE DETECTION
// OPTIONAL: ADD DELAY FOR AI MOVES 

var gameStatus = [ [0,1,0,], [0,0,0,], [0,2,0,], [] ];
var userChoice;
var doRestart = 0;
var frameTimer = 0;
var gameStyle = 0; // 0 is for user selection, 1 is for AI, 2 is for 2 player

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
      }else if(gameStatus[i][j] == 3){
        directionalLight(240, 50, 50, -1, -0.75, 1);
        rotateY(0.5);
        box(25);
        rotateY(-0.5);
      }else if(gameStatus[i][j] == 4){
        directionalLight(100, 240, 100, -1, -0.75, 1);
        sphere(15);
      }else if(gameStatus[i][j] == 5){
        directionalLight(140, 140, 240, -1, -0.75, 1);
        rotateX(1);
        cone(15,25);
        rotateX(-1);
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

function mousePressed() {
  if(gameStyle == 0){
    selectUser();
  }
  if(gameStyle == 1){
    getInputAI();
  }
  if(gameStyle == 3){
    //mute input;
  }
}


var selectUser = function(){
  gameStatus = [ [0,1,0,], [0,0,0,], [0,2,0,], [] ];
  if( (mouseX > 60) && (mouseX < 135) && (mouseY >165) && (mouseY < 235)){
    userChoice = 1;
    console.log(userChoice);
    gameStatus[0] = [0,0,0,];
    gameStatus[1] = [0,0,0,];
    gameStatus[2] = [0,0,0,];
    
    setTimeout(function () {
      gameStyle = 1;
    }, 1000);
  }
  
  if( (mouseX > 265) && (mouseX < 335) && (mouseY >165 && mouseY < 235)){
    userChoice = 2;
    console.log(userChoice);
    gameStatus[0] = [0,0,0,];
    gameStatus[1] = [0,0,0,];
    gameStatus[2] = [0,0,0,];

    setTimeout(function () {
      gameStyle = 1;
    }, 1000);
  }
}

var getInputAI = function() {
  console.log('getInputAI ran');
  //ROW 1
  if( (mouseX > 85) && (mouseX < 115) && (mouseY >85) && (mouseY < 115)){
    if( gameStatus[0][0] == 0 ){
      gameStatus[0][0] = userChoice;
      AIgamePlay();
    }
  }
  if( (mouseX > 185) && (mouseX < 215) && (mouseY >85 && mouseY < 115)){
    if(gameStatus[1][0] == 0){
      gameStatus[1][0] = userChoice;
      AIgamePlay();
    }
  }
  if( (mouseX > 285) && (mouseX < 315) && (mouseY >85 && mouseY < 115)){
    if(gameStatus[2][0] == 0){
      gameStatus[2][0] = userChoice;
      AIgamePlay();
    }
  }
  //ROW 2
  if( (mouseX > 85) && (mouseX < 115) && (mouseY >185) && (mouseY < 215)){
    if(gameStatus[0][1] == 0){
      gameStatus[0][1] = userChoice;
      AIgamePlay();
    }
  }
  if( (mouseX > 185) && (mouseX < 215) && (mouseY >185 && mouseY < 215)){
    if(gameStatus[1][1] == 0){
      gameStatus[1][1] = userChoice;
      AIgamePlay();
    }
  }
  if( (mouseX > 285) && (mouseX < 315) && (mouseY >185 && mouseY < 215)){
    if(gameStatus[2][1] == 0){
      gameStatus[2][1] = userChoice;
      AIgamePlay();
    }
  }
  //ROW 3
  if( (mouseX > 85) && (mouseX < 115) && (mouseY >285) && (mouseY < 315)){
    if(gameStatus[0][2] == 0){
      gameStatus[0][2] = userChoice;
      AIgamePlay();
    }
  }
  if( (mouseX > 185) && (mouseX < 215) && (mouseY >285 && mouseY < 315)){
    if(gameStatus[1][2] == 0){
      gameStatus[1][2] = userChoice;
      AIgamePlay();
    }
  }
  if( (mouseX > 285) && (mouseX < 315) && (mouseY >285 && mouseY < 315)){
    if(gameStatus[2][2] == 0){
      gameStatus[2][2] = userChoice;
      AIgamePlay();
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

var AIgamePlay = function(){
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
    gameStatus[3].push(userChoice + 2);
  }
  if(winner == enemyChoice){
    gameStatus[3].push(enemyChoice + 2);
  }
  if(winner == 3){
    gameStatus[3].push(5);
  }
  
  doRestart = 0;
  gameStatus[0] = [0,0,0,];
  gameStatus[1] = [0,0,0,];
  gameStatus[2] = [0,0,0,];
  if(gameStatus[3].length > 2){
    gameStyle =3;
    setTimeout(function () {
      gameStyle = 0;
      selectUser();
    }, 3000);
  }
}
