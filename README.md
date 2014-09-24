# Figment.js

[![NPM version](https://badge.fury.io/js/figment.png)](http://badge.fury.io/js/figment)
[![Build Status](https://travis-ci.org/internet-research-labs/Figment.js.png?branch=master)](https://travis-ci.org/internet-research-labs/Figment.js)

Figment is a framework for importing-exporting 3D object files in NodeJS.
Specifically, it contains an simple, intermediary data type that allows all
optimization to occur in the Importer/Exporter of the file format, so that all
optimizations occur outside of the main class. This allows easy conversion
between object types.

This powers online file converters and WebAPIs, as well as a command-line tool:
`figure`.

## About

`figment` is a set of tools used for converting between 3D-object file-types in
NodeJS. Additionally, a related project exists called `figure` which is a
command-line tool, using `figment`.

Note that `figment` is written from the ground-up to work in both a browser
(via **AMD**).

## Author

[mattvv/e](http://twitter.com/mattvvhatever)

## Install

I don't really know how to help you with this. If you need a command-line tool,
go to:

[http://github.com/mattvvhat/figure](http://github.com/mattvvhat/figure)

Otherwise, in your packages

`npm install figure`

# LICENSE

MIT
