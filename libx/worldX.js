"use strict";


/*
const libx = {
  update:function() {
  }
}


io.modulesToUpdate.push(libx)
*/




// This can be used in commands to catch when the bodypart is not specified.
createBodyPart("default", { intimateRating: 0, paired:false, regex:/asdlj_khj__fgfghl_ljkhjhj/});


createBodyPart("torso", { intimateRating: 3, paired:false, regex:/torso|body/, aggregate:true});

createBodyPart("foot", { intimateRating: 1, paired:true, regex:/foot|feet/,pluralAlias:'feet'});
createBodyPart("calf", { intimateRating: 1, paired:true, regex:/calf|calves|calfs/,pluralAlias:'calves'});
createBodyPart("knee", { intimateRating: 2, paired:true, regex:/knees?/});
createBodyPart("thigh", { intimateRating: 4, paired:true, regex:/legs?|thighs?/});
createBodyPart("hip", { intimateRating: 4, paired:true, regex:/hips?/,modestyBoost:true});
createBodyPart("buttock", { intimateRating: 7, paired:true, regex:/buttocks?|ass cheeks?/,modestyBoost:true});

createBodyPart("hand", { intimateRating: 0, paired:true, regex:/hands?/});
createBodyPart("wrist", { intimateRating: 0, paired:true, regex:/wrists?/});
createBodyPart("arm", { intimateRating: 0, paired:true, regex:/arms?/});
createBodyPart("shoulder", { intimateRating: 1, paired:true, regex:/shoulders?/})

createBodyPart("lowerback", { intimateRating: 3, paired:false, regex:/lower back/})
createBodyPart("upperback", { intimateRating: 2, paired:false, regex:/upper back|back/,alias:"back"});
createBodyPart("midriff", { intimateRating: 4, paired:false, regex:/midriff/,modestyBoost:true});

// These body parts are more intimate for characters with tits
createBodyPart("chest", {intimateRating:-1, paired:false, regex:/chest/,
  getIntimateRating:function(char) { return char.hasBodyPart("tit") ? 7 : 3; }
});
createBodyPart("nipple", {intimateRating:-1, paired:true, regex:/nipples?/,
  getIntimateRating:function(char) { return char.hasBodyPart("tit") ? 8 : 3; }
});
createBodyPart("cleavage", {intimateRating:-1, paired:false, regex:/cleavage/,
  getIntimateRating:function(char) { return char.hasBodyPart("tit") ? 4 : 3; }
});

// For the head, it is moderately intimate to be touched, but generally people are happy to have it exposed
createBodyPart("neck", { intimateRating: 4, paired:false, regex:/neck/,
  getExposureRating:function(char) { return 0; },
});
createBodyPart("head", { intimateRating: 3, paired:false, regex:/head/,
  getExposureRating:function(char) { return 0; },
});
createBodyPart("nose", { intimateRating: 3, paired:false, regex:/nose/,
  getExposureRating:function(char) { return 0; },
});
createBodyPart("mouth", { intimateRating: 3, paired:false, regex:/mouth|lips?/,
  getExposureRating:function(char) { return 0; },
  canBePenetrated:true,
});
createBodyPart("face", { intimateRating: 3, paired:false, regex:/face/,
  getExposureRating:function(char) { return 0; },
});

// These body parts are not in the garment slots, which use chest, buttock, groin, groin and crotch
createBodyPart("tit", { intimateRating: 8, paired:true, regex:/tits?|boobs?|breasts?|gazongas?|mammary|mammaries|jugs?|hooters?|knockers?|melons?|baps?|rack/,
  modestyBoost:true,
  indirect:true,
  getSlot:function() { return "chest"; },
});
createBodyPart("ass", { intimateRating: 8, paired:false, regex:/ass|arse|backside|bottom|tush|rump|butt|booty|can|clacker|bum/,
  getSlot:function() { return "buttock"; },
  indirect:true,
  canBePenetrated:true,
});
createBodyPart("bollock", { intimateRating: 9, paired:true, regex:/bollocks?|balls?|testicles?|nadgers?|nuts?/, genitals:true,
  modestyBoost:true,
  getSlot:function(toHandle) { return toHandle ? "crotch" : "groin"; },
});
createBodyPart("cock", { intimateRating: 10, paired:false, regex:/cock|dick|phallus|penis|willy|manhood|organ|tool|pecker|schlong|prick|member|wang|knob|dong/, genitals:true,
  modestyBoost:true,
  response_suck:function(char, object) {
    msg("{nv:char:suck:true} {pa:char} {nms:npc:true} {cock:npc}.", {npc:object, char:char});
  },
  response_lick:function(char, object) {
    msg("{nv:char:run:true} {pa:char} tongue along the length of {nms:npc:true} hard cock.", {npc:object, char:char});
  },
  getSlot:function() { return "groin" },
});
createBodyPart("pussy", { intimateRating: 10, paired:false, regex:/pussy|cunt|vagina|slit|putang|snatch|coochie/, genitals:true,
  response_suck:function(char, object) {
    msg("You can't suck off a pussy!");
  },
  getSlot:function(toHandle) { return toHandle ? "crotch" : "groin"; },
  canBePenetrated:true,
});



createBodyPart("tail", { intimateRating: 1, paired:false, regex:/tail/,notStd:true});
createBodyPart("wing", { intimateRating: 1, paired:true, regex:/wings?/,notStd:true});
createBodyPart("horn", { intimateRating: 1, paired:true, regex:/horns?/,notStd:true});


erotica.slots = []
for (const bp of bodyParts) {
  if (!erotica.slots.includes(bp.getSlot())) {
    erotica.slots.push(bp.getSlot())
  }
}






erotica.ejaculate = function(char, dest, extra) {
  if (typeof dest === 'string') dest = w[dest]
  if (!dest.cumMess) dest.cumMess = []
  dest.cumMess.push(char.name + (extra ? "_" + extra : ''))
}

erotica.pourOn = function(dest, substance, extra) {
  if (typeof dest === 'string') dest = w[dest]
  if (!dest.substanceMess) dest.substanceMess = []
  dest.substanceMess.push(substance + (extra ? "_" + extra : ''))
}











erotica.verify = function() {
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
      if (typeof w[key].ripOff !== "function") errormsg("No function 'ripOff' for garment " + w[key].name)
      if (typeof w[key].getSlots !== "function") errormsg("No function 'getSlots' for garment " + w[key].name)
      if (typeof w[key].specialWearMsg !== "function" && typeof w[key].msgWear !== "string") errormsg("No 'msgWear' for garment " + w[key].name)
      if (typeof w[key].specialRemoveMsg !== "function" && typeof w[key].msgRemove !== "string") errormsg("No 'msgRemove' for garment " + w[key].name)
      if (typeof w[key].strength !== "number") errormsg("No number'strength' for garment " + w[key].name);
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
