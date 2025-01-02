// Create Gameboard class/factory.
// Note that we have not yet created any User Interface. We should know our code is coming together by running the tests. 
// You shouldn’t be relying on console.log or DOM methods to make sure your code is doing what you expect it to.
// Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
// Gameboards should have a receiveAttack function that takes a pair of coordinates, 
// determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.

import Ship from './ship'

export class Node {
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

export default class Gameboard {
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
        let ship = new Ship(type);
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