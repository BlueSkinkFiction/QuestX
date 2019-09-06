"use strict";


tp.addDirective("description", function(arr, params) {
  return params.tpItem.getDescription();
});

tp.addDirective("attire", function(arr, params) {
  const garments = params.tpItem.getWearingVisible ? params.tpItem.getWearingVisible() : params.tpItem.getClothing();
  return formatList(garments, {article:INDEFINITE, lastJoiner:" and ", nothing:"nothing"}); 
});

tp.addDirective("posture", function(arr, params) {
  if (!params.tpItem.posture) return '';
  return params.tpItem.getPostureDescription();
});

tp.addDirective("ifposture", function(arr, params) {
  return params.tpItem.posture ? arr.join(":") : "";
});

tp.addDirective("restraint", function(arr, params) {
  if (!params.tpItem.posture) return '';
  return params.tpItem.restraint.situation;
});

tp.addDirective("ifrestaint", function(arr, params) {
  return params.tpItem.restraint ? arr.join(":") : "";
});

tp.addDirective("ifbare", function(arr, params) {
  const bodyPart = w[arr.shift()];
  return params.tpItem.isBodyPartBare(bodyPart) ? arr.join(":") : "";
});



const erotica = {
  REFUSE:0,
  RELUCTANT:1,
  HAPPY:2,
};



// For scope
function isBodyPart(item) {
  return item.isBodyPart;
}
function isWornByChar(item) {
  return (isHeldByNpc(item) || isHeld(item)) && item.getWorn();
}
