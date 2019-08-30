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
    isProtectedBy:function(garment) {
      return this.coveredBy(garment);
    },
    // gets the outer garment that hides this body part, or false if nothing does
    getCovering:function(char) {
      return char.getOuterWearable(this.getSlot());
    },
    // gets all the garments that hides this body part
    getAllCoverings:function(char) {
      return scope(isWornBy, {npc:char}).filter(el => el.getSlots().includes(this.getSlot()));
    },
    // returns false if there is a garment covering the bodypart with no getRevealing 
    // i.e., the bodypart is concealed, otherwise returns a measure of how revealed
    // Assumes at least one item on this bodypart is revealing!
    // Unit tested
    getReveal:function(char) {
      const clothing = this.getAllCoverings(char);
      let reveal = 5;
      for (let i = 0; i < clothing.length; i++) {
        if (!clothing[i].getRevealing) return false;
        reveal = Math.min(reveal, clothing[i].getRevealing());
      }
      return reveal;
    },    
    // gets the outer garment that protects this body part, or false if nothing does
    getProtection:function(char) {
      return char.getOuterWearable(this.getSlot());
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
  }
  return res;
}  
 
 
// Genitals are handled a little differently, as they are covered by "groin"
// and protected by "crotch", rather than their own clothing slot
const GENITALS = function(intimateRating, paired, regex) {
  const res = BODY_PART(intimateRating, paired, regex);
  res.getSlot = function() { return undefined; },  // hopefully never happens!
  res.coveredBy = function(garment) {
    return garment.slots.include("groin");
  };
  res.protectedBy = function(garment) {
    return garment.slots.include("crotch");
  };
  res.getCovering = function(char) {
    return char.getOuterWearable("groin");
  };
  res.getProtection = function(char) {
    return char.getOuterWearable("crotch");
  };
  return res;
}  








// EROTIC_FURNITURE extends FURNITURE to allow "bend over" and "straddle"

const EROTIC_FURNITURE = function(options) {
  const res = FURNITURE(options);
  if (options.bendover) {
    res.bendover = function(isMultiple, char) {
      return this.assumePosture(isMultiple, char, "bending", BEND_OVER_SUCCESSFUL, "over");
    };
  }
  if (options.straddle) {
    res.straddle = function(isMultiple, char) {
      return this.assumePosture(isMultiple, char, "straddling", STRADDLE_SUCCESSFUL, "");
    };
  }
  return res;
}




// Sex toys

const PHALLUS = function(canMove) {
  const res = {
    canMove:canMove,
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
    cannotManipulateMsg:function(char, obj, verb) {
      if (verb === undefined) verb = "do anything with"
      const objName = obj ? obj.byname({article:DEFINITE}) : "anything"
      return nounVerb(char, "can", true) + "not " + verb.toLowerCase() + " " + objName + " whilst " + pronounVerb(char, "be") + " " + this.situation + "."
    },
    cannotMoveMsg:function(char, obj, verb) {
      return nounVerb(char, "can", true) + "not go anywhere whilst " + pronounVerb(char, "be") + " " + this.situation + "."
    },
    restrain:function(char, target) {
      msg(this.restrainMsg(char, target))
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