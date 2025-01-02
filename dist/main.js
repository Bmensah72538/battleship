/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
// At this point it is appropriate to begin crafting your User Interface.
// The game loop should set up a new game by creating Players and Gameboards. 
// For now just populate each Gameboard with predetermined coordinates. You can implement a system for allowing players to place their ships later.
// We’ll leave the HTML implementation up to you for now, 
// but you should display both the player’s boards and render them using information from the Gameboard class/factory.


// You need methods to render the gameboards and to take user input for attacking. For attacks, let the user click on a coordinate in the enemy Gameboard.
// The game loop should step through the game turn by turn using only methods from other objects. 

// If at any point you are tempted to write a new function inside the game loop, 
// step back and figure out which class or module that function should belong to.

// Create conditions so that the game ends once one player’s ships have all been sunk. This function is appropriate for the Game module.



class Game {
    constructor() {
        this.player1 = new _player__WEBPACK_IMPORTED_MODULE_0__["default"];
        this.player2 = new _player__WEBPACK_IMPORTED_MODULE_0__["default"];
        this.player1.initOpponent(this.player2.gameboard);
        this.player2.initOpponent(this.player1.gameboard);

        this.turn = 'Player 1';
    }

    gameOver() {
        if(this.player1.gameboard.gameOver) {
            return 'Player 2 wins!'
        }
        if(this.player2.gameboard.gameOver) {
            return 'Player 1 wins!'
        }
        return;
    }
    player1Attack(arr) {
        let hit = this.player1.attack(arr);
        console.log(hit);
        if(hit) {
            return;
        }
        if(!hit) {
            this.player2Attack();
        }
    }
    player2Attack() {
       let hit = this.player2.aiAttack();
       if(hit) {
        this.player2Attack();
       }
       return;
    }
}

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Node: () => (/* binding */ Node),
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
// Create Gameboard class/factory.
// Note that we have not yet created any User Interface. We should know our code is coming together by running the tests. 
// You shouldn’t be relying on console.log or DOM methods to make sure your code is doing what you expect it to.
// Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
// Gameboards should have a receiveAttack function that takes a pair of coordinates, 
// determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.



class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.next = null;
        this.ship = null;
        this.attacked = false;
        this.coordinates = `${this.x},${this.y}`
    }
    addNext(x,y) {
        let node = new Node(x,y);
        this.next = node; 
        return node;
    }
}

class Gameboard {
    constructor() {
        this.root = null;
        this.generateBoard();
    }

    generateBoard() {
        let current = new Node(0, 0);
        this.root = current;
        
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++) {
                if(!(i === 0 && j === 0)){
                    current = current.addNext(i, j);
                }
                
            }
        }
    }
    findNode(arr) {
        let current = this.root;
        while(current) {
            if(current.x === arr[0] && current.y === arr[1]) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
    nodeArray() {
        let current = this.root;
        let output = [];
        while(current) {
            output.push(current);
            current = current.next;
        }
        return output;
    }
    placeShip(type,x,y,horizontal) {
        let target = this.findNode([x,y]);
        let ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](type);
        let length = ship.size;

        let targetArray = [target];
        
        if(!horizontal){
            let x = target.x + 1;
            let y = target.y;
            for(let i=0;i<length;i++) {
                let current = this.findNode([x, y])
                targetArray.push(current)
                x++
            }
        }

        if(horizontal){
            let x = target.x;
            let y = target.y + 1;
            for(let i=0;i<length;i++) {
                let current = this.findNode([x, y])
                targetArray.push(current)
                y++
            }
        }

        if(targetArray.includes(null)) {  
            console.log(`Ship would exceed boardsize. targetArray:${targetArray}`)
            
            return;
        }

        targetArray.forEach((node) => {
            node.ship = ship;
        });
    
    }

    receiveAttack(arr) {
        let x = arr[0];
        let y = arr[1];
        
        let target = this.findNode([x,y]);
        target.attacked = true;
        if(target.ship !== null) {
            target.ship.integrity - 1;
        }
    }

    gameOver() {
        let current = this.root;
        while(current) {
            if(current.ship.integrity > 1) {
                return false;
            }
            current = current.next;
        }

        return true;

    }

    canBeAttacked() {
        let current = this.root;
        while(current) {
            if(current.attacked === false) {
                return true;
            }
            current = current.next;
        }

        return false;
    }
}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
// Create Player.
// Players can take turns playing the game by attacking the enemy Gameboard.
// The game is played against the computer, so make the ‘computer’ capable of making random plays.
// The AI does not have to be smart, but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice).



class Player {
    constructor() {
        this.gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"];
    }

    initOpponent(board) {
        this.enemyBoard = board;
    }
    aiAttack() {
        let result;
        let gameboard = this.gameboard; 
        let genRandom = function() {
            if(gameboard.canBeAttacked() === false) {
                console.log('This gameboard cannot be attacked.')
                return;
            }
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let output = gameboard.findNode([x, y]);
            if(!(output.attacked)){
                result = [output.x, output.y]
                return result;
            }
            genRandom();
        }
        genRandom();
        let hit = this.attack(result);
        // return result;
        return hit;
    }
    attack(arr) {
        this.enemyBoard.receiveAttack(arr);
        let node = this.enemyBoard.findNode(arr)
        if (node.ship !== null) {
            return true;
        } else {
            return false;
        }
    }
}

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
// Begin your app by creating the Ship class/factory (your choice).
// Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.
// REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.
// Ships should have a hit() function that increases the number of ‘hits’ in your ship.
// isSunk() should be a function that calculates it based on their length and the number of ‘hits’.


// No.	Class of ship	Size
// 1	Carrier	5
// 2	Battleship	4
// 3	Cruiser	3
// 4	Submarine	3
// 5	Destroyer	2

class Ship {
    constructor(type) {

        switch(type) {
            case 0:
                this.class = 'Carrier';
                this.size = 5;
                this.integrity = 5;
                break;
            case 1:
                this.class = 'Battleship';
                this.size = 4;
                this.integrity = 4;
                break;
            case 2:
                this.class = 'Cruiser';
                this.size = 3;
                this.integrity = 3;
                break;
            case 3:
                this.class = 'Submarine';
                this.size = 3;
                this.integrity = 3;
                break;
            case 4:
                this.class = 'Destroyer';
                this.size = 2;
                this.integrity = 2;
        }
    }

    initIntegrity(hp) {
        let array = [];
        for(let i = 0;i<hp;i++) {
            array.push(1);
        }
        this.integrity = array;
    }

    hit(zone) {
        let i = this.integrity;
        i[zone] = 0;
    }

    isSunk() {
        let i = this.integrity;
        if(i.includes(1)) {
            return false;
        }
        return true;
    }

}


/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ui)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");


class Ui {
    constructor() {
    }

    createGame(game) {
        let player1Div = document.createElement('div');
        let player2Div = document.createElement('div');

        player1Div.classList.add('gameboard');
        player2Div.classList.add('gameboard')

        let player1 = game.player1;
        let player2 = game.player2;

        this.nodeArray1 = game.player1.gameboard.nodeArray();
        this.nodeArray2 = game.player2.gameboard.nodeArray();
        
        this.nodeArray1.forEach((node) => {
            let nodeElement = document.createElement('div');
            nodeElement.classList.add('player1Node');
            nodeElement.dataset.coordinates = [node.x,node.y];
            player1Div.appendChild(nodeElement);
        })
        this.nodeArray2.forEach((node) => {
            let nodeElement = document.createElement('div');
            nodeElement.classList.add('player2Node');
            nodeElement.dataset.coordinates = [node.x,node.y];
            player2Div.appendChild(nodeElement);
        })
        
        const gameDiv = document.getElementsByClassName('game')[0];

        gameDiv.appendChild(player1Div);
        gameDiv.appendChild(player2Div);
    }

    updateUi(game) {
        let nodeArray1 = game.player1.gameboard.nodeArray();
        let nodeArray2 = game.player2.gameboard.nodeArray();

        nodeArray1.forEach((node) => {
            let htmlElement = document.querySelectorAll(`.player1Node[data-coordinates="${node.coordinates}"]`)[0];
            htmlElement.dataset.attacked = node.attacked;
            if(node.ship !== null) {
                htmlElement.dataset.ship = true;
            }
            if(node.attacked) {
                htmlElement.textContent = 'X';
            }
        })

        nodeArray2.forEach((node) => {
            let htmlElement = document.querySelectorAll(`.player2Node[data-coordinates="${node.coordinates}"]`)[0];
            htmlElement.dataset.attacked = node.attacked;
            if(node.ship !== null) {
                htmlElement.dataset.ship = true;
            }
            if(node.attacked) {
                htmlElement.textContent = 'X';
            }
        })

    }
    onClick(game) {
        let updateUi = this.updateUi;
        let enemyHtml = document.querySelectorAll('.player2Node');
        enemyHtml.forEach((html) => {
            html.onclick = function(event){
                let coordString = event.target.dataset.coordinates;
                let x = parseInt(coordString[0]);
                let y = parseInt(coordString[2]);
                game.player1.attack([x,y]);   
                updateUi(game);            
            }
        })
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ "./src/ui.js");




let ui = new _ui__WEBPACK_IMPORTED_MODULE_1__["default"]; 
let game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"];

window.onload = () => {
    ui.createGame(game);
    ui.onClick(game);
    ui.updateUi(game);
}

let shipPhase = true;

game.player1.gameboard.placeShip(0,0,0,true);
game.player2.gameboard.placeShip(0,0,0,true);

game.player1.gameboard.placeShip(0,4,4,false);
game.player2.gameboard.placeShip(0,4,4,false);

game.player1Attack([1,0]);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRTZCOztBQUVkO0FBQ2Y7QUFDQSwyQkFBMkIsK0NBQU07QUFDakMsMkJBQTJCLCtDQUFNO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFeUI7O0FBRWxCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLE9BQU8sR0FBRyxPQUFPO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsS0FBSztBQUN6Qix3QkFBd0IsS0FBSztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qiw2Q0FBSTtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0VBQW9FLFlBQVk7QUFDaEY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMzSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRW1DOztBQUVwQjtBQUNmO0FBQ0EsNkJBQTZCLGtEQUFTO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsS0FBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xFeUI7O0FBRVY7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBGQUEwRixpQkFBaUI7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0EsMEZBQTBGLGlCQUFpQjtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7VUM5RUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOeUI7O0FBRUo7O0FBRXJCLGFBQWEsMkNBQUU7QUFDZixlQUFlLDZDQUFJOztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwQiIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEF0IHRoaXMgcG9pbnQgaXQgaXMgYXBwcm9wcmlhdGUgdG8gYmVnaW4gY3JhZnRpbmcgeW91ciBVc2VyIEludGVyZmFjZS5cbi8vIFRoZSBnYW1lIGxvb3Agc2hvdWxkIHNldCB1cCBhIG5ldyBnYW1lIGJ5IGNyZWF0aW5nIFBsYXllcnMgYW5kIEdhbWVib2FyZHMuIFxuLy8gRm9yIG5vdyBqdXN0IHBvcHVsYXRlIGVhY2ggR2FtZWJvYXJkIHdpdGggcHJlZGV0ZXJtaW5lZCBjb29yZGluYXRlcy4gWW91IGNhbiBpbXBsZW1lbnQgYSBzeXN0ZW0gZm9yIGFsbG93aW5nIHBsYXllcnMgdG8gcGxhY2UgdGhlaXIgc2hpcHMgbGF0ZXIuXG4vLyBXZeKAmWxsIGxlYXZlIHRoZSBIVE1MIGltcGxlbWVudGF0aW9uIHVwIHRvIHlvdSBmb3Igbm93LCBcbi8vIGJ1dCB5b3Ugc2hvdWxkIGRpc3BsYXkgYm90aCB0aGUgcGxheWVy4oCZcyBib2FyZHMgYW5kIHJlbmRlciB0aGVtIHVzaW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIEdhbWVib2FyZCBjbGFzcy9mYWN0b3J5LlxuXG5cbi8vIFlvdSBuZWVkIG1ldGhvZHMgdG8gcmVuZGVyIHRoZSBnYW1lYm9hcmRzIGFuZCB0byB0YWtlIHVzZXIgaW5wdXQgZm9yIGF0dGFja2luZy4gRm9yIGF0dGFja3MsIGxldCB0aGUgdXNlciBjbGljayBvbiBhIGNvb3JkaW5hdGUgaW4gdGhlIGVuZW15IEdhbWVib2FyZC5cbi8vIFRoZSBnYW1lIGxvb3Agc2hvdWxkIHN0ZXAgdGhyb3VnaCB0aGUgZ2FtZSB0dXJuIGJ5IHR1cm4gdXNpbmcgb25seSBtZXRob2RzIGZyb20gb3RoZXIgb2JqZWN0cy4gXG5cbi8vIElmIGF0IGFueSBwb2ludCB5b3UgYXJlIHRlbXB0ZWQgdG8gd3JpdGUgYSBuZXcgZnVuY3Rpb24gaW5zaWRlIHRoZSBnYW1lIGxvb3AsIFxuLy8gc3RlcCBiYWNrIGFuZCBmaWd1cmUgb3V0IHdoaWNoIGNsYXNzIG9yIG1vZHVsZSB0aGF0IGZ1bmN0aW9uIHNob3VsZCBiZWxvbmcgdG8uXG5cbi8vIENyZWF0ZSBjb25kaXRpb25zIHNvIHRoYXQgdGhlIGdhbWUgZW5kcyBvbmNlIG9uZSBwbGF5ZXLigJlzIHNoaXBzIGhhdmUgYWxsIGJlZW4gc3Vuay4gVGhpcyBmdW5jdGlvbiBpcyBhcHByb3ByaWF0ZSBmb3IgdGhlIEdhbWUgbW9kdWxlLlxuXG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIxID0gbmV3IFBsYXllcjtcbiAgICAgICAgdGhpcy5wbGF5ZXIyID0gbmV3IFBsYXllcjtcbiAgICAgICAgdGhpcy5wbGF5ZXIxLmluaXRPcHBvbmVudCh0aGlzLnBsYXllcjIuZ2FtZWJvYXJkKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIyLmluaXRPcHBvbmVudCh0aGlzLnBsYXllcjEuZ2FtZWJvYXJkKTtcblxuICAgICAgICB0aGlzLnR1cm4gPSAnUGxheWVyIDEnO1xuICAgIH1cblxuICAgIGdhbWVPdmVyKCkge1xuICAgICAgICBpZih0aGlzLnBsYXllcjEuZ2FtZWJvYXJkLmdhbWVPdmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1BsYXllciAyIHdpbnMhJ1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMucGxheWVyMi5nYW1lYm9hcmQuZ2FtZU92ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAnUGxheWVyIDEgd2lucyEnXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwbGF5ZXIxQXR0YWNrKGFycikge1xuICAgICAgICBsZXQgaGl0ID0gdGhpcy5wbGF5ZXIxLmF0dGFjayhhcnIpO1xuICAgICAgICBjb25zb2xlLmxvZyhoaXQpO1xuICAgICAgICBpZihoaXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighaGl0KSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllcjJBdHRhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwbGF5ZXIyQXR0YWNrKCkge1xuICAgICAgIGxldCBoaXQgPSB0aGlzLnBsYXllcjIuYWlBdHRhY2soKTtcbiAgICAgICBpZihoaXQpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIyQXR0YWNrKCk7XG4gICAgICAgfVxuICAgICAgIHJldHVybjtcbiAgICB9XG59IiwiLy8gQ3JlYXRlIEdhbWVib2FyZCBjbGFzcy9mYWN0b3J5LlxuLy8gTm90ZSB0aGF0IHdlIGhhdmUgbm90IHlldCBjcmVhdGVkIGFueSBVc2VyIEludGVyZmFjZS4gV2Ugc2hvdWxkIGtub3cgb3VyIGNvZGUgaXMgY29taW5nIHRvZ2V0aGVyIGJ5IHJ1bm5pbmcgdGhlIHRlc3RzLiBcbi8vIFlvdSBzaG91bGRu4oCZdCBiZSByZWx5aW5nIG9uIGNvbnNvbGUubG9nIG9yIERPTSBtZXRob2RzIHRvIG1ha2Ugc3VyZSB5b3VyIGNvZGUgaXMgZG9pbmcgd2hhdCB5b3UgZXhwZWN0IGl0IHRvLlxuLy8gR2FtZWJvYXJkcyBzaG91bGQgYmUgYWJsZSB0byBwbGFjZSBzaGlwcyBhdCBzcGVjaWZpYyBjb29yZGluYXRlcyBieSBjYWxsaW5nIHRoZSBzaGlwIGZhY3RvcnkgZnVuY3Rpb24uXG4vLyBHYW1lYm9hcmRzIHNob3VsZCBoYXZlIGEgcmVjZWl2ZUF0dGFjayBmdW5jdGlvbiB0aGF0IHRha2VzIGEgcGFpciBvZiBjb29yZGluYXRlcywgXG4vLyBkZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBhdHRhY2sgaGl0IGEgc2hpcCBhbmQgdGhlbiBzZW5kcyB0aGUg4oCYaGl04oCZIGZ1bmN0aW9uIHRvIHRoZSBjb3JyZWN0IHNoaXAsIG9yIHJlY29yZHMgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBtaXNzZWQgc2hvdC5cbi8vIEdhbWVib2FyZHMgc2hvdWxkIGtlZXAgdHJhY2sgb2YgbWlzc2VkIGF0dGFja3Mgc28gdGhleSBjYW4gZGlzcGxheSB0aGVtIHByb3Blcmx5LlxuLy8gR2FtZWJvYXJkcyBzaG91bGQgYmUgYWJsZSB0byByZXBvcnQgd2hldGhlciBvciBub3QgYWxsIG9mIHRoZWlyIHNoaXBzIGhhdmUgYmVlbiBzdW5rLlxuXG5pbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnXG5cbmV4cG9ydCBjbGFzcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMubmV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMuc2hpcCA9IG51bGw7XG4gICAgICAgIHRoaXMuYXR0YWNrZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb29yZGluYXRlcyA9IGAke3RoaXMueH0sJHt0aGlzLnl9YFxuICAgIH1cbiAgICBhZGROZXh0KHgseSkge1xuICAgICAgICBsZXQgbm9kZSA9IG5ldyBOb2RlKHgseSk7XG4gICAgICAgIHRoaXMubmV4dCA9IG5vZGU7IFxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucm9vdCA9IG51bGw7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVCb2FyZCgpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlQm9hcmQoKSB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gbmV3IE5vZGUoMCwgMCk7XG4gICAgICAgIHRoaXMucm9vdCA9IGN1cnJlbnQ7XG4gICAgICAgIFxuICAgICAgICBmb3IobGV0IGk9MDtpPDEwO2krKyl7XG4gICAgICAgICAgICBmb3IobGV0IGo9MDtqPDEwO2orKykge1xuICAgICAgICAgICAgICAgIGlmKCEoaSA9PT0gMCAmJiBqID09PSAwKSl7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LmFkZE5leHQoaSwgaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZpbmROb2RlKGFycikge1xuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMucm9vdDtcbiAgICAgICAgd2hpbGUoY3VycmVudCkge1xuICAgICAgICAgICAgaWYoY3VycmVudC54ID09PSBhcnJbMF0gJiYgY3VycmVudC55ID09PSBhcnJbMV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIG5vZGVBcnJheSgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLnJvb3Q7XG4gICAgICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICAgICAgd2hpbGUoY3VycmVudCkge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goY3VycmVudCk7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuICAgIHBsYWNlU2hpcCh0eXBlLHgseSxob3Jpem9udGFsKSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmZpbmROb2RlKFt4LHldKTtcbiAgICAgICAgbGV0IHNoaXAgPSBuZXcgU2hpcCh0eXBlKTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHNoaXAuc2l6ZTtcblxuICAgICAgICBsZXQgdGFyZ2V0QXJyYXkgPSBbdGFyZ2V0XTtcbiAgICAgICAgXG4gICAgICAgIGlmKCFob3Jpem9udGFsKXtcbiAgICAgICAgICAgIGxldCB4ID0gdGFyZ2V0LnggKyAxO1xuICAgICAgICAgICAgbGV0IHkgPSB0YXJnZXQueTtcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8bGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5maW5kTm9kZShbeCwgeV0pXG4gICAgICAgICAgICAgICAgdGFyZ2V0QXJyYXkucHVzaChjdXJyZW50KVxuICAgICAgICAgICAgICAgIHgrK1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoaG9yaXpvbnRhbCl7XG4gICAgICAgICAgICBsZXQgeCA9IHRhcmdldC54O1xuICAgICAgICAgICAgbGV0IHkgPSB0YXJnZXQueSArIDE7XG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPGxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuZmluZE5vZGUoW3gsIHldKVxuICAgICAgICAgICAgICAgIHRhcmdldEFycmF5LnB1c2goY3VycmVudClcbiAgICAgICAgICAgICAgICB5KytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRhcmdldEFycmF5LmluY2x1ZGVzKG51bGwpKSB7ICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTaGlwIHdvdWxkIGV4Y2VlZCBib2FyZHNpemUuIHRhcmdldEFycmF5OiR7dGFyZ2V0QXJyYXl9YClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0QXJyYXkuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZS5zaGlwID0gc2hpcDtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayhhcnIpIHtcbiAgICAgICAgbGV0IHggPSBhcnJbMF07XG4gICAgICAgIGxldCB5ID0gYXJyWzFdO1xuICAgICAgICBcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuZmluZE5vZGUoW3gseV0pO1xuICAgICAgICB0YXJnZXQuYXR0YWNrZWQgPSB0cnVlO1xuICAgICAgICBpZih0YXJnZXQuc2hpcCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGFyZ2V0LnNoaXAuaW50ZWdyaXR5IC0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdhbWVPdmVyKCkge1xuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMucm9vdDtcbiAgICAgICAgd2hpbGUoY3VycmVudCkge1xuICAgICAgICAgICAgaWYoY3VycmVudC5zaGlwLmludGVncml0eSA+IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cbiAgICBjYW5CZUF0dGFja2VkKCkge1xuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMucm9vdDtcbiAgICAgICAgd2hpbGUoY3VycmVudCkge1xuICAgICAgICAgICAgaWYoY3VycmVudC5hdHRhY2tlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSIsIi8vIENyZWF0ZSBQbGF5ZXIuXG4vLyBQbGF5ZXJzIGNhbiB0YWtlIHR1cm5zIHBsYXlpbmcgdGhlIGdhbWUgYnkgYXR0YWNraW5nIHRoZSBlbmVteSBHYW1lYm9hcmQuXG4vLyBUaGUgZ2FtZSBpcyBwbGF5ZWQgYWdhaW5zdCB0aGUgY29tcHV0ZXIsIHNvIG1ha2UgdGhlIOKAmGNvbXB1dGVy4oCZIGNhcGFibGUgb2YgbWFraW5nIHJhbmRvbSBwbGF5cy5cbi8vIFRoZSBBSSBkb2VzIG5vdCBoYXZlIHRvIGJlIHNtYXJ0LCBidXQgaXQgc2hvdWxkIGtub3cgd2hldGhlciBvciBub3QgYSBnaXZlbiBtb3ZlIGlzIGxlZ2FsIChpLmUuIGl0IHNob3VsZG7igJl0IHNob290IHRoZSBzYW1lIGNvb3JkaW5hdGUgdHdpY2UpLlxuXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQ7XG4gICAgfVxuXG4gICAgaW5pdE9wcG9uZW50KGJvYXJkKSB7XG4gICAgICAgIHRoaXMuZW5lbXlCb2FyZCA9IGJvYXJkO1xuICAgIH1cbiAgICBhaUF0dGFjaygpIHtcbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgbGV0IGdhbWVib2FyZCA9IHRoaXMuZ2FtZWJvYXJkOyBcbiAgICAgICAgbGV0IGdlblJhbmRvbSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYoZ2FtZWJvYXJkLmNhbkJlQXR0YWNrZWQoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGhpcyBnYW1lYm9hcmQgY2Fubm90IGJlIGF0dGFja2VkLicpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIGxldCBvdXRwdXQgPSBnYW1lYm9hcmQuZmluZE5vZGUoW3gsIHldKTtcbiAgICAgICAgICAgIGlmKCEob3V0cHV0LmF0dGFja2VkKSl7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gW291dHB1dC54LCBvdXRwdXQueV1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2VuUmFuZG9tKCk7XG4gICAgICAgIH1cbiAgICAgICAgZ2VuUmFuZG9tKCk7XG4gICAgICAgIGxldCBoaXQgPSB0aGlzLmF0dGFjayhyZXN1bHQpO1xuICAgICAgICAvLyByZXR1cm4gcmVzdWx0O1xuICAgICAgICByZXR1cm4gaGl0O1xuICAgIH1cbiAgICBhdHRhY2soYXJyKSB7XG4gICAgICAgIHRoaXMuZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGFycik7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5lbmVteUJvYXJkLmZpbmROb2RlKGFycilcbiAgICAgICAgaWYgKG5vZGUuc2hpcCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8gQmVnaW4geW91ciBhcHAgYnkgY3JlYXRpbmcgdGhlIFNoaXAgY2xhc3MvZmFjdG9yeSAoeW91ciBjaG9pY2UpLlxuLy8gWW91ciDigJhzaGlwc+KAmSB3aWxsIGJlIG9iamVjdHMgdGhhdCBpbmNsdWRlIHRoZWlyIGxlbmd0aCwgdGhlIG51bWJlciBvZiB0aW1lcyB0aGV54oCZdmUgYmVlbiBoaXQgYW5kIHdoZXRoZXIgb3Igbm90IHRoZXnigJl2ZSBiZWVuIHN1bmsuXG4vLyBSRU1FTUJFUiB5b3Ugb25seSBoYXZlIHRvIHRlc3QgeW91ciBvYmplY3TigJlzIHB1YmxpYyBpbnRlcmZhY2UuIE9ubHkgbWV0aG9kcyBvciBwcm9wZXJ0aWVzIHRoYXQgYXJlIHVzZWQgb3V0c2lkZSBvZiB5b3VyIOKAmHNoaXDigJkgb2JqZWN0IG5lZWQgdW5pdCB0ZXN0cy5cbi8vIFNoaXBzIHNob3VsZCBoYXZlIGEgaGl0KCkgZnVuY3Rpb24gdGhhdCBpbmNyZWFzZXMgdGhlIG51bWJlciBvZiDigJhoaXRz4oCZIGluIHlvdXIgc2hpcC5cbi8vIGlzU3VuaygpIHNob3VsZCBiZSBhIGZ1bmN0aW9uIHRoYXQgY2FsY3VsYXRlcyBpdCBiYXNlZCBvbiB0aGVpciBsZW5ndGggYW5kIHRoZSBudW1iZXIgb2Yg4oCYaGl0c+KAmS5cblxuXG4vLyBOby5cdENsYXNzIG9mIHNoaXBcdFNpemVcbi8vIDFcdENhcnJpZXJcdDVcbi8vIDJcdEJhdHRsZXNoaXBcdDRcbi8vIDNcdENydWlzZXJcdDNcbi8vIDRcdFN1Ym1hcmluZVx0M1xuLy8gNVx0RGVzdHJveWVyXHQyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUpIHtcblxuICAgICAgICBzd2l0Y2godHlwZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3MgPSAnQ2Fycmllcic7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gNTtcbiAgICAgICAgICAgICAgICB0aGlzLmludGVncml0eSA9IDU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzcyA9ICdCYXR0bGVzaGlwJztcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSA0O1xuICAgICAgICAgICAgICAgIHRoaXMuaW50ZWdyaXR5ID0gNDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzID0gJ0NydWlzZXInO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDM7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlZ3JpdHkgPSAzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3MgPSAnU3VibWFyaW5lJztcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAzO1xuICAgICAgICAgICAgICAgIHRoaXMuaW50ZWdyaXR5ID0gMztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzID0gJ0Rlc3Ryb3llcic7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gMjtcbiAgICAgICAgICAgICAgICB0aGlzLmludGVncml0eSA9IDI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0SW50ZWdyaXR5KGhwKSB7XG4gICAgICAgIGxldCBhcnJheSA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwO2k8aHA7aSsrKSB7XG4gICAgICAgICAgICBhcnJheS5wdXNoKDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW50ZWdyaXR5ID0gYXJyYXk7XG4gICAgfVxuXG4gICAgaGl0KHpvbmUpIHtcbiAgICAgICAgbGV0IGkgPSB0aGlzLmludGVncml0eTtcbiAgICAgICAgaVt6b25lXSA9IDA7XG4gICAgfVxuXG4gICAgaXNTdW5rKCkge1xuICAgICAgICBsZXQgaSA9IHRoaXMuaW50ZWdyaXR5O1xuICAgICAgICBpZihpLmluY2x1ZGVzKDEpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVpIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBjcmVhdGVHYW1lKGdhbWUpIHtcbiAgICAgICAgbGV0IHBsYXllcjFEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IHBsYXllcjJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBwbGF5ZXIxRGl2LmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZCcpO1xuICAgICAgICBwbGF5ZXIyRGl2LmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZCcpXG5cbiAgICAgICAgbGV0IHBsYXllcjEgPSBnYW1lLnBsYXllcjE7XG4gICAgICAgIGxldCBwbGF5ZXIyID0gZ2FtZS5wbGF5ZXIyO1xuXG4gICAgICAgIHRoaXMubm9kZUFycmF5MSA9IGdhbWUucGxheWVyMS5nYW1lYm9hcmQubm9kZUFycmF5KCk7XG4gICAgICAgIHRoaXMubm9kZUFycmF5MiA9IGdhbWUucGxheWVyMi5nYW1lYm9hcmQubm9kZUFycmF5KCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm5vZGVBcnJheTEuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBub2RlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXIxTm9kZScpO1xuICAgICAgICAgICAgbm9kZUVsZW1lbnQuZGF0YXNldC5jb29yZGluYXRlcyA9IFtub2RlLngsbm9kZS55XTtcbiAgICAgICAgICAgIHBsYXllcjFEaXYuYXBwZW5kQ2hpbGQobm9kZUVsZW1lbnQpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLm5vZGVBcnJheTIuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBub2RlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXIyTm9kZScpO1xuICAgICAgICAgICAgbm9kZUVsZW1lbnQuZGF0YXNldC5jb29yZGluYXRlcyA9IFtub2RlLngsbm9kZS55XTtcbiAgICAgICAgICAgIHBsYXllcjJEaXYuYXBwZW5kQ2hpbGQobm9kZUVsZW1lbnQpO1xuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgY29uc3QgZ2FtZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dhbWUnKVswXTtcblxuICAgICAgICBnYW1lRGl2LmFwcGVuZENoaWxkKHBsYXllcjFEaXYpO1xuICAgICAgICBnYW1lRGl2LmFwcGVuZENoaWxkKHBsYXllcjJEaXYpO1xuICAgIH1cblxuICAgIHVwZGF0ZVVpKGdhbWUpIHtcbiAgICAgICAgbGV0IG5vZGVBcnJheTEgPSBnYW1lLnBsYXllcjEuZ2FtZWJvYXJkLm5vZGVBcnJheSgpO1xuICAgICAgICBsZXQgbm9kZUFycmF5MiA9IGdhbWUucGxheWVyMi5nYW1lYm9hcmQubm9kZUFycmF5KCk7XG5cbiAgICAgICAgbm9kZUFycmF5MS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBsZXQgaHRtbEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucGxheWVyMU5vZGVbZGF0YS1jb29yZGluYXRlcz1cIiR7bm9kZS5jb29yZGluYXRlc31cIl1gKVswXTtcbiAgICAgICAgICAgIGh0bWxFbGVtZW50LmRhdGFzZXQuYXR0YWNrZWQgPSBub2RlLmF0dGFja2VkO1xuICAgICAgICAgICAgaWYobm9kZS5zaGlwICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaHRtbEVsZW1lbnQuZGF0YXNldC5zaGlwID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG5vZGUuYXR0YWNrZWQpIHtcbiAgICAgICAgICAgICAgICBodG1sRWxlbWVudC50ZXh0Q29udGVudCA9ICdYJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBub2RlQXJyYXkyLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGxldCBodG1sRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5wbGF5ZXIyTm9kZVtkYXRhLWNvb3JkaW5hdGVzPVwiJHtub2RlLmNvb3JkaW5hdGVzfVwiXWApWzBdO1xuICAgICAgICAgICAgaHRtbEVsZW1lbnQuZGF0YXNldC5hdHRhY2tlZCA9IG5vZGUuYXR0YWNrZWQ7XG4gICAgICAgICAgICBpZihub2RlLnNoaXAgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBodG1sRWxlbWVudC5kYXRhc2V0LnNoaXAgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYobm9kZS5hdHRhY2tlZCkge1xuICAgICAgICAgICAgICAgIGh0bWxFbGVtZW50LnRleHRDb250ZW50ID0gJ1gnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuICAgIG9uQ2xpY2soZ2FtZSkge1xuICAgICAgICBsZXQgdXBkYXRlVWkgPSB0aGlzLnVwZGF0ZVVpO1xuICAgICAgICBsZXQgZW5lbXlIdG1sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjJOb2RlJyk7XG4gICAgICAgIGVuZW15SHRtbC5mb3JFYWNoKChodG1sKSA9PiB7XG4gICAgICAgICAgICBodG1sLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgbGV0IGNvb3JkU3RyaW5nID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29vcmRpbmF0ZXM7XG4gICAgICAgICAgICAgICAgbGV0IHggPSBwYXJzZUludChjb29yZFN0cmluZ1swXSk7XG4gICAgICAgICAgICAgICAgbGV0IHkgPSBwYXJzZUludChjb29yZFN0cmluZ1syXSk7XG4gICAgICAgICAgICAgICAgZ2FtZS5wbGF5ZXIxLmF0dGFjayhbeCx5XSk7ICAgXG4gICAgICAgICAgICAgICAgdXBkYXRlVWkoZ2FtZSk7ICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnXG5cbmltcG9ydCBVaSBmcm9tICcuL3VpJ1xuXG5sZXQgdWkgPSBuZXcgVWk7IFxubGV0IGdhbWUgPSBuZXcgR2FtZTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICB1aS5jcmVhdGVHYW1lKGdhbWUpO1xuICAgIHVpLm9uQ2xpY2soZ2FtZSk7XG4gICAgdWkudXBkYXRlVWkoZ2FtZSk7XG59XG5cbmxldCBzaGlwUGhhc2UgPSB0cnVlO1xuXG5nYW1lLnBsYXllcjEuZ2FtZWJvYXJkLnBsYWNlU2hpcCgwLDAsMCx0cnVlKTtcbmdhbWUucGxheWVyMi5nYW1lYm9hcmQucGxhY2VTaGlwKDAsMCwwLHRydWUpO1xuXG5nYW1lLnBsYXllcjEuZ2FtZWJvYXJkLnBsYWNlU2hpcCgwLDQsNCxmYWxzZSk7XG5nYW1lLnBsYXllcjIuZ2FtZWJvYXJkLnBsYWNlU2hpcCgwLDQsNCxmYWxzZSk7XG5cbmdhbWUucGxheWVyMUF0dGFjayhbMSwwXSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9