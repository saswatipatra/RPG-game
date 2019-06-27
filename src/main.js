import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import warrior from './img/warrior.jpeg';
import wizard from './img/wizard.jpeg';
import enemy1 from './img/enemy1.jpeg';
import enemy2 from './img/enemy2.jpeg';
// import { Constructor-Name } from './backend-code';


//gameManager
//warrior onclick function
document.getElementById("test").innerHTML = "<img src=\""+ warrior+ "\" >"
document.getElementById("warrior").addEventListener('click',function(event){
  showTest1();
});
function showTest1(){
  return "<a href='#' onclick=" + GameManager.setGameStart('warrior') + ">"
}
//wizard onclick function
document.getElementById("test1").innerHTML = "<img src=\""+ wizard+ "\" >"

function showTest2(){
  return "<a href='#' onclick=" + GameManager.setGameStart('wizard') + ">"
}
document.getElementById("wizard").addEventListener('click',function(event){
  showTest2();
});
// fight onclick function
var testId = document.getElementById("actionId").addEventListener('click',function(event){
  showTest3();
});
function showTest3(){
  return "<a href='#' onclick=" + GameManager.setFight() + ">"
}

// Attack onclick function
var clickAttack = document.getElementById("actionId").addEventListener('click',function(event){
  showTest4();
});
function showTest4(){
  return "<a href='#' onclick=" + PlayerMoves.caclAttack() + ">"
}


let GameManager = {
setGameStart: function(classType){

  this.resetPlayer(classType);
  this.setPreFight();
  this.setFight(classType);

},
resetPlayer: function(classType){
  switch (classType) {
    case "warrior":
        Player = new player(classType, 200, 0, 200, 100, 50);
      break;
    case "wizard":
        Player = new player(classType, 100, 0, 100, 150, 200);
      break;


  }

  let getInterface = document.querySelector(".interface");
  if (classType==="wizard"){
  getInterface.innerHTML = "<img src=\""+ wizard + "\" >" + ' <div><h3>' + classType + '</h3><p class =" health-player">health: '+Player.health +'</p><p>mana: '+Player.mana +'</p><p>strength: '+Player.strength +'</p><p>agility: '+Player.agility +'</p><p>speed: '+Player.speed +'</p></div>';
} else {
  getInterface.innerHTML = "<img src=\""+ warrior + "\" >" + ' <div><h3>' + classType + '</h3><p class =" health-player">health: '+Player.health +'</p><p>mana: '+Player.mana +'</p><p>strength: '+Player.strength +'</p><p>agility: '+Player.agility +'</p><p>speed: '+Player.speed +'</p></div>';
}


},
setPreFight: function(){
  let getHeader = document.querySelector(".header");
  let getActions = document.querySelector(".actions");
  let getArena = document.querySelector(".arena");
  getHeader.innerHTML = '<p>Task: Find an enemy!</p>';
  getActions.innerHTML = '<a href ="#" class= "btn-prefight" ' + testId + '> Search for enemy! </a>';
  getArena.style.visibility = "visible";
},
setFight: function(classType) {
  let getHeader = document.querySelector(".header");
  let getActions = document.querySelector(".actions");
  let getEnemy = document.querySelector(".enemy");


  let chooseRandomEnemy = Math.floor(Math.random() * Math.floor(2));
  console.log(chooseRandomEnemy);
  switch (chooseRandomEnemy) {
    case 0:
      Enemy = new enemy("Goblin", 100, 0, 50, 100, 100);
      break;
      case 1:
        Enemy = new enemy("Troll", 200, 0, 150, 80, 100);
        break;
  }

  getHeader.innerHTML = '<p>Task: Choose your move</p>';
  getActions.innerHTML = '<a href ="#" class= "btn-prefight"' + clickAttack + '> Attack ! </a>';
    if (classType==="Goblin"){
  getActions.innerHTML = "<img src=\""+ enemy1 + "\" >" + ' <div><h3>' + classType + '</h3><p class= "health-enemy">health: '+Enemy.health +'</p><p>mana: '+Enemy.mana +'</p><p>strength: '+Enemy.strength +'</p><p>agility: '+Enemy.agility +'</p><p>speed: '+Enemy.speed +'</p></div>';
} else {
  getActions.innerHTML = "<img src=\""+ enemy2 + "\" >" + ' <div><h3>' + classType + '</h3><p class= "health-enemy">health: '+Enemy.health +'</p><p>mana: '+Enemy.mana +'</p><p>strength: '+Enemy.strength +'</p><p>agility: '+Enemy.agility +'</p><p>speed: '+Enemy.speed +'</p></div>';
}




}
}


let Player;
let Enemy;

//playerobject
let PlayerMoves = {
  caclAttack: function(){
    //who attacks first
    let getPlayerSpeed = Player.speed;
    let getEnemySpeed = Enemy.speed;

  //player attacks!
  let playerAttack = function(){
    let calcBaseDamage;
    if(Player.mana > 0){
      calcBaseDamage = Player.strength * Player.mana / 1000;
    } else{
        calcBaseDamage = Player.strength * Player.agility / 1000;
    }
    let offsetDamage = Math.floor(Math.random() * Math.floor(10));
    let calcOutputDamage = calcBaseDamage + offsetDamage;
    // number of hits
    let numberOfHits = Math.floor(Math.random() * Math.floor(Player.agility / 10) /2) +1;
    let attackValues = [calcOutputDamage,numberOfHits] ;
    return attackValues;
  }
  // enemy attacks
  let enemyAttack = function(){
    let calcBaseDamage;
    if(Enemy.mana > 0){
      calcBaseDamage = Enemy.strength * Enemy.mana / 1000;
    } else{
        calcBaseDamage = Enemy.strength * Enemy.agility / 1000;
    }
    let offsetDamage = Math.floor(Math.random() * Math.floor(10));
    let calcOutputDamage = calcBaseDamage + offsetDamage;
    // number of hits
    let numberOfHits = Math.floor(Math.random() * Math.floor(Enemy.agility / 10) /2) +1;
    let attackValues = [calcOutputDamage,numberOfHits] ;
    return attackValues;
  }
  // get player/enemy health to change later
  let getPlayerHealth = document.querySelector(".health-player");
  let getEnemyHealth = document.querySelector(".health-enemy");
  // initiate attacks!
  if(getPlayerSpeed >= getEnemySpeed) {
    let playerAttackValues = playerAttack();
    let totalDamage = playerAttackValues[0] * playerAttackValues[1];
    Enemy.health = Enemy.health - totalDamage;
    alert("You hit " + playerAttackValues[0] + " damgage " + playerAttackValues[1] + " times.");
    if(Enemy.health <= 0){
      alert("YOU WON!")
      getPlayerHealth.innerHTML = "Health: " + Player.health;
        getPlayerHealth.innerHTML = "Health: 0";
      }else{
      getEnemyHealth.innerHTML = "Health: " + Enemy.health;
      //Enemy attacks
      let enemyAttackValues = enemyAttack();
      let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];
      Enemy.health = Enemy.health - totalDamage;
      alert("Enemy hit " + enemyAttackValues[0] + " damgage " + enemyAttackValues[1] + " times.");
      if(Player.health <= 0){
        alert("You lose!")
        getPlayerHealth.innerHTML = "Health: 0";
          getEnemyHealth.innerHTML = "Health: " + Enemy.health;
        }else{
          getPlayerHealth.innerHTML = "Health: " + Player.health;
        }
      }
    }
  }
}

function player(classType, health, mana, strength, agility, speed) {
  this.classType = classType;
  this.health = health;
  this.mana = mana;
  this.strength = strength;
  this.agility = agility;
  this.speed = speed;
}

function enemy(classType, health, mana, strength, agility, speed) {
  this.classType = classType;
  this.health = health;
  this.mana = mana;
  this.strength = strength;
  this.agility = agility;
  this.speed = speed;
}
