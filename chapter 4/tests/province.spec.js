import { Province, sampleProvinceData } from "../code/Province.js";

describe('Province', () => {
    test('should be there, baby', () => {
        const p = new Province(sampleProvinceData());
    });
});

