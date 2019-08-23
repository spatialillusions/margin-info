'use strict';

module.exports.margininfo = (event, context, callback) => {

  var fs = require("fs");  // File System
  var vm = require("vm");  // V8 Virtual Machine

  var svg;

  switch (event.method) {
  case "scalebar":
      var context = fs.readFileSync("./scalebar.js")
      vm.runInThisContext(context)
      svg = scalebar(event.args[0],
              event.args[1],
              event.args[2],
              event.args[3]);
      break;
  case "slope":
      var context = fs.readFileSync("./slopeguide.js")
      vm.runInThisContext(context)
      svg = slopeguide(event.args[0],
              event.args[1]);
      break;
  case "grid":
      var context = fs.readFileSync("./griddeclinationdiagram.js")
      vm.runInThisContext(context)
      svg = griddeclinationdiagram(parseFloat(event.args[0]),
              parseFloat(event.args[1]),
              event.args[2],
              event.args[3],
              event.args[4]);
      break;
  default:
      console.log('You entered these parameters: ', event.args);
      // console.log(usage);
  }

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    event: event,
    method: event.method,
    body: svg
  };


  callback(null, response);
};
