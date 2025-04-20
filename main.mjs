import { stdin2string, string2stdout } from "./io.mjs"

import JSON5 from "json5"

/** @type string */
const input = stdin2string()

/** @type object */
const parsed = JSON5.parse(input)

/** @type string */
const converted = JSON.stringify(parsed)

string2stdout(converted)
