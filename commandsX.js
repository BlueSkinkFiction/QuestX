"use strict";



commands.unshift(new Cmd('Snog', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(snog|make out with|make out|french kiss) (.+)$/,
  objects:[
    {scope:parser.isNpcAndHere},
  ],
  script:function(objects) {
    
  },
}));





function cmdFuck(char, target, bodypart, sextoy) {
  if (char.hasBodyPart("cock") || sextoy) {
    if (bodypart === undefined) bodypart = target.hasBodyPart("pussy") ? w.pussy : w.ass
    if (!target.npc) {
      failedmsg("That's for people not things.")
      return FAILED
    }

    if (sextoy && !sextoy.sextoy) {
      failedmsg("You cannot use " + sextoy.byname({article:DEFINITE}) + " that way.")
      return FAILED
    }

    if (bodypart && !bodypart.bodypart) {
      failedmsg("Not sure how that would work with " + bodypart.byname({article:DEFINITE}) + ".")
      return FAILED
    }
    
    if (bodypart && !bodypart.canBePenetrated) {
      failedmsg("You cannot put anything in " + bodypart.byname({article:INDEFINITE}) + ".")
      return FAILED
    }
    
    const g = target.getOuterWearing(bodypart.getSlot())
    if (g) {
      failedmsg("You cannot do that while " + target.byname({article:DEFINITE}) + " is wearing " + g.byname({article:INDEFINITE}) + ".")
      return FAILED
    }
    
    const g2 = char.getOuterWearing("crotch")
    if (g2 && !sextoy) {
      failedmsg("Not while " + char.byname({article:DEFINITE}) +  " is wearing " + g2.byname({article:INDEFINITE}) + ".")
      return FAILED
    }

    return target.fuck(char, bodypart, sextoy);
  }
  
  else if (target.hasBodyPart("cock") && char.hasBodyPart("pussy")) {
    if (bodypart) {
      failedmsg("Not sure how " + char.byname({article:DEFINITE}) + " is going to do that.")
      return FAILED
    }
    
    const g = target.getOuterWearing("crotch")
    if (g) {
      failedmsg("You cannot do that while " + target.byname({article:DEFINITE}) + " is wearing " + g.byname({article:INDEFINITE}) + ".")
      return FAILED
    }
    
    const g2 = char.getOuterWearing("crotch")
    if (g2) {
      failedmsg("Not while " + char.byname({article:DEFINITE}) +  " is wearing " + g2.byname({article:INDEFINITE}) + ".")
      return FAILED
    }

    return target.girlOnTop(char);
  }  
  
  else {
    failedmsg("Not sure how that would work. Sorry.")
    return FAILED
  }
}



commands.unshift(new Cmd("Fuck1", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(fuck|penetrate|pleasure|shag|bonk) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    const target = objects[0][0]
    return cmdFuck(char, objects[0][0])
  },
}));

commands.unshift(new Cmd("Fuck3", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(push|insert|force|thrust)( my| your| his| her|) (cock|dick) in (.+)'s (.+)$/,
  objects:[
    {ignore:true},
    {ignore:true},
    {ignore:true},
    {scope:parser.isNpcAndHere},
    {scope:parser.isBodyPart},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    return cmdFuck(char, objects[0][0], objects[1][0])    
  },
}));

commands.unshift(new Cmd("Fuck4", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(fuck|penetrate|pleasure) (.+)'s (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isHere},
    {scope:parser.isNpcAndHere},
    {scope:parser.isBodyPart},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    return cmdFuck(char, objects[0][0], objects[1][0])
  },
}));

commands.unshift(new Cmd("Fuck5", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(ass fuck) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    const target = objects[0][0]
    return cmdFuck(char, objects[0][0], w.ass)
  },
}));

commands.unshift(new Cmd("Fuck6", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(face fuck) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    return cmdFuck(char, objects[0][0], w.mouth)
  },
}));

commands.unshift(new Cmd("Sextoy1", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(fuck|penetrate|pleasure) (.+) with (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
    {scope:parser.isHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    return cmdFuck(char, objects[0][0], undefined, objects[1][0])
  },
}));

commands.unshift(new Cmd("Sextoy5", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(ass fuck) (.+) with (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
    {scope:parser.isHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    return cmdFuck(char, objects[0][0], undefined, objects[1][0])
  },
}));

commands.unshift(new Cmd("Sextoy6", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(face fuck) (.+) with (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
    {scope:parser.isHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    return cmdFuck(char, objects[0][0], undefined, objects[1][0])
  },
}));

commands.unshift(new Cmd("Sextoy2", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(push|insert|force|thrust) (.+) in (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isHere},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    return cmdFuck(char, objects[1][0], undefined, objects[0][0])
  },
}));


commands.unshift(new Cmd("Sextoy3", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(push|insert|force|thrust) (.+) in (.+)'s (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isHere},
    {scope:parser.isNpcAndHere},
    {scope:parser.isBodyPart},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    return cmdFuck(char, objects[1][0], objects[2][0], objects[0][0])
  },
}));

commands.unshift(new Cmd("Sextoy4", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(fuck|penetrate|pleasure) (.+)'s (.+) with (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isHere},
    {scope:parser.isNpcAndHere},
    {scope:parser.isBodyPart},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    return cmdFuck(char, objects[0][0], objects[1][0], objects[2][0])
  },
}));











//----  Interactions ----


erotica.ACTIONS = [
  {
    name:'grope',
    pattern:'grope|feel|caress|finger|massage|stroke',
    mustBeBare:false,
    intimateRating:3,
    reflexive:true,  // you can readily do this to yourself
    defaultBodyPart:"buttock",
  },
  
  {
    name:'suck',
    pattern:'suck off|suck|blow off|blow',
    mustBeBare:true,
    intimateRating:10,
    bodypartCheck(bp) {
      return ["cock", "ball", "tit"].includes(bp.name);
    },
  },

  {
    name:'lick',
    pattern:'lick|taste',
    mustBeBare:true,
    intimateRating:8,
  },

  {
    name:'kiss',
    mustBeBare:true,
    intimateRating:7,
    defaultBodyPart:"mouth",
  },

  {
    name:'smack',
    pattern:'smack|slap',
    mustBeBare:false,
    intimateRating:1,
    reflexive:true,
    defaultBodyPart:"buttock",
  },
]

erotica.ACTIONS_LIST = []
for (let i = 0; i < erotica.ACTIONS.length; i++) {
  if (erotica.ACTIONS[i].pattern) {
    erotica.ACTIONS_LIST.push(erotica.ACTIONS[i].pattern);
  }
  else {
    erotica.ACTIONS_LIST.push(erotica.ACTIONS[i].name);
  }
}

// This also catches GROPE JOANNA, etc.
commands.unshift(new Cmd('SexActionsMy', {
  npcCmd:true,
  regex:new RegExp("^(" + erotica.ACTIONS_LIST.join('|') + ") (my |your |his |her |)(left |right |)(.+)$"),
  objects:[
    {text:true},
    {ignore:true},
    {text:true},
    {scope:parser.isBodyPart}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdInteract(objects[0], char, game.player, objects[2][0], objects[1]);
  },
}));






commands.unshift(new Cmd("SexActions", {
  npcCmd:true,
  regex:new RegExp("^(" + erotica.ACTIONS_LIST.join('|') + ") (.+)'s (left |right |)(.+)$"),
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
    {text:true},
    {scope:parser.isBodyPart}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdInteract(objects[0], char, objects[1][0], objects[3][0], objects[2]);
  },
}));

commands.unshift(new Cmd("SexActionsNoBP", {
  npcCmd:true,
  regex:new RegExp("^(" + erotica.ACTIONS_LIST.join('|') + ") (.+)$"),
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdInteract(objects[0], char, '', objects[1][0], '');
  },
}));

function cmdInteract(actionName, char, object, bodypart, side, altName) {
    const regex = new RegExp("\\b" + actionName + "\\b");
    let verb = false;
    for (let i = 0; i < erotica.ACTIONS.length; i++) {
      if (erotica.ACTIONS[i].pattern) {
        if (regex.test(erotica.ACTIONS[i].pattern)) verb = erotica.ACTIONS[i];
      }
      else {
        if (actionName === erotica.ACTIONS[i].name) verb = erotica.ACTIONS[i];
      }
    }
    if (!verb) {
      errormsg("Failed to find an action, " + actionName + ", despite it being recognised. Odd.");
      return FAILED;
    }

  if (!bodypart.isBodyPart) {
    if (verb.defaultBodyPart) {
      object = bodypart
      bodypart = w[verb.defaultBodyPart]
    }
    else {
      failedmsg("I was expecting a body part at the end of that. Quite the disappointment!");
      return FAILED;
    }
  }
  if (!verb.reflexive && (bodypart.name !== 'arm' || bodypart.name !== 'hand') && char === object) {
    failedmsg("You would need to be some sort of contortionist to do that!");
    return FAILED;
  }
  if (!bodypart.paired && side !== '') {
    failedmsg("I was not expecting that body part to have a left and right!");
    return FAILED;
  }
  if (verb.bodypartCheck && !verb.bodypartCheck(bodypart)) {
    failedmsg("That is not a body part you can do that with, is it?");
    return FAILED;
  }
  if (!char.canManipulate(object, "grope")) {
    return FAILED;
  }
  if (!char.getAgreement("Interact", object, verb, bodypart, altName ? altName : actionName)) {
    // The getAgreement should give the response
    return FAILED;
  }
  if (!object.hasBodyPart(bodypart)) {
    failedmsg(nounVerb(object, "don't", true) + " have " + bodypart.none() + ".");
    return FAILED;
  }
  else {
    const garment = bodypart.getProtection(object);
    if (verb.mustBeBare && garment) {
      failedmsg(nounVerb(char, "can't", true) + " do that when " + object.byname({article:DEFINITE}) + " is wearing " + garment.byname({article:DEFINITE}) + ".");
      return FAILED;
    }
    
    //console.log(char.name + ":" + verb.name + ":" + bodypart.name + ":" + side + ":" + altName)
    let rating = object.attractionTo(char) + object.arousal / 4
    if (bodypart) rating -= bodypart.getIntimateRating(object) * 5
    if (char.reputation) rating -= char.reputation
    if (object === game.player) rating = 100  // you want it done to yourself
    
    const params = {
      boss:game.player,
      actor:char,
      target:object,
      action:verb.name,
      garment:bodypart.getCovering(object),
      bodypart:bodypart,
      side:side,
      bpadj:object.getBodyPartAdjective(bodypart.name),
      bpname:bodypart.getName(side),
      rating:rating,
    }
    if (object.restraint) params.restraint = w[target.restraint]

    object.actionResponse(params);
    return SUCCESS;
  }
}

erotica.wankScriptReversed = function(objects) {
  return erotica.wankScript(objects.reverse())
}
erotica.wankScript = function(objects) {
  const char = extractChar(this, objects)
  if (!char) return FAILED;
  const verb = objects[0];
  let target
  if (this.name.indexOf("Self") === -1) {
    target = objects[1][0];
  }
  else {
    target = char
  }
  //console.log(verb);
  if (target.hasBodyPart("cock") && !verb.startsWith("jill") && !verb.startsWith("flick")) {
    return cmdInteract("grope", char, target, w.cock, '', verb)
  }
  if (target.hasBodyPart("pussy") && !verb.startsWith("jerk") && !verb.startsWith("jack") && !verb.startsWith("rub") && !verb.endsWith("tug")) {
    return cmdInteract("grope", char, target, w.pussy, '', verb)
  }
  if (verb.startsWith("jill") || verb.startsWith("flick")) {
    failedmsg("You can only jill off character's with pussies.")
    return FAILED
  }
  if (verb.startsWith("jerk") || verb.startsWith("jack") || verb.startsWith("rub") || verb.endsWith("tug")) {
    failedmsg("You can only jerk off character's with dicks.")
    return FAILED
  }
  failedmsg("You can only masturbate characters with genitals.")
  return FAILED
}
commands.unshift(new Cmd('MasturbateOff', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(masturbate|wank|jerk off|jerk|jack off|jack|jill off|jill) (.+)$/,
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.wankScript,
}));
commands.unshift(new Cmd('Masturbate', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(wank|jerk|jack|jill) (.+) off$/,
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.wankScript,
}));
commands.unshift(new Cmd('Masturbate2', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^give (.+) a? ?(wank|tug|jerk)$/,
  objects:[
    {scope:parser.isNpcAndHere},
    {text:true},
  ],
  script:erotica.wankScriptReversed,
}));
commands.unshift(new Cmd('MasturbateSelf', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(masturbate|wank|jerk off|jerk|jack off|jack|jill off|jill|rub one out|flick the bean)$/,
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.wankScript,
}));





erotica.blowJobScript = function(objects) {
  const char = extractChar(this, objects)
  if (!char) return FAILED;
  const target = objects[1][0];
  if (target.hasBodyPart("cock")) {
    return cmdInteract("suck", char, target, w.cock, '')
  }
  else {
    failedmsg("You can only suck off character's with dicks.")
    return FAILED
  }
}
commands.unshift(new Cmd('Fellatio', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(suck off|suck|fellato|perform fellatio on|perform fellatio|fellatio|give blow job to|blow job|blow) (.+)$/,
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.blowJobScript,
}));
commands.unshift(new Cmd('FellatioOff', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(suck) (.+) off$/,
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.blowJobScript,
}));



erotica.goDownScript = function(objects) {
  const char = extractChar(this, objects)
  if (!char) return FAILED;
  const target = objects[1][0];
  if (target.hasBodyPart("cock")) {
    return cmdInteract("suck", char, target, w.cock, '')
  }
  if (target.hasBodyPart("pussy")) {
    return cmdInteract("lick", char, target, w.pussy, '')
  }
  failedmsg("You can only go down on character's with genitals.")
  return FAILED
}
commands.unshift(new Cmd('GoDownOn', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(go down on|go down) (.+)$/,
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.goDownScript,
}));



erotica.cunnilingusScript = function(objects) {
  const char = extractChar(this, objects)
  if (!char) return FAILED;
  const target = objects[1][0];
  if (target.hasBodyPart("pussy")) {
    return cmdInteract("lick", char, target, w.pussy, '')
  }
  failedmsg("You can only do cunnilingus on character's with a pussy.")
  return FAILED
}
commands.unshift(new Cmd('Cunnilingus', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(perform cunnilingus|cunnilingus) (.+)$/,
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.cunnilingusScript,
}));



erotica.teabagScript = function(objects) {
  const char = extractChar(this, objects)
  if (!char) return FAILED;
  const target = objects[1][0];
  if (target.hasBodyPart("bollock")) {
    return cmdInteract("suck", char, target, w.bollock, '')
  }
  failedmsg("You can only teabag character's with balls.")
  return FAILED
}
commands.unshift(new Cmd('Teabag', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(teabag) (.+)$/,
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.teabagScript,
}));












commands.unshift(new Cmd('BendOverFurniture', {
  npcCmd:true,
  regex:/^(bend over) (.+)$/,
  attName:"bendover",
  objects:[
    {ignore:true},
    {scope:parser.isHere, attName:"assumePosture"},
  ],
  defmsg:CANNOT_BEND_OVER,
}));
commands.unshift(new Cmd('Straddle', {
  npcCmd:true,
  regex:/^(straddle) (.+)$/,
  attName:"straddle",
  objects:[
    {ignore:true},
    {scope:parser.isHere, attName:"assumePosture"},
  ],
  defmsg:CANNOT_STADDLE,
}));

function CANNOT_BEND_OVER(char, item) {
  return pronounVerb(item, "'be", true) + " not something you can bend over.";
}
function CANNOT_STADDLE(char, item) {
  return pronounVerb(item, "'be", true) + " not something you can straddle.";
}
function BEND_OVER_SUCCESSFUL(char, item) {
  return nounVerb(char, "bend", true) + " over " + item.byname({article:DEFINITE}) + ".";
}
function STRADDLE_SUCCESSFUL(char, item) {
  return nounVerb(char, "straddle", true) + " " + item.byname({article:DEFINITE}) + ".";
}







erotica.POSITIONS_LIST = [
  {cmd:'kneel', desc:'kneeling'},
  {cmd:'bendover', desc:'bending over', pattern:'bend over'},
  {cmd:'sit', desc:'sitting', addFloor:true},
  {cmd:'liefacedown', desc:'lying face down', addFloor:true, pattern:'lie face down'},
  {cmd:'lieback', desc:'lying back', addFloor:true, pattern:'lie down|lie back'},
  {cmd:'crawl', desc:'on # hands and knees', pattern:'crawl|get on hands and knees'},
];

for (let i = 0; i < erotica.POSITIONS_LIST.length; i++) {
  commands.unshift(new Cmd('Position_' + erotica.POSITIONS_LIST[i].cmd, {
    npcCmd:true,
    //cmdCategory:sentenceCase(erotica.POSITIONS_LIST[i].cmd),
    regex:new RegExp("^" + (erotica.POSITIONS_LIST[i].pattern ? erotica.POSITIONS_LIST[i].pattern : erotica.POSITIONS_LIST[i].cmd) + "$"),
    objects:[
    ],
    useThisScriptForNpcs:true,
    posture:erotica.POSITIONS_LIST[i],
    script:function(objects) {
      const cmd = /Position_([a-z]+)[12]?$/.exec(this.name)[1];
      const posture = erotica.POSITIONS_LIST.find(function(el) { return el.cmd === cmd} );
      
      let char;
      if (this.forNpc) {
        char = objects[0][0];
        if (!char.npc) {
          failedmsg(NOT_NPC(char));
          return FAILED; 
        }
        objects.shift();
      }
      else {
        char = game.player;
      }
      return char.assumePosture(posture)
    },
  }));
}





//---- Undressing ----



commands.unshift(new Cmd('Undress', {
  regex:/^(undress|strip)$/,
  objects:[
    {ignore:true},
  ],
  script:function(objects) {
    return cmdUndress(game.player);
  },
}))


commands.unshift(new Cmd('NpcUndress1', {
  regex:/^(.+), ?(undress|strip)$/,
  cmdCategory:"Remove",
  objects:[
    {scope:parser.isNpcAndHere},
    {ignore:true},
  ],
  script:function(objects) {
    const npc = objects[0][0];
    if (!npc.npc) {
      failedmsg(NOT_NPC(npc));
      return FAILED; 
    }
    return cmdUndress(npc);
  },
}))

commands.unshift(new Cmd('NpcUndress2', {
  regex:/^tell (.+) to ?(undress|strip)$/,
  cmdCategory:"Remove",
  objects:[
    {scope:parser.isNpcAndHere},
    {ignore:true},
  ],
  script:function(objects) {
    const npc = objects[0][0];
    if (!npc.npc) {
      failedmsg(NOT_NPC(npc));
      return FAILED; 
    }
    return cmdUndress(npc);
  },
}))


function cmdUndress(char) {
  if (char.isNaked()) {
    failedmsg(nounVerb(char, "be", true) + " already naked.");
    return FAILED;
  }
  const garment = char.firstToRemove();
  if (!char.canManipulate(garment, "Remove")) {
    // The getAgreement should give the response
    return FAILED;
  }
  if (!char.getAgreement("Remove", garment)) {
    // The getAgreement should give the response
    return FAILED;
  }
  const res = garment.remove(false, char);
  return res ? SUCCESS : FAILED;
}


commands.unshift(new Cmd('UndressOther', {
  npcCmd:true,
  regex:/^(undress|strip) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    const target = objects[0][0];
    if (!target.isHere()) {
      // char not here (this is checked in cmdRemoveGarment, but should be before naked check
      failedmsg(nounVerb(target, "be", true) + " not here.");
      return FAILED;
    }
    if (target.isNaked()) {
      failedmsg(nounVerb(target, "be", true) + " already naked.");
      return FAILED;
    }
    return cmdRemoveGarment(char, target, target.firstToRemove(), 0);
  },
}));


commands.unshift(new Cmd("TakeOffFrom", {
  npcCmd:true,
  cmdCategory:'TakeOffFrom',
  regex:/^(remove|take off) (.+)'s (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
    {scope:parser.isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdRemoveGarment(char, objects[0][0], objects[1][0], 0);
  },
}));
commands.unshift(new Cmd("TakeOffFrom2", {
  npcCmd:true,
  cmdCategory:'TakeOffFrom',
  regex:/^take (.+)'s (.+) off(| him| her)$/,
  objects:[
    {scope:parser.isNpcAndHere},
    {scope:parser.isWornByChar},
    {ignore:true},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdRemoveGarment(char, objects[0][0], objects[1][0], 0);
  },
}));
commands.unshift(new Cmd("TakeOffFrom3", {
  npcCmd:true,
  cmdCategory:'TakeOffFrom',
  regex:/^(take|remove) (.+) (from|off) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isWornByChar},
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdRemoveGarment(char, objects[1][0], objects[0][0], 0);
  },
}));




commands.unshift(new Cmd("RipOffFrom", {
  npcCmd:true,
  cmdCategory:'RipOffFrom',
  regex:/^(rip off|rip|tear off|tear) (.+)'s (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
    {scope:parser.isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdRemoveGarment(char, objects[0][0], objects[1][0], 2);
  },
}));
commands.unshift(new Cmd("RipOffFrom2", {
  npcCmd:true,
  cmdCategory:'RipOffFrom',
  regex:/^(rip|tear) (.+)'s (.+) off(| him| her)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
    {scope:parser.isWornByChar},
    {ignore:true},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdRemoveGarment(char, objects[0][0], objects[1][0], 2);
  },
}));
commands.unshift(new Cmd("RipOffFrom2", {
  npcCmd:true,
  cmdCategory:'RipOffFrom',
  regex:/^(rip|tear) (.+) (off|from) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isWornByChar},
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdRemoveGarment(char, objects[1][0], objects[0][0], 2);
  },
}));


commands.unshift(new Cmd("CutOffFrom", {
  npcCmd:true,
  cmdCategory:'CutOffFrom',
  regex:/^(cut off|cut) (.+)'s (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
    {scope:parser.isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdRemoveGarment(char, objects[0][0], objects[1][0], 5);
  },
}));
commands.unshift(new Cmd("CutOffFrom2", {
  npcCmd:true,
  cmdCategory:'CutOffFrom',
  regex:/^(cut) (.+)'s (.+) off(| him| her)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
    {scope:parser.isWornByChar},
    {ignore:true},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdRemoveGarment(char, objects[0][0], objects[1][0], 5);
  },
}));




commands.unshift(new Cmd("PullUp", {
  npcCmd:true,
  cmdCategory:'PullUp',
  regex:/^pull up( my| your| his| her| their|) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    const g = objects[0][0]
    
    if (!g.pullUp) {
      failedmsg("That's not something you can pull up.")
      return FAILED
    }
    
    return g.pullUp(char);
  },
}));
commands.unshift(new Cmd("PullDown", {
  npcCmd:true,
  cmdCategory:'PullDown',
  regex:/^pull down( my| your| his| her| their|) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    const g = objects[0][0]
    
    if (!g.pullDown) {
      failedmsg("That's not something you can pull down.")
      return FAILED
    }
    
    return g.pullDown(char);
  },
}));
commands.unshift(new Cmd("Fasten", {
  npcCmd:true,
  cmdCategory:'Fasten',
  regex:/^(fasten|button up|button)( my| your| his| her| their|) (.+)$/,
  objects:[
    {ignore:true},
    {ignore:true},
    {scope:parser.isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    const g = objects[0][0]
    
    if (!g.fasten) {
      failedmsg("That's not something you can fasten up.")
      return FAILED
    }
    
    return g.fasten(char);
  },
}));
commands.unshift(new Cmd("Unfasten", {
  npcCmd:true,
  cmdCategory:'Unfasten',
  regex:/^(unfasten|unbutton)( my| your| his| her| their|) (.+)$/,
  objects:[
    {ignore:true},
    {ignore:true},
    {scope:parser.isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED
    const g = objects[0][0]
    
    if (!g.unfasten) {
      failedmsg("That's not something you can unfasten.")
      return FAILED
    }
    
    return g.unfasten(char);
  },
}));


function cmdRemoveGarment(char, target, garment, strength) {
  if (!char.isHere()) {
    // char not here
    failedmsg(nounVerb(char, "be", true) + " not here.");
    return FAILED;
  }
  
  if (!target.isHere()) {
    // target not here
    failedmsg(nounVerb(target, "be", true) + " not here.");
    return FAILED;
  }
  
  if (!garment.getWorn() || !garment.isAtLoc(target.name)) {
    // garment not worn by target
    failedmsg(nounVerb(target, "be", true) + " not wearing " + garment.byname({article:INDEFINITE}) + ".");
    return FAILED;
  }

  const cutter = char.findCutter()
  if (strength > 2 && !cutter) {
    // garment not worn by target
    failedmsg(nounVerb(char, "need", true) + " a knife or something to do that.");
    return FAILED;
  }

  const blocker = garment.getWearRemoveBlocker(target, false);
  if (blocker) {
    failedmsg(nounVerb(char, "can", true) + " not remove " + garment.byname({article:DEFINITE}) + " whilst " + target.byname({article:DEFINITE}) + " is wearing " + blocker.byname({article:INDEFINITE}) + ".");
    return FAILED; 
  }

  if (char === target) {
    if (!char.getAgreement("Remove", garment)) {
      // The getAgreement should give the response
      return FAILED;
    }
    const res = garment.wear(false, char);
    return res ? SUCCESS : FAILED;
  }
  
  let rating = target.attractionTo(char) + target.arousal / 4
  if (char.reputation) rating -= char.reputation
  if (target === game.player) rating = 100  // you want it done to yourself
  //console.log("target.getWillingToExpose(w[target.loc]): " + target.getWillingToExpose(w[target.loc]))
  //console.log("target.getExposureWithout(garment): " + target.getExposureWithout(garment))
  //console.log("char.reputation: " + char.reputation)
  //console.log("rating: " + rating)

  const targetNoChoice = !target.canManipulate();
  if (!char.getAgreement("RemoveOther", garment, target, rating, targetNoChoice)) {
    // The getAgreement should give the response
    // Count as success as an action has been taken
    return SUCCESS;
  }

  // By now we have a character, char, willing to try to remove an item, garment, from a different character, target
  //console.log(char.name + ":remove:" + garment.name)
  const params = {
    boss:game.player,
    actor:char,
    target:target,
    action:"remove",
    garment:garment,
    rating:rating,
    strength:strength,
    exposure:target.getWillingToExpose(w[target.loc]) - target.getExposureWithout(garment),
  }
  if (target.restraint) params.restraint = w[target.restraint]

  target.actionResponse(params);
  return SUCCESS;
}









function cmdRestrain (char, target, item) {
  if (!item) {
    const objs = parser.scope(parser.isBondageDeviceHere)
    if (objs.length === 0) {
      failedmsg("Nothing to restrain someone with here.")
      return FAILED
    }
    if (objs.length > 1) {
      failedmsg("You will have to specify how you want to restrain someone when more than one device is present.")
      return FAILED
    }
    item = objs[0]
  }
  if (target.restraint || item.victim) {
    failedmsg(nounVerb(target, "be", true) + " already " + w[target.restraint].situation + ".")
    return FAILED
  }
  const held = target.getHolding()
  if (held.length > 0) {
    const it_them = held.length > 1 || held[0].pronouns === PRONOUNS.plural  || held[0].pronouns === PRONOUNS.massnoun ? "them" : "it"
    msg(nounVerb(char, "take", true) + " " + formatList(held, {article:DEFINITE, lastJoiner:" and "}) + " from " + target.byname({article:DEFINITE}) + " and " + pronounVerb(char, "put") + " " + it_them + " on the ground.")
    for (let i = 0; i < held.length; i++) {
      held[i].moveToFrom(char.loc)
    }
  }
  delete target.posture
  delete target.postureFurniture
  item.restrain(char, target)
  return SUCCESS;
}

function cmdRelease (char, target) {
}

commands.unshift(new Cmd("RestrainWith", {
  npcCmd:true,
  cmdCategory:'Restrain',
  rules:[cmdRules.isHere, cmdRules.canManipulate],
  regex:/^(manacle|chain|tie) (.+) to (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
    {scope:parser.isHere, attName:"bondage"},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdRestrain(char, objects[0][0], objects[1][0]);
  },
}));
commands.unshift(new Cmd("Restrain", {
  npcCmd:true,
  cmdCategory:'Restrain',
  rules:[cmdRules.isHere, cmdRules.canManipulate],
  regex:/^(restrain|manacle|chain|tie up|tie) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdRestrain(char, objects[0][0]);
  },
}));
commands.unshift(new Cmd("Restrain2", {
  npcCmd:true,
  cmdCategory:'Restrain',
  rules:[cmdRules.isHere, cmdRules.canManipulate],
  regex:/^(chain|tie) (.+) up$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdRestrain(char, objects[0][0]);
  },
}));

commands.unshift(new Cmd("Release", {
  npcCmd:true,
  cmdCategory:'Release',
  rules:[cmdRules.isHere, cmdRules.canManipulate],
  regex:/^(free|release) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    const target = objects[0][0]
    if (!target.restraint) {
      failedmsg(nounVerb(target, "do", true) + " not need to be released.");
      return FAILED;
    }
    w[target.restraint].release(char, target)
    return SUCCESS;
  },
}));







commands.unshift(new Cmd('testnpc', {
  regex:/^npc (.+)$/,
  objects:[
    {scope:parser.isInWorld}
  ],
  script:function(objects) {
    console.log(w.cock.getProtection(objects[0][0]));
    console.log(w.buttocks.getProtection(objects[0][0]));
    console.log(w.thighs.getProtection(objects[0][0]));
    return SUCCESS;
  },
}));


commands.unshift(new Cmd('testbikini', {
  regex:/^bikini$/,
  objects:[
  ],
  script:function(objects) {
    console.log("briefs loc = " + w.briefsblack.loc);
    console.log("briefs in lounge? " + w.briefsblack.isAtLoc("lounge"));
    console.log("briefs with Joanna? " + w.briefsblack.isAtLoc("Joanna"));
    console.log("briefs worn? " + w.briefsblack.getWorn());
    
    console.log("halter loc = " + w.halterblack.loc);
    console.log("halter in lounge? " + w.halterblack.isAtLoc("lounge"));
    console.log("halter with Joanna? " + w.halterblack.isAtLoc("Joanna"));
    console.log("halter worn? " + w.halterblack.getWorn());

    console.log("bikini in lounge? " + w.black_bikini.isAtLoc("lounge"));
    console.log("bikini with Joanna? " + w.black_bikini.isAtLoc("Joanna"));
    console.log("bikini worn? " + w.black_bikini.getWorn());
    return SUCCESS;
  },
}));