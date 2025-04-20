#!/bin/sh

echo bundling...
npx \
	esbuild \
	main.mjs \
	--bundle \
	--outfile=./mid.js \
	--format=esm

echo building...
javy \
	build \
	-o main.wasm \
	mid.js
