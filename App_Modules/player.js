// Create Player.
// Players can take turns playing the game by attacking the enemy Gameboard.
// The game is played against the computer, so make the ‘computer’ capable of making random plays.
// The AI does not have to be smart, but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice).

const Gameboard = require("./gameboard");

class Player {
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
            }
            genRandom();
        }
        genRandom();
        this.attack(result);
        return result;
    }
    attack(arr) {
        this.enemyBoard.receiveAttack(arr);
        return;
    }
}

module.exports = Player;