import { Province, sampleProvinceData } from "../code/Province.js";

describe('Province', () => {
    let asia;
    beforeEach(() => {
        asia = new Province(sampleProvinceData());
    });
    test('shortfall', () => {
        expect(asia.shortfall).toBe(5);
    });

    test('profit', () => {
        expect(asia.profit).toBe(230);
    });
    test('satisfiedDemand', () => {
        expect(asia.satisfiedDemand).toBe(25);
    });

    test('zero demand', function () {
        asia.demand = 0;
        expect(asia.shortfall).toBe(-25);
        expect(asia.profit).toBe(0);
    });
    test('negative demand', function () {
        asia.demand = -1;
        expect(asia.shortfall).toBe(-26);
        expect(asia.profit).toBe(-10);
    });

    test('empty string demand', function () {
        asia.demand = "";
        expect(asia.shortfall).NaN;
        expect(asia.profit).NaN;
    });
});

describe('no producers', function () {
    let noProducers;
    beforeEach(function () {
        const data = {
            name: "No proudcers",
            producers: [],
            demand: 30,
            price: 20
        };
        noProducers = new Province(data);
    });
    test('shortfall', function () {
        expect(noProducers.shortfall).toBe(30);
    });
    test('profit', function () {
        expect(noProducers.profit).toBe(0);
    })
});

describe('string for producers', function () {
    it('', function () {
        const data = {
            name: "String producers",
            producers: "",
            demand: 30,
            price: 20
        };
        const prov = new Province(data);
        expect(prov.shortfall).toBe(30);
    });

});