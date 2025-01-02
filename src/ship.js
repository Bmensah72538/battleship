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

export default class Ship {
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
