export function u8Decode(buffer: StaticArray<u8>): u8 {
    const max_bytes = 1;
    let n: u8 = 0;
    // let i = 0;
    for (let idx = 0; idx < buffer.length; idx++) {
        let k = (buffer[idx] & 0x7F) as u8;
        n |= (k << (idx*7 as u8));
        if (is_last(buffer[idx])) {
           if (buffer[idx] == 0 && idx > 0) {
               // TODO: err NotMinimal
               return 0;
           }
           return n;
        }
        if (idx == max_bytes) {
            // TODO: err Overflow
            return 0;
        }
    }
    // TODO: err Insufficient
    return 0;
}

export function u64Decode(buffer: StaticArray<u8>): u64 {
    const max_bytes = 9;
    let n: u64 = 0;
    // let i = 0;
    for (let idx = 0; idx < buffer.length; idx++) {
        let k = (buffer[idx] & 0x7F) as u64;
        n |= (k << (idx*7 as u64));
        if (is_last(buffer[idx])) {
            if (buffer[idx] == 0 && idx > 0) {
                // TODO: err NotMinimal
                return 0;
            }
            return n;
        }
        if (idx == max_bytes) {
            // TODO: err Overflow
            return 0;
        }
    }
    // TODO: err Insufficient
    return 0;
}

function is_last(b: u8): boolean {
    return (b & 0x80) == 0;
}