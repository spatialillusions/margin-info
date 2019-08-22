#!/usr/bin/env node
var args = process.argv.slice(2);

var fs = require("fs")  // File System
var vm = require("vm")  // V8 Virtual Machine

// Read in Javascript functions, without making any modifications specific to Node

var svg = ""
var usage = `Library for generating margin information for maps in SVG format.  https://github.com/spatialillusions/margin-info
Output is SVG
General usage:  margin-info [scalebar | slope | grid]

### Scale examples
margin-info scalebar scale showkm showmiles shownautical
margin-info scalebar 50000  true true true  # Km, Mi, Nautical
margin-info scalebar 50000  false true true #     Mi, Nautical
margin-info scalebar 50000  true false true # Km,     Nautical
margin-info scalebar 250000 true true true  # Km, Mi, Nautical

### Slope examples
margin-info slope scale contourInterval
margin-info slope 50000 40
margin-info slope 50000 10

### Grid examples
margin-info grid TrueNorth MagneticNorth year zone color
margin-info grid  0.6   3.6 2016 11S black
margin-info grid -0.08 11.3 2016 11S black
`


// Process
switch (args[0]) {
case "scalebar":
    var context = fs.readFileSync("./dist/scalebar.js")
    vm.runInThisContext(context)
    svg = scalebar(args[1],
            stringToBool(args[2]),
            stringToBool(args[3]),
            stringToBool(args[4]));
    break;
case "slope":
    var context = fs.readFileSync("./dist/slopeguide.js")
    vm.runInThisContext(context)
    svg = slopeguide(args[1],
            parseInt(args[2]));
    break;
case "grid":
    var context = fs.readFileSync("./dist/griddeclinationdiagram.js")
    vm.runInThisContext(context)
    svg = griddeclinationdiagram(parseFloat(args[1]),
            parseFloat(args[2]),
            args[3],
            args[4],
            args[5]);
    break;
default:
    console.log('You entered these parameters: ', args);
    console.log(usage);
}


// From
//   https://stackoverflow.com/a/10727873
function stringToBool(str) {
    var bool;
    if (str.match(/^(true|1|yes)$/i) !== null) {
        bool = true;
    } else if (str.match(/^(false|0|no)*$/i) !== null) {
        bool = false;
    } else {
        bool = null;
        if (console) console.log('"' + str + '" is not a boolean value');
    }
    return bool;
}

// Output results
console.log(svg);
