"use strict";




//----  Interactions ----


erotica.ACTIONS = [
  {
    name:'grope',
    pattern:'grope|feel|caress|finger|massage',
    mustBeBase:false,
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
    mustBeBase:true,
    action:function(char, object, bodypart, side) {
      msg("Doing suck");
    }
  },

  {
    name:'lick',
    pattern:'lick|taste',
    mustBeBase:true,
    action:function(char, object, bodypart, side) {
      msg("Doing lick");
      msg(bodypart.getProtection(object));      
    }
  },

  {
    name:'kiss',
    mustBeBase:true,
    action:function(char, object, bodypart, side) {
      msg("Doing kiss");
    }
  },

  {
    name:'smack',
    pattern:'smack|slap',
    mustBeBase:false,
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
    let char;
    if (this.forNpc) {
      char = objects[0][0];
      if (!char.npc) {
        msg(NOT_NPC(char));
        return FAILED; 
      }
      objects.shift();
    }
    else {
      char = game.player;
    }
    return cmdInteract(objects[0], char, game.player, objects[2][0], objects[1]);
  },
}));


commands.unshift(new Cmd("SexActions", {
  npcCmd:true,
  regex:new RegExp("^(" + erotica.ACTIONS_LIST.join('|') + ") (.+)'s (left |right |)(.+)$"),
  objects:[
    {text:true},
    {scope:isPresent},
    {text:true},
    {scope:isBodyPart}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    let char;
    if (this.forNpc) {
      char = objects[0][0];
      if (!char.npc) {
        msg(NOT_NPC(char));
        return FAILED; 
      }
      objects.shift();
    }
    else {
      char = game.player;
    }
    return cmdInteract(objects[0], char, objects[1][0], objects[3][0], objects[2]);
  },
}));

function cmdInteract(action, char, object, bodypart, side) {
  if (!bodypart.isBodyPart) {
    metamsg("I was expecting a body part at the end of that. Quite the disappointment!");
    return FAILED;
  }
  if (!bodypart.paired && side !== '') {
    metamsg("I was not expecting that body part to have a left and right!");
    return FAILED;
  }
  if (!char.canManipulate()) {
    return FAILED;
  }
  if (!char.getAgreement(action, object)) {
    // The getAgreement should give the response
    return FAILED;
  }
  if (!object.hasBodyPart(bodypart)) {
    msg(nounVerb(object, "don't", true) + " have " + bodypart.none() + ".");
    return FAILED;
  }
  else {
    const regex = new RegExp("\\b" + action + "\\b");
    let verb = false;
    for (let i = 0; i < erotica.ACTIONS.length; i++) {
      if (erotica.ACTIONS[i].pattern) {
        if (regex.test(erotica.ACTIONS[i].pattern)) verb = erotica.ACTIONS[i];
      }
      else {
        if (action === erotica.ACTIONS[i].name) verb = erotica.ACTIONS[i];
      }
    }
    if (!verb) {
      errormsg("Failed to find an action, despite it being recognised. Odd.");
      return FAILED;
    }
    const garment = bodypart.getProtection(object);
    if (verb.mustBeBare && garment) {
      msg(nounVerb(char, "can't", true) + " do that when " + object.byname({article:DEFINITE}) + " is wearing " + garment.byname({article:DEFINITE}) + ".");
      return FAILED;
    }
    
    // At this point, we have a success. The target may react badly, but the action is performed
    if (!object["count_" + action + "_" + bodypart.name]) object["count_" + action + "_" + bodypart.name] = 0;
    object["count_" + action + "_" + bodypart.name]++;
    
    // something specific to the target?
    if (object["response_" + action + "_" + bodypart.name]) {
      object["response_" + action + "_" + bodypart.name](char, side);
      return SUCCESS;
    }

    // something specific to the bodypart?
    if (bodypart["response_" + action]) {
      bodypart["response_" + action](char, object, side);
      return SUCCESS;
    }

    return verb.action(char, object, bodypart, side);

  }
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









commands.unshift(new Cmd('BendOverF', {
  npcCmd:true,
  rules:[cmdRules.charCanPostureRule],
  regex:/^(bend over) (.+)$/,
  attName:"bendover",
  objects:[
    {ignore:true},
    {scope:isHere},
  ],
  defmsg:CANNOT_BEND_OVER,
}));
commands.unshift(new Cmd('Straddle', {
  npcCmd:true,
  rules:[cmdRules.charCanPostureRule],
  regex:/^(straddle) (.+)$/,
  attName:"straddle",
  objects:[
    {ignore:true},
    {scope:isHere},
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
          msg(NOT_NPC(char));
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
      if (!char.getAgreement(posture.cmd)) {
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

commands.unshift(new Cmd("TakeOffFrom", {
  npcCmd:true,
  regex:/^(remove|take off) (.+)'s (.+)$/,
  objects:[
    {ignore:true},
    {scope:isNpcHere},
    {scope:isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    let char;
    if (this.forNpc) {
      char = objects[0][0];
      if (!char.npc) {
        msg(NOT_NPC(char));
        return FAILED; 
      }
      objects.shift();
    }
    else {
      char = game.player;
    }
    return cmdRemoveGarment(char, objects[0][0], objects[1][0]);
  },
}));
commands.unshift(new Cmd("TakeOffFrom2", {
  npcCmd:true,
  regex:/^take (.+)'s (.+) off(| him| her)$/,
  objects:[
    {scope:isNpcHere},
    {scope:isWornByChar},
    {ignore:true},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    let char;
    if (this.forNpc) {
      char = objects[0][0];
      if (!char.npc) {
        msg(NOT_NPC(char));
        return FAILED; 
      }
      objects.shift();
    }
    else {
      char = game.player;
    }
    return cmdRemoveGarment(char, objects[0][0], objects[1][0]);
  },
}));





function cmdRemoveGarment(char, target, garment) {
  console.log(char.name + " to remove " + garment.name + " from " + target.name);
  if (!char.isHere()) {
    msg(nounVerb(char, "be", true) + " not here.");
    return FAILED;
  }
  if (!target.isHere()) {
    msg(nounVerb(target, "be", true) + " not here.");
    return FAILED;
  }
  if (!garment.worn || !garment.isAtLoc(target)) {
    msg(nounVerb(target, "be", true) + " not wearing " + garment.byname({article:INDEFINITE}) + ".");
    return FAILED;
  }
  if (!char.getAgreement(posture.cmd)) {
    // The getAgreement should give the response
    return FAILED;
  }
  if (char === target) {
    const res = garment.wear(false, char);
    return res ? SUCCESS : FAILED;
  }
  const blocker = garment.getWearRemoveBlocker(target, false);
  if (blocker) {
    msg(nounVerb(char, "can", true) + " not remove " + garment.byname({article:DEFINITE}) + " whilst " + target.byname({article:DEFINITE}) + " is wearing " + blocker.byname({article:INDEFINITE}) + ".");
    return FAILED; 
  }
  // By now we have a character, char, willing to try to remove an item, garment, from a different character, target
  
  if (!target.canWearRemove(garment, false)) {
    // target cannot wear or remove thing him/herself, so presumably cannot stop this happened
    
    
  }
  else {
    
    
  }
    
  return SUCCESS
}




