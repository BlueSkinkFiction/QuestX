"use strict";

settings.saveLoadExcludedAtts.push("bodyPartAdjectives")


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
  res.char = true
  res.properNoun = true
  res.enjoysAnal = false
  res.slutty = 2
  res.exhibitionist = 2
  res.kinky = 2
  res.dirtyTalk = 2
  res.erection = 1

  res.getArousal = function() {return this.arousal}
  res.arousal = 10; // changes dynamically, 0 - 100
  res.reputation = 0  // getting a reputation is BAD, as other characters will dislike you
  //res.responses = erotica.defaultResponses
  res.responseNotWhileTiedUp = "'Not while I'm tied up.'"
  res.insult = function(target) { return target.hasBodyPart("cock") ? "jerk" : "bitch" }
  res.restraintSituation = function()  { return this.restraint.situation }
  
  res.endTurn = function(turn) {
    if (this.npc) {
      if (this.dead) return
      this.sayTakeTurn()
      if (this.pausereactions) {
        this.pausereactions = false
      }
      else {
        this.doReactions()
      }
      if (!this.paused && !this.suspended && this.agenda && this.agenda.length > 0) this.doAgenda()
    }
    this.doEvent(turn)
    if (this.isHere()) this.updateArousal();
  }
  
  
  // This does take time. If you have a handful of NPCs it should not be bad. 
  // I tried with 200, so all 200 had to be checked against the other 199
  // It took 70 seconds. Therefore eac h NPC is limited to just three.
  // No guarantee about what 3
  res.updateArousal = function() {
    const l = this.othersHere()
    let total = 0
    if (this.report) console.log("Arousal for " + this.name)
    if (this.report) console.log("Was: " + this.arousal)
    for (let i = 0; i < l.length && i < 3; i++) {
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
      if (o.char && o !== this && o.loc === this.loc) l.push(o)
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
    if (this.posture === posture.desc && this.postureFurniture === undefined) return failedmsg(lang.already, {item:this})
    if (!this.testPosture()) return world.FAILED
    if (!forced && !this.getAgreement("Posture", posture.cmd)) return world.FAILED;
    if (this.postureFurniture) {
      this.msg(stop_posture(this), {char:this});  // stop_posture handles details
    }  
    this.msg(posture.getAssumePostureDescription(this, this.posture), {char:this});
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
  
  
// Use for NPCs to get a dictionary of arrays, the key is the substance, the array the bodypart
  
  res.findGroupedSubstances = function() {
    if (!this.substanceMess) this.substanceMess = []
    if (!this.cumMess) this.cumMess = []
    const list = {}
    for (const el of this.substanceMess) {
      const ary = el.split('_')
      if (!list[ary[0]]) list[ary[0]] = []        
      list[ary[0]].push(ary[1])
    }
    for (const el of this.cumMess) {
      const ary = el.split('_')
      const char = w[ary[0]]
      const subst = lang.getName(char, {article:DEFINITE, possessive:true}) + " cum"
      if (!list[subst]) list[subst] = []
      list[subst].push(ary[1])
    }
    return list
  }
  res.erectionShortDescs = ['flacid', 'semi-erect', 'erect', 'hard', 'very hard', 'dripping pre-cum']
  res.examine = function(objects) {
    let s = "{description} {pv:item:be:true} wearing {attire:mod}"
    s += this.getPostureDescription(true) + '.'
    const dict = this.findGroupedSubstances()
    const sl = []
    for (let key in dict) {
      sl.push(key + " on {pa:item} " + formatList(dict[key], {lastSep:lang.list_and}))
    }
    if (sl.length > 0) s +=  " {pv:item:have:true} " + formatList(sl, {sep:";", lastSep:lang.list_and}) + "."
    if (this.examineAddendum) s += this.examineAddendum + ' '
    if (this.hasCock) {
      if (!this.getOuterWearable('groin')) s += ' {pa:item:true} cock is ' + this.erectionShortDescs[this.erection] + '.'
    }
    msg(s, {item:this})
  }
  
  res.getPostureDescription = function(includePreamble) {
    if (!this.posture || (this.posture === "standing" && !this.restraint)) return ''

    const pos = this.posture.replace("#", this.pronouns.possAdj)
    let s
    if (this.restraint) {
      s = w[this.restraint].situation
    }
    else if (this.postureFurniture) {
      s = pos + " " + this.postureAdverb + " " + lang.getName(w[this.postureFurniture], {article:DEFINITE})
    }
    else if (this.postureAddFloor) {
      s = pos + " on the " + (w[this.loc].postureSurface || "floor")
    }
    else {
      s = pos
    }
    return includePreamble ? ', and {cj:item:be} '  + s : s
    
  }

  res.getStatusDesc = function() {
    if (this.restraint) return w[this.restraint].situation
    if (!this.posture || this.posture === "standing") return false
    if (!this.postureFurniture) return this.posture
    return this.posture + " " + this.postureAdverb + " " + lang.getName(w[this.postureFurniture], {article:DEFINITE})
  }
  
  
  
  
  
  
  // --------------  BODY PARTS ---------------------------
  
  // You can override this to have an erotic char have, for example, both a cock and tits
  // or to have novel body parts, such as a tail
  // Unit tested
  res.hasBodyPart = function(bp_name) {
    if (typeof bp_name !== "string") bp_name = bp_name.name;
    if (bp_name === "cock") return this.hasCock;
    if (bp_name === "bollock") return this.hasCock;
    if (bp_name === "cleavage") return this.hasTits;
    if (bp_name === "pussy") return this.hasPussy;
    if (bp_name === "tit") return this.hasTits;
    if (bp_name === "tits") return this.hasTits;
    let bp = findBodyPart(bp_name)
    if (!bp) bp = findBodyPartBySlot(bp_name)
    if (!bp) return errormsg("Failed to find a body part called " + bp_name)
    if (bp.notStd) return false;
    return true;
  }
  
  res.isBodyPartBare = function(bp_name) {
    let bp
    if (typeof bp_name === "string") {
      bp = findBodyPart(bp_name)
      if (!bp) bp = findBodyPartBySlot(bp_name)
      if (!bp) return errormsg("isBodyPartBare has unknown bodypart: " + bp)
    }
    else {
      bp = bp_name
    }
    return (this.getOuterWearable(bp.getSlot()) === false)
  }
  
  res.describeBodyPart = function(bp) {
    if (bp.name === 'cock' && !this.isBodyPartBare('cock')) return 'You wonder what ' + this.pronouns.possAdj + ' cock looks like under ' + this.pronouns.possAdj + ' clothes.'
    if (bp.name === 'bollock' && !this.isBodyPartBare('bollock')) return 'You wonder what ' + this.pronouns.possAdj + ' balls looks like under ' + this.pronouns.possAdj + ' clothes.'
    if (bp.name === 'pussy' && !this.isBodyPartBare('pussy')) return 'You wonder what ' + this.pronouns.possAdj + ' pussy looks like under ' + this.pronouns.possAdj + ' clothes.'
    if (bp.name === 'face' && !this.isBodyPartBare('face')) return 'You wonder what ' + this.pronouns.possAdj + ' face looks like.'

    if (typeof this.bodyPartDescs[bp.name] === 'string') {
      return this.bodyPartDescs[bp.name]
    }
    if (typeof this.bodyPartDescs[bp.name] === 'function') {
      return this.bodyPartDescs[bp.name](this)
    }

    if (bp.paired) return "{pv:item:have:true} " + this.getBodyPartAdjective(bp.name) + " " + bp.pluralAlias + "."
    return "{pv:item:have:true} a " + this.getBodyPartAdjective(bp.name) + " " + bp.name + "."
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
    const list = []
    for (const bp of bodyParts) {
      if (this.hasBodyPart(bp)) {
        list.push(bp);
      }
    }
    return list;
  }  
  // You can override this as desired.
  res.getDefaultBodyPartAdjective = function() {
    return this.hasCock ? "muscled" : "smooth";
  }
  // You can override this to have an erotic char have a fetish for a body part
  // Have it return a number for a recognised body part, or false for anything else
  res.getIntimateRating = function(bp_name) {
    return false;
  }
  
  
  
  
  
  
  // --------------  CLOTHING ---------------------------
  
  // ignore footwear
  
  res.typeData = [
    { name:'dress', pos:'both', },
    { name:'shirt',  pos:'top', },
    { name:'teeshirt', pos:'top', },
    { name:'vesttop', pos:'top', },
    { name:'halter', pos:'top', },
    { name:'jacket', pos:'top', },
    { name:'underwear', pos:'bottom', },
    { name:'pants', pos:'bottom', },
    { name:'shorts', pos:'bottom', },
    { name:'skirt', pos:'bottom', },
  ]
  
  // gives a quick one ort two word description of the character's attire (igores footwear)
  // naked
  //
  // Swimwear only:
  // swimsuit
  // sling bikini
  // swimwear topless
  // bikini
  // 
  // Others are determined by what is on the top and bottom, with the bottom first
  // (note no bottomless)
  // bottom: dress underwear pants shorts skirt
  // top: dress jacket teeshirt shirt vesttop halter topless
  //
  // Defaults to unclassified
  //
  res.getAttireDescriptor = function() {
    const visible = this.getWearingVisible().filter(el => !el.footwear)
    if (visible.length === 0) return 'naked'
    if (visible.length === 1 && visible[0].subtype === 'swimsuit') return 'swimsuit'
    if (visible.length === 1 && visible[0].subtype === 'slingbikini') return 'sling bikini'
    if (visible.length === 1 && visible[0].garmentType === 'swimwear' && visible[0].subtype === 'underwear') return 'swimwear topless'
    if (visible.length === 2 && visible[0].garmentType === 'swimwear' && visible[1].garmentType === 'swimwear') return 'bikini'
    
    const flags = {}
    for (let el of this.typeData) flags[el.name] = false
    for (let el of visible) flags[el.subtype] = true
    
    if (flags.jacket && flags.dress) return 'jacket dress'
    if (flags.dress && flags.pants) return 'dress pants'
    if (flags.dress) return 'dress'
    
    let top = 'topless'
    let bottom = ''
    for (let el of this.typeData) {
      if (el.pos === 'top' && flags[el.name]) top = el.name
      if (el.pos === 'bottom' && flags[el.name]) bottom = el.name
    }
    if (bottom) return bottom + ' ' + top

    return 'unclassified'   
  }
  
  
  
  res.getWearableOn = function(slot) {
    const clothing = this.getWearing().filter(function(el) {
      if (typeof el.getSlots !== "function") {
        console.log("Item with worn set to true, but no getSlots function")
        console.log(el)
      }
      return el.getSlots().includes(slot)
    })
    return clothing
  }
  
  res.getOuterWearable = function(slot, considerBondage) {
    if (considerBondage && this.restraint) {
      const slots = w[this.restraint].getHides(this)
      if (slots.includes(slot)) return w[this.restraint]
    }
    const clothing = this.getWearableOn(slot)

    if (clothing.length === 0) { return false; }
    let outer = clothing[0];
    for (let i = 1; i < clothing.length; i++) {
      if (clothing[i].wear_layer > outer.wear_layer) {
        outer = clothing[i];
      }
    }
    return outer;
  }
  res.isBare = function(slot, considerBondage) {
    const clothing = this.getWearableOn(slot)
    return clothing.length === 0
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

  res.getFootwear = function() { return this.getWearing().filter(el => el.footwear) }


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
  // result varies from 0 to 25 I think
  // public rating should be from 0 (private) to 10 (very public)
  // willingToExpose is from 0 to 10, defaults to 5
  
  // If the public is:
  // 0 this will give 25 for anyone
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
    this["attraction_" + target.name] = this.getInstantAttraction(target);
  }
  
  // how attracted is the character to the appearance of the target?
  // Ranges from 10 to 0 (indifference) to -5 (horrified)
  res.getInstantAttraction = function(target) {
    const attact = target.isFemale ? this.attactedToWomen : this.attactedToMen
    return Math.floor(Math.log((target.getExposure() + 15) * (attact - 0) * target.appearance / 1 + 1) * 2 - 5);  // -5 - 10
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
    const willingThere = this.getWillingToExpose(w[currentLocation[dir].name]) - this.getExposure();

    if (willingThere >= 3) return erotica.HAPPY;
    if (willingThere > willingHere) return erotica.HAPPY;
    if (willingThere >= 0) return erotica.RELUCTANT;
    if (willingThere === willingHere) return erotica.RELUCTANT;
    return erotica.REFUSE;
  }





  // --------------  AGREEMENT ---------------------------

  res.getAgreement = function(name, options) {
    if (!name) {
      errormsg("getAgreement has no parameters");
    }
    if (["SitOn", "StandOn", "ReclineOn", "Straddle", "BendOverFurniture"].includes(name)) {
      options.posture = name.toLowerCase()
      name = "Posture"
    }
    if (this["getAgreement" + name]) {
      return this["getAgreement" + name](options)
    }
    if (this.getAgreementOther) {
      return this.getAgreementOther(name, options)
    }
    return true;
  }


  // Should be overriden for every character to give their own responses.
  // Should also bail if the character is not happy about taking orders too.
  res.getAgreementPosture = function(options) {
    return true;
  }


  // Should be overriden for every character to give their own responses.
  // Should also bail if the character is not happy about taking orders too.
  res.getAgreementInteract = function(options) {
    //console.log("* Interact: " + options.target.name + ", " + options.action.name + ", " + options.bodypart.name);
    return true;
  }



  // Should be overriden for every character to give their own responses.
  // Should also bail if the character is not happy about taking orders too.
  // Whether erotica.RELUCTANT returns true or false is up to you.
  res.getAgreementRemove = function(options) {
    if (this === player) return true;
    
    if (this.restraint && w[this.restraint].testManipulate) return failedmsg(this.responseNotWhileTiedUp)
   
    const agreement = this.getWillingToRemove(options.item);
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
  res.getAgreementRemoveOther = function(options) {
    return true;
  }

  // Should be overriden for every character to give their own responses.
  // Should also bail if the character is not happy about taking orders too.
  // Whether erotica.RELUCTANT returns true or false is up to you.
  res.getAgreementGo = function(options) {
    const agreement = this.getWillingToGo(options.exit.dir);
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
  
  res.testMove = function(ex) {
    if (this.restraint && !w[this.restraint].testMove) {
      if (this === player) return falsemsg(w[this.restraint].cannotMoveMsg(this), {char:this})
      return falsemsg(this.responseNotWhileTiedUp)
    }
    return true
  }
  res.canUseHands = function() { return !this.restraint || w[this.restraint].testManipulate }
  res.testManipulate = function(obj, verb) {
    if (!this.canUseHands()) {
      if (this !== player) return falsemsg(this.responseNotWhileTiedUp, {char:this})
      if (obj === undefined) return falsemsg(w[this.restraint].cannotManipulateMsg(this, verb), {char:this})
      return falsemsg(w[this.restraint].cannotManipulateObjMsg(this, verb), {char:this, item:obj})
    }
    return true;
  }
  res.testPosture = function(verb) {
    if (this.restraint && !w[this.restraint].testMove) {
      if (verb  !== undefined) {
        if (this === player) return falsemsg(w[this.restraint].cannotPostureMsg(this, verb))
        return falsemsg(this.responseNotWhileTiedUp)
      }
    }
    return true;
  }
  res.testTalk = function() {
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
  npc.msg(g.msgRemove, {item:g, char:npc});
  g.worn = false
  g.loc = npc.loc
  return true;
}

// Remove one item per turn until naked
agenda.strip = function(npc, arr) {
  const g = npc.firstToRemove()
  if (!g.wearable || g.loc !== npc.name) console.log(arr)
  npc.msg(g.msgRemove, {item:g, char:npc});
  g.worn = false
  g.loc = npc.loc
  return npc.isNaked();
}

// Remove one item per turn until the next item is the one specified (which is not taken off)
agenda.stripTo = function(npc, arr) {
  const g = npc.firstToRemove()
  if (!g.wearable || g.loc !== npc.name) console.log(arr)
  npc.msg(g.msgRemove, {item:g, char:npc});
  g.worn = false
  g.loc = npc.loc
  return npc.firstToRemove().name === arr[0];
}

// Remove one item per turn until wearing specified number (which is not taken off)
agenda.stripToN = function(npc, arr) {
  const g = npc.firstToRemove()
  if (!g.wearable || g.loc !== npc.name) console.log(arr)
  npc.msg(g.specialmsgRemove ? g.specialmsgRemove(npc) : g.msgRemove, {item:g, char:npc})
  g.worn = false
  g.loc = npc.loc
  return npc.getWearing().length === parseInt(arr[0])
}

// Wear one item.
// It does not check what else is worn
agenda.wearGarment = function(npc, arr) {
  const g = w[arr[0]]
  if (!g.wearable) console.log(arr)
  npc.msg(g.specialmsgWear ? g.specialmsgWear(npc) : g.msgWear, {item:g, char:npc})
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
  npc.msg(g.specialmsgWear ? g.specialmsgWear(npc) : g.msgWear, {item:g, char:npc})
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