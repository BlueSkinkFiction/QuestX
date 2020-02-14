"use strict";


tp.addDirective("description", function(arr, params) {
  return typeof params.item.getDescription === "function" ? params.item.getDescription() : params.item.getDescription;
});

tp.addDirective("attire", function(arr, params) {
  const l = params.item.getWearingVisible()
  return formatList(l, {article:INDEFINITE, lastJoiner:" and ", nothing:"nothing", npc:true});
});

tp.addDirective("posture", function(arr, params) {
  if (!params.item.posture) return '';
  return params.item.getPostureDescription();
});

tp.addDirective("ifposture", function(arr, params) {
  return params.item.posture && params.item.posture !== "standing" ? arr.join(":") : "";
});

tp.addDirective("restraint", function(arr, params) {
  if (!params.item.restraint) return '';
  return params.item.restraint.situation;
});

tp.addDirective("ifrestraint", function(arr, params) {
  return params.item.restraint ? arr.join(":") : "";
});

tp.addDirective("ifbare", function(arr, params) {
  const bodyPart = w[arr.shift()];
  return params.item.isBodyPartBare(bodyPart) ? arr.join(":") : "";
});

// {arouse:chr:amt}
tp.addDirective("arouse", function(arr, params) {
  const chr = tp.findSubject(arr, params);
  if (!chr) return false;
  
  const amt = parseInt(arr[1])
  chr.arousal += amt
  return false;
});

tp.addDirective("cock", function(arr, params) {
  const chr = tp.findSubject(arr, params);
  if (!chr) return false;
  if (chr.arousal < 30) return chr.getBodyPartAdjective('cock') + " willy";
  if (chr.arousal < 60) return chr.getBodyPartAdjective('cock') + " dick";
  if (chr.hasHugeCock)  return "huge, " + chr.getBodyPartAdjective('cock') + " cock";
  return chr.getBodyPartAdjective('cock') + " cock";
});

tp.addDirective("tits", function(arr, params) {
  const chr = tp.findSubject(arr, params);
  if (!chr) return false;
  return chr.getBodyPartAdjective('tit') + " " + randomFromArray(chr.hasHugeBoobs ? erotica.bigTitsSynonyms : erotica.titsSynonyms);
});

tp.addDirective("pussy", function(arr, params) {
  const chr = tp.findSubject(arr, params);
  if (!chr) return false;
  return chr.getBodyPartAdjective('pussy') + " pussy";
});

tp.addDirective("ass", function(arr, params) {
  const chr = tp.findSubject(arr, params);
  if (!chr) return false;
  return chr.getBodyPartAdjective('ass') + " ass";
});


const erotica = {
  REFUSE:0,
  RELUCTANT:1,
  HAPPY:2,
};



// For scope
parser.isBodyPart = function(item) {
  return item.isBodyPart;
}
parser.isBodyPartOrHere = function(item) {
  return item.isBodyPart || parser.isHeldByNpc(item) || parser.isHeld(item) || item.isAtLoc(game.player.loc);
}
parser.isWornByChar = function(item) {
  return (parser.isHeldByNpc(item) || parser.isHeld(item)) && item.getWorn();
}

parser.isBondageDeviceHere = function(item) {
  return item.isAtLoc(game.player.loc) && item.bondage;
}




function stop_posture(char) {
  if (!char.posture) char.posture = "standing"
  if (char.posture === "standing") return "";
  let s;
  // You could split up sitting, standing and lying
  if (char.postureFurniture) {
    s = lang.nounVerb(char, "get", true) + " off " + w[char.postureFurniture].byname({article:DEFINITE}) + ".";
  }
  else {
    s = lang.nounVerb(char, "stand", true) + " up.";
  }
  char.posture = "standing"
  delete char.postureFurniture
  return s;
}