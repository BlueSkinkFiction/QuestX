"use strict";



function setup() {
}


commands.unshift(new Cmd('DebugTestBikini', {
  regex:/^bikini$/,
  objects:[
  ],
  script:function(objects) {
    console.log("briefs loc = " + w.briefsblack.loc);
    console.log("briefs in lounge? " + w.briefsblack.isAtLoc("lounge", display.PARSER));
    console.log("briefs with Joanna? " + w.briefsblack.isAtLoc("Joanna", display.PARSER));
    console.log("briefs worn? " + w.briefsblack.getWorn());
    
    console.log("halter loc = " + w.halterblack.loc);
    console.log("halter in lounge? " + w.halterblack.isAtLoc("lounge", display.PARSER));
    console.log("halter with Joanna? " + w.halterblack.isAtLoc("Joanna", display.PARSER));
    console.log("halter worn? " + w.halterblack.getWorn());

    console.log("bikini in lounge? " + w.black_bikini.isAtLoc("lounge", display.PARSER));
    console.log("bikini with Joanna? " + w.black_bikini.isAtLoc("Joanna", display.PARSER));
    console.log("bikini worn? " + w.black_bikini.getWorn());
    console.log("bikini alias " + w.black_bikini.alias);
    console.log("bikini pattern " + w.black_bikini.regex);
    console.log(parser.scope(parser.isHere));
    console.log(parser.isHere(w.black_bikini));
    return SUCCESS;
  },
}));






