import {encode, u64Encode, u8Encode} from "../";

describe("Encode u8 various", () => {
    it("Encode u8", () => {

        let e0: Array<u8> = [0];
        let e1: Array<u8> = [1];
        let e127: Array<u8> = [127];
        let e128: Array<u8> = [128, 1];
        let e255: Array<u8> = [255, 1];

        {
            let a: u8 = 0;
            let aEnc = u8Encode(a);
            expect(aEnc).toStrictEqual(StaticArray.fromArray(e0));
        }
        {
            let a: u8 = 1;
            let aEnc = u8Encode(a);
            expect(aEnc).toStrictEqual(StaticArray.fromArray(e1));
        }
        {
            let a: u8 = 127;
            let aEnc = u8Encode(a);
            expect(aEnc).toStrictEqual(StaticArray.fromArray(e127));
        }
        {
            let a: u8 = 128;
            let aEnc = u8Encode(a);
            expect(aEnc).toStrictEqual(StaticArray.fromArray(e128));
        }
        {
            let a: u8 = 255;
            let aEnc = u8Encode(a);
            expect(aEnc).toStrictEqual(StaticArray.fromArray(e255));
        }
        {
            let a: u8 = 255;
            let aEnc = encode<u8>(a);
            expect(aEnc).toStrictEqual(StaticArray.fromArray(e255));
        }
    });
});

describe("Encode u64 various", () => {
    it("Encode u64", () => {

        let e0: Array<u8> = [0];
        let e1: Array<u8> = [1];
        let e127: Array<u8> = [127];
        let e128: Array<u8> = [128, 1];
        let e255: Array<u8> = [255, 1];
        let e64Max: Array<u8> = [255, 255, 255, 255, 255, 255, 255, 255, 255, 1];

        {
            let a: u64 = 0;
            let aEnc = u64Encode(a);
            // log<string>(`aEnc: ${aEnc.toString()}`);
            expect(aEnc).toStrictEqual(StaticArray.fromArray(e0));
        }
        {
            let a: u64 = 1;
            let aEnc = u64Encode(a);
            expect(aEnc).toStrictEqual(StaticArray.fromArray(e1));
        }
        {
            let a: u64 = u64.MAX_VALUE;
            let aEnc = u64Encode(a);
            expect(aEnc).toStrictEqual(StaticArray.fromArray(e64Max));
        }
    });
});

