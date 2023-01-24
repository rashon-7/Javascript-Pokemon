webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Create gameState to create idea of what is happening
var gameState = {
  userPokemon: "",
  rivalPokemon: "",
  pokemonDB: [{
    name: "charmander",
    type: "fire",
    hp: 39,
    attack: 52,
    defense: 43,
    level: 1,
    img: "https://www.smogon.com/dex/media/sprites/xy/charmander.gif"
  }, {
    name: "bulbasaur",
    type: "grass",
    hp: 45,
    attack: 49,
    defense: 49,
    level: 1,
    img: "https://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif"
  }, {
    name: "squirtle",
    type: "water",
    hp: 45,
    attack: 49,
    defense: 49,
    level: 1,
    img: "https://www.smogon.com/dex/media/sprites/xy/squirtle.gif"
  }],
  elements: {
    pokemonsEl: document.querySelector(".select-screen").querySelectorAll(".character"),
    battleScreenEl: document.getElementById("battle-screen"),
    attackBtnsEl: document.getElementById("battle-screen").querySelectorAll(".attack")
  },

  init: function init() {
    console.log(gameState.elements.attackBtnsEl);

    // Declare iterable variable
    var i = 0;
    // Declare while loop to iterate the length (amount) of characters in game
    while (i < gameState.elements.pokemonsEl.length) {
      gameState.elements.pokemonsEl[i].onclick = function () {
        // Assign data set to each specific class character to distinguish which type of pokemon when clicked
        var pokemonName = this.dataset.pokemon;

        var player1Img = document.querySelector(".player1").getElementsByTagName("img");
        var player2Img = document.querySelector(".player2").getElementsByTagName("img");

        // Assign chosen pokemonName to gameState object - user
        gameState.userPokemon = pokemonName;
        // Cpu gameState picker
        gameState.cpuPick();
        // When character is clicked on, & opponent selected, screen changes
        gameState.elements.battleScreenEl.classList.toggle("active");

        // Pass in userPokemon in order to attain its name property within the pokemonsDB object
        gameState.currentPokemon = gameState.pokemonDB.filter(function (pokemon) {
          return pokemon.name == gameState.userPokemon;
        });
        // Attain the zero indexed value of the current pokemon image and assign its value to player1Img to be displayed on battle screen
        player1Img[0].src = gameState.currentPokemon[0].img;
        // Pass in rivalPokemon in order to attain its name property within the pokemonsDB object
        gameState.currentRivalPokemon = gameState.pokemonDB.filter(function (pokemon) {
          return pokemon.name == gameState.rivalPokemon;
        });
        player2Img[0].src = gameState.currentRivalPokemon[0].img;

        // Current USER and CPU pokemon initial health
        gameState.currentPokemon[0].health = gameState.calculateInitialHealth(gameState.currentPokemon);
        gameState.currentPokemon[0].originalhealth = gameState.calculateInitialHealth(gameState.currentPokemon);
        gameState.currentRivalPokemon[0].health = gameState.calculateInitialHealth(gameState.currentRivalPokemon);
        gameState.currentRivalPokemon[0].originalhealth = gameState.calculateInitialHealth(gameState.currentRivalPokemon);

        console.log(gameState);
      };
      // Iterate through rest of pokemon characters
      i++;
    }

    var a = 0;
    while (a < gameState.elements.attackBtnsEl.length) {
      gameState.elements.attackBtnsEl[a].onclick = function () {
        var attackName = this.dataset.attack;
        gameState.currentUserAttack = attackName;

        gameState.play(attackName, gameState.cpuAttack());
      };
      a++;
    }
  },
  cpuAttack: function cpuAttack() {
    var attacks = ["rock", "paper", "scissors"];

    return attacks[gameState.randomNumber(0, 3)];
  },
  calculateInitialHealth: function calculateInitialHealth(user) {
    return 0.2 * Math.sqrt(user[0].level) * user[0].defense * user[0].hp;
  },
  // Define how attack affects the health amount of a player
  attackMove: function attackMove(attack, level, stack, critical, enemy, attacker) {
    console.log(enemy.name + " before: " + enemy.health);
    var attackAmount = attack * level * (stack + critical);
    enemy.health -= attackAmount;

    var userHP = document.querySelector('.player1').querySelector('.stats').querySelector('.health-bar').querySelector('.inside');

    var cpuHP = document.querySelector('.player2').querySelector('.stats').querySelector('.health-bar').querySelector('.inside');

    if (enemy.owner == 'user') {
      var minusPercent = enemy.health * 100 / enemy.originalhealth;
      userHP.style.width = (minusPercent < 0 ? 0 : minusPercent) + '%';
    } else {
      var _minusPercent = enemy.health * 100 / enemy.originalhealth;
      cpuHP.style.width = (_minusPercent < 0 ? 0 : _minusPercent) + '%';
    }
    gameState.checkWinner(enemy, attacker);
    console.log(enemy.name + " after: " + enemy.health);
  },

  checkWinner: function checkWinner(enemy, attacker) {
    if (enemy.health <= 0) {
      console.log("HEY WINNERRRRRRRRR " + attacker.name);
    }
  },
  // Formula for random number generator between 9 & 0, rounded down to nearest interger
  randomNumber: function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  // Computer takes turn at picking a character
  cpuPick: function cpuPick() {
    do {
      gameState.rivalPokemon = gameState.elements.pokemonsEl[gameState.randomNumber(0, 3)].dataset.pokemon;
      console.log("looping " + gameState.rivalPokemon);
    } while (gameState.userPokemon == gameState.rivalPokemon);
  },
  // The action of the game is started using "play" function property
  play: function play(userAttack, cpuAttack) {
    var currentPokemon = gameState.currentPokemon[0];
    var currentRivalPokemon = gameState.currentRivalPokemon[0];
    currentPokemon.owner = "user";
    currentRivalPokemon.owner = "cpu";
    switch (userAttack) {
      case "rock":
        if (cpuAttack == "paper") {
          if (currentRivalPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 0.5, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              // CPU
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 2, currentPokemon, currentRivalPokemon);
            }
          }
        }
        if (cpuAttack == "scissors") {
          if (currentRivalPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 2, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              // CPU
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 0.5, currentPokemon, currentRivalPokemon);
            }
          }
        }
        if (cpuAttack == "rock") {
          if (currentRivalPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 1, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              // CPU
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 1, currentPokemon, currentRivalPokemon);
            }
          }
        }
        break;
      case "paper":
        if (cpuAttack == "paper") {
          if (currentRivalPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 1, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              // CPU
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 1, currentPokemon, currentRivalPokemon);
            }
          }
        }
        if (cpuAttack == "scissors") {
          if (currentRivalPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 0.5, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              // CPU
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 2, currentPokemon, currentRivalPokemon);
            }
          }
        }
        if (cpuAttack == "rock") {
          if (currentRivalPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 2, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              // CPU
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 0.5, currentPokemon, currentRivalPokemon);
            }
          }
        }
        break;
      case "scissors":
        if (cpuAttack == "paper") {
          if (currentRivalPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 2, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              // CPU
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 0.5, currentPokemon, currentRivalPokemon);
            }
          }
        }
        if (cpuAttack == "scissors") {
          if (currentRivalPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 1, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              // CPU
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 1, currentPokemon, currentRivalPokemon);
            }
          }
        }
        if (cpuAttack == "rock") {
          if (currentRivalPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 0.5, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              // CPU
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 2, currentPokemon, currentRivalPokemon);
            }
          }
        }
        break;
    }
  }
};
gameState.init();

/***/ })
],[0]);