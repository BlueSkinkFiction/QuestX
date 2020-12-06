"use strict";






const BODY_PART = function(intimateRating, paired, regex) {
  const res = {
    isBodyPart:true,
    intimateRating:intimateRating,
    regex:regex,
    paired:paired,
    // string to use when saying the character does not have this body part
    none:function() {
      if (this.paired) return "any";
      return "one of them";
    },
    getSlot:function() { return this.name; },
    // is the body part covered by this garment?
    isCoveredBy:function(garment) {
      return garment.getSlots().include(this.getSlot());
    },
    // does the garment stop access to the body part?
    //isProtectedBy:function(garment) {
    //  return this.coveredBy(garment);
    //},
    // gets the outer garment that hides this body part, or false if nothing does
    getCovering:function(char) {
      return char.getOuterWearable(this.getSlot());
    },
    // gets all the garments that hides this body part
    getAllCoverings:function(char) {
      return char.getWearing().filter(el => el.getSlots().includes(this.getSlot()));
    },
    // returns false if there is a garment covering the bodypart with no getRevealing 
    // i.e., the bodypart is concealed, otherwise returns a measure of how revealed
    // Assumes at least one item on this bodypart is revealing!
    // Unit tested
    getReveal:function(char) {
      const clothing = this.getAllCoverings(char);
      let reveal = 5;
      for (let garment of clothing) {
        if (!garment.getRevealing) return false;
        reveal = Math.min(reveal, garment.getRevealing());
      }
      return reveal;
    },    
    // gets the outer garment that protects this body part, or false if nothing does
    getProtection:function(char, includeBondage) {
      return char.getOuterWearable(this.getSlot(true), includeBondage);
    },
    // how sexual is it to touch the body part?
    getIntimateRating:function(char) {
      const x = char.getIntimateRating(this.getSlot());
      if (x) return x;
      return this.intimateRating;
    },
    // how daring is a character to expose this body part
    getExposureRating:function(char) {
      return this.getIntimateRating(char);
    },
    getName(side) {
      if (!this.paired) return this.alias
      return side ? side.trim() + " " + this.alias : this.pluralAlias
    }
  }
  return res;
}  
 
 
// Genitals are handled a little differently, as they are covered by "groin"
// and protected by "crotch", rather than their own clothing slot
const GENITALS = function(intimateRating, paired, regex) {
  const res = BODY_PART(intimateRating, paired, regex);
  res.indirect = true
  res.getCovering = function(char) {
    return char.getOuterWearable("groin");
  };
  return res;
}  


const AGREGATE_BODY_PART = function(intimateRating, paired, regex) {
  const res = BODY_PART(intimateRating, paired, regex);
  res.agregate = true
  return res;
}  






// EROTIC_FURNITURE extends FURNITURE to allow "bend over" and "straddle"

const EROTIC_FURNITURE = function(options) {
  const res = FURNITURE(options);
  res.postureChangesImplemented = true

  if (options.bendover) {
    res.bendover = function(isMultiple, char) {
      return this.assumePosture(isMultiple, char, "bending", "bendover", "over");
    }
  }
  if (options.straddle) {
    res.straddle = function(isMultiple, char) {
      return this.assumePosture(isMultiple, char, "straddling", "straddle", "");
    }
  }
  if (options.recline) {
    res.facedown = function(isMultiple, char) {
      return this.assumePosture(isMultiple, char, "facedown", "facedown", "");
    }
  }
  
  res.hidesWhen_sitting = ["buttock", "lowerback", "upperback"]
  res.hidesWhen_reclining = ["buttock", "lowerback", "upperback"]
  res.hidesWhen_facedown = ["groin", "midriff", "chest", "tit", "nipple"]
  res.hidesWhen_standing = []
  res.hidesWhen_kneeling = []
  res.hidesWhen_crawling = []
  res.hidesWhen_straddling = ["crotch"]
  res.hidesWhenBendover = ["chest", "tit", "nipple", "midriff", "groin"]
  res.reclining_to_facedown = "{nv:actor:roll:true} on to {pa:actor} front."
  res.facedown_to_reclining = "{nv:actor:roll:true} on to {pa:actor} back."
  res.straddling_to_sitting = "{nv:actor:swing:true} around to sit properly on {nm:item:the}."
  res.sitting_to_straddling = "{nv:actor:swing:true} around to straddle {nm:item:the}."
  res.sitting_to_reclining = "{nv:actor:lie:true} back on {nm:item:the}."
  res.reclining_to_sitting = "{nv:actor:sit:true} up on {nm:item:the}."
  return res;
}


lang.bendover_on_successful = "{nv:char:bend:true} over {nm:item:the}."
lang.straddle_on_successful = "{nv:char:straddle:true} {nm:item:the}."
lang.facedown_on_successful = "{nv:char:lie:true} facedown on {nm:item:the}."



// Sex toys

const PHALLUS = function(canMove) {
  const res = {
    canMove:canMove,
    dildo:true,
  };
  return res;
}

const GAG = function() {
  const res = {
  };
  return res;
}

const BONDAGE_DEVICE = function(canMove) {
  const res = {
    bondage:true,
    canMove:canMove,
    canManipulate:false,
    points:[],
    posture:'standing',
    getHides:function(actor) { return [] },
    cannotManipulateMsg:function(char, obj, verb) {
      if (verb === undefined) verb = "do anything with"
      const objName = obj ? lang.getName(obj, {article:DEFINITE}) : "anything"
      return lang.nounVerb(char, "can", true) + "not " + verb.toLowerCase() + " " + objName + " whilst " + lang.pronounVerb(char, "be") + " " + this.situation + "."
    },
    cannotMoveMsg:function(char, obj, verb) {
      return lang.nounVerb(char, "can", true) + "not go anywhere whilst " + lang.pronounVerb(char, "be") + " " + this.situation + "."
    },
    restrain:function(char, target) {
      msg(this.restrainMsg(char, target))
      target.posture = this.posture
      delete target.postureFurniture
      target.restraint = this.name
      this.victim = target.name
    },
    release:function(char, target) {
      msg(this.releaseMsg(char, target))
      delete target.restraint
      delete this.victim
    },
  };
  return res;
}