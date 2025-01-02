import Game from './game'

export default class Ui {
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
