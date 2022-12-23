"use strict";


// These all relate to "item" in the parameters

tp.addDirective("description", function(arr, params) {
  return typeof params.item.getDescription === "function" ? params.item.getDescription() : params.item.description;
});

tp.addDirective("attire", function(arr, params) {
  const l = params.item.getWearingVisible()
  return formatList(l, {article:INDEFINITE, lastSep:lang.list_and, nothing:"nothing", npc:true, ignorePossessive:true, noWorn:true, modified:arr[0] === 'mod', enhanced:true, noBrackets:true});
});

tp.addDirective("posture", function(arr, params) {
  if (!params.item.posture) return ''
  return params.item.getPostureDescription()
})

tp.addDirective("ifPosture", function(arr, params) {
  return params.item.posture && params.item.posture !== "standing" ? arr.join(":") : "";
});

tp.addDirective("restraint", function(arr, params) {
  if (!params.item.restraint) return ''
  return params.item.restraint.situation
})

tp.addDirective("ifRestraint", function(arr, params) {
  return params.item.restraint ? arr[0] : arr[1]
})

tp.addDirective("ifBare", function(arr, params) {
  const bodyPart = arr.shift()
  return params.item.isBodyPartBare(bodyPart) ? arr[0] : arr[1]
})

tp.addDirective("ifNaked", function(arr, params) {
  return params.item.getWearing().length === 0 ? arr[0] : arr[1]
})


// These need the NPC specified



tp.addDirective("bpAdjective", function(arr, params) {
  let name = arr.shift()
  const obj = tp._findObject(name, params, arr)
  if (!obj) return errormsg("Failed to find object '" + name + "' in text processor 'bpAdjective' (" + params.tpOriginalString + ")")
  name = arr.shift()
  return obj.getBodyPartAdjective(name)
})


tp.addDirective("ifBP", function(arr, params) {
  let name = arr.shift()
  const obj = tp._findObject(name, params, arr)
  if (!obj) return errormsg("Failed to find object '" + name + "' in text processor 'ifBP' (" + params.tpOriginalString + ")")
  const bodyPart = w[arr.shift()]
  return obj.hasBodyPart(arr[0]) ? arr[1] : arr[2]
})

tp.addDirective("covering", function(arr, params) {
  let name = arr.shift()
  const obj = tp._findObject(name, params, arr)
  const slot = arr[0]
  const subject = obj.getOuterWearable(slot)
  const options = {}
  if (arr[1] === 'the') options.article = DEFINITE
  if (arr[1] === 'a') options.article = INDEFINITE
  return arr[2] === 'true' ? sentenceCase(lang.getName(subject, options)) : lang.getName(subject, options)
})

tp.addDirective("insult", function(arr, params) {
  let name = arr.shift()
  const obj = tp._findObject(name, params, arr)
  if (!obj) return errormsg("Failed to find object '" + name + "' in text processor 'ifBP' (" + params.tpOriginalString + ")")
  const target = tp._findObject(arr[0], params, arr)
  return obj.insult(target)
})


// {arouse:chr:amt}
tp.addDirective("arouse", function(arr, params) {
  let name = arr.shift()
  const obj = tp._findObject(name, params, arr)
  const amt = parseInt(arr[0])
  obj.arousal += amt
  return false;
});

tp.addDirective("cock", function(arr, params) {
  let name = arr.shift()
  const obj = tp._findObject(name, params, arr)
  if (obj.arousal < 30) return obj.getBodyPartAdjective('cock') + " willy";
  if (obj.arousal < 60) return obj.getBodyPartAdjective('cock') + " dick";
  if (obj.hasHugeCock)  return "huge, " + obj.getBodyPartAdjective('cock') + " cock";
  return obj.getBodyPartAdjective('cock') + " cock";
});

tp.addDirective("tits", function(arr, params) {
  let name = arr.shift()
  const obj = tp._findObject(name, params, arr)
  if (!obj.hasBodyPart("tit")) return "chest"
  return obj.getBodyPartAdjective('tit') + " " + random.fromArray(obj.hasHugeBoobs ? erotica.bigTitsSynonyms : erotica.titsSynonyms);
});

tp.addDirective("pussy", function(arr, params) {
  let name = arr.shift()
  const obj = tp._findObject(name, params, arr)
  return obj.getBodyPartAdjective('pussy') + " pussy";
});

tp.addDirective("ass", function(arr, params) {
  let name = arr.shift()
  const obj = tp._findObject(name, params, arr)
  return obj.getBodyPartAdjective('ass') + " ass";
});


const erotica = {
  REFUSE:0,
  RELUCTANT:1,
  HAPPY:2,
};



// For scope
/*parser.isBodyPart = function(item) {
  return item.isBodyPart;
}
parser.isBodyPartOrHere = function(item) {
  return item.isBodyPart || parser.isHeldByNpc(item) || parser.isHeld(item) || item.isAtLoc(player.loc);
}*/
parser.isWornByChar = function(item) {
  return (parser.isHeldByNpc(item) || parser.isHeld(item)) && item.getWorn();
}

parser.isBondageDeviceHere = function(item) {
  return item.isAtLoc(player.loc) && item.bondage;
}






function stop_posture(char) {
  if (!char.posture) char.posture = "standing"
  if (!char.posture) return ""
  if (!char.postureFurniture && char.posture === "standing") return ""
  const options = {char:char}
  if (w[char.postureFurniture]) options.item = w[char.postureFurniture]
  char.posture = false
  char.postureFurniture = false
  return processText(options.item ? "{nv:char:get:true} off {nm:item:the}." : "{nv:char:stand:true} up.", options)
}