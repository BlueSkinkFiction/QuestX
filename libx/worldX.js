"use strict";




// This can be used in commands to catch when the bodypart is not specified.
createItem("default", BODY_PART(0, false, /asdlj_khj__fgfghl_ljkhjhj/));


createItem("torso", AGREGATE_BODY_PART(3, false, /torso|body/));

createItem("foot", BODY_PART(1, true, /foot|feet/), {pluralAlias:'feet'});
createItem("calf", BODY_PART(1, true, /calf|calves|calfs/), {pluralAlias:'calves'});
createItem("knee", BODY_PART(2, true, /knees?/));
createItem("thigh", BODY_PART(4, true, /legs?|thighs?/));
createItem("hip", BODY_PART(4, true, /hips?/), {modestyBoost:true});
createItem("buttock", BODY_PART(7, true, /buttocks?|ass cheeks?/), {modestyBoost:true});

createItem("hand", BODY_PART(0, true, /hands?/));
createItem("wrist", BODY_PART(0, true, /wrists?/));
createItem("arm", BODY_PART(0, true, /arms?/));
createItem("shoulder", BODY_PART(1, true, /shoulders?/));

createItem("lowerback", BODY_PART(3, false, /lower back/));
createItem("upperback", BODY_PART(2, false, /upper back|back/), {alias:"back"});
createItem("midriff", BODY_PART(4, false, /midriff/), {modestyBoost:true});

// These body parts are more intimate for characters with tits
createItem("chest", BODY_PART(-1, false, /chest/), {
  getIntimateRating:function(char) { return char.hasBodyPart("tit") ? 7 : 3; }
});
createItem("nipple", BODY_PART(-1, true, /nipples?/), {
  getIntimateRating:function(char) { return char.hasBodyPart("tit") ? 8 : 3; }
});
createItem("cleavage", BODY_PART(-1, false, /cleavage/), {
  getIntimateRating:function(char) { return char.hasBodyPart("tit") ? 4 : 3; }
});

// For the head, it is moderately intimate to be touched, but generally people are happy to have it exposed
createItem("neck", BODY_PART(4, false, /neck/), {
  getExposureRating:function(char) { return 0; },
});
createItem("head", BODY_PART(3, false, /head/), {
  getExposureRating:function(char) { return 0; },
});
createItem("nose", BODY_PART(3, false, /nose/), {
  getExposureRating:function(char) { return 0; },
});
createItem("mouth", BODY_PART(3, false, /mouth|lips?/), {
  getExposureRating:function(char) { return 0; },
  canBePenetrated:true,
});
createItem("face", BODY_PART(3, false, /face/), {
  getExposureRating:function(char) { return 0; },
});

// These body parts are not in the garment slots, which use chest, buttock, groin, groin and crotch
createItem("tit", BODY_PART(8, true, /tits?|boobs?|breasts?|gazongas?|mammary|mammaries|jugs?|hooters?|knockers?|melons?|baps?|rack/), {
  modestyBoost:true,
  indirect:true,
  getSlot:function() { return "chest"; },
});
createItem("ass", BODY_PART(8, false, /ass|arse|backside|bottom|tush|rump|butt|booty|can|clacker|bum/), {
  getSlot:function() { return "buttock"; },
  indirect:true,
  canBePenetrated:true,
});
createItem("bollock", GENITALS(9, true, /bollocks?|balls?|testicles?|nadgers?|nuts?/), {
  modestyBoost:true,
  getSlot:function(toHandle) { return toHandle ? "crotch" : "groin"; },
});
createItem("cock", GENITALS(10, false, /cock|dick|phallus|penis|willy|manhood|organ|tool|pecker|schlong|prick|member|wang|knob|dong/), {
  modestyBoost:true,
  response_suck:function(char, object) {
    msg(lang.nounVerb(char, "suck", true) + " " + lang.getName(object, {article:DEFINITE}) + " {cock:target}.", {target:object});
  },
  response_lick:function(char, object) {
    msg(lang.nounVerb(char, "run", true) + " " + char.pronouns.posessive + " tongue along the length of " + lang.getName(object, {article:DEFINITE}) + " hard cock.");
  },
  getSlot:function() { return "groin" },
});
createItem("pussy", GENITALS(10, false, /pussy|cunt|vagina|slit|putang|snatch|coochie/), {
  response_suck:function(char, object) {
    msg("You can't suck off a pussy!");
  },
  getSlot:function(toHandle) { return toHandle ? "crotch" : "groin"; },
  canBePenetrated:true,
});



createItem("tail", BODY_PART(1, false, /tail/), {notStd:true});
createItem("wing", BODY_PART(1, true, /wings?/), {notStd:true});
createItem("horn", BODY_PART(1, true, /horns?/), {notStd:true});


erotica.slots = [];
for (let key in w) {
  if (w[key].isBodyPart && !w[key].nonStd) {
    if (!erotica.slots.includes(w[key].getSlot())) {
      erotica.slots.push(w[key].getSlot());
    }
  }
}




createItem("substance_prototype", {
});


erotica.ejaculate = function(actor, dest, extra) {
  const cum = cloneObject(w.substance_prototype)
  cum.owner = actor.name
  cum.substance = "cum"
  cum.loc = dest.name ? dest.name : dest
  cum.subloc = extra
  return cum
}

erotica.pourOn = function(dest, substance, extra) {
  const subst = cloneObject(w.substance_prototype)
  subst.substance = substance
  subst.loc = dest.name ? dest.name : dest
  subst.subloc = extra
  return subst
}


erotica.findCum = function(obj) {
  const cumlist = []
  for (let key in w) {
    if (w[key].substance === "cum" && w[key].loc === obj.name) cumlist.push(w[key])
  }
  return cumlist
}

// Use for objects to get a list of substance objects
erotica.findSubstances = function(obj) {
  const list = []
  for (let key in w) {
    if (w[key].substance && w[key].loc === obj.name && !list.includes(w[key].substance)) {
      list.push(w[key].substance)
    }
  }
  return list
}


// Use for NPCs to get a dictionary of arrays, the key is the substance, the array the bodypart
erotica.findGroupedSubstances = function(obj) {
  const list = {}
  for (let key in w) {
    if (w[key].substance && w[key].loc === obj.name) {
      const subst = w[key].substance
      if (!list[subst]) list[subst] = []        
      list[subst].push(w[key].subloc)
    }
  }
  return list
}

erotica.findSource = function(actor, substance) {
  const l = scopeHeldBy(actor);
  for (let i = 0; i < l.length; i++) {
    if (l[i].isSource && l[i].isSource(substance)) {
      return l[i];
    }
  }
  return false;
}





erotica.verify = function() {
  const checkFunctions = ["wearMsg", "removeMsg", "ripOff", "getSlots"]
  const checkInts = ["strength"]
  for (let key in w) {
    if (w[key].wearable) {
      const slots = w[key].getSlots();
      if (!slots) {
        errormsg("No slots for garment " + w[key].name);
      }
      else {
        for (let i = 0; i < slots.length; i++) {
          if (!erotica.slots.includes(slots[i]) && !slots[i] === "crotch") {
            errormsg("Unknown slot for garment " + w[key].name + " (" + slots[i] + ")");
          }
        }
      }
      for (let i = 0; i < checkFunctions.length; i++) {
        if (typeof w[key][checkFunctions[i]] !== "function") errormsg("No function'" + checkFunctions[i] + "' for garment " + w[key].name);
      }
      for (let i = 0; i < checkInts.length; i++) {
        if (typeof w[key][checkInts[i]] !== "number") errormsg("No number'" + checkInts[i] + "' for garment " + w[key].name);
      }
    }
  }
  util.verifyResponses(erotica.defaultResponses)
};




// Should not do this, but sometimes useful!
const renameObject = function(o, name) {
  delete w[o.name]
  o.name = name
  w[name] = o
}


/*
P("You think about jerking off, but your dick is completely flacid; not even enough to get hold of.")
P("You lie back and put your hands round your cock, rubbing it for a few moments, thinking about the naked woman you woken up beside.")
P("You look at the hot girl in the bed, as put your hands round your cock, rubbing it for a few moments.")
P("You put your hands round your cock, rubbing it for a few moments, thinking about the naked woman you woken up beside.")
P("'What...' exclaims Natasha, looking horrified. It does not stop her watching, though.")
P("Suddenly you ejaculate, your cum spurting across the bed. For a couple of minutes yoiu just lie there, getting your breath back.")
P("Suddenly you ejaculate, your cum spurting across the bed. For a couple of minutes you just stand there, getting your breath back.")
P("Suddenly you ejaculate, your cum spurting over " + lang.getName(object, {possessive:true}) + " belly. 'Urg!' she exclaims. 'That's disgusting!' For a couple of minutes you just lie there, getting your breath back.")
P("Suddenly you ejaculate, your cum spurting across the bed on to " + lang.getName(object, {possessive:true}) + " face. 'Urg!' she exclaims, as she wipes the muck off with the sheet. 'That's disgusting! It went in my eye, you filthy animal!' For a couple of minutes you just stand there, getting your breath back, a big grin on your face.")
P("Hearing you gasp, " + object.alias + " looks away from the TV, and at you, just as you ejaculate, your cum spurting over her face. 'Urg!' she exclaims, as she wipes the muck off with her hand. She is still smiling, despite her protests 'That's disgusting! It went in my eye, you filthy animal!' For a couple of minutes you just stand there, getting your breath back, a big grin on your face, that gets even broader as she licks the cum from her hand.")
do(natasha_licked_cum, "show")
P("Suddenly you ejaculate, your cum spurting over " + lang.getName(object, {possessive:true}) + " belly. 'Urg!' she exclaims. 'That's disgusting!' For a couple of minutes you just stand there, getting your breath back, as she tries to wipe your muck off her midriff.")
P("Your cock is now {select:mplayer.erection:flacid:semi-erect:erect:hard:very hard:dripping pre-cum}.")


*/
