#!/bin/sh

echo "{
  helo: 42, // a number
  wrld: 'hh', // using '
  height: NaN, /* com */
  width: Infinity,
  length: +0,
  weight: .5,
  nested: [
    {name: 'helo', val: 42},
    {name: 'o2', val: 3776},
  ],
}" |
	wazero \
		run \
		main.wasm
