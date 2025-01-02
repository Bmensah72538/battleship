// No.	Class of ship	Size
// 1	Carrier	5
// 2	Battleship	4
// 3	Cruiser	3
// 4	Submarine	3
// 5	Destroyer	2

const Ship = require('./ship');
const test1 = new Ship(0);
const test2 = new Ship(1);
const test3 = new Ship(2);
const test4 = new Ship(3);
const test5 = new Ship(4);

test('Creates objects with class properties akin to battleships', () =>{
    expect(test1).toHaveProperty('class', 'Carrier');
    expect(test2).toHaveProperty('class', 'Battleship');
    expect(test3).toHaveProperty('class', 'Cruiser');
    expect(test4).toHaveProperty('class', 'Submarine');
    expect(test5).toHaveProperty('class', 'Destroyer');
})

test('Creates objects with size properties akin to battleships', () =>{
    expect(test1).toHaveProperty('size', 5);
    expect(test2).toHaveProperty('size', 4);
    expect(test3).toHaveProperty('size', 3);
    expect(test4).toHaveProperty('size', 3);
    expect(test5).toHaveProperty('size', 2);
})

test('Can record information on damage taken, and whether ship has sunk', () => {
    expect(test5.hit).toBeTruthy;
    expect(test5.integrity.length).toBe(2);
    test5.hit(0);
    expect(test5.isSunk()).toBe(false);
    test5.hit(1);
    expect(test5.isSunk()).toBe(true);

})