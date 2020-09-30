"use strict";


const ACTOR = function(isFemale, isPlayer) {
  let res
  if (isPlayer) {
    res = PLAYER();
    res.isFemale = isFemale;
    // A very simple measure of size, to give an indicator of what NPC can wear what
    res.size = isFemale ? 4 : 6
  }
  else {
    res = NPC(isFemale)
  }
  
  res.hasCock = !isFemale
  res.hasPussy = isFemale
  res.hasTits = isFemale
  res.posture = "standing"
  res.actor = true
  res.properName = true
  res.enjoysAnal = false
  res.slutty = 2
  res.exhibitionist = 2
  res.kinky = 2
  res.dirtyTalk = 2

  res.getArousal = function() {return this.arousal}
  res.arousal = 10; // changes dynamically, 0 - 100
  res.reputation = 0  // getting a reputation is BAD, as other characters will dislike you
  //res.responses = erotica.defaultResponses
  res.responseNotWhileTiedUp = "'Not while I'm tied up.'"
  res.insult = function(target) { return target.hasBodyPart("cock") ? "jerk" : "bitch" }
  
  res.doEvent = function() {
    if (this.npc) {
      this.doReactions();
      if (!this.paused && !this.suspended && this.agenda.length > 0) this.doAgenda();
    }
    this.updateArousal();
  }
  
  
  res.updateArousal = function() {
    const l = this.othersHere()
    let total = 0
    if (this.report) console.log("Arousal for " + this.name)
    if (this.report) console.log("Was: " + this.arousal)
    for (let i = 0; i < l.length; i++) {
      const inc = this.getInstantAttraction(l[i])
      if (this.report) console.log("Add " + inc + " for " + l[i].name)
      total += inc
    }
    this.arousal += total / 5 - this.arousal / 10
    if (this.report) console.log("Now: " + this.arousal)
  }
  
  // The character does something sexy, rated from 0 to 10
  // This raises the arousal of other characters (not this one)
  res.arousalBomb = function(rating) {
    const l = this.othersHere()
    let total = 0
    if (this.report) console.log("Arousal bomb for " + this.name)
    for (let i = 0; i < l.length; i++) {
      const att = l[i].getInstantAttraction(this)
      if (this.report) console.log("Adding " + (att * rating / 10) + " to " + l[i].name)
      l[i].arousal += att * rating / 10
    }
  }
  
  
  // what this character does when the other character strips off
  res.stripReaction = function(char, garment, before, after) {
    if (before >= after) return
    if (6 > after) return
    if (this['alreadySeenExposed_' + char.name] >= after) return

    const attact = this.isFemale ? char.attactedToWomen : char.attactedToMen
    let s = ''
    if (attact === 0) {
      s = "{nv:chr:look:true} a little disapproving of {ob:chr}"
    }
    if (attact < 4) {
      return 
    }
    else {
      
    }
    this['alreadySeenExposed_' + char.name] = after
    msg(s, {chr:this, char:char, garment:garment})
   
  }

  
  
  res.othersHere = function() {
    const l = []
    for (let key in w) {
      const o = w[key]
      if (o.actor && o !== this && o.loc === this.loc) l.push(o)
    }
    return l
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
 
  res.assumePosture = function(posture, forced) {
    if (this.posture === posture.desc && this.postureFurniture === undefined) return failedmsg(lang.already(this));
    if (!this.canPosture()) return world.FAILED;
    if (!forced && !this.getAgreement("Posture", posture.cmd)) return world.FAILED;
    if (this.postureFurniture) {
      this.msg(stop_posture(this));  // stop_posture handles details
    }  
    this.msg(posture.getAssumePostureDescription(this, this.posture));
    this.posture = posture.desc;
    this.postureAddFloor = posture.addFloor;
    return world.SUCCESS;
  }  
  
  res.findCutter = function() {
    for (let key in w) {
      if (w[key].isAtLoc(this.name) && w[key].cutter) return w[key]
    }
    return false
  }
  
  // Should already know char has pussy, this has cock, both accessible
  res.girlOnTop = function(char) {
    msg("Girl on top")
    return world.SUCCESS
  }
  
  // sextoy may be undefined. If it is, just already know char has cock, exposed
  // Should already know this has specified bodypart, exposed
  res.fuck = function(char, bodypart, sextoy) {
    msg("Fuck")
    return world.SUCCESS
  }
  
  
  
  // --------------  DESCRIBING ---------------------------
  
  res.examine = function(isMultiple, char) {
    let s = "{description} " + lang.pronounVerb(this, "be", true) + " wearing {attire}."
    if (this.posture && this.posture !== "standing") s += " " + lang.pronounVerb(this, "be", true) + " {posture}."
    const dict = erotica.findGroupedSubstances(this)
    const sl = []
    for (let key in dict) {
      sl.push(key + " on " + this.pronouns.poss_adj + " " + formatList(dict[key], {lastJoiner:" and "}))
    }
    if (sl.length > 0) s +=  " " + lang.pronounVerb(this, "have", true) + " " + formatList(sl, {sep:"; ", lastJoiner:"; and "}) + "."
    msg(s, {item:this})
  }
  
  res.getPostureDescription = function(capitalise) {
    if (!this.posture || this.posture === "standing") return false;

    const pos = this.posture.replace("#", this.pronouns.poss_adj);
    if (this.restraint) {
      return w[this.restraint].situation;  // ??? does this need personalising?
    }
    else if (this.postureFurniture) {
      return pos + " " + this.postureAdverb + " " + lang.getName(w[this.postureFurniture], {article:DEFINITE});
    }
    else if (this.postureAddFloor) {
      return pos + " on the " + (w[this.loc].postureSurface || "floor");
    }
    else {
      return pos;
    }
    
  }

  res.getStatusDesc = function() {
    if (this.restraint) return w[this.restraint].situation
    if (!this.posture || this.posture === "standing") return false
    if (!this.postureFurniture) return this.posture
    return this.posture + " " + this.postureAdverb + " " + lang.getName(w[this.postureFurniture], {article:DEFINITE})
  }
  
  
  
  
  
  
  // --------------  BODY PARTS ---------------------------
  
  // You can override this to have an erotic actor have, for example, both a cock and tits
  // or to have novel body parts, such as a tail
  // Unit tested
  res.hasBodyPart = function(bp) {
    if (typeof bp !== "string") bp = bp.name;
    if (bp === "cock") return this.hasCock;
    if (bp === "bollock") return this.hasCock;
    if (bp === "cleavage") return this.hasTits;
    if (bp === "pussy") return this.hasPussy;
    if (bp === "tit") return this.hasTits;
    if (w[bp].notStd) return false;
    return true;
  }
  
  res.isBodyPartBare = function(bp) {
    if (typeof bp === "string") bp = w[bp];
    return (this.getOuterWearable(bp.getSlot()) === false)
  }
  
  res.describeBodyPart = function(bp_name) {
    if (bp_name === 'cock' && !this.isBodyPartBare('cock')) return 'You wonder what ' + this.pronouns.poss_adj + ' cock looks like under ' + this.pronouns.poss_adj + ' clothes.'
    if (bp_name === 'bollock' && !this.isBodyPartBare('bollock')) return 'You wonder what ' + this.pronouns.poss_adj + ' balls looks like under ' + this.pronouns.poss_adj + ' clothes.'
    if (bp_name === 'pussy' && !this.isBodyPartBare('pussy')) return 'You wonder what ' + this.pronouns.poss_adj + ' pussy looks like under ' + this.pronouns.poss_adj + ' clothes.'
    if (bp_name === 'face' && !this.isBodyPartBare('face')) return 'You wonder what ' + this.pronouns.poss_adj + ' face looks like.'

    if (typeof this.bodyPartDescs[bp_name] === 'string') {
      return this.bodyPartDescs[bp_name]
    }
    if (typeof this.bodyPartDescs[bp_name] === 'function') {
      return this.bodyPartDescs[bp_name](this)
    }

    if (w[bp_name].paired) return lang.pronounVerb(this, "have", true) + " " + this.getBodyPartAdjective(bp_name) + " " + w[bp_name].pluralAlias + "."
    return lang.pronounVerb(this, "have", true) + " a " + this.getBodyPartAdjective(bp_name) + " " + bp_name + "."
  }
  
  // You can override this to give a specific body part an adjective
  // Could also be done dynamically, say to reflect the erection
  // Alternatively, set bodyPartAdjectives
  res.getBodyPartAdjective = function(bp_name) {
    if (bp_name in this.bodyPartAdjectives) return this.bodyPartAdjectives[bp_name];
    if (bp_name === "tit") return "firm";
    if (bp_name === "cock") return erotica.erectionStates[Math.floor(this.arousal / 10) + 1];
    if (bp_name === "bollock") return "hot";
    if (bp_name === "pussy") return "hot";
    if (bp_name === "face") return this.hasCock ? "handsome" : "pretty";
    return this.getDefaultBodyPartAdjective();
  }

  res.bodyPartDescs = {
  },
  
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
  // You can override this to have an erotic actor have a fetish for a body part
  // Have it return a number for a recognised body part, or false for anything else
  res.getIntimateRating = function(bp_name) {
    return false;
  }
  
  
  
  
  
  
  // --------------  CLOTHING ---------------------------
  
  
  
  
  res.getOuterWearable = function(slot, considerBondage) {
   
    if (considerBondage && this.restraint) {
      const slots = w[this.restraint].getHides(this)
      if (slots.includes(slot)) return w[this.restraint]
    }

    const clothing = this.getWearing().filter(function(el) {
      if (typeof el.getSlots !== "function") {
        console.log("Item with worn set to true, but no getSlots function");
        console.log(el);
      }
      return el.getSlots().includes(slot);
    });

    if (clothing.length === 0) { return false; }
    let outer = clothing[0];
    for (let i = 1; i < clothing.length; i++) {
      if (clothing[i].wear_layer > outer.wear_layer) {
        outer = clothing[i];
      }
    }
    return outer;
  }
  
  res.getWearingVisible = function() {
    return this.getWearingSlottedVisible().concat(this.getWearingUnslotted())
  }
  res.getWearingSlottedVisible = function() {
    let list = []
    for (let i = 0; i < erotica.slots.length; i++) {
      const g = this.getOuterWearable(erotica.slots[i])
      if (g && !list.includes(g)) list.push(g)
    }
    return list
  }
  res.getWearingUnslotted = function() {
    let list = []
    for (let key in w) {
      const g = w[key]
      if (g.wearable && g.isAtLoc(this.name) && g.getSlots().length === 0) list.push(g)
    }
    return list
  }
  res.getWearing = function(ignoreFootwear) {
    if (ignoreFootwear) {
      return this.getContents(world.LOOK).filter(function(el) { return el.getWorn() && !el.ensemble && !el.footwear; });
    }
    else {
      return this.getContents(world.LOOK).filter(function(el) { return el.getWorn() && !el.ensemble; });
    }
  }

  res.isNaked = function(ignoreFootwear) {
    return (this.getWearing(ignoreFootwear).length === 0)
  }
  // Dresses the characters in the give items, removing any others first
  // Used for unit testing, may not be that useful otherwise
  res.dressUp = function() {
    const clothes = this.getWearing();
    for (let el of clothes) {
      delete el.loc;
      el.worn = false;
    }
    for (let el of arguments) {
      if (!w[el]) throw "dressUp: Garment not found: " + el
      w[el].loc = this.name;
      w[el].worn = true;
    }
  }
  // The first item a character will want to remove is the one on the outermost layer,
  // with the least exposure after it is removed
  // In the case of a draw, the one with the less slots
  res.firstToRemove = function() {
    const clothing = this.getWearing()
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



  // returns true if every visible garment is of one of the types specified
  res.clothingTypeOnlyFor = function(garmentType, ignoreFootwear) {
    const l = this.getWearingVisible();
    for (let i = 0; i < l.length; i++) {
      if (l[i].footwear && ignoreFootwear) continue
      if (l[i].garmentType !== garmentType) return false
    }
    return true
  }



  // returns true if at least one visible garment is of one of the types specified
  res.clothingTypeIncludesFor = function(garmentType, ignoreFootwear) {
    const l = this.getWearingVisible();
    for (let i = 0; i < l.length; i++) {
      if (l[i].footwear && ignoreFootwear) continue
      if (l[i].garmentType === garmentType) return true
    }
    return false
  }


  // returns true if the char is wearing the items listed (by name)
  res.testCostume = function(garments, ignoreFootwear) {
    if (typeof garments[0] !== "string") garments = garments.map(el => el.name)
    const l = this.getWearing(ignoreFootwear)
    if (garments.length !== l.length) return false
    for (let el of l) {
      if (!garments.includes(el.name)) return false
    }
    return true
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
    for (let bp of this.getBodyPartList()) {
      if (bp.agregate) continue
      const bpExpRating = bp.getExposureRating(this);
      const g = bp.getCovering(this);
      //console.log(bp.name)
      //console.log(bpExpRating)
      //console.log(g)
      if (!g) {
        rating = Math.max(rating, bpExpRating * 2);
      }
      else if (g.getRevealing) {
        const reveal = bp.getReveal(this);
        if (reveal) {
          rating = Math.max(rating, bpExpRating * 2 - 5 + reveal);
          if (bp.modestyBoost) modestyBoost += 1;
        }
        else {
          if (bp.modestyBoost) modestyBoost += 2;
        }
      }
      else {
        if (bp.modestyBoost) modestyBoost += 2;
      }
      //console.log(rating)
      //console.log(modestyBoost)
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
  
    
    
    
    
  // --------------  ATTRACTION ---------------------------
    
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





  // --------------  AGREEMENT ---------------------------

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
    
    if (this.restraint && w[this.restraint].canManipulate) return failedmsg(this.responseNotWhileTiedUp)
   
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
  
  
  
  
  // --------------  CAN? ---------------------------
  
  res.canMove = function(ex, dir) {
    if (this.restraint && !w[this.restraint].canMove) {
      if (dir !== undefined) {
        if (this === game.player) {
          failedmsg(w[this.restraint].cannotMoveMsg(this, dir));
        }
        else {
          msg(this.responseNotWhileTiedUp)
        }
        return false;
      }
    }
    else {
      return true;
    }
  }
  res.canManipulate = function(obj, verb) {
    if (this.restraint && !w[this.restraint].canManipulate) {
      if (obj !== undefined) {
        if (this === game.player) {
          failedmsg(w[this.restraint].cannotManipulateMsg(this, obj, verb));
        }
        else {
          msg(this.responseNotWhileTiedUp)
        }
      }
      return false;
    }
    else {
      return true;
    }
  }
  res.canPosture = function(verb) {
    if (this.restraint && !w[this.restraint].canMove) {
      if (verb  !== undefined) {
        if (this === game.player) {
          failedmsg(w[this.restraint].cannotPostureMsg(this, verb));
        }
        else {
          msg(this.responseNotWhileTiedUp)
        }
        return false;
      }
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







// --------------  AGENDA ---------------------------


// Remove one item, which can be specified.
// If it is, it does not check what else is worn
agenda.removeGarment = function(npc, arr) {
  const g = (arr.length === 0 ? npc.firstToRemove() : w[arr[0]])
  if (!g.wearable || g.loc !== npc.name) console.log(arr)
  npc.msg(g.removeMsg(npc), {garment:g, actor:npc});
  g.worn = false
  g.loc = npc.loc
  return true;
}

// Remove one item per turn until naked
agenda.strip = function(npc, arr) {
  const g = npc.firstToRemove()
  if (!g.wearable || g.loc !== npc.name) console.log(arr)
  npc.msg(g.removeMsg(npc), {garment:g, actor:npc});
  g.worn = false
  g.loc = npc.loc
  return npc.isNaked();
}

// Remove one item per turn until the next item is the one specified (which is not taken off)
agenda.stripTo = function(npc, arr) {
  const g = npc.firstToRemove()
  if (!g.wearable || g.loc !== npc.name) console.log(arr)
  npc.msg(g.removeMsg(npc), {garment:g, actor:npc});
  g.worn = false
  g.loc = npc.loc
  return npc.firstToRemove().name === arr[0];
}

// Wear one item.
// It does not check what else is worn
agenda.wearGarment = function(npc, arr) {
  const g = w[arr[0]]
  if (!g.wearable) console.log(arr)
  npc.msg(g.wearMsg(npc), {garment:g, actor:npc});
  g.worn = true
  g.loc = npc.name
  return true;
}

// Wear one item.
// It does not check what else is worn
agenda.wearCostume = function(npc, arr) {
  let count = 0
  let g = false
  for (let i = 0; i < arr.length; i++) {
    const g2 = w[arr[i]]
    if (!g2.worn || g2.loc !== npc.name) {
      count++
      if (!g) g = g2
    }
  }
  if (count === 0) return true;  // should not happen!
  if (!g.wearable) console.log(arr)
  npc.msg(g.wearMsg(npc), {garment:g, actor:npc});
  g.worn = true
  g.loc = npc.name
  return count === 1;
}

// bendover, straddle, siton, reclineon, standon
// kneel, bendover, sit, liefacedown, lieback, crawl

agenda.posture = function(npc, arr) {
  if (arr.length === 2) {
    const furniture = w[arr[1]]
    console.log(furniture)
    console.log(arr[0])
    furniture[arr[0]](false, npc)
  }
  else {
    const posture = erotica.POSTURES_LIST.find(function(el) { return el.cmd === arr[0]} )
    npc.assumePosture(posture, true)
  }
  return true 
}