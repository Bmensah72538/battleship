// Create Player.
// Players can take turns playing the game by attacking the enemy Gameboard.
// The game is played against the computer, so make the ‘computer’ capable of making random plays.
// The AI does not have to be smart, but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice).

import Gameboard from './gameboard'

export default class Player {
    constructor() {
        this.gameboard = new Gameboard;
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