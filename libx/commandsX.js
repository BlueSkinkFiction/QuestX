"use strict";



commands.unshift(new Cmd('Snog', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(snog|make out with|make out|french kiss) (.+)$/,
  objects:[
    {scope:parser.isNpcAndHere},
  ],
  script:function(objects) {
    return cmdInteract("snog", actor, target, {})
  },
}));




function respondCompleted(params, response) {
  if (!response) {
    console.log("No response found")
    console.log(params)
    return 
  }
  if (!params.action) console.log(params)
  let s = params.action.name + "_"
  if (params.bodypart) s += "_" + params.bodypart.name
  if (params.garment) s += "_" + params.garment.name
  if (response.failed) s += "_failed"
  params.target[s] = true
}  



function cmdFuck(actor, target, bodypart, sextoy) {
  if (sextoy) {
    // Fuck pussy or ass with cock or dildo
    if (bodypart === undefined) bodypart = target.hasBodyPart("pussy") ? w.pussy : w.ass
    return cmdInteract("fuck with dildo", actor, target, {bodypart:bodypart, sextoy:sextoy})
  }
  
  else if (actor.hasBodyPart("cock")) {
    // Fuck pussy or ass with cock or dildo
    if (bodypart === undefined) bodypart = target.hasBodyPart("pussy") ? w.pussy : w.ass
    return cmdInteract("fuck", actor, target, {bodypart:bodypart})
  }
  
  else if (target.hasBodyPart("cock") && actor.hasBodyPart("pussy")) {
    // Fuck cock with pussy
    if (bodypart && bodypart.name !== "cock") return failedmsg("Not sure how " + actor.byname({article:DEFINITE}) + " is going to do that.")
    return cmdInteract("girl_top", actor, target, {})
  }  
  
  else {
    failedmsg("Not sure how that would work. Sorry.")
    return FAILED
  }
}



commands.unshift(new Cmd("Fuck", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(fuck|penetrate|pleasure|shag|bonk) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    const target = objects[0][0]
    return cmdFuck(actor, objects[0][0])
  },
}));

commands.unshift(new Cmd("Fuck2", {
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    return cmdFuck(actor, objects[0][0], objects[1][0])    
  },
}));

commands.unshift(new Cmd("Fuck3", {
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    return cmdFuck(actor, objects[0][0], objects[1][0])
  },
}));

commands.unshift(new Cmd("Fuck4", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(ass fuck) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    const target = objects[0][0]
    return cmdFuck(actor, objects[0][0], w.ass)
  },
}));

commands.unshift(new Cmd("Fuck5", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(face fuck) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    return cmdFuck(actor, objects[0][0], w.mouth)
  },
}));

commands.unshift(new Cmd("Sextoy", {
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    return cmdFuck(actor, objects[0][0], undefined, objects[1][0])
  },
}));

commands.unshift(new Cmd("Sextoy2", {
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    return cmdFuck(actor, objects[0][0], undefined, objects[1][0])
  },
}));

commands.unshift(new Cmd("Sextoy3", {
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    return cmdFuck(actor, objects[0][0], undefined, objects[1][0])
  },
}));

commands.unshift(new Cmd("Sextoy4", {
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    return cmdFuck(actor, objects[1][0], undefined, objects[0][0])
  },
}));


commands.unshift(new Cmd("Sextoy5", {
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    return cmdFuck(actor, objects[1][0], objects[2][0], objects[0][0])
  },
}));

commands.unshift(new Cmd("Sextoy6", {
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    return cmdFuck(actor, objects[0][0], objects[1][0], objects[2][0])
  },
}));






erotica.blowJobScript = function(objects) {
  const actor = extractChar(this, objects)
  if (!actor) return FAILED;
  const target = objects[0][0];
  if (target.hasBodyPart("cock")) {
    return cmdInteract("suck", actor, target, {bodypart:w.cock})
  }
  else {
    failedmsg(lang.nounVerb(actor, "can", true) + " only suck off character's with dicks.")
    return FAILED
  }
}
commands.unshift(new Cmd('Suck off', {
  npcCmd:true,
  score:2,
  useThisScriptForNpcs:true,
  regex:/^(suck off|suck|fellato|perform fellatio on|perform fellatio|fellatio|give blow job to|blow job|blow) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.blowJobScript,
}));
commands.unshift(new Cmd('FellatioOff', {
  npcCmd:true,
  score:1,
  useThisScriptForNpcs:true,
  regex:/^(suck) (.+) off$/,
  objects:[
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.blowJobScript,
}));



erotica.goDownScript = function(objects) {
  const actor = extractChar(this, objects)
  if (!actor) return FAILED;
  const target = objects[1][0];
  if (target.hasBodyPart("cock")) {
    return cmdInteract("suck", actor, target, {bodypart:w.cock})
  }
  if (target.hasBodyPart("pussy")) {
    return cmdInteract("lick", actor, target,{bodypart: w.pussy})
  }
  failedmsg(lang.nounVerb(actor, "can", true) + " only go down on character's with genitals.")
  return FAILED
}
commands.unshift(new Cmd('GoDownOn', {
  npcCmd:true,
  score:1,
  useThisScriptForNpcs:true,
  regex:/^(go down on|go down) (.+)$/,
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.goDownScript,
}));



erotica.cunnilingusScript = function(objects) {
  const actor = extractChar(this, objects)
  if (!actor) return FAILED;
  const target = objects[1][0];
  if (target.hasBodyPart("pussy")) {
    return cmdInteract("lick", actor, target, {bodypart:w.pussy})
  }
  failedmsg(lang.nounVerb(actor, "can", true) + " only do cunnilingus on character's with a pussy.")
  return FAILED
}
commands.unshift(new Cmd('Cunnilingus', {
  npcCmd:true,
  score:1,
  useThisScriptForNpcs:true,
  regex:/^(perform cunnilingus|cunnilingus) (.+)$/,
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.cunnilingusScript,
}));



erotica.teabagScript = function(objects) {
  const actor = extractChar(this, objects)
  if (!actor) return FAILED;
  const target = objects[1][0];
  if (target.hasBodyPart("bollock")) {
    return cmdInteract("suck", actor, target, {bodypart:w.bollock})
  }
  failedmsg(lang.nounVerb(actor, "can", true) + " only teabag character's with balls.")
  return FAILED
}
commands.unshift(new Cmd('Teabag', {
  npcCmd:true,
  score:1,
  useThisScriptForNpcs:true,
  regex:/^(teabag) (.+)$/,
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.teabagScript,
}));








function cmdPourOn(actor, target, substance, bodypart) {
  //console.log(actor)
  //console.log(target)
  //console.log(substance)
  //console.log(bodypart)
  
  const source = erotica.findSource(actor, substance)
  if (!source) {
    return failedmsg("No " + substance + " here to do that with.")
  }
  
  const params = {
    boss:game.player,
    actor:actor,
    target:target,
    action:"pour on",
    source:source,
    
    //rating:rating,
    //first:!object[firstName],
    //firstFail:!object[firstName + "_failed"],
    substance:substance,
  }

  if (bodypart !== undefined && bodypart.name !== 'torso') {
    params.bodypart = bodypart
    params.bpadj = target.getBodyPartAdjective(bodypart.name)
    params.bpname = bodypart.getName()
    params.garment = target.getOuterWearable(bodypart)
  }
  
  if (target.restraint) params.restraint = w[target.restraint]

  respond(params, erotica.defaultResponses, respondCompleted);
  return SUCCESS;
}

function cmdPourDown(actor, target, substance, garment) {
  console.log(actor)
  console.log(target)
  console.log(substance)
  console.log(garment)
  
  if (!garment.wearable || !garment.worn) {
    return failedmsg("You can only pour stuff down clothing that is worn.")
  }
  
  const source = findSource(actor, substance)
  if (!source) {
    return failedmsg("No " + substance + " here to do that with.")
  }

  const params = {
    boss:game.player,
    actor:actor,
    target:target,
    action:"pour down",
    garment:garment,
    
    //rating:rating,
    //first:!object[firstName],
    //firstFail:!object[firstName + "_failed"],
    substance:substance,
  }
  
  if (target.restraint) params.restraint = w[target.restraint]

  respond(params, erotica.defaultResponses, respondCompleted);
  return SUCCESS;
}



commands.unshift(new Cmd("PourOn", {
  npcCmd:true,
  cmdCategory:'PourOn',
  regex:/^(pour|tip|drizzle) (.+) (on to|on|down|over) (.+)$/,
  objects:[
    {ignore:true},
    {text:true},
    {ignore:true},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    return cmdPourOn(actor, objects[1][0], objects[0])
  },
}));

commands.unshift(new Cmd("PourOnBP", {
  npcCmd:true,
  cmdCategory:'PourOn',
  regex:/^(pour|tip|drizzle) (.+) (on to|on|over) (.+)'s (.+)$/,
  objects:[
    {ignore:true},
    {text:true},
    {ignore:true},
    {scope:parser.isNpcAndHere},
    {scope:parser.isBodyPart}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    return cmdPourOn(actor, objects[1][0], objects[0], objects[2][0])
  },
}));

commands.unshift(new Cmd("PourDown", {
  npcCmd:true,
  cmdCategory:'PourOn',
  regex:/^(pour|tip|drizzle) (.+) down (.+)'s (.+)$/,
  objects:[
    {ignore:true},
    {text:true},
    {scope:parser.isNpcAndHere},
    {scope:parser.isHeldByNpc, attName:'garment'}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    return cmdPourDown(actor, objects[1][0], objects[0], objects[2][0])
  },
}));





//----  Interactions ----


erotica.ACTIONS = [
  {
    name:'grope',
    pattern:'grope|feel|caress|stroke',
    mustBeBare:false,
    intimateRating:3,
    reflexive:true,  // you can readily do this to yourself
    getDefaultBodyPart:function() { return "buttock" },
  },
  
  {
    name:'suck',
    pattern:'suck off|suck|blow off|blow',
    mustBeBare:true,
    intimateRating:10,
    bodypartCheck(bp) {
      return ["cock", "ball", "tit", "nipple"].includes(bp.name);
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
    getDefaultBodyPart:function() { return "mouth" },
  },

  {
    name:'tickle',
    intimateRating:5,
    getDefaultBodyPart:function() { return "midriff" },
  },

  {
    name:'massage',
    intimateRating:3,
    getDefaultBodyPart:function() { return "upperback" },
  },

  {
    name:'smack',
    pattern:'smack|slap',
    mustBeBare:false,
    intimateRating:1,
    reflexive:true,
    getDefaultBodyPart:function() { return "buttock" },
  },

  {
    name:'snog',
    mustBeBare:true,
    intimateRating:3,
    getDefaultBodyPart:function() { return "mouth" },
  },

  {
    name:'compliment',
    intimateRating:0,
    getDefaultBodyPart:function() { return "face" },
  },
  
  {
    name:'look at',
    pattern:'look at|look|x|examine|check out|ogle|stare at',
    intimateRating:0,
    reflexive:true,
    getDefaultBodyPart:function() { return "default" },
    handleSeparately:true,
  },

  {
    name:'fuck',
    mustBeBare:true,
    intimateRating:10,
    getDefaultBodyPart:function(actor, target) { return target.hasBodyPart("pussy") ? "pussy" : "ass" },
    extraTests:function(actor, target, bodypart, sextoy) {
      if (!bodypart.canBePenetrated) return falsemsg(lang.nounVerb(actor, "cannot", true) + " put anything in " + bodypart.byname({article:INDEFINITE}) + ".")
      const g = target.getOuterWearable(bodypart.getSlot(), true)
      if (g) {
        console.log(g)
        if (g.wearable) {
          return falsemsg(lang.nounVerb(actor, "cannot", true) + " do that while " + lang.nounVerb(target, "be") + " wearing " + g.byname({article:INDEFINITE}) + ".")
        }
        else {
          return falsemsg(lang.nounVerb(actor, "cannot", true) + " do that while " + lang.nounVerb(target, "be") + " secured to " + g.byname({article:DEFINITE}) + " like that.")
        }
      }
      const g2 = actor.getOuterWearable("crotch")
      if (g2) return falsemsg("Not while " + actor.byname({article:DEFINITE}) +  " is wearing " + g2.byname({article:INDEFINITE}) + ".")
      return true;
    }    
  },

  {
    name:'girl_top',
    mustBeBare:true,
    intimateRating:10,
    getDefaultBodyPart:function() { return "cock" },
    extraTests:function(actor, target, bodypart, sextoy) {
      //console.log(target)
      const g = target.getOuterWearable("crotch")
      if (g) {
        if (g.wearable) {
          return falsemsg(lang.nounVerb(actor, "cannot", true) + " do that while " + target.byname({article:DEFINITE}) + " is wearing " + g.byname({article:INDEFINITE}) + ".")
        }
        else {
          return falsemsg(lang.nounVerb(actor, "cannot", true) + " do that while " + lang.nounVerb(target, "be") + " tied to " + g.byname({article:INDEFINITE}) + " like that.")
        }
      }
      
      const g2 = actor.getOuterWearable("crotch")
      if (g2) {
        falsemsg("Not while " + actor.byname({article:DEFINITE}) +  " is wearing " + g2.byname({article:INDEFINITE}) + ".")
        return FAILED
      }
    },
  },

  {
    name:'fuck with dildo',
    mustBeBare:true,
    intimateRating:10,
    getDefaultBodyPart:function(actor, target) { return target.hasBodyPart("pussy") ? "pussy" : "ass" },
    extraTests:function(actor, target, bodypart, sextoy) {
      if (!sextoy) return falsemsg(lang.nounVerb(actor, "need", true) + " some kind of sex toy to do that.")
      if (!sextoy.dildo) return falsemsg(lang.nounVerb(actor, "can't", true) + " use " + sextoy.byname({article:DEFINITE}) + " that way.")
      if (!bodypart.canBePenetrated) return falsemsg(lang.nounVerb(actor, "cannot", true) + " put anything in " + bodypart.byname({article:INDEFINITE}) + ".")
      const g = target.getOuterWearable(bodypart.getSlot(), true)
      if (g) {
        if (g.wearable) {
          return falsemsg(lang.nounVerb(actor, "cannot", true) + " do that while " + lang.nounVerb(target, "be") + " wearing " + g.byname({article:INDEFINITE}) + ".")
        }
        else {
          return falsemsg(lang.nounVerb(actor, "cannot", true) + " do that while " + lang.nounVerb(target, "be") + " secured to " + g.byname({article:DEFINITE}) + " like that.")
        }
      }
      return true;
    }    
  },

  {
    name:'come_over',
    pattern:'come over|jerk off over|wank over|wank on|jerk off on|come on|cum over|cum on',
    mustBeBare:false,
    intimateRating:1,
    getDefaultBodyPart:function(actor, target) {
      const postureData = erotica.POSTURES_LIST.find(el => el.desc === target.posture)
      if (!postureData.getDefaultComeOverBodyPart) return "ass"
      return postureData.getDefaultComeOverBodyPart() 
    },
    extraTests:function(actor, target, bodypart) {
      if (!actor.hasBodyPart('cock')) return falsemsg(lang.nounVerb(actor, "would", true) + " need a cock to do that!");
      if (!actor.canManipulate(null, "wank")) return FAILED;
      if (actor.getOuterWearable("crotch")) return falsemsg(lang.nounVerb(actor, "would", true) + " need your cock out to do that!");
      if (actor.posture && !["standing", "kneeling"].includes(actor.posture)) return falsemsg(lang.nounVerb(actor, "would", true) + " need to get up to do that!");
      if (target.postureFurniture) {
       
      }
      else if (target.posture) {
        const postureData = erotica.POSTURES_LIST.find(el => el.desc === target.posture)
        if (!postureData.canComeOver(actor, target, bodypart.name)) return false
      }
      else {
        debugmsg("Should never happen, but someone has no posture: " + target.name)
        w.dcky.fkfh.fkh
        if (!["foot", "calf", "thigh"].includes(bodypart.name) && actor.posture === "kneeling") return falsemsg(actor.byname({article:DEFINITE, capital:true}) + " would have to get up to do that.")
        if (["head", "face", "neck", "upperback", "chest", "cleavage", "arm", "hand", "mouth", "tit", "nipple"].includes(bodypart.name)) return falsemsg(actor.byname({article:DEFINITE, capital:true}) + " would need " + target.byname({article:DEFINITE}) + " to get lower to do that.")
      }
      return true
    },
  },

  {
    name:'frig',
    pattern:'',
    mustBeBare:true,
    intimateRating:10,
    reflexive:true,
    getDefaultBodyPart:function(actor, target) { return "pussy" },
    extraTests:function(actor, target, bodypart) {
      if (!target.hasBodyPart('pussy')) return falsemsg(target.byname({article:DEFINITE, capital:true}) + " would need a pussy for that.");
      if (!actor.canManipulate(null, "frig")) return FAILED;
      if (target.getOuterWearable("crotch")) return falsemsg(lang.nounVerb(actor, "would", true) + " have to get to " + target.byname({article:DEFINITE, capital:true}) + "'s " + target.getOuterWearable("crotch").byname() + " off " + target.pronouns.poss_adj + " to do that!");
      return true
    },
  },

  {
    name:'wank',
    pattern:'',
    mustBeBare:true,
    intimateRating:8,
    reflexive:true,
    getDefaultBodyPart:function(actor, target) { return "cock" },
    extraTests:function(actor, target, bodypart) {
      if (!target.hasBodyPart('cock')) return falsemsg(target.byname({article:DEFINITE, capital:true}) + " would need a cock for that.");
      if (!actor.canManipulate(null, "wank")) return FAILED;
      if (target.getOuterWearable("crotch")) return falsemsg(lang.nounVerb(actor, "would", true) + " have to get to " + target.byname({article:DEFINITE, capital:true}) + "'s " + target.getOuterWearable("crotch").byname() + " off " + target.pronouns.poss_adj + " to do that!");
      return true
    },
  },

]

// This constructs a list of verbs to match against from the above array, using both the name and pattern
erotica.ACTIONS_LIST = []
for (let action of erotica.ACTIONS) {
  if (!action.handleSeparately) erotica.ACTIONS_LIST.push(action.pattern ? action.pattern : action.name);
}
erotica.ACTIONS_PATTERN = erotica.ACTIONS_LIST.join('|')

// This also catches GROPE JOANNA, etc.
commands.unshift(new Cmd('SexActionsMy', {
  npcCmd:true,
  regex:new RegExp("^(" + erotica.ACTIONS_PATTERN + ") (my |your |his |her |)(left |right |)(.+)$"),
  objects:[
    {text:true},
    {ignore:true},
    {text:true},
    {scope:parser.isBodyPart}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdInteract(objects[0], actor, game.player, {bodypart:objects[2][0], side:objects[1]});
  },
}));




commands.unshift(new Cmd("LookAtBP", {
  regex:new RegExp("^(look at|look|x|examine|check out|ogle|stare at) (.+)'s (left |right |)(.+)$"),
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
    {text:true},
    {scope:parser.isBodyPart}
  ],
  script:function(objects) {
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdInteract(objects[0], actor, objects[1][0], {bodypart:objects[3][0], side:objects[2]});
  },
}));



commands.unshift(new Cmd("SexActions", {
  npcCmd:true,
  regex:new RegExp("^(" + erotica.ACTIONS_PATTERN + ") (.+)'s (left |right |)(.+)$"),
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
    {text:true},
    {scope:parser.isBodyPart}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdInteract(objects[0], actor, objects[1][0], {bodypart:objects[3][0], side:objects[2]});
  },
}));

commands.unshift(new Cmd("SexActionsNoBP", {
  npcCmd:true,
  regex:new RegExp("^(" + erotica.ACTIONS_PATTERN + ") (.+)$"),
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdInteract(objects[0], actor, objects[1][0]);
  },
}));


function cmdInteract(actionName, actor, object, options) {
  if (options === undefined) options = {}
  
  // Find the action dictionary, assign to verb
  const regex = new RegExp("\\b" + actionName + "\\b");
  let verb = false;
  for (let action of erotica.ACTIONS) {
    if (action.pattern) {
      if (regex.test(action.pattern)) verb = action;
    }
    else {
      if (actionName === action.name) verb = action;
    }
  }
  if (!verb) {
    errormsg("Failed to find an action, " + actionName + ", despite it being recognised. Odd.");
    return FAILED;
  }

  // Get a bodypart, check it makes sense
  let bodypart
  if (options.bodypart) {
    bodypart = options.bodypart
  }
  else {
    if (verb.getDefaultBodyPart) {
      bodypart = w[verb.getDefaultBodyPart(actor, object)]
    }
    else {
      failedmsg("I was expecting a body part at the end of that. Quite the disappointment!");
      return FAILED;
    }
  }
  
  // Is the character doing it to him/herself? Does that make sense
  if (!verb.reflexive && (bodypart.name !== 'arm' || bodypart.name !== 'hand') && actor === object) {
    failedmsg(lang.nounVerb(actor, "would", true) + " need to be some sort of contortionist to do that!");
    return FAILED;
  }
  const side = options.side === '' ? undefined : options.side
  if (!bodypart.paired && side) return failedmsg("I was not expecting that body part to have a left and right!");
  if (verb.bodypartCheck && !verb.bodypartCheck(bodypart)) return failedmsg("That is not a body part you can do that with, is it?");
  if (!object.hasBodyPart(bodypart)) return failedmsg(lang.nounVerb(object, "don't", true) + " have " + bodypart.byname({article:INDEFINITE}) + ".");

  //console.log(bodypart)

  if (verb.extraTests && !verb.extraTests(actor, object, bodypart, options.sextoy)) return FAILED;
  if (!actor.canManipulate(object, verb.name)) return FAILED;
  if (!actor.getAgreement("Interact", object, verb, bodypart, options.altName ? options.altName : actionName)) return FAILED;

  const garment = bodypart.getProtection(object);
  if (verb.mustBeBare && garment) return failedmsg(lang.nounVerb(actor, "can't", true) + " do that when " + object.byname({article:DEFINITE}) + " is wearing " + garment.byname({article:DEFINITE}) + ".");
  
  //console.log(actor.name + ":" + verb.name + ":" + bodypart.name + ":" + side + ":" + altName)
  let rating = object.attractionTo(actor) + object.arousal / 4
  if (bodypart) rating -= bodypart.getIntimateRating(object) * 5
  if (actor.reputation) rating -= actor.reputation
  if (object === game.player) rating = 100  // you want it done to yourself
  const firstName = verb.name + "_" + bodypart.name
  
  const params = {
    boss:game.player,
    actor:actor,
    target:object,
    action:verb.name,
    garment:garment,
    bodypart:bodypart,
    sextoy:options.sextoy,
    side:side,
    bpadj:object.getBodyPartAdjective(bodypart.name),
    bpname:bodypart.getName(side),
    rating:rating,
    first:!object[firstName],
    firstFail:!object[firstName + "_failed"],
  }
  if (object.restraint) params.restraint = w[object.restraint]

  respond(params, erotica.defaultResponses, respondCompleted);
  return SUCCESS;
}

erotica.wankScriptReversed = function(objects) {
  return erotica.wankScript(objects.reverse())
}
erotica.wankScript = function(objects) {
  const actor = extractChar(this, objects)
  if (!actor) return FAILED;
  const verb = objects[0];
  let target
  if (this.name.indexOf("Self") === -1) {
    target = objects[1][0];
  }
  else {
    target = actor
  }
  //console.log(verb);
  if (target.hasBodyPart("cock") && !verb.startsWith("jill") && !verb.startsWith("flick")) {
    return cmdInteract("wank", actor, target, {bodypart:w.cock, altName:verb})
  }
  if (target.hasBodyPart("pussy") && !verb.startsWith("jerk") && !verb.startsWith("jack") && !verb.startsWith("rub") && !verb.endsWith("tug")) {
    return cmdInteract("frig", actor, target, {bodypart:w.pussy, altName:verb})
  }
  if (verb.startsWith("jill") || verb.startsWith("flick")) return failedmsg("A character requires a pussy to jill off.")
  if (verb.startsWith("jerk") || verb.startsWith("jack") || verb.startsWith("rub") || verb.endsWith("tug")) {
    return failedmsg("Only characters with dicks can be jerked off.")
  }
  return failedmsg("A character requires genitals for masturbation.")
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
commands.unshift(new Cmd('Masturbate3', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(flick) (.+)'s bean$/,
  objects:[
    {text:true},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.wankScript,
}));












//--------------------------------------------------------
//--  POSTURES --




commands.unshift(new Cmd('BendOverFurniture', {
  npcCmd:true,
  regex:/^(bend over) (.+)$/,
  attName:"bendover",
  objects:[
    {ignore:true},
    {scope:parser.isHere, attName:"assumePosture"},
  ],
  defmsg:cannot_bend_over,
}));
commands.unshift(new Cmd('Straddle', {
  npcCmd:true,
  regex:/^(straddle) (.+)$/,
  attName:"straddle",
  objects:[
    {ignore:true},
    {scope:parser.isHere, attName:"assumePosture"},
  ],
  defmsg:cannot_staddle,
}));
commands.unshift(new Cmd('LieFaceDown', {
  npcCmd:true,
  regex:/^(lie face down on) (.+)$/,
  attName:"facedown",
  objects:[
    {ignore:true},
    {scope:parser.isHere, attName:"assumePosture"},
  ],
  defmsg:lang.cannot_recline_on,
}));

function cannot_bend_over(actor, item) {
  return lang.pronounVerb(item, "'be", true) + " not something one can bend over.";
}
function cannot_staddle(actor, item) {
  return lang.pronounVerb(item, "'be", true) + " not something one can straddle.";
}
function bendover_successful(actor, item) {
  return lang.nounVerb(actor, "bend", true) + " over " + item.byname({article:DEFINITE}) + ".";
}
function straddle_successful(actor, item) {
  return lang.nounVerb(actor, "straddle", true) + " " + item.byname({article:DEFINITE}) + ".";
}
function facedown_successful(actor, item) {
  return lang.nounVerb(actor, "lie", true) + " face down on " + item.byname({article:DEFINITE}) + ".";
}




const cmdRollOver = function(actor) {
  if (actor.restraint) {
    return failedmsg(lang.nounVerb(actor, "can", true) + " not roll over whilst tied up.");
  }
  if (!["reclining", "facedown"].includes(actor.posture)) {
    return failedmsg(lang.nounVerb(actor, "can", true) + " only roll over when lying down.");
  }
  if (actor.posture === "reclining") {
    msg(lang.nounVerb(actor, "roll", true) + " on to " + actor.pronouns.poss_adj + " front.");
    actor.posture = "facedown"
  }
  else if (actor.posture === "facedown") {
    msg(lang.nounVerb(actor, "roll", true) + " on to " + actor.pronouns.poss_adj + " back.");
    actor.posture = "reclining"
  }
  return SUCCESS
}

commands.unshift(new Cmd('RollOver', {
  regex:/^roll over$/,
  attName:"rollover",
  objects:[
  ],
  script:function(objects) {
    return cmdRollOver(game.player);
  },
}));
commands.unshift(new Cmd('NpcRollOver1', {
  regex:/^(.+), roll over$/,
  attName:"rollover",
  objects:[
    {scope:parser.isNpcAndHere},
  ],
  script:function(objects) {
    return cmdRollOver(objects[0][0]);
  },
}));
commands.unshift(new Cmd('NpcRollOver1', {
  regex:/^tell (.+) to roll over$/,
  attName:"rollover",
  objects:[
    {scope:parser.isNpcAndHere},
  ],
  script:function(objects) {
    return cmdRollOver(objects[0][0]);
  },
}));


// canComeOver assumes actor is either stood, kneeling or stood on something

erotica.POSTURES_LIST = [
  {
    cmd:'stand', desc:'standing', ignore:true, pattern:'stand|stand up|get up',
    canComeOver:function(actor, target, bp) {
      if (!["foot", "calf", "thigh"].includes(bp) && actor.posture === "kneeling") return falsemsg(actor.byname({article:DEFINITE, capital:true}) + " would have to get up to do that.")
      if (["head", "face", "neck", "upperback", "chest", "cleavage", "arm", "hand", "mouth", "tit", "nipple"].includes(bp)) return falsemsg(actor.byname({article:DEFINITE, capital:true}) + " would need " + target.byname({article:DEFINITE}) + " to get lower to do that.")
      return true
    },
    getAssumePostureDescription:function(actor, previous) {
      return lang.nounVerb(actor, "stand", true) + " up."
    },
  },
  
  {
    cmd:'kneel', desc:'kneeling', 
    canComeOver:function(actor, target, bp) {
      if (["head", "face", "neck", "mouth"].includes(bp) && actor.posture === "kneeling") return falsemsg(actor.byname({article:DEFINITE, capital:true}) + " would have to get up to do that.")
      if (!["head", "face", "upperback", "lowerback", "buttock", "ass", "thigh"].includes(bp)) return false
      return true
    },
    getAssumePostureDescription:function(actor, previous) {
      return lang.nounVerb(actor, "kneel", true) + "."
    },
    getDefaultComeOverBodyPart:function() { return "face" },
  },
  
  {
    cmd:'bendover', desc:'bending over', pattern:'bend over', 
    canComeOver:function(actor, target, bp) {
      if (!["foot", "calf"].includes(bp) && actor.posture === "kneeling") return falsemsg(actor.byname({article:DEFINITE, capital:true}) + " would have to get up to do that.")
      if (["head", "face", "upperback", "lowerback", "buttock", "ass", "thigh"].includes(bp)) return true
      return falsemsg(lang.nounVerb(actor, "can't", true) + " while " + target.pronouns.subjective + " is bending over.")
    },
    getAssumePostureDescription:function(actor, previous) {
      return lang.nounVerb(actor, "bend", true) + " over, and grip " + actor.pronouns.poss_adj + " ankles."
    },
  },
  
  {
    cmd:'sit', desc:'sitting', addFloor:true, 
    canComeOver:function(actor, target, bp) {
      if (!["foot", "calf"].includes(bp) && actor.posture === "kneeling") return falsemsg(actor.byname({article:DEFINITE, capital:true}) + " would have to get up to do that.")
      if (!["buttock", "ass"].includes(bp)) return true
      return falsemsg(lang.nounVerb(actor, "can't", true) + " while " + target.pronouns.subjective + " is sitting.")
    },
    getAssumePostureDescription:function(actor, previous) {
      return lang.nounVerb(actor, "sit", true) + " on the " + (w[actor.loc].postureSurface || "floor") + "."
    },
    getDefaultComeOverBodyPart:function() { return "face" },
  },
  
  {
    cmd:'liefacedown', desc:'facedown', addFloor:true, pattern:'lie face down', 
    canComeOver:function(actor, target, bp) {
      if (!actor.posture || actor.posture === "standing") return falsemsg(actor.byname({article:DEFINITE, capital:true}) + " needs to get lower for any decent aim.")
      if (!["head", "face", "upperback", "lowerback", "buttock", "ass", "thigh", "calf", "foot", "arm", "hand"].includes(bp)) return true
      return falsemsg(lang.nounVerb(actor, "can't", true) + " while " + target.pronouns.subjective + " is lying on " + target.pronouns.poss_adj + " front.")
    },
    getAssumePostureDescription:function(actor, previous) {
      if (previous === 'reclining') {
        return lang.nounVerb(actor, "roll", true) + " over, to lie face down."
      }
      else {
        return lang.nounVerb(actor, "lie", true) + " back on the " + (w[this.loc].postureSurface || "floor") + ", face down."
      }
    },
  },
  
  {
    cmd:'lieback', desc:'reclining', addFloor:true, pattern:'lie down|lie back|recline', 
    canComeOver:function(actor, target, bp) {
      if (!actor.posture || actor.posture === "standing") return falsemsg(actor.byname({article:DEFINITE, capital:true}) + " needs to get lower for any decent aim.")
      if (!["head", "face", "mouth", "chest", "tit", "nipple", "midriff", "groin", "thigh", "calf", "foot", "arm", "hand"].includes(bp)) return true
      return falsemsg(lang.nounVerb(actor, "can't", true) + " while " + target.pronouns.subjective + " is lying on " + target.pronouns.poss_adj + " back.")
    },
    getAssumePostureDescription:function(actor, previous) {
      if (previous === 'facedown') {
        return lang.nounVerb(actor, "rolls", true) + " over, to lie face up."
      }
      else {
        return lang.nounVerb(actor, "lie", true) + " back on the " + (w[actor.loc].postureSurface || "floor") + "."
      }
    },
    getDefaultComeOverBodyPart:function() { return "face" },
  },
  
  {
    cmd:'crawl', desc:'on # hands and knees', pattern:'crawl|get on hands and knees', 
    canComeOver:function(actor, target, bp) {
      if (["head", "face", "upperback", "lowerback", "buttock", "ass", "thigh"].includes(bp)) return true
      return falsemsg(lang.nounVerb(actor, "can't", true) + " while " + target.pronouns.subjective + " on " + target.pronouns.poss_adj + " hands and knees.")
    },
    getAssumePostureDescription:function(actor) {
      return lang.nounVerb(actor, "go", true) + " down on " + actor.pronouns.poss_adj + " hands and knees."
    },
  },
];

for (let posture of erotica.POSTURES_LIST) {
  commands.unshift(new Cmd('Position' + sentenceCase(posture.cmd), {
    npcCmd:true,
    score:2, // ensure we override the built-in version
    //cmdCategory:sentenceCase(posture.cmd),
    regex:new RegExp("^" + (posture.pattern ? posture.pattern : posture.cmd) + "$"),
    objects:[
    ],
    useThisScriptForNpcs:true,
    posture:posture,
    script:function(objects) {
      const cmd = /Position([A-Za-z]+)[12]?$/.exec(this.name)[1].toLowerCase();
      const posture = erotica.POSTURES_LIST.find(function(el) { return el.cmd === cmd} );
      
      let actor;
      if (this.forNpc) {
        actor = objects[0][0];
        if (!actor.npc) {
          failedmsg(not_npc(actor));
          return FAILED; 
        }
        objects.shift();
      }
      else {
        actor = game.player;
      }
      return actor.assumePosture(posture)
    },
  }));
}





//--------------------------------------------------------
//--  CLOTHING RELATED  --





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
      failedmsg(lang.not_npc(npc));
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
      failedmsg(lang.not_npc(npc));
      return FAILED; 
    }
    return cmdUndress(npc);
  },
}))


function cmdUndress(actor) {
  if (actor.isNaked()) {
    failedmsg(lang.nounVerb(actor, "be", true) + " already naked.");
    return FAILED;
  }
  const garment = actor.firstToRemove();
  if (!actor.canManipulate(garment, "Remove")) {
    // The getAgreement should give the response
    return FAILED;
  }
  if (!actor.getAgreement("Remove", garment)) {
    // The getAgreement should give the response
    return FAILED;
  }
  const res = garment.remove(false, actor);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    const target = objects[0][0];
    if (!target.isHere()) {
      // actor not here (this is checked in cmdRemoveGarment, but should be before naked check
      failedmsg(lang.nounVerb(target, "be", true) + " not here.");
      return FAILED;
    }
    if (target.isNaked()) {
      failedmsg(lang.nounVerb(target, "be", true) + " already naked.");
      return FAILED;
    }
    return cmdRemoveGarment(actor, target, target.firstToRemove(), 0);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdRemoveGarment(actor, objects[0][0], objects[1][0], 0);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdRemoveGarment(actor, objects[0][0], objects[1][0], 0);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdRemoveGarment(actor, objects[1][0], objects[0][0], 0);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdRemoveGarment(actor, objects[0][0], objects[1][0], 2);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdRemoveGarment(actor, objects[0][0], objects[1][0], 2);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdRemoveGarment(actor, objects[1][0], objects[0][0], 2);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdRemoveGarment(actor, objects[0][0], objects[1][0], 5);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdRemoveGarment(actor, objects[0][0], objects[1][0], 5);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    const g = objects[0][0]
    
    if (!g.pullUp) {
      failedmsg("That's not something that can be pulled up.")
      return FAILED
    }
    
    return g.pullUp(actor);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    const g = objects[0][0]
    
    if (!g.pullDown) {
      failedmsg("That's not something that can be pulled down.")
      return FAILED
    }
    
    return g.pullDown(actor);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    const g = objects[0][0]
    
    if (!g.fasten) {
      failedmsg("That's not something that can be fastened up.")
      return FAILED
    }
    
    return g.fasten(actor);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED
    const g = objects[0][0]
    
    if (!g.unfasten) {
      failedmsg("That's not something that can be unfastened.")
      return FAILED
    }
    
    return g.unfasten(actor);
  },
}));


function cmdRemoveGarment(actor, target, garment, strength) {
  if (!actor.isHere()) {
    // actor not here
    failedmsg(lang.nounVerb(actor, "be", true) + " not here.");
    return FAILED;
  }
  
  if (!target.isHere()) {
    // target not here
    failedmsg(lang.nounVerb(target, "be", true) + " not here.");
    return FAILED;
  }
  
  if (!garment.getWorn() || !garment.isAtLoc(target.name)) {
    // garment not worn by target
    failedmsg(lang.nounVerb(target, "be", true) + " not wearing " + garment.byname({article:INDEFINITE}) + ".");
    return FAILED;
  }

  const cutter = actor.findCutter()
  if (strength > 2 && !cutter) {
    // garment not worn by target
    failedmsg(lang.nounVerb(actor, "need", true) + " a knife or something to do that.");
    return FAILED;
  }

  const blocker = garment.getWearRemoveBlocker(target, false);
  if (blocker) {
    failedmsg(lang.nounVerb(actor, "can", true) + " not remove " + garment.byname({article:DEFINITE}) + " whilst " + target.byname({article:DEFINITE}) + " is wearing " + blocker.byname({article:INDEFINITE}) + ".");
    return FAILED; 
  }

  if (actor === target) {
    if (!actor.getAgreement("Remove", garment)) {
      // The getAgreement should give the response
      return FAILED;
    }
    const res = garment.wear(false, actor);
    return res ? SUCCESS : FAILED;
  }
  
  let rating = target.attractionTo(actor) + target.arousal / 4
  if (actor.reputation) rating -= actor.reputation
  if (target === game.player) rating = 100  // you want it done to yourself
  //console.log("target.getWillingToExpose(w[target.loc]): " + target.getWillingToExpose(w[target.loc]))
  //console.log("target.getExposureWithout(garment): " + target.getExposureWithout(garment))
  //console.log("actor.reputation: " + actor.reputation)
  //console.log("rating: " + rating)

  const targetNoChoice = !target.canManipulate();
  if (!actor.getAgreement("RemoveOther", garment, target, rating, targetNoChoice)) {
    // The getAgreement should give the response
    // Count as success as an action has been taken
    return SUCCESS;
  }

  // By now we have a character, actor, willing to try to remove an item, garment, from a different character, target
  //console.log(actor.name + ":remove:" + garment.name)
  const firstName = "remove_" + garment.name
  const params = {
    boss:game.player,
    actor:actor,
    target:target,
    action:"remove",
    garment:garment,
    rating:rating,
    strength:strength,
    exposure:target.getWillingToExpose(w[target.loc]) - target.getExposureWithout(garment),
    first:!target[firstName],
    firstFail:!target[firstName + "_failed"],
  }
  if (target.restraint) params.restraint = w[target.restraint]

  respond(params, erotica.defaultResponses, respondCompleted);
  return SUCCESS;
}






//--------------------------------------------------------
//--  BONDAGE RELATED --




function cmdRestrain (actor, target, item) {
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
  if (!item.bondage) {
    return failedmsg(lang.nounVerb(item, "be", true) + " not something you can tie people to.")
  }
  if (target.restraint || item.victim) {
    return failedmsg(lang.nounVerb(target, "be", true) + " already " + w[target.restraint].situation + ".")
  }
  const held = target.getHolding()
  if (held.length > 0) {
    const it_them = held.length > 1 || held[0].pronouns === lang.pronouns.plural  || held[0].pronouns === lang.pronouns.massnoun ? "them" : "it"
    msg(lang.nounVerb(actor, "take", true) + " " + formatList(held, {article:DEFINITE, lastJoiner:" and "}) + " from " + target.byname({article:DEFINITE}) + " and " + lang.pronounVerb(actor, "put") + " " + it_them + " on the ground.")
    for (let item of held) {
      item.moveToFrom(actor.loc)
    }
  }
  //console.log(item)
  item.restrain(actor, target)
  return SUCCESS;
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdRestrain(actor, objects[0][0], objects[1][0]);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdRestrain(actor, objects[0][0]);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    return cmdRestrain(actor, objects[0][0]);
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
    const actor = extractChar(this, objects)
    if (!actor) return FAILED;
    const target = objects[0][0]
    if (!target.restraint) {
      failedmsg(lang.nounVerb(target, "do", true) + " not need to be released.");
      return FAILED;
    }
    w[target.restraint].release(actor, target)
    target.posture = "standing"
    return SUCCESS;
  },
}));




  
//--------------------------------------------------------
//--  DEBUGGING --


commands.unshift(new Cmd('DebugTestNpc', {
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






