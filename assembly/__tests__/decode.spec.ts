import {
    u8Decode,
    u64Decode
} from "../decode";

describe("Decode u8 various", () => {
    it("Decode u8", () => {
        let _a0: Array<u8> = [0];
        let _a1: Array<u8> = [1];
        let _a127: Array<u8> = [127];
        let _a128: Array<u8> = [128, 1];
        let _a255: Array<u8> = [255, 1];
        let a0 = StaticArray.fromArray(_a0);
        let a1 = StaticArray.fromArray(_a1);
        let a127 = StaticArray.fromArray(_a127);
        let a128 = StaticArray.fromArray(_a128);
        let a255 = StaticArray.fromArray(_a255);

        expect<u8>(u8Decode(a0).value).toBe(0);
        expect<u8>(u8Decode(a1).value).toBe(1);
        expect<u8>(u8Decode(a127).value).toBe(127);
        expect<u8>(u8Decode(a128).value).toBe(128);
        expect<u8>(u8Decode(a255).value).toBe(255);
    });
});

describe("Decode u64 various", () => {
    it("Decode u64", () => {
        let _a0: Array<u8> = [0];
        let _a1: Array<u8> = [1];
        let _a127: Array<u8> = [127];
        let _a128: Array<u8> = [128, 1];
        let _a255: Array<u8> = [255, 1];
        let _a64Max: Array<u8> = [255, 255, 255, 255, 255, 255, 255, 255, 255, 1];
        let a0 = StaticArray.fromArray(_a0);
        let a1 = StaticArray.fromArray(_a1);
        let a127 = StaticArray.fromArray(_a127);
        let a128 = StaticArray.fromArray(_a128);
        let a255 = StaticArray.fromArray(_a255);
        let a64Max = StaticArray.fromArray(_a64Max);

        expect<u64>(u64Decode(a0).value).toBe(0);
        expect<u64>(u64Decode(a1).value).toBe(1);
        expect<u64>(u64Decode(a127).value).toBe(127);
        expect<u64>(u64Decode(a128).value).toBe(128);
        expect<u64>(u64Decode(a255).value).toBe(255);
        expect<u64>(u64Decode(a64Max).value).toBe(u64.MAX_VALUE);
    });
});

describe("Decode multi", () => {
    it("Decode multi u8 / u64", () => {
        let _a255: Array<u8> = [255, 1];
        let _a64Max: Array<u8> = [255, 255, 255, 255, 255, 255, 255, 255, 255, 1];

        let a = StaticArray.fromArray(_a255);
        a = a.concat(StaticArray.fromArray(_a64Max));

        let dec = u8Decode(a)
        expect<u8>(dec.value).toBe(255);
        expect(dec.offset).toBe(2);
        let new_a = a.slice<StaticArray<u8>>(dec.offset);
        let dec2 = u64Decode(a.slice<StaticArray<u8>>(dec.offset));
        expect<u64>(dec2.value).toBe(u64.MAX_VALUE);
    });
    it("Decode multi u64 / u64", () => {
        let _a255: Array<u8> = [255, 1];
        let _a64Max: Array<u8> = [255, 255, 255, 255, 255, 255, 255, 255, 255, 1];

        let a = StaticArray.fromArray(_a255);
        a = a.concat(StaticArray.fromArray(_a64Max));

        let dec = u64Decode(a)
        expect<u64>(dec.value).toBe(255);
        expect(dec.offset).toBe(2);
        let new_a = a.slice<StaticArray<u8>>(dec.offset);
        let dec2 = u64Decode(a.slice<StaticArray<u8>>(dec.offset));
        expect<u64>(dec2.value).toBe(u64.MAX_VALUE);
    });
});