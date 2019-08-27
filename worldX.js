"use strict";






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
  getExposureRating:function(char) { return 0; }
});
createItem("head", BODY_PART(3, false, /head/), {
  getExposureRating:function(char) { return 0; }
});
createItem("nose", BODY_PART(3, false, /nose/), {
  getExposureRating:function(char) { return 0; }
});
createItem("mouth", BODY_PART(3, false, /mouth|lips?/), {
  getExposureRating:function(char) { return 0; }
});

// These body parts are not in the garment slots, which use chest, buttock, groin, groin and crotch
createItem("tit", BODY_PART(8, true, /tits?|boobs?|breasts?|gazongas?|mammary|mammaries/), {
  modestyBoost:true,
  getSlot:function() { return "chest"; },
});
createItem("ass", BODY_PART(8, false, /ass|arse|backside|bottom|tush|rump|butt/), {
  getSlot:function() { return "buttock"; },
});
createItem("bollock", GENITALS(9, true, /bollocks?|balls?|testicles?/), {
  modestyBoost:true,
  getSlot:function(toHandle) { return toHandle ? "crotch" : "groin"; },
});
createItem("cock", GENITALS(10, false, /cock|dick|phallus|penis|willy|manhood/), {
  modestyBoost:true,
  response_suck:function(char, object) {
    msg(nounVerb(char, "suck", true) + " " + object.byname({article:DEFINITE}) + " hard cock.");
  },
  response_lick:function(char, object) {
    msg(nounVerb(char, "run", true) + " " + char.PRONOUNS.posessive + " tongue along the length of " + object.byname({article:DEFINITE}) + " hard cock.");
  },
  getSlot:function(toHandle) { return toHandle ? "crotch" : "groin"; },
});
createItem("pussy", GENITALS(10, false, /pussy|cunt|vagina|slit/), {
  response_suck:function(char, object) {
    msg("You can't suck off a pussy!");
  },
  getSlot:function(toHandle) { return toHandle ? "crotch" : "groin"; },
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
    }
  }
};




/*
P("You think about jerking off, but your dick is completely flacid; not even enough to get hold of.")
P("You lie back and put your hands round your cock, rubbing it for a few moments, thinking about the naked woman you woken up beside.")
P("You look at the hot girl in the bed, as put your hands round your cock, rubbing it for a few moments.")
P("You put your hands round your cock, rubbing it for a few moments, thinking about the naked woman you woken up beside.")
P("'What...' exclaims Natasha, looking horrified. It does not stop her watching, though.")
P("Suddenly you ejaculate, your cum spurting across the bed. For a couple of minutes yoiu just lie there, getting your breath back.")
P("Suddenly you ejaculate, your cum spurting across the bed. For a couple of minutes you just stand there, getting your breath back.")
P("Suddenly you ejaculate, your cum spurting over " + object.byname({possessive:true}) + " belly. 'Urg!' she exclaims. 'That's disgusting!' For a couple of minutes you just lie there, getting your breath back.")
P("Suddenly you ejaculate, your cum spurting across the bed on to " + object.byname({possessive:true}) + " face. 'Urg!' she exclaims, as she wipes the muck off with the sheet. 'That's disgusting! It went in my eye, you filthy animal!' For a couple of minutes you just stand there, getting your breath back, a big grin on your face.")
P("Hearing you gasp, " + object.alias + " looks away from the TV, and at you, just as you ejaculate, your cum spurting over her face. 'Urg!' she exclaims, as she wipes the muck off with her hand. She is still smiling, despite her protests 'That's disgusting! It went in my eye, you filthy animal!' For a couple of minutes you just stand there, getting your breath back, a big grin on your face, that gets even broader as she licks the cum from her hand.")
do(natasha_licked_cum, "show")
P("Suddenly you ejaculate, your cum spurting over " + object.byname({possessive:true}) + " belly. 'Urg!' she exclaims. 'That's disgusting!' For a couple of minutes you just stand there, getting your breath back, as she tries to wipe your muck off her midriff.")
P("Your cock is now {select:mplayer.erection:flacid:semi-erect:erect:hard:very hard:dripping pre-cum}.")


*/
