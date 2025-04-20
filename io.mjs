/**
 * @typedef {number} FileDesc
 */

/** @type FileDesc */
export const STDIN = 0

/** @type FileDesc */
export const STDOUT = 1

/** @type FileDesc */
export const STDERR = 2

/**
 * Reads stdin and saves the contents to the buffer.
 * @param {Uint8Array} buffer The buffer to save the contents.
 * @returns {number} Number of bytes read.
 */
function stdin2buffer(buffer) {
  // @ts-ignore:
  return Javy.IO.readSync(STDIN, buffer)
}

/**
 * Reads stdin and yields chunks.
 * @generator
 * @yields {Uint8Array}
 */
function* stdin2chunks() {
  const buf = new Uint8Array(1024)
  while (true) {
    /** @type number */
    const bytesRead = stdin2buffer(buf)

    if (0 == bytesRead) return

    /** @type Uint8Array */
    const sub = buf.subarray(0, bytesRead)

    yield sub
  }
}

/**
 * Converts the chunks to an array of bytes.
 * @param {Iterable<Uint8Array>} chunks The chunks to be converted.
 * @returns {Uint8Array}
 */
function chunks2bytes(chunks) {
  /** @type Uint8Array[] */
  const reduced = []

  for (const chunk of chunks) {
    reduced.push(chunk)
  }

  /** @type number */
  const totalBytes = reduced.reduce((state, next) => {
    /** @type number */
    const sz = next.length
    return sz + state
  }, 0)

  return reduced.reduce((state, next) => {
    /** @type number */
    const offset = state.offset

    /** @type Uint8Array */
    const arr = state.array

    arr.set(next, offset)

    /** @type number */
    const sz = next.length

    return {
      offset: offset + sz,
      array: arr,
    }
  }, { offset: 0, array: new Uint8Array(totalBytes) })
    .array
}

/**
 * Converts the bytes(utf-8) to a string.
 * @param {Uint8Array} bytes The bytes to be decoded.
 * @returns {string} The decoded string.
 */
function bytes2string(bytes) {
  return new TextDecoder().decode(bytes)
}

/**
 * Reads stdin as a string.
 * @returns {string}
 */
export function stdin2string() {
  /** @type Iterable<Uint8Array> */
  const chunks = stdin2chunks()

  /** @type Uint8Array */
  const bytes = chunks2bytes(chunks)

  return bytes2string(bytes)
}

/**
 * Writes the bytes to stdout.
 * @param {Uint8Array} bytes The bytes to be written.
 * @returns {Void}
 */
function bytes2stdout(bytes) {
  // @ts-ignore:
  Javy.IO.writeSync(STDOUT, bytes)
}

/**
 * Converts the string to utf8 bytes.
 * @param {string} s The string to be encoded.
 * @returns {Uint8Array}
 */
function string2bytes(s) {
  return new TextEncoder().encode(s)
}

/**
 * Writes the string to stdout.
 * @param {string} s The string to be written.
 * @returns {Void}
 */
export function string2stdout(s) {
  /** @type Uint8Array */
  const bytes = string2bytes(s)
  return bytes2stdout(bytes)
}
