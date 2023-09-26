
enum DecodeError {
    // No error
    None,
    // Not enough input bytes.
    Insufficient,
    // Input bytes exceed maximum.
    Overflow,
    // Encoding is not minimal (has trailing zero bytes).
    NotMinimal,
}

class Decode<T> {
    value: T = <T>0;
    offset: i32 = 0
    error: DecodeError = DecodeError.None

    static fromDecodeError<T>(err: DecodeError): Decode<T> {
        let ret = new Decode<T>();
        ret.error = err;
        return ret;
    }

    static fromValue<T>(value: T, index: i32): Decode<T> {
        let ret = new Decode<T>();
        ret.value = value;
        ret.offset = index;
        return ret;
    }
}

export function u8Decode(buffer: StaticArray<u8>): Decode<u8> {
    const max_bytes = 1;
    let n: u8 = 0;
    for (let idx = 0; idx < buffer.length; idx++) {
        let k = (buffer[idx] & 0x7F) as u8;
        n |= (k << (idx*7 as u8));
        if (is_last(buffer[idx])) {
            if (buffer[idx] == 0 && idx > 0) {
                return Decode.fromDecodeError<u8>(DecodeError.NotMinimal);
            }
            return Decode.fromValue(n, idx+1);
        }
        if (idx == max_bytes) {
            return Decode.fromDecodeError<u8>(DecodeError.Overflow);
        }
    }
    return Decode.fromDecodeError<u8>(DecodeError.Insufficient);
}

export function u16Decode(buffer: StaticArray<u8>): Decode<u16> {
    const max_bytes = 2;
    let n: u16 = 0;
    for (let idx = 0; idx < buffer.length; idx++) {
        let k = (buffer[idx] & 0x7F) as u16;
        n |= (k << (idx*7 as u16));
        if (is_last(buffer[idx])) {
            if (buffer[idx] == 0 && idx > 0) {
                return Decode.fromDecodeError<u16>(DecodeError.NotMinimal);
            }
            return Decode.fromValue(n, idx+1);
        }
        if (idx == max_bytes) {
            return Decode.fromDecodeError<u16>(DecodeError.Overflow);
        }
    }
    return Decode.fromDecodeError<u16>(DecodeError.Insufficient);
}

export function u32Decode(buffer: StaticArray<u8>): Decode<u8> {
    const max_bytes = 4;
    let n: u32 = 0;
    for (let idx = 0; idx < buffer.length; idx++) {
        let k = (buffer[idx] & 0x7F) as u32;
        n |= (k << (idx*7 as u32));
        if (is_last(buffer[idx])) {
            if (buffer[idx] == 0 && idx > 0) {
                return Decode.fromDecodeError<u32>(DecodeError.NotMinimal);
            }
            return Decode.fromValue(n, idx+1);
        }
        if (idx == max_bytes) {
            return Decode.fromDecodeError<u32>(DecodeError.Overflow);
        }
    }
    return Decode.fromDecodeError<u32>(DecodeError.Insufficient);
}

export function u64Decode(buffer: StaticArray<u8>): Decode<u64> {
    const max_bytes = 9;
    let n: u64 = 0;
    // let i = 0;
    for (let idx = 0; idx < buffer.length; idx++) {
        let k = (buffer[idx] & 0x7F) as u64;
        n |= (k << (idx*7 as u64));
        if (is_last(buffer[idx])) {
            if (buffer[idx] == 0 && idx > 0) {
                return Decode.fromDecodeError<u64>(DecodeError.NotMinimal);
            }
            return Decode.fromValue(n, idx+1);
        }
        if (idx == max_bytes) {
            return Decode.fromDecodeError<u64>(DecodeError.Overflow);
        }
    }
    return Decode.fromDecodeError<u64>(DecodeError.Insufficient);
}

function is_last(b: u8): boolean {
    return (b & 0x80) == 0;
}