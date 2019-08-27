"use strict";



const ACTOR = function(isFemale, isPlayer) {
  let res
  if (isPlayer) {
    res = PLAYER();
    res.isFemale = isFemale;
  }
  else {
    res = NPC(isFemale)
  }
  
    
  // You can override this to have an erotic actor have, for example, both a cock and tits
  // or to have novel body parts, such as a tail
  // Unit tested
  res.hasBodyPart = function(bp) {
    if (typeof bp !== "string") bp = bp.name;
    if (this.isFemale && bp === "cock") return false;
    if (this.isFemale && bp === "bollock") return false;
    if (!this.isFemale && bp === "cleavage") return false;
    if (!this.isFemale && bp === "pussy") return false;
    if (!this.isFemale && bp === "tit") return false;
    if (w[bp].notStd) return false;
    return true;
  }
  
  // You can override this to give a specific body part an adjective
  // Could also be done dynamically, say to reflect the erection
  // Alternatively, set bodyPartAdjectives
  res.getBodyPartAdjective = function(bp_name) {
    if (bp_name in this.bodyPartAdjectives) return this.bodyPartAdjectives[bp_name];
    if (bp_name === "tit") return "firm";
    if (bp_name === "cock") return "hard";
    if (bp_name === "bollock") return "hot";
    return this.getDefaultBodyPartAdjective();
  }
  res.bodyPartAdjectives = {},
  
  // Do not override
  // Effectively unit tested
  res.getBodyPartList = function() {
    const list = [];
    for (let key in w) {
      if (w[key].isBodyPart && this.hasBodyPart(key)) {
        list.push(w[key]);
      }
    }
    return list;
  }
  
  // You can override this as desired.
  res.getDefaultBodyPartAdjective = function() {
    return this.hasCock ? "muscled" : "smooth";
  }
  
  
  
  // Effectively unit tested
  res.getClothing = function() {
    return scope(isWornBy, {npc:this});
  }
  
  
  res.isNaked = function() {
    return (this.getClothing().length === 0)
  }
  
  // Dresses the characters in the give items, removing any others first
  // Used for unit testing, may nt be that useful otherwise
  res.dressUp = function() {
    const clothes = this.getClothing();
    for (let i = 0; i < clothes.length; i++) {
      delete clothes[i].loc;
      clothes[i].worn = false;
    }
    for (let i = 0; i < arguments.length; i++) {
      w[arguments[i]].loc = this.name;
      w[arguments[i]].worn = true;
    }
  }
  
  
  
  res.getPostureDescription = function(capitalise) {
    if (!this.posture) return false;

    const pos = this.posture.replace("#", this.pronouns.poss_adj);
    if (this.postureFurniture) {
      return pos + " " + this.postureAdverb + " " + w[this.postureFurniture].byname({article:DEFINITE});
    }
    else if (this.postureAddFloor) {
      return pos + " on the floor";
    }
    else {
      return pos;
    }
    
  }
  
  
  
  
  
  // You can override this to have an erotic actor have a fetish for a body part
  // Have it return a number for a recognised body part, or false for anything else
  res.getIntimateRating = function(bp_name) {
    return false;
  }
  
  // Get a rating for how public the room is
  // 0 might be a private room, 10 on a raised area in a public thoroughfare
  // Effectively unit tested
  res.getPublicRating = function(room) {
    do {
      if (room.getPublicRating) return room.getPublicRating();
      room = w[room.loc];
    } while (room);
    return 5;
  }
  
  res.getPublicRatingHere = function() {
    return this.getPublicRating(this.loc);
  }


  // Get a rating of how much the character is will to show, given how public the room is.
  // If the public is:
  // 0 should be 10 for anyone
  // 5, maybe 6
  // 10, should be maybe 3, from 0
  
  // if willingToExpose = 10, this will always be 10
  // if getPublicRatingHere = 0, this will always be 10
  // if willingToExpose = 0 and getPublicRatingHere = 10, this will give 0
  // Override if required
  // Unit tested
  res.getWillingToExpose = function(room) {
    return Math.floor(25 - 25 * this.getPublicRating(room) * (10 - this.willingToExpose) / 100);
  }
  res.getWillingToExposeHere = function() {
    return this.getWillingToExpose(w[this.loc]);
  }
  res.willingToExpose =  5
  
  
  
  
  // Rating of how much the character's body is exposed to view, from 0 to 24
  // Exposure for women
  // 24 - naked
  // 20 - thong
  // 18 - bikini briefs or thonged bikini
  // 13 - mesh t-shirt over bikini briefs
  // 8 - bikini
  // 7 - mesh t-shirt over bikini
  // 6 - swimsuit or t-shirt over bikini
  // 4 - daisy dukes and t-shirt
  // 0 - shoes, jeans, t-shirt
  // 
  // Exposure for men
  // 24 - naked
  // 16 - thong
  // 6 - briefs
  // 4 - swimshorts
  // 0 - shorts and t-shirt
  //
  // Unit tested
  res.getExposure = function() {
    let rating = 0;
    let modestyBoost = 0;
    const list = this.getBodyPartList();
    for (let i = 0; i < list.length; i++) {
      const bpExpRating = list[i].getExposureRating(this);
      const g = list[i].getCovering(this);
      if (!g) {
        rating = Math.max(rating, bpExpRating * 2);
      }
      else if (g.getRevealing) {
        const reveal = list[i].getReveal(this);
        if (reveal) {
          rating = Math.max(rating, bpExpRating * 2 - 5 + reveal);
          if (list[i].modestyBoost) modestyBoost += 1;
        }
        else {
          if (list[i].modestyBoost) modestyBoost += 2;
        }
      }
      else {
        if (list[i].modestyBoost) modestyBoost += 2;
      }
    }
    return Math.max(rating - modestyBoost + 4, 0);
  }
  
  // Rating of how much the character's body would be exposed to view if the given garment was absent, for 0 to 24
  // Unit tested
  res.getExposureWithout = function(garment) {
    if (garment.loc !== this.name || !garment.worn) {
      errormsg("Trying to use getExposureWithout for " + this.name + " and a garment not worn: " + garment.name);
      return false;
    }
    garment.worn = false;
    const n = this.getExposure();
    garment.worn = true;
    return n;
  }
  
  // Is the character willing to remove the given garment?
  // Unit tested
  res.getWillingToRemove = function(garment) {
    //const currentExp = this.getExposure();
    //console.log("this.getWillingToExpose(w[this.loc])=" + this.getWillingToExpose(w[this.loc]));
    //console.log("this.getExposureWithout(garment)=" + this.getExposureWithout(garment));
    const happyLevel = this.getWillingToExpose(w[this.loc]) - this.getExposureWithout(garment);
    if (happyLevel < 0) return erotica.REFUSE;
    if (happyLevel < 3) return erotica.RELUCTANT;
    return erotica.HAPPY;
  }
  
  
  // Is the character willing to go in the given direction, given what is currently worn?
  // Unit tested
  res.getWillingToGo = function(dir) {
    const willingHere = this.getWillingToExposeHere() - this.getExposure();
    const willingThere = this.getWillingToExpose(w[game.room[dir].name]) - this.getExposure();

    if (willingThere >= 3) return erotica.HAPPY;
    if (willingThere > willingHere) return erotica.HAPPY;
    if (willingThere >= 0) return erotica.RELUCTANT;
    if (willingThere === willingHere) return erotica.RELUCTANT;
    return erotica.REFUSE;
  }

  // Should be overriden for every character to give their own responses.
  // Should also bail if the character is not happy about taking orders too.
  // Whether erotica.RELUCTANT returns true or false is up to you.
  res.getAgreementRemove = function(obj) {
    const agreement = this.getWillingToRemove(obj);
    if (agreement === erotica.HAPPY) {
      msg("'Sure thing!'");
      return true;
    }
    if (agreement === erotica.RELUCTANT) {
      msg("'I guess...'");
      return true;
    }
    msg("'No way!'");
    return false;
  }

  // Should be overriden for every character to give their own responses.
  // Should also bail if the character is not happy about taking orders too.
  // Whether erotica.RELUCTANT returns true or false is up to you.
  res.getAgreementGo = function(dir) {
    const agreement = this.getWillingToGo(dir);
    if (agreement === erotica.HAPPY) {
      msg("'Sure thing!'");
      return true;
    }
    if (agreement === erotica.RELUCTANT) {
      msg("'I guess...'");
      return true;
    }
    msg("'No way am I going out there like this!'");
    return false;
  }
  return res;
}  






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
