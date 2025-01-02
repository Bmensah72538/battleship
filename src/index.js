import Game from './game'

import Ui from './ui'

let ui = new Ui; 
let game = new Game;

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