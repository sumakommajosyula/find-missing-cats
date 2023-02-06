/**
 * File Description : This test file is used to test all the functions used in controller file
 * Author : Suma K
 */
const controllerTest = require('../src/controller');

describe(`Testing 'turns' function`, () => {
    test("Facing North & turns left - changes direction to West", () => {
        var result = controllerTest.turn(0, 'left');
        expect(result).toStrictEqual({ facing: 3 });
    })
    test("Facing North & turns right - changes direction to East", () => {
        var result = controllerTest.turn(0, 'right');
        expect(result).toStrictEqual({ facing: 1 });
    })

    test("Facing East & turns left - changes direction to North", () => {
        var result = controllerTest.turn(1, 'left');
        expect(result).toStrictEqual({ facing: 0 });
    })
    test("Facing East & turns right - changes direction to South", () => {
        var result = controllerTest.turn(1, 'right');
        expect(result).toStrictEqual({ facing: 2 });
    })

    test("Facing South & turns left - changes direction to East", () => {
        var result = controllerTest.turn(2, 'left');
        expect(result).toStrictEqual({ facing: 1 });
    })
    test("Facing South & turns right - changes direction to West", () => {
        var result = controllerTest.turn(2, 'right');
        expect(result).toStrictEqual({ facing: 3 });
    })

    test("Facing West & turns left - changes direction to South", () => {
        var result = controllerTest.turn(3, 'left');
        expect(result).toStrictEqual({ facing: 2 });
    })
    test("Facing West & turns right - changes direction to North", () => {
        var result = controllerTest.turn(3, 'right');
        expect(result).toStrictEqual({ facing: 0 });
    })
})

describe(`Testing 'displace' function`, () => {
    const facings = ['North', 'East', 'South', 'West'];
    test("Facing North - moves by 1 unit on positive y-axis", () => {
        var result = controllerTest.displace({ facing: 0, x: 0, y: 0 }, facings);
        expect(result).toStrictEqual({ y: 1 });
    })

    test("Facing East - moves by 1 unit on positive x-axis", () => {
        var result = controllerTest.displace({ facing: 1, x: 0, y: 0 }, facings);
        expect(result).toStrictEqual({ x: 1 });
    })

    test("Facing South - moves by 1 unit on negative y-axis", () => {
        var result = controllerTest.displace({ facing: 2, x: 0, y: 2 }, facings);
        expect(result).toStrictEqual({ y: 1 });
    })

    test("Facing West - moves by 1 unit on negative x-axis", () => {
        var result = controllerTest.displace({ facing: 3, x: 2, y: 0 }, facings);
        expect(result).toStrictEqual({ x: 1 });
    })
})

describe(`Testing 'turnOrDisplace' function`, () => {
    test("Get next direction using current direction as left", () => {
        var result = controllerTest.turnOrDisplace({ facing: 3, x: 0, y: 0 }, 'left');
        expect(result).toStrictEqual({ facing: 2, x: 0, y: 0 });
    })
    test("Get next direction using current direction as right", () => {
        var result = controllerTest.turnOrDisplace({ facing: 3, x: 0, y: 0 }, 'right');
        expect(result).toStrictEqual({ facing: 0, x: 0, y: 0 });
    })
    test("Get next direction using current direction as forward", () => {
        var result = controllerTest.turnOrDisplace({ facing: 3, x: 2, y: 0 }, 'forward');
        expect(result).toStrictEqual({ facing: 3, x: 1, y: 0 });
    })
})