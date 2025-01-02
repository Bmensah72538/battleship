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

import Player from './player'

export default class Game {
    constructor() {
        this.player1 = new Player;
        this.player2 = new Player;
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