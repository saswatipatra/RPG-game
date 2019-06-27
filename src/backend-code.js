
//gameManager



let GameManager = {
setGameStart: function(classType){
  this.resetPlayer(classType);
  this.setPreFight();
},
resetPlayer: function(classType){
  switch (classType) {
    case "warrior":
        Player = new Player(classType, 200, 0, 200, 100, 50);
      break;
    case "wizard":
        Player = new Player(classType, 100, 0, 100, 150, 200);
      break;


  }
  let getInterface = document.querySelector(".interface");
  getInterface.innerHTML = '<img src ="img/' + classType.toLowerCase() + '.jpeg" class ="img"><div><h3>' + classType + '</h3><p>Health: '+Player.health +'</p><p>Health: '+Player.mana +'</p><p>Health: '+Player.strength +'</p><p>Health: '+Player.agility +'</p><p>Health: '+Player.speed +'</p></div>';





},
setPreFight: function(){

}
}


let Player;
let Enemy;
//playerobject

// function Player(classType, health, mana, strength, agility, speed) {
//   this.classType = classType;
//   this.health = health;
//   this.mana = mana;
//   this.strength = strength;
//   this.agility = agility;
//   this.speed = speed;
// }
//
//
// //enemyObject
//
// function Enemy(enemyType, health, mana, strength, agility, speed) {
//   this.classType = classType;
//   this.health = health;
//   this.mana = mana;
//   this.strength = strength;
//   this.agility = agility;
//   this.speed = speed;
// }


let player = new Player("Warrior")
