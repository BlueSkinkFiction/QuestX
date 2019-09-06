"use strict";

/*


Postures

(KNEEL|BEND OVER|CRAWL|SIT|LIE BACK|LIE FACE DOWN)
(BEND OVER|STRADLE) <furniture>



Interacting with bodyparts

(GROPE|FINGER|LICK|KISS|SMACK|SUCK) <character>'s (LEFT|RIGHT)? <bodypart>
(GROPE|FINGER|LICK|KISS|SMACK|SUCK) MY (LEFT|RIGHT)? <bodypart>
JERK OFF
JERK OFF <character>
SUCK OFF <character>
GO DOWN ON <character>
CUNNILINGUS <character>
KISS <character>

The commands are all understood, but need work on the responses


Fuck (all to do)

FUCK <character>
FACE FUCK <character>
ASS FUCK <character>
FUCK <character>'s <bodypart>

PUSH <sextoy> IN  <character>
PUSH <sextoy> IN  <character>'s <bodypart>
FUCK <character> WITH <sextoy>
ASS FUCK <character> WITH <sextoy>
FUCK <character>'s <bodypart> WITH <sextoy>




Clothing (the first two are in the vanilla Quest 6)

TAKE OFF MY <garment> [b]
TAKE MY <garment> OFF [b]
REMOVE <character>'s <garment>
TAKE OFF <character>'s <garment>
TAKE <character>'s <garment> OFF
REMOVE <garment> FROM <character>
UNDRESS <character>
STRIP



Others (to do)
```
CHAIN <character>
CHAIN <character> TO <device>
SMACK <character>
SMACK <character>'s <bodypart>
FLICK THE BEAN

```
Note that several commands use 's. **This is not optional**, as Quest uses 's to separate the different terms. This means you may run into problems with items that have 's is their name. And it is not going to translate into other languages, sorry about that.



*/

//----  Interactions ----


erotica.ACTIONS = [
  {
    name:'grope',
    pattern:'grope|feel|caress|finger|massage',
    mustBeBare:false,
    intimateRating:3,
    defaultBodyPart:"buttock",
    action:function(char, object, bodypart, side) {
      let targetName;
      if (bodypart.paired) {
        if (side === '') {
          targetName = object.getBodyPartAdjective(bodypart.name) + " " + bodypart.pluralAlias;
        }
        else {
          targetName = side + bodypart.alias;
        }
      }
      else {
        targetName = object.getBodyPartAdjective(bodypart.name) + " " + bodypart.alias;
      }
      const garment = bodypart.getCovering(object);
      const garmentStr = garment ? ", through " + object.pronouns.poss_adj + " " + garment.byname() : "";
      msg (nounVerb(char, "spend", true) + " a few minutes running " + char.pronouns.poss_adj + " fingers over " + object.byname({article:DEFINITE, possessive:true}) + " " + targetName + garmentStr + ".");

      //msg("Intimate " + bodypart.getIntimateRating(object));
      //msg("Okay");
      return SUCCESS;
    }
  },
  
  {
    name:'suck',
    pattern:'suck off|suck|blow off|blow',
    mustBeBare:true,
    intimateRating:10,
    bodypartCheck(bp) {
      return ["cock", "ball", "tit"].includes(bp.name);
    },
    action:function(char, object, bodypart, side) {
      msg("Doing suck");
    },
  },

  {
    name:'lick',
    pattern:'lick|taste',
    mustBeBare:true,
    intimateRating:8,
    action:function(char, object, bodypart, side) {
      msg("Doing lick");
      msg(bodypart.getProtection(object));      
    }
  },

  {
    name:'kiss',
    mustBeBare:true,
    intimateRating:7,
    defaultBodyPart:"mouth",
    action:function(char, object, bodypart, side) {
      msg("Doing kiss");
    }
  },

  {
    name:'smack',
    pattern:'smack|slap',
    mustBeBare:false,
    intimateRating:1,
    defaultBodyPart:"buttock",
    action:function(char, object, bodypart, side) {
      msg("Doing smack");
    }
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


commands.unshift(new Cmd('SexActionsMy', {
  npcCmd:true,
  regex:new RegExp("^(" + erotica.ACTIONS_LIST.join('|') + ") (my |your |his |her |)(left |right |)(.+)$"),
  objects:[
    {text:true},
    {ignore:true},
    {text:true},
    {scope:isBodyPart}
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
    {scope:isNpcAndHere},
    {text:true},
    {scope:isBodyPart}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdInteract(objects[0], char, objects[1][0], objects[3][0], objects[2]);
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
      metamsg("I was expecting a body part at the end of that. Quite the disappointment!");
      return FAILED;
    }
  }
  if (!bodypart.paired && side !== '') {
    metamsg("I was not expecting that body part to have a left and right!");
    return FAILED;
  }
  if (verb.bodypartCheck && !verb.bodypartCheck(bodypart)) {
    metamsg("That is not a body part you can do that with, is it?");
    return FAILED;
  }
  if (!char.canManipulate()) {
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
    
    // At this point, we have a success. The target may react badly, but the action is performed
    if (!object["count_" + verb.name + "_" + bodypart.name]) object["count_" + verb.name + "_" + bodypart.name] = 0;
    object["count_" + verb.name + "_" + bodypart.name]++;
    
    // something specific to the target?
    if (object["response_" + verb.name + "_" + bodypart.name]) {
      object["response_" + verb.name + "_" + bodypart.name](char, side, altName ? altName : actionName);
      return SUCCESS;
    }

    // something specific to the bodypart?
    if (bodypart["response_" + verb.name]) {
      bodypart["response_" + verb.name](char, object, side, altName ? altName : actionName);
      return SUCCESS;
    }

    return verb.action(char, object, bodypart, side, altName ? altName : actionName);

  }
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
  if (target.hasBodyPart("cock") && !verb.startsWith("jill")) {
    return cmdInteract("grope", char, target, w.cock, '', verb)
  }
  if (target.hasBodyPart("pussy") && !verb.startsWith("jerk") && !verb.startsWith("jack")) {
    return cmdInteract("grope", char, target, w.pussy, '', verb)
  }
  if (verb.startsWith("jill")) {
    metamsg("You can only jill off character's with pussies.")
    return FAILED
  }
  if (verb.startsWith("jerk")) {
    metamsg("You can only jerk off character's with dicks.")
    return FAILED
  }
  if (verb.startsWith("jack")) {
    metamsg("You can only jack off character's with dicks.")
    return FAILED
  }
  metamsg("You can only masturbate character's with genitals.")
  return FAILED
}
commands.unshift(new Cmd('MasturbateOff', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(masturbate|wank|jerk off|jerk|jack off|jack|jill off|jill) (.+)$/,
  objects:[
    {text:true},
    {scope:isNpcAndHere},
  ],
  script:erotica.wankScript,
}));
commands.unshift(new Cmd('Masturbate', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(wank|jerk|jack|jill) (.+) off$/,
  objects:[
    {text:true},
    {scope:isNpcAndHere},
  ],
  script:erotica.wankScript,
}));
commands.unshift(new Cmd('MasturbateSelf', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(masturbate|wank|jerk off|jerk|jack off|jack|jill off|jill)$/,
  objects:[
    {text:true},
    {scope:isNpcAndHere},
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
    metamsg("You can only suck off character's with dicks.")
    return FAILED
  }
}
commands.unshift(new Cmd('Fellatio', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(suck off|suck|fellato|perform fellatio on|perform fellatio|fellatio|give blow job to|blow job|blow) (.+)$/,
  objects:[
    {text:true},
    {scope:isNpcAndHere},
  ],
  script:erotica.blowJobScript,
}));
commands.unshift(new Cmd('FellatioOff', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(suck) (.+) off$/,
  objects:[
    {text:true},
    {scope:isNpcAndHere},
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
  metamsg("You can only go down on character's with genitals.")
  return FAILED
}
commands.unshift(new Cmd('GoDownOn', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(go down on|go down) (.+)$/,
  objects:[
    {text:true},
    {scope:isNpcAndHere},
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
  metamsg("You can only do cunnilingus on character's with a pussy.")
  return FAILED
}
commands.unshift(new Cmd('Cunnilingus', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(perform cunnilingus|cunnilingus) (.+)$/,
  objects:[
    {text:true},
    {scope:isNpcAndHere},
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
  metamsg("You can only teabag character's with balls.")
  return FAILED
}
commands.unshift(new Cmd('Teabag', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(teabag) (.+)$/,
  objects:[
    {text:true},
    {scope:isNpcAndHere},
  ],
  script:erotica.teabagScript,
}));












commands.unshift(new Cmd('BendOverFurniture', {
  npcCmd:true,
  regex:/^(bend over) (.+)$/,
  attName:"bendover",
  objects:[
    {ignore:true},
    {scope:isHere, attName:"assumePosture"},
  ],
  defmsg:CANNOT_BEND_OVER,
}));
commands.unshift(new Cmd('Straddle', {
  npcCmd:true,
  regex:/^(straddle) (.+)$/,
  attName:"straddle",
  objects:[
    {ignore:true},
    {scope:isHere, attName:"assumePosture"},
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
      if (char.posture === posture.desc && char.postureFurniture === undefined) {
        msg(ALREADY(char));
        return FAILED;
      }
      if (!char.canPosture()) {
        return FAILED;
      }
      if (!char.getAgreement("Posture", posture.cmd)) {
        // The getAgreement should give the response
        return FAILED;
      }
      if (char.postureFurniture) {
        msg(STOP_POSTURE(char));  // STOP_POSTURE handles details
      }  
      char.posture = posture.desc;
      char.postureAddFloor = posture.addFloor;
      msg(nounVerb(char, "be", true) + " now " + char.getPostureDescription() + ".");
      return SUCCESS;
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
    {scope:isNpcAndHere},
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
    {scope:isNpcAndHere},
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
    {scope:isNpcAndHere},
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
    return cmdRemoveGarment(char, target, target.firstToRemove());
  },
}));


commands.unshift(new Cmd("TakeOffFrom", {
  npcCmd:true,
  cmdCategory:'TakeOffFrom',
  regex:/^(remove|take off) (.+)'s (.+)$/,
  objects:[
    {ignore:true},
    {scope:isNpcAndHere},
    {scope:isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdRemoveGarment(char, objects[0][0], objects[1][0]);
  },
}));
commands.unshift(new Cmd("TakeOffFrom2", {
  npcCmd:true,
  cmdCategory:'TakeOffFrom',
  regex:/^take (.+)'s (.+) off(| him| her)$/,
  objects:[
    {scope:isNpcAndHere},
    {scope:isWornByChar},
    {ignore:true},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdRemoveGarment(char, objects[0][0], objects[1][0]);
  },
}));
commands.unshift(new Cmd("TakeOffFrom3", {
  npcCmd:true,
  cmdCategory:'TakeOffFrom',
  regex:/^(take|remove) (.+) (from|off) (.+)$/,
  objects:[
    {ignore:true},
    {scope:isWornByChar},
    {ignore:true},
    {scope:isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdRemoveGarment(char, objects[1][0], objects[0][0]);
  },
}));







function cmdRemoveGarment(char, target, garment) {
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
  
  const targetWilling = target.getWillingToRemove(garment);
  const targetNoChoice = !target.canManipulate(garment, "remove");
  if (!char.getAgreement("RemoveOther", garment, target, targetWilling, targetNoChoice)) {
    // The getAgreement should give the response
    // Count as success as an action has been taken
    return SUCCESS;
  }

  // By now we have a character, char, willing to try to remove an item, garment, from a different character, target
  
  if (targetNoChoice) {
    target.respondToUndressNoChoice(char, garment);
    garment.loc = char.loc;
    //garment.damage("rip");
    garment.worn = false;
  }
  else if (targetWilling) {
    target.respondToUndressWilling(char, garment);
    garment.loc = char.name;
    garment.worn = false;
  }
  else {
    target.respondToUndressRefusal(char, garment);
  }
    
  return SUCCESS
}









function cmdRestrain (char, target, item) {
  if (!item) {
    const objs = scope(isBondageDeviceHere)
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
    {scope:isNpcAndHere},
    {scope:isHere, attName:"bondage"},
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
    {scope:isNpcAndHere},
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
    {scope:isNpcAndHere},
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
    {scope:isNpcAndHere},
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

function isBondageDeviceHere (item) {
  return item.isAtLoc(game.player.loc) && item.bondage;
}



commands.unshift(new Cmd('testnpc', {
  regex:/^npc (.+)$/,
  objects:[
    {scope:isInWorld}
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