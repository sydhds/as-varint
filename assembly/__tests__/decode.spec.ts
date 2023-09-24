import {u64Decode, u8Decode} from "../decode";

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

        expect<u8>(u8Decode(a0)).toBe(0);
        expect<u8>(u8Decode(a1)).toBe(1);
        expect<u8>(u8Decode(a127)).toBe(127);
        expect<u8>(u8Decode(a128)).toBe(128);
        expect<u8>(u8Decode(a255)).toBe(255);
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

        expect<u64>(u64Decode(a0)).toBe(0);
        expect<u64>(u64Decode(a1)).toBe(1);
        expect<u64>(u64Decode(a127)).toBe(127);
        expect<u64>(u64Decode(a128)).toBe(128);
        expect<u64>(u64Decode(a255)).toBe(255);
        expect<u64>(u64Decode(a64Max)).toBe(u64.MAX_VALUE);
    });
});