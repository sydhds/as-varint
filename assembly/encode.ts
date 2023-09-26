// Required lengths of encoding buffers:

const U8_LEN: i32 = 2;
const U16_LEN: i32 = 3;
const U32_LEN: i32 = 5;
const U64_LEN: i32 = 10;
// const U128_LEN: i32 = 19;

export function encode<T>(number: T): StaticArray<u8> {
    if (number instanceof u8) {
        return u8Encode(number);
    } else if (number instanceof u16) {
        return u16Encode(number)
    } else if (number instanceof u32) {
        return u32Encode(number)
    } else if (number instanceof u64) {
        return u64Encode(number)
    } else {
        throw new Error("as-varint: type not supported");
    }
}

@inline
export function u8Encode(number: u8): StaticArray<u8> {
    let buffer = u8_buffer();

    let n = number;
    let i = 1;
    for(let idx= 0; idx<buffer.length; idx++) {
       buffer[idx] = (n as u8) | 0x80;
       n >>= 7;
       if (n == 0) {
           buffer[idx] &= 0x7f;
           break;
       }
       i+=1;
    }

    return buffer.slice<StaticArray<u8>>(0, i);
}

@inline
export function u16Encode(number: u16): StaticArray<u8> {
    let buf = u16_buffer();

    let n = number;
    let i = 1;
    for(let idx= 0; idx<buf.length; idx++) {
        buf[idx] = (n as u8) | 0x80;
        n >>= 7;
        if (n == 0) {
            buf[idx] &= 0x7f;
            break;
        }
        i+=1;
    }

    return buf.slice<StaticArray<u8>>(0, i);
}

@inline
export function u32Encode(number: u32): StaticArray<u8> {
    let buf = u32_buffer();

    let n = number;
    let i = 1;
    for(let idx= 0; idx<buf.length; idx++) {
        buf[idx] = (n as u8) | 0x80;
        n >>= 7;
        if (n == 0) {
            buf[idx] &= 0x7f;
            break;
        }
        i+=1;
    }

    return buf.slice<StaticArray<u8>>(0, i);
}

@inline
export function u64Encode(number: u64): StaticArray<u8> {
    let buf = u64_buffer();

    let n = number;
    let i = 1;
    for(let idx= 0; idx<buf.length; idx++) {

        let _dump = n as u8;
        // log<string>(`n as u8: ${_dump}`);
        buf[idx] = (n as u8) | 0x80;
        // log<string>(`b: ${buf[idx]}`);
        n >>= 7;
        // log<string>(`n: ${n}`);
        if (n == 0) {
            buf[idx] &= 0x7f;
            break;
        }
        i+=1;
    }

    return buf.slice<StaticArray<u8>>(0, i);
}

/// Create new array buffer for encoding of `u8` values.
@inline
export function u8_buffer(): StaticArray<u8> {
    return new StaticArray<u8>(U8_LEN);
}

@inline
export function u16_buffer(): StaticArray<u8> {
    return new StaticArray<u8>(U16_LEN);
}

@inline
export function u32_buffer(): StaticArray<u8> {
    return new StaticArray<u8>(U32_LEN);
}
@inline
export function u64_buffer(): StaticArray<u8> {
    return new StaticArray<u8>(U64_LEN);
}
