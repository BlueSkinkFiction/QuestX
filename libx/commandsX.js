"use strict";



parser.specialText.bodyPart = {
  error:function(text) {
    const bp = findBodyPart(text)
    if (bp) return false
    return processText("{show:text:true} is not a body part I am familiar with.", {text:text})
  },
  exec:function(text) {
    return findBodyPart(text)
  },
}





new Cmd('Snog', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(snog|make out with|make out|french kiss) (.+)$/,
  objects:[
    {scope:parser.isNpcAndHere},
  ],
  script:function(objects) {
    return cmdInteract(parser.specialText.action.find("snog"), char, target, {})
  },
})




function respondCompleted(params, response) {
  if (!response) {
    console.log("No response found")
    console.log(params)
    return 
  }
  //log(params)
  if (!params.action) console.log(params)
  let s = params.action + "_"
  if (params.bodypart) s += params.bodypart.name
  if (params.garment) s += params.garment.name
  if (response.failed) s += "failed"
  params.item[s] = true
}  



function cmdFuck(char, target, bodypart, sextoy) {
  if (sextoy) {
    // Fuck pussy or ass with cock or dildo
    if (bodypart === undefined) bodypart = target.hasBodyPart("pussy") ? w.pussy : w.ass
    return cmdInteract(parser.specialText.action.find("fuck with dildo"), char, target, {bodypart:bodypart, sextoy:sextoy})
  }
  
  else if (char.hasBodyPart("cock")) {
    // Fuck pussy or ass with cock or dildo
    if (bodypart === undefined) bodypart = target.hasBodyPart("pussy") ? w.pussy : w.ass
    return cmdInteract(parser.specialText.action.find("fuck"), char, target, {bodypart:bodypart})
  }
  
  else if (target.hasBodyPart("cock") && char.hasBodyPart("pussy")) {
    // Fuck cock with pussy
    if (bodypart && bodypart.name !== "cock") return failedmsg("Not sure how " + lang.getName(char, {article:DEFINITE}) + " is going to do that.")
    return cmdInteract(parser.specialText.action.find("girl_top"), char, target, {})
  }  
  
  else {
    failedmsg("Not sure how that would work. Sorry.")
    return world.FAILED
  }
}



new Cmd("Fuck", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(fuck|penetrate|pleasure|shag|bonk) (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    const target = objects[0][0]
    return cmdFuck(char, objects[0][0])
  },
})

new Cmd("Fuck2", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(push|insert|force|thrust)( my| your| his| her|) (cock|dick) in (.+)'s (.+)$/,
  objects:[
    {special:'ignore'},
    {special:'ignore'},
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
    {special:'bodyPart'},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdFuck(char, objects[0][0], objects[1][0])    
  },
})

new Cmd("Fuck3", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(fuck|penetrate|pleasure) (.+)'s (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isHere},
    {scope:parser.isNpcAndHere},
    {special:'bodyPart'},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdFuck(char, objects[0][0], objects[1][0])
  },
})

new Cmd("Fuck4", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(ass fuck) (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    const target = objects[0][0]
    return cmdFuck(char, objects[0][0], w.ass)
  },
})

new Cmd("Fuck5", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(face fuck) (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdFuck(char, objects[0][0], w.mouth)
  },
})

new Cmd("Sextoy", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(fuck|penetrate|pleasure) (.+) with (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
    {scope:parser.isHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdFuck(char, objects[0][0], undefined, objects[1][0])
  },
})

new Cmd("Sextoy2", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(ass fuck) (.+) with (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
    {scope:parser.isHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdFuck(char, objects[0][0], undefined, objects[1][0])
  },
})

new Cmd("Sextoy3", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(face fuck) (.+) with (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
    {scope:parser.isHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdFuck(char, objects[0][0], undefined, objects[1][0])
  },
})

new Cmd("Sextoy4", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(push|insert|force|thrust) (.+) in (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isHere},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdFuck(char, objects[1][0], undefined, objects[0][0])
  },
})


new Cmd("Sextoy5", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(push|insert|force|thrust) (.+) in (.+)'s (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isHere},
    {scope:parser.isNpcAndHere},
    {special:'bodyPart'},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdFuck(char, objects[1][0], objects[2][0], objects[0][0])
  },
})

new Cmd("Sextoy6", {
  npcCmd:true,
  cmdCategory:'InsertSextoy',
  regex:/^(fuck|penetrate|pleasure) (.+)'s (.+) with (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isHere},
    {scope:parser.isNpcAndHere},
    {special:'bodyPart'},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdFuck(char, objects[0][0], objects[1][0], objects[2][0])
  },
})






erotica.blowJobScript = function(objects) {
  const char = extractChar(this, objects)
  if (!char) return world.FAILED;
  const target = objects[0][0];
  if (target.hasBodyPart("cock")) {
    return cmdInteract(parser.specialText.action.find("suck"), char, target, {bodypart:w.cock})
  }
  else {
    failedmsg("{nv:char:can:true} only suck off character's with dicks.")
    return world.FAILED
  }
}
new Cmd('Suck off', {
  npcCmd:true,
  score:2,
  useThisScriptForNpcs:true,
  regex:/^(suck off|suck|fellato|perform fellatio on|perform fellatio|fellatio|give blow job to|blow job|blow) (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.blowJobScript,
})
new Cmd('FellatioOff', {
  npcCmd:true,
  score:1,
  useThisScriptForNpcs:true,
  regex:/^(suck) (.+) off$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.blowJobScript,
})



erotica.goDownScript = function(objects) {
  const char = extractChar(this, objects)
  if (!char) return world.FAILED;
  const target = objects[1][0];
  if (target.hasBodyPart("cock")) {
    return cmdInteract(parser.specialText.action.find("suck"), char, target, {bodypart:'cock'})
  }
  if (target.hasBodyPart("pussy")) {
    return cmdInteract(parser.specialText.action.find("lick"), char, target,{bodypart:'pussy'})
  }
  failedmsg("{nv:char:can:true} only go down on character's with genitals.")
  return world.FAILED
}
new Cmd('GoDownOn', {
  npcCmd:true,
  score:1,
  useThisScriptForNpcs:true,
  regex:/^(go down on|go down) (.+)$/,
  objects:[
    {special:'text'},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.goDownScript,
})



erotica.cunnilingusScript = function(objects) {
  const char = extractChar(this, objects)
  if (!char) return world.FAILED;
  const target = objects[1][0];
  if (target.hasBodyPart("pussy")) {
    return cmdInteract(parser.specialText.action.find("lick"), char, target, {bodypart:'pussy'})
  }
  failedmsg("{nv:char:can:true} only do cunnilingus on character's with a pussy.")
  return world.FAILED
}
new Cmd('Cunnilingus', {
  npcCmd:true,
  score:1,
  useThisScriptForNpcs:true,
  regex:/^(perform cunnilingus|cunnilingus) (.+)$/,
  objects:[
    {special:'text'},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.cunnilingusScript,
})



erotica.teabagScript = function(objects) {
  const char = extractChar(this, objects)
  if (!char) return world.FAILED;
  const target = objects[1][0];
  if (target.hasBodyPart("bollock")) {
    return cmdInteract(parser.specialText.action.find("suck"), char, target, {bodypart:'bollock'})
  }
  failedmsg("{nv:char:can:true} only teabag character's with balls.")
  return world.FAILED
}
new Cmd('Teabag', {
  npcCmd:true,
  score:1,
  useThisScriptForNpcs:true,
  regex:/^(teabag) (.+)$/,
  objects:[
    {special:'text'},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.teabagScript,
})




/*function handleEmptyInto(char, vessel, sink) {
  const options = {char:char, container:vessel, fluid:vessel.containedFluidName, sink:sink}
  if (!vessel.vessel) return failedmsg(lang.not_vessel, options);
  if (vessel.closed) return  failedmsg(lang.container_closed, options);
  if (!char.testManipulate(vessel, "fill")) return world.FAILED;
  if (!char.getAgreement("Fill", vessel)) return world.FAILED;
  if (!vessel.isAtLoc(char.name)) return failedmsg(lang.not_carrying, {char:char, item:sink});
  return vessel.doEmpty(options) ? world.SUCCESS: world.FAILED;
}
*/

function cmdPourFluidOn(char, target, fluid, bodypart) {
  for (const key in w) {
    const o = w[key]
    if (o.vessel && o.containedFluidName === fluid && o.loc === char.name) {
      return cmdPourVesselOn(char, target, o, bodypart, undefined, "pour on")
    }
  }
  return failedmsg(lang.not_carrying_fluid, {char:char, fluid:fluid});
}

function cmdPourFluidDown(char, target, fluid, bodypart) {
  for (const key in w) {
    const o = w[key]
    if (o.vessel && o.containedFluidName === fluid && o.loc === char.name) {
      return cmdPourVesselOn(char, target, o, undefined, garment, "pour down")
    }
  }
  return failedmsg(lang.not_carrying_fluid, {char:char, fluid:fluid});
}


function cmdPourVesselOn(char, target, vessel, bodypart, garment, action) {
  //console.log(char)
  //console.log(target)
  //console.log(substance)
  //console.log(bodypart)
  
  const params = {
    boss:player,
    char:char,
    item:target,
    action:action,
    source:vessel,
    substance:vessel.containedFluidName,
    afterScript:respondCompleted,
  }

  if (bodypart !== undefined && bodypart.name !== 'torso') {
    params.bodypart = bodypart
    params.bpadj = target.getBodyPartAdjective(bodypart.name)
    params.bpname = bodypart.getName()
    params.garment = target.getOuterWearable(bodypart)
  }
  
  if (target.restraint) params.restraint = w[target.restraint]

  respond(params, erotica.defaultResponses);
  return world.SUCCESS;
}





new Cmd("PourOn", {
  npcCmd:true,
  cmdCategory:'PourOn',
  regex:/^(?:pour|tip|drizzle) (.+) (?:on to|on|down|over) (.+)$/,
  objects:[
    {special:'fluid'},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdPourFluidOn(char, objects[1][0], objects[0])
  },
})

new Cmd("PourOnBP", {
  npcCmd:true,
  cmdCategory:'PourOn',
  regex:/^(?:pour|tip|drizzle) (.+) (?:on to|on|over) (.+)'s (.+)$/,
  objects:[
    {special:'fluid'},
    {scope:parser.isNpcAndHere},
    {special:'bodyPart'}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdPourFluidOn(char, objects[1][0], objects[0], objects[2])
  },
})

new Cmd("PourDown", {
  npcCmd:true,
  cmdCategory:'PourOn',
  regex:/^(?:pour|tip|drizzle) (.+) down (.+)'s (.+)$/,
  objects:[
    {special:'fluid'},
    {scope:parser.isNpcAndHere},
    {scope:parser.isHeldByNpc, attName:'garment'}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdPourFluidDown(char, objects[1][0], objects[0], objects[2])
  },
})





new Cmd("EmptyOn", {
  npcCmd:true,
  cmdCategory:'PourOn',
  regex:/^(?:empty|pour out|pour|discharge|decant) (.+) (?:on to|on|down|over) (.+)$/,
  objects:[
    {scope:parser.isHeld},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdPourVesselOn(char, objects[1][0], objects[0][0], undefined, undefined, "pour on")
  },
})

new Cmd("EmptyOnBP", {
  npcCmd:true,
  cmdCategory:'PourOn',
  regex:/^(?:empty|pour out|pour|discharge|decant) (.+) (?:on to|on|over) (.+)'s (.+)$/,
  objects:[
    {scope:parser.isHeld},
    {scope:parser.isNpcAndHere},
    {special:'bodyPart'}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdPourVesselOn(char, objects[1][0], objects[0][0], objects[2], undefined, "pour on")
  },
})

new Cmd("EmptyDown", {
  npcCmd:true,
  cmdCategory:'PourOn',
  regex:/^(?:empty|pour out|pour|discharge|decant) (.+) down (.+)'s (.+)$/,
  objects:[
    {scope:parser.isHeld},
    {scope:parser.isNpcAndHere},
    {scope:parser.isHeldByNpc, attName:'garment'}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    return cmdPourVesselOn(char, objects[1][0], objects[0][0], undefined, objects[2][0], "pour down")
  },
})




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
    getDefaultBodyPart:function() { return "cock" },
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
    name:'fuck',
    mustBeBare:true,
    intimateRating:10,
    getDefaultBodyPart:function(char, target) { return target.hasBodyPart("pussy") ? "pussy" : "ass" },
    extraTests:function(options) {
      if (!options.bodypart.canBePenetrated) return falsemsg("{nv:char:cannot:true} put anything in {nm:bodypart:a}.", options)
      options.garment = options.item.getOuterWearable("crotch")
      if (options.garment) {
        if (options.garment.wearable) return falsemsg("{nv:char:cannot:true} do that while {nv:item:be} is wearing {nm:garment:a}.", options)
        return falsemsg("{nv:char:cannot:true} do that while {nv:item:be} tied to {nm:garment:the} like that.", options)
      }
      options.garment = options.char.getOuterWearable("crotch")
      if (options.garment) return falsemsg("Not while {nv:char:be} wearing {nm:garment:a}.", options)
      return true
    }    
  },

  {
    name:'girl_top',
    mustBeBare:true,
    intimateRating:10,
    getDefaultBodyPart:function() { return "cock" },
    extraTests:function(options) {
      options.garment = options.item.getOuterWearable("crotch")
      if (options.garment) {
        if (options.garment.wearable) return falsemsg("{nv:char:cannot:true} do that while {nv:item:be} is wearing {nm:garment:a}.", options)
        return falsemsg("{nv:char:cannot:true} do that while {nv:item:be} tied to {nm:garment:the} like that.", options)
      }
      options.garment = options.char.getOuterWearable("crotch")
      if (options.garment) return falsemsg("Not while {nv:char:be} wearing {nm:garment:a}.", options)
      return true
    },
  },

  {
    name:'fuck with dildo',
    mustBeBare:true,
    intimateRating:10,
    getDefaultBodyPart:function(char, target) { return target.hasBodyPart("pussy") ? "pussy" : "ass" },
    extraTests:function(options) {
      if (!options.sextoy) return falsemsg("{nv:char:need:true} some kind of sex toy to do that.", options)
      if (!options.sextoy.dildo) return falsemsg("{nv:char:can't:true} use {nm:sextoy:the} that way.", options)
      if (!options.bodypart.canBePenetrated) return falsemsg("{nv:char:cannot:true} put anything in {nm:bodypart:a}.", options)
      options.garment = options.item.getOuterWearable(options.bodypart.getSlot(), true)
      if (options.garment) {
        if (options.garment.wearable) {
          return falsemsg("{nv:char:cannot:true} do that while {nv:item:be} wearing {nm:garment:a}.", options)
        }
        else {
          return falsemsg("{nv:char:cannot:true} do that while {nv:item:be} secured to {nm:garment:the} like that.", options)
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
    getDefaultBodyPart:function(char, item) {
      const postureData = erotica.POSTURES_LIST.find(el => el.desc === item.posture)
      if (!postureData.getDefaultComeOverBodyPart) return "ass"
      return postureData.getDefaultComeOverBodyPart() 
    },
    extraTests:function(options) {
      if (!options.char.hasBodyPart('cock')) return falsemsg("{nv:char:would:true} need a cock to do that!");
      if (!options.char.testManipulate(null, "wank")) return world.FAILED;
      if (options.char.getOuterWearable("crotch")) return falsemsg("{nv:char:would:true} need your cock out to do that!", options);
      if (options.char.posture && !["standing", "kneeling"].includes(options.char.posture)) return falsemsg("{nv:char:would:true} need to get up to do that!", options);
      if (options.item.postureFurniture) {
        //???
      }
      else if (options.item.posture) {
        const postureData = erotica.POSTURES_LIST.find(el => el.desc === options.item.posture)
        if (!postureData.canComeOver(options.char, options.item, options.bodypart.name)) return false
      }
      else {
        debugmsg("Should never happen, but someone has no posture: " + item.name)
        w.dcky.fkfh.fkh
        if (!["foot", "calf", "thigh"].includes(bodypart.name) && char.posture === "kneeling") return falsemsg(lang.getName(char, {article:DEFINITE, capital:true}) + " would have to get up to do that.")
        if (["head", "face", "neck", "upperback", "chest", "cleavage", "arm", "hand", "mouth", "tit", "nipple"].includes(bodypart.name)) return falsemsg(lang.getName(char, {article:DEFINITE, capital:true}) + " would need " + lang.getName(item, {article:DEFINITE}) + " to get lower to do that.")
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
    getDefaultBodyPart:function(char, item) { return "pussy" },
    extraTests:function(options) {
      if (!options.item.hasBodyPart('pussy')) return falsemsg("{nm:item:the:true} would need a pussy for that.");
      if (!options.char.testManipulate(null, "frig")) return world.FAILED;
      if (options.item.getOuterWearable("crotch")) return falsemsg("{nv:char:would:true} have to get {nms:item:the:true} {covering:item:crotch} off {pa:item} to do that!", options);
      return true
    },
  },

  {
    name:'wank',
    pattern:'',
    mustBeBare:true,
    intimateRating:8,
    reflexive:true,
    getDefaultBodyPart:function(char, item) { return "cock" },
    extraTests:function(options) {
      if (!options.item.hasBodyPart('cock')) return falsemsg("{nm:item:the:true} would need a cock for that.", options);
      if (!options.char.testManipulate(null, "wank")) return world.FAILED;
      if (options.item.getOuterWearable("crotch")) return falsemsg("{nv:char:would:true} have to get {nms:item:the:true} {covering:item:crotch} off {pa:item} to do that!", options);
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


parser.specialText.action = {
  error:function(text) {
    if (parser.specialText.action.find(text)) return false
    return "Not an action I understand!"
  },
  exec:function(text) {
    return parser.specialText.action.find(text)
  },
  find:function(text) {
    for (const el of erotica.ACTIONS) {
      if (el.name === text) return el
      if (new RegExp("^(" + el.pattern + ")$").test(text)) return el
    }
    log(text)
    return null
  },
}







// This also catches GROPE JOANNA, etc.
new Cmd('SexActionsMy', {
  npcCmd:true,
  regex:new RegExp("^(" + erotica.ACTIONS_PATTERN + ") (?:my |your |his |her |)(left |right |)(.+)$"),
  objects:[
    {special:'action'},
    {special:'text'},
    {special:'bodyPart'}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    return cmdInteract(objects[0], char, player, {bodypart:objects[2], side:objects[1]});
  },
})

new Cmd("SexActions", {
  npcCmd:true,
  regex:new RegExp("^(" + erotica.ACTIONS_PATTERN + ") (.+)'s (left |right |)(.+)$"),
  objects:[
    {special:'action'},
    {scope:parser.isNpcAndHere},
    {special:'text'},
    {special:'bodyPart'}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    return cmdInteract(objects[0], char, objects[1][0], {bodypart:objects[3], side:objects[2]});
  },
})

new Cmd("SexActionsNoBP", {
  npcCmd:true,
  regex:new RegExp("^(" + erotica.ACTIONS_PATTERN + ") (.+)$"),
  objects:[
    {special:'action'},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    return cmdInteract(objects[0], char, objects[1][0]);
  },
})


function cmdInteract(verb, char, object, options) {
  if (options === undefined) options = {}
  options.char = char
  options.item = object
  options.verb = verb
  
  // Get a bodypart, check it makes sense
  let bodypart
  if (options.bodypart) {
    bodypart = typeof options.bodypart === 'string' ? findBodyPart(options.bodypart) : options.bodypart
  }
  else {
    if (verb.getDefaultBodyPart) {
      bodypart = findBodyPart(verb.getDefaultBodyPart(char, object))
    }
    else {
      log(options)
      log(verb)
      failedmsg("I was expecting a body part at the end of that. Quite the disappointment!");
      return world.FAILED;
    }
  }
  options.bodypart = bodypart
  
  // Is the character doing it to him/herself? Does that make sense
  if (!verb.reflexive && (bodypart.name !== 'arm' || bodypart.name !== 'hand') && char === object) {
    failedmsg("{nv:char:would:true} need to be some sort of contortionist to do that!", {char:char, bodypart:bodypart});
    return world.FAILED;
  }
  const side = options.side === '' ? undefined : options.side
  if (!bodypart.paired && side) return failedmsg("I was not expecting that body part to have a left and right!");
  if (verb.bodypartCheck && !verb.bodypartCheck(bodypart)) return failedmsg("That is not a body part you can do that with, is it?")
  if (!object.hasBodyPart(bodypart)) return failedmsg("{nv:item:don't:true} have {nm:bodypart:a}.", options)

  //console.log(bodypart)

  if (verb.extraTests && !verb.extraTests(options)) return world.FAILED;
  if (!char.testManipulate(object, verb.name)) return world.FAILED;
  if (!char.getAgreement("Interact", object, verb, bodypart, options.altName ? options.altName : verb.name)) return world.FAILED;

  options.garment = bodypart.getProtection(object);
  if (verb.mustBeBare && options.garment) return failedmsg("{nv:char:can't:true} do that when {nm:item:the} is wearing {nm:garment:the}.", options);
  
  let rating = object.attractionTo(char) + object.arousal / 4
  if (bodypart) {
    // want 50 to map to 0 and -50 to map to -10
    const bpIntimateFactor = (rating - 50) / 10
    rating += bodypart.getIntimateRating(object) * bpIntimateFactor
  }
  if (char.reputation) rating -= char.reputation
  if (object.dirtyRating) rating += object.dirtyRating
  if (object === player) rating = 100  // you want it done to yourself
  const firstName = verb.name + "_" + bodypart.name
  
  options.boss = player
  //target:object,
  options.action = verb.name
  options.side = side
  options.bpadj = object.getBodyPartAdjective(bodypart.name)
  options.bpname = bodypart.getName(side)
  options.rating = rating
  options.first = !object[firstName]
  options.firstFail = !object[firstName + "_failed"]
  options.afterScript = respondCompleted
  if (object.restraint) options.restraint = w[object.restraint]

  respond(options, erotica.defaultResponses);
  return world.SUCCESS;
}

erotica.wankScriptReversed = function(objects) {
  return erotica.wankScript(objects.reverse())
}
erotica.wankScript = function(objects) {
  const char = extractChar(this, objects)
  if (!char) return world.FAILED;
  const verb = objects[0];
  let target
  if (this.name.indexOf("Self") === -1) {
    target = objects[1][0];
  }
  else {
    target = char
  }

  if (target.hasBodyPart("cock") && !verb.startsWith("jill") && !verb.startsWith("flick")) {
    return cmdInteract(parser.specialText.action.find("wank"), char, target, {bodypart:'cock', altName:verb})
  }
  if (target.hasBodyPart("pussy") && !verb.startsWith("jerk") && !verb.startsWith("jack") && !verb.startsWith("rub") && !verb.endsWith("tug")) {
    return cmdInteract(parser.specialText.action.find("frig"), char, target, {bodypart:'pussy', altName:verb})
  }
  if (verb.startsWith("jill") || verb.startsWith("flick")) return failedmsg("A character requires a pussy to jill off.")
  if (verb.startsWith("jerk") || verb.startsWith("jack") || verb.startsWith("rub") || verb.endsWith("tug")) {
    return failedmsg("Only characters with dicks can be jerked off.")
  }
  return failedmsg("A character requires genitals for masturbation.")
}



new Cmd('MasturbateOff', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(masturbate|wank|jerk off|jerk|jack off|jack|jill off|jill) (.+)$/,
  objects:[
    {special:'text'},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.wankScript,
})
new Cmd('Masturbate', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(wank|jerk|jack|jill) (.+) off$/,
  objects:[
    {special:'text'},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.wankScript,
})
new Cmd('Masturbate2', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^give (.+) a? ?(wank|tug|jerk)$/,
  objects:[
    {scope:parser.isNpcAndHere},
    {special:'text'},
  ],
  script:erotica.wankScriptReversed,
})
new Cmd('MasturbateSelf', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(masturbate|wank|jerk off|jerk|jack off|jack|jill off|jill|rub one out|flick the bean)$/,
  objects:[
    {special:'text'},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.wankScript,
})
new Cmd('Masturbate3', {
  npcCmd:true,
  useThisScriptForNpcs:true,
  regex:/^(flick) (.+)'s bean$/,
  objects:[
    {special:'text'},
    {scope:parser.isNpcAndHere},
  ],
  script:erotica.wankScript,
})





new Cmd("LookAtBP", {
  regex:new RegExp("^(look at|look|x|examine|check out|ogle|stare at) (.+)'s (left |right |)(.+)$"),
  objects:[
    {special:'text'},
    {scope:parser.isNpcAndHere},
    {special:'ignore'},
    {special:'bodyPart'}
  ],
  script:function(objects) {
    const target = objects[1][0]
    const bp = objects[2]
    msg(target.describeBodyPart(bp), {item:target, bodyPart:bp})
    return world.SUCCESS;
  },
})
























//--------------------------------------------------------
//--  POSTURES --


lang.cannot_bend_over = "{pv:item:'be:true} not something one can bend over."
lang.cannot_staddle = "{pv:item:'be:true} not something one can straddle."
lang.bendover_successful = "{nv:char:bend:true} over {nm:item:the}."
lang.straddle_successful = "{nv:char:straddle:true} {nm:item:the}."
lang.facedown_successful = "{nv:char:lie:true} face down on {nm:item:the}."



new Cmd('BendOverFurniture', {
  npcCmd:true,
  regex:/^(bend over) (.+)$/,
  attName:"bendover",
  objects:[
    {special:'ignore'},
    {scope:parser.isHere, attName:"assumePosture"},
  ],
  defmsg:lang.cannot_bend_over,
})
new Cmd('Straddle', {
  npcCmd:true,
  regex:/^(straddle) (.+)$/,
  attName:"straddle",
  objects:[
    {special:'ignore'},
    {scope:parser.isHere, attName:"assumePosture"},
  ],
  defmsg:lang.cannot_staddle,
})
new Cmd('LieFaceDown', {
  npcCmd:true,
  regex:/^(lie face down on) (.+)$/,
  attName:"facedown",
  objects:[
    {special:'ignore'},
    {scope:parser.isHere, attName:"assumePosture"},
  ],
  defmsg:lang.cannot_recline_on,
})




const cmdRollOver = function(char) {
  if (char.restraint) {
    return failedmsg("{nv:char:can:true} not roll over whilst tied up.");
  }
  if (!["reclining", "facedown"].includes(char.posture)) {
    return failedmsg("{nv:char:can:true} only roll over when lying down.");
  }
  if (char.posture === "reclining") {
    msg("{nv:char:roll:true} on to {pa:char} front.", {char:char});
    char.posture = "facedown"
  }
  else if (char.posture === "facedown") {
    msg("{nv:char:roll:true} on to {pa:char} back.", {char:char});
    char.posture = "reclining"
  }
  return world.SUCCESS
}

new Cmd('RollOver', {
  regex:/^roll over$/,
  attName:"rollover",
  objects:[
  ],
  script:function(objects) {
    return cmdRollOver(player);
  },
})
new Cmd('NpcRollOver1', {
  regex:/^(.+), roll over$/,
  attName:"rollover",
  objects:[
    {scope:parser.isNpcAndHere},
  ],
  script:function(objects) {
    return cmdRollOver(objects[0][0]);
  },
})
new Cmd('NpcRollOver1', {
  regex:/^(?:tell|ask|instruct) (.+) to roll over$/,
  attName:"rollover",
  objects:[
    {scope:parser.isNpcAndHere},
  ],
  script:function(objects) {
    return cmdRollOver(objects[0][0]);
  },
})


// canComeOver assumes char is either standing, kneeling or standing on something

erotica.POSTURES_LIST = [
  {
    cmd:'stand', desc:'standing', ignore:true, pattern:'stand|stand up|get up',
    canComeOver:function(char, target, bp) {
      if (!["foot", "calf", "thigh"].includes(bp) && char.posture === "kneeling") return falsemsg("{nv:char:would:true} have to get up to do that.", {char:char})
      if (["head", "face", "neck", "upperback", "chest", "cleavage", "arm", "hand", "mouth", "tit", "nipple"].includes(bp)) return falsemsg(lang.getName(char, {article:DEFINITE, capital:true}) + " would need " + lang.getName(target, {article:DEFINITE}) + " to get lower to do that.")
      return true
    },
    getAssumePostureDescription:function(char, previous) {
      return "{nv:char:stand:true} up."
    },
  },
  
  {
    cmd:'kneel', desc:'kneeling', 
    canComeOver:function(char, target, bp) {
      if (["head", "face", "neck", "mouth"].includes(bp) && char.posture === "kneeling") return falsemsg("{nv:char:would:true} have to get up to do that.", {char:char})
      if (!["head", "face", "upperback", "lowerback", "buttock", "ass", "thigh"].includes(bp)) return false
      return true
    },
    getAssumePostureDescription:function(char, previous) {
      return "{nv:char:kneel:true}."
    },
    getDefaultComeOverBodyPart:function() { return "face" },
  },
  
  {
    cmd:'bendover', desc:'bending over', pattern:'bend over', 
    canComeOver:function(char, target, bp) {
      if (!["foot", "calf"].includes(bp) && char.posture === "kneeling") return falsemsg("{nv:char:would:true} have to get up to do that.", {char:char})
      if (["head", "face", "upperback", "lowerback", "buttock", "ass", "thigh"].includes(bp)) return true
      return falsemsg("{nv:char:can't:true} while {nv:item:be} bending over.", {char:char, item:target})
    },
    getAssumePostureDescription:function(char, previous) {
      return "{nv:char:bend:true} over, and grip {pa:char} ankles."
    },
  },
  
  {
    cmd:'sit', desc:'sitting', addFloor:true, 
    canComeOver:function(char, target, bp) {
      if (!["foot", "calf"].includes(bp) && char.posture === "kneeling") return falsemsg("{nv:char:would:true} have to get up to do that.", {char:char})
      if (!["buttock", "ass"].includes(bp)) return true
      return falsemsg("{nv:char:can't:true} while {nv:item:be} sitting.", {char:char, item:target})
    },
    getAssumePostureDescription:function(char, previous) {
      return "{nv:char:sit:true} on the " + (w[char.loc].postureSurface || "floor") + "."
    },
    getDefaultComeOverBodyPart:function() { return "face" },
  },
  
  {
    cmd:'liefacedown', desc:'facedown', addFloor:true, pattern:'lie face down', 
    canComeOver:function(char, target, bp) {
      if (!char.posture || char.posture === "standing") return falsemsg("{nv:char:need:true} to get lower for any decent aim.", {char:char})
      if (!["head", "face", "upperback", "lowerback", "buttock", "ass", "thigh", "calf", "foot", "arm", "hand"].includes(bp)) return true
      return falsemsg("{nv:char:can't:true} while {nv:item:be} is lying on {pa:item} front.", {char:char, item:target})
    },
    getAssumePostureDescription:function(char, previous) {
      if (previous === 'reclining') {
        return "{nv:char:roll:true} over, to lie face down."
      }
      else {
        return "{nv:char:lie:true} down on the " + (w[char.loc].postureSurface || "floor") + ", face down."
      }
    },
  },
  
  {
    cmd:'lieback', desc:'reclining', addFloor:true, pattern:'lie down|lie back|recline', 
    canComeOver:function(char, target, bp) {
      if (!char.posture || char.posture === "standing") return falsemsg("{nv:char:need:true} to get lower for any decent aim.", {char:char})
      if (!["head", "face", "mouth", "chest", "tit", "nipple", "midriff", "groin", "thigh", "calf", "foot", "arm", "hand"].includes(bp)) return true
      return falsemsg("{nv:char:can't:true} while {nv:item:be} is lying on {pa:item} back.", {char:char, item:target})
    },
    getAssumePostureDescription:function(char, previous) {
      if (previous === 'facedown') {
        return "{nv:char:rolls:true} over, to lie face up."
      }
      else {
        return "{nv:char:lie:true} back on the " + (w[char.loc].postureSurface || "floor") + "."
      }
    },
    getDefaultComeOverBodyPart:function() { return "face" },
  },
  
  {
    cmd:'crawl', desc:'on # hands and knees', pattern:'crawl|get on hands and knees', 
    canComeOver:function(char, target, bp) {
      if (["head", "face", "upperback", "lowerback", "buttock", "ass", "thigh"].includes(bp)) return true
      return falsemsg("{nv:char:can't:true} while {nv:item:be} on {pa:item} hands and knees.", {char:char, item:target})
    },
    getAssumePostureDescription:function(char) {
      return "{nv:char:go:true} down on {pa:char} hands and knees."
    },
  },
];

for (let posture of erotica.POSTURES_LIST) {
  new Cmd('Position' + sentenceCase(posture.cmd), {
    npcCmd:true,
    score:20, // ensure we override the built-in version
    //cmdCategory:sentenceCase(posture.cmd),
    regex:new RegExp("^(?:" + (posture.pattern ? posture.pattern : posture.cmd) + ")$"),
    objects:[
    ],
    useThisScriptForNpcs:true,
    posture:posture,
    script:function(objects) {
      const cmd = /Position([A-Za-z]+)[12]?$/.exec(this.name)[1].toLowerCase()
      const posture = erotica.POSTURES_LIST.find(function(el) { return el.cmd === cmd} )
      
      let char
      if (this.forNpc) {
        char = objects[0][0]
        if (!char.npc) {
          failedmsg(not_npc(char))
          return world.FAILED
        }
        objects.shift()
      }
      else {
        char = player
      }
      return char.assumePosture(posture)
    },
  })
}

findCmd('Stand').score = -10
findCmd('NpcStand').score = -10



















//--------------------------------------------------------
//--  CLOTHING RELATED  --





new Cmd('Undress', {
  regex:/^(undress|strip)$/,
  objects:[
    {special:'ignore'},
  ],
  script:function(objects) {
    return cmdUndress(player);
  },
})


new Cmd('NpcUndress1', {
  regex:/^(.+), ?(undress|strip)$/,
  cmdCategory:"Remove",
  objects:[
    {scope:parser.isNpcAndHere},
    {special:'ignore'},
  ],
  script:function(objects) {
    const npc = objects[0][0];
    if (!npc.npc) {
      failedmsg(lang.not_npc(npc));
      return world.FAILED; 
    }
    return cmdUndress(npc);
  },
})

new Cmd('NpcUndress2', {
  regex:/^(?:tell|ask|instruct) (.+) to ?(undress|strip)$/,
  cmdCategory:"Remove",
  objects:[
    {scope:parser.isNpcAndHere},
    {special:'ignore'},
  ],
  script:function(objects) {
    const npc = objects[0][0];
    if (!npc.npc) {
      failedmsg(lang.not_npc(npc));
      return world.FAILED; 
    }
    return cmdUndress(npc);
  },
})


function cmdUndress(char) {
  if (char.isNaked()) return failedmsg("{nv:char:be:true} already naked.");
  const garment = char.firstToRemove();
  if (!char.testManipulate(garment, "Remove")) return world.FAILED
  if (!char.getAgreement("Remove", garment)) return world.FAILED

  return garment.remove({char:char}) ? world.SUCCESS : world.FAILED;
}


new Cmd('UndressOther', {
  npcCmd:true,
  regex:/^(undress|strip) (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
  ],
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    const target = objects[0][0]
    
    if (!target.isHere()) return failedmsg("{nv:npc:be:true} not here.")
    if (target.isNaked()) return failedmsg("{nv:npc:be:true} already naked.")

    return cmdRemoveGarment(char, target, target.firstToRemove(), 0)
  },
})


new Cmd("TakeOffFrom", {
  npcCmd:true,
  cmdCategory:'TakeOffFrom',
  regex:/^(remove|take off) (.+)'s (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
    {scope:parser.isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    return cmdRemoveGarment(char, objects[0][0], objects[1][0], 0);
  },
})
new Cmd("TakeOffFrom2", {
  npcCmd:true,
  cmdCategory:'TakeOffFrom',
  regex:/^take (.+)'s (.+) off(| him| her)$/,
  objects:[
    {scope:parser.isNpcAndHere},
    {scope:parser.isWornByChar},
    {special:'ignore'},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    return cmdRemoveGarment(char, objects[0][0], objects[1][0], 0);
  },
})
new Cmd("TakeOffFrom3", {
  npcCmd:true,
  cmdCategory:'TakeOffFrom',
  regex:/^(take|remove) (.+) (from|off) (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isWornByChar},
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    return cmdRemoveGarment(char, objects[1][0], objects[0][0], 0);
  },
})




new Cmd("RipOffFrom", {
  npcCmd:true,
  cmdCategory:'RipOffFrom',
  regex:/^(rip off|rip|tear off|tear) (.+)'s (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
    {scope:parser.isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    return cmdRemoveGarment(char, objects[0][0], objects[1][0], 2);
  },
})
new Cmd("RipOffFrom2", {
  npcCmd:true,
  cmdCategory:'RipOffFrom',
  regex:/^(rip|tear) (.+)'s (.+) off(| him| her)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
    {scope:parser.isWornByChar},
    {special:'ignore'},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    return cmdRemoveGarment(char, objects[0][0], objects[1][0], 2);
  },
})
new Cmd("RipOffFrom2", {
  npcCmd:true,
  cmdCategory:'RipOffFrom',
  regex:/^(rip|tear) (.+) (off|from) (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isWornByChar},
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    return cmdRemoveGarment(char, objects[1][0], objects[0][0], 2);
  },
})


new Cmd("CutOffFrom", {
  npcCmd:true,
  cmdCategory:'CutOffFrom',
  regex:/^(cut off|cut) (.+)'s (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
    {scope:parser.isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    return cmdRemoveGarment(char, objects[0][0], objects[1][0], 5);
  },
})
new Cmd("CutOffFrom2", {
  npcCmd:true,
  cmdCategory:'CutOffFrom',
  regex:/^(cut) (.+)'s (.+) off(| him| her)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
    {scope:parser.isWornByChar},
    {special:'ignore'},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    return cmdRemoveGarment(char, objects[0][0], objects[1][0], 5);
  },
})




new Cmd("PullUp", {
  npcCmd:true,
  cmdCategory:'PullUp',
  regex:/^pull up( my| your| his| her| their|) (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    const g = objects[0][0]
    
    if (!g.pullUp) {
      failedmsg("That's not something that can be pulled up.")
      return world.FAILED
    }
    
    return g.pullUp(char);
  },
})
new Cmd("PullDown", {
  npcCmd:true,
  cmdCategory:'PullDown',
  regex:/^pull down( my| your| his| her| their|) (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    const g = objects[0][0]
    
    if (!g.pullDown) {
      failedmsg("That's not something that can be pulled down.")
      return world.FAILED
    }
    
    return g.pullDown(char);
  },
})
new Cmd("Fasten", {
  npcCmd:true,
  cmdCategory:'Fasten',
  regex:/^(fasten|button up|button)( my| your| his| her| their|) (.+)$/,
  objects:[
    {special:'ignore'},
    {special:'ignore'},
    {scope:parser.isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    const g = objects[0][0]
    
    if (!g.fasten) {
      failedmsg("That's not something that can be fastened up.")
      return world.FAILED
    }
    
    return g.fasten(char);
  },
})
new Cmd("Unfasten", {
  npcCmd:true,
  cmdCategory:'Unfasten',
  regex:/^(unfasten|unbutton)( my| your| his| her| their|) (.+)$/,
  objects:[
    {special:'ignore'},
    {special:'ignore'},
    {scope:parser.isWornByChar},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED
    const g = objects[0][0]
    
    if (!g.unfasten) {
      failedmsg("That's not something that can be unfastened.")
      return world.FAILED
    }
    
    return g.unfasten(char);
  },
})


function cmdRemoveGarment(char, target, garment, strength) {
  const options = {
    char:char, item:target, garment:garment,
    cutter:char.findCutter(),
    blocker:garment.getWearRemoveBlocker(target, false),
  }
  if (!char.isHere()) return failedmsg("{nv:char:be:true} not here.", options)
  if (!target.isHere()) return failedmsg("{nv:item:be:true} not here.", options)
  if (!garment.getWorn() || !garment.isAtLoc(target.name)) return failedmsg("{nv:item:be:true} not wearing {nm:garment:a}.", options)
  if (strength > 2 && !options.cutter) return failedmsg("{nv:char:need:true} a knife or something to do that.", options)
  if (options.blocker) return failedmsg("{nv:char:can:true} not remove {nm:garment:the} whilst {nv:item:be} wearing {nm:blocker:a}.", options)
  if (char === target && !char.getAgreement("Remove", garment)) return world.FAILED

  if (char === target) return garment.remove({char:char}) ? world.SUCCESS : world.FAILED

  let rating = target.attractionTo(char) * 10 + target.arousal
  if (char.reputation) rating -= char.reputation
  if (target === player) rating = 100  // you want it done to yourself
  
  // if positive, will be reluctant
  const exposeRating = target.getExposureWithout(garment) - target.getWillingToExpose(w[target.loc])
  if (exposeRating > 0) rating -= exposeRating * 5
  //log(target.attractionTo(char))
  //log("target.getWillingToExpose(w[target.loc]): " + target.getWillingToExpose(w[target.loc]))
  //log("target.getExposureWithout(garment): " + target.getExposureWithout(garment))
  //log("char.reputation: " + char.reputation)
  //log("rating: " + rating)

  const targetNoChoice = target.restraint && !w[target.restraint].testManipulate
  if (!char.getAgreement("RemoveOther", garment, target, rating, targetNoChoice)) return world.FAILED

  // By now we have a character, char, willing to try to remove an item, garment, from a different character, target
  //console.log(char.name + ":remove:" + garment.name)
  const firstName = "remove_" + garment.name
  options.boss = player
  options.action = "remove"
  options.rating = rating
  options.strength = strength
  options.exposure = target.getWillingToExpose(w[target.loc]) - target.getExposureWithout(garment)
  options.first = !target[firstName]
  options.firstFail = !target[firstName + "_failed"]
  options.afterScript = respondCompleted
  if (target.restraint) options.restraint = w[target.restraint]

  respond(options, erotica.defaultResponses);
  return world.SUCCESS;
}






//--------------------------------------------------------
//--  BONDAGE RELATED --




function cmdRestrain (char, target, restraint) {
  const options = {char:char, item:target, restraint:restraint, toLoc:char.loc, fromLoc:target.name}
  if (!restraint) {
    const objs = scopeBy(parser.isBondageDeviceHere)
    if (objs.length === 0) return failedmsg("Nothing to restrain someone with here.")
    if (objs.length > 1) return failedmsg("You will have to specify how you want to restrain someone when more than one device is present.")
    restraint = objs[0]
    options.restraint  = restraint
  }
  if (!restraint.bondage) return failedmsg("{nv:restraint:be:true} not something you can tie people to.", options)
  if (target.restraint) return failedmsg("{nv:item:be:true} already {show:item:restraintSituation}.", options)
  if (restraint.victim) return failedmsg("{nv:item:be:true} already {show:item:restraintSituation}.", {item:restraint.victim})

  const held = target.getHolding()
  if (held.length > 0) {
    const it_them = held.length > 1 || held[0].pronouns === lang.pronouns.plural  || held[0].pronouns === lang.pronouns.massnoun ? "them" : "it"
    msg("{nv:char:take:true} " + formatList(held, {article:DEFINITE, lastSep:lang.list_and}) + " from {nm:item:the} and {cj:char:drop} " + it_them + " on the ground.", options)
    for (let item of held) {
      item.moveToFrom(options)
    }
  }
  //console.log(item)
  restraint.restrain(char, target)
  return world.SUCCESS;
}


new Cmd("RestrainWith", {
  npcCmd:true,
  cmdCategory:'Restrain',
  rules:[cmdRules.isHere, cmdRules.testManipulate],
  regex:/^(manacle|chain|tie) (.+) to (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
    {scope:parser.isHere, attName:"bondage"},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    return cmdRestrain(char, objects[0][0], objects[1][0]);
  },
})
new Cmd("Restrain", {
  npcCmd:true,
  cmdCategory:'Restrain',
  rules:[cmdRules.isHere, cmdRules.testManipulate],
  regex:/^(restrain|manacle|chain|tie up|tie) (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    return cmdRestrain(char, objects[0][0]);
  },
})
new Cmd("Restrain2", {
  npcCmd:true,
  cmdCategory:'Restrain',
  rules:[cmdRules.isHere, cmdRules.testManipulate],
  regex:/^(chain|tie) (.+) up$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    return cmdRestrain(char, objects[0][0]);
  },
})

new Cmd("Release", {
  npcCmd:true,
  cmdCategory:'Release',
  rules:[cmdRules.isHere, cmdRules.testManipulate],
  regex:/^(free|release) (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:parser.isNpcAndHere},
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return world.FAILED;
    const target = objects[0][0]
    if (!target.restraint) return failedmsg("{nv:item:do:true} not need to be released.", {char:char, item:target})

    w[target.restraint].release(char)
    return world.SUCCESS;
  },
})




  
//--------------------------------------------------------
//--  DEBUGGING --


new Cmd('DebugTestNpc', {
  regex:/^npc (.+)$/,
  objects:[
    {scope:parser.isInWorld}
  ],
  script:function(objects) {
    console.log(w.cock.getProtection(objects[0][0]));
    console.log(w.buttocks.getProtection(objects[0][0]));
    console.log(w.thighs.getProtection(objects[0][0]));
    return world.SUCCESS;
  },
})




