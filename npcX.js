"use strict";



const ACTOR = function(isFemale, isPlayer) {
  let res
  if (isPlayer) {
    res = PLAYER();
    res.isFemale = isFemale;
    // A very simple measure of size, so give an indicator of what NPC can wear what
    res.size = isFemale ? 4 : 6
  }
  else {
    res = NPC(isFemale)
  }
  
  res.getArousal = function() {return this.arousal}
  res.arousal = 10; // changes dynamically, 0 - 100
  
  // From 0 to 5
  // 0 repulsed (eg homophobic)
  // 1 rather not
  // 2 not interested
  // 3 somewhat
  // 4 definitely
  // 5 always looking, always thinking
  res.attactedToMen = 4;
  res.attactedToWomen = 4;
  
  // From 0 to 10
  // 0 pig ugly
  // 2 you wouldn't
  // 4 plain
  // 6 quite attractive
  // 8 hot
  // 10 swimwear model
  res.appearance = 7;
  
  res.responseNotWhileTiedUp = "'Not while I'm tied up.'"
  
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
  
  
  res.isBodyPartBare = function(bp) {
    if (typeof bp === "string") bp = w[bp];
    return (this.getOuterWearable(bp.getSlot()) === false)
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
  
  res.getStatusDesc = function() {
    if (this.restraint) return w[this.restraint].situation
    if (!this.posture) return false
    if (!this.postureFurniture) return this.posture
    return this.posture + " " + this.postureAdverb + " " + w[this.postureFurniture].byname({article:DEFINITE})
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
  
  // The first item a character will want to remove is the one on the outermost layer,
  // with the least exposure after it is removed
  // In the case of a draw, the one with the less slots
  res.firstToRemove = function() {
    const clothing = this.getClothing()
    let res = null;
    
    for (let i = 0; i < clothing.length; i++) {
      if (res === null) {
        // res not set yet, so set
        res = clothing[i];
      }
      else if (res.wear_layer < clothing[i].wear_layer) {
        // the item is on a higher layer than res, so use that
        res = clothing[i];
      }
      else if (res.wear_layer === clothing[i].wear_layer) {
        const resExp = this.getExposureWithout(res)
        const itmExp = this.getExposureWithout(clothing[i])
        // the item is the same layer than res, so dig deeper
        if (resExp > itmExp) {
          // the item causes less exposure when removed, so pick it
          res = clothing[i];
        }
        else if (resExp === itmExp && res.getSlots().length > clothing[i].getSlots().length) {
          res = clothing[i];
        }
      }
    }
    return res;
  }

    
  res.attractionTo = function(target) {
    if (typeof this["attraction_" + target.name] === "number") {
      return this["attraction_" + target.name];
    }
    if (typeof this["attraction_" + target.name] === "function") {
      return this["attraction_" + target.name]();
    }
    this.baseAttraction(target)
    return this["attraction_" + target.name];
  }
  
  res.baseAttraction = function(target) {
    this["attraction_" + target.name] = 0;
  }
  
  
  // how attracted is the character to the appearance of the target?
  // Ranges from 10 to 0 (indifference) to -5 (horrified)
  res.getInstantAttraction = function(target) {
    const attact = target.isFemale ? this.attactedToWomen : this.attactedToMen
    return Math.floor(Math.log((target.getExposure() + 15) * (attact - 0) * target.appearance / 1 + 1) * 2 - 5);  // 0 - 24
    
  }
  
  res.modifyAttraction = function(target, amount) {
    if (typeof this["attraction_" + target.name] !== "number") {
      this.baseAttraction(target);
    }
    this["attraction_" + target.name] += amount;
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
    if (garment.loc !== this.name || !garment.getWorn()) {
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
    const happyLevel = this.getWillingToExpose(w[this.loc]) - this.getExposureWithout(garment);
    if (happyLevel < 0) return erotica.REFUSE;
    if (happyLevel < 3) return erotica.RELUCTANT;
    return erotica.HAPPY;
  }
  
  // Is the character willing to perform the given action?
  res.getWillingToInteract = function(target, action, bodypart) {
    // A high score indicates some the character will be reluctant to do
    
    let score = action.intimateRating
    score += this.getPublicRatingHere
    score += bodypart.getIntimateRating(target);
    score -= this.attractionTo(target) / 10;
    
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


  res.respondToUndressNoChoice = function(char, garment) {
    msg(nounVerb(char, "rip", true) + " " + garment.byname({article:DEFINITE, single:true}) + " off " + this.byname({article:DEFINITE}) + ".");
  }

  res.respondToUndressWilling = function(char, garment) {
    msg(nounVerb(char, "pull", true) + " " + garment.byname({article:DEFINITE, single:true}) + " off " + this.byname({article:DEFINITE}) + ".");
  }

  res.respondToUndressRefusal = function(char, garment) {
    msg(nounVerb(char, "try", true) + " to pull " + garment.byname({article:DEFINITE, single:true}) + " off " + this.byname({article:DEFINITE}) + ", but " + this.byname({article:DEFINITE}) + " is having none of it.");
  }


  res.getAgreement = function(...args) {
    if (args.length === 0) {
      errormsg("getAgreement has no parameters");
    }
    let name = sentenceCase(args.shift())
    if (["SitOn", "StandOn", "ReclineOn", "Straddle", "BendOverFurniture"].includes(name)) {
      args.unshift(name.toLowerCase())
      name = "Posture"
    }
    //console.log(name + ": " + args);
    if (this["getAgreement" + name]) {
      return this["getAgreement" + name](...args);
    }
    if (this.getAgreementOther) {
      return this.getAgreementOther(name, ...args);
    }
    return true;
  }


  // Should be overriden for every character to give their own responses.
  // Should also bail if the character is not happy about taking orders too.
  res.getAgreementPosture = function(name, object) {
    return true;
  }


  // Should be overriden for every character to give their own responses.
  // Should also bail if the character is not happy about taking orders too.
  res.getAgreementInteract = function(target, action, bodypart, actionName) {
    //console.log("* Interact: " + target.name + ", " + action.name + ", " + bodypart.name);
    return true;
  }



  // Should be overriden for every character to give their own responses.
  // Should also bail if the character is not happy about taking orders too.
  // Whether erotica.RELUCTANT returns true or false is up to you.
  res.getAgreementRemove = function(obj) {
    if (this === game.player) return true;
    
    if (this.restraint && w[this.restraint].canManipulate) {
      failedmsg(this.responseNotWhileTiedUp)
      return false;
    }
    
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
  res.getAgreementRemoveOther = function(garment, target, targetWilling, targetNoChoice) {
    return true;
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
  
  
  res.canMove = function(dir) {
    if (this.restraint && !w[this.restraint].canMove) {
      if (this === game.player) {
        failedmsg(w[this.restraint].cannotMoveMsg(this, dir));
      }
      else
      msg(this.responseNotWhileTiedUp)
      return false;
    }
    else {
      return true;
    }
  }
  res.canManipulate = function(obj, verb) {
    if (this.restraint && !w[this.restraint].canManipulate) {
      if (this === game.player) {
        failedmsg(w[this.restraint].cannotManipulateMsg(this, obj, verb));
      }
      else
      msg(this.responseNotWhileTiedUp)
      return false;
    }
    else {
      return true;
    }
  }
  res.canPosture = function(verb) {
    if (this.restraint && !w[this.restraint].canMove) {
      if (this === game.player) {
        failedmsg(w[this.restraint].cannotPostureMsg(this, verb));
      }
      else
      msg(this.responseNotWhileTiedUp)
      return false;
    }
    else {
      return true;
    }
  }
  res.canTalk = function() {
    return this.gag ? false : true
  }

  return res;
}  




