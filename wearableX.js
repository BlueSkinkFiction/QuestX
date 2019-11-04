"use strict";


// GENERAL TEMPATES

const WEARABLE_X = function (layer, slots) {
  const res = Object.assign(WEARABLE(layer, slots), MADE_OF(materials.cloth))
  
  if (res.getVerbs === undefined) console.log(res)
  
  res.getBaseVerbs = res.getVerbs
  
  res.getVerbs = function() {
    return this.getBaseVerbs()
  }
  
  res.examine = function() {
    msg(this.exam + (this.coveredInCum ? " " + pronounVerb(this, "be", true) + " covered in cum." : ""))
    return true
  }
  
  res.byname = function(options) {
    if (!options) options = {};
    let s = "";
    if (options.article === DEFINITE) {
      s = addDefiniteArticle(this);
    }
    if (options.article === INDEFINITE) {
      if (this.owner && this.owner !== this.loc) {
        s = this.owner + "'s ";
      }
      else {
        s = addIndefiniteArticle(this);
      }
    }
    s += this.alias;
    if (options && options.possessive) s += "'s";
    if (this.worn && options.modified && (this.isAtLoc(game.player.name))) { s += " (worn)"; }
    if (options && options.capital) s = sentenceCase(s);
    return s;
  };
  

  // Assumes the item is already held  
  res.remove = function(isMultiple, char) {
    if (!this.canWearRemove(char, false)) { return false; }
    if (!char.canManipulate(this, "remove")) { return false; }
    msg(prefix(this, isMultiple) + this.removeMsg(char, this), {garment:this, actor:char});
    this.worn = false;
    if (this.afterRemove) this.afterRemove(char);
    char.arousalBomb(char.getExposure() / 3)
    return true;
  };
  
  res.getPrice = function() {
    if (this.price > 0) return price;
    if (this.garmentType === "swimwear") return /swimsuit/.test(this.name) ? 3500 - 1 : 2500 - 1
    if (this.garmentType === "showwear") return 3000 - 2
    if (/leather/.test(this.name)) return 1000 + 700 * this.slots.length - 3
    if (/dress/.test(this.name)) return 3000 + 200 * this.name.length - 4
    if (this.wear_layer === 2) return 1000 - 5
    if (this.footwear) {
      console.log(this)
      return 1000 + 1500 * this.slots.length - 6
    }
    return 1000 + 100 * this.name.length - 7
  }
  
  res.pickupMsg = "'What are you doing with my {nm:garment}?' {nm:char:the} asks."
  
  return res
}


const WEARABLE_THAT_PULLS_DOWN = function (layer, slots) {
  const res = WEARABLE_X(layer, slots)

  res.pulledDown = false
  res.getSlots = function() { return this.pulledDown ? [] : this.slots; };
  res.breakEnsemble = function() { return this.pulledDown };
  res.getBaseVerbs = function() {
    if (!this.isAtLoc(game.player.name)) {
      return [VERBS.examine, VERBS.take];
    }
    else if (this.getWorn()) {
      if (this.getWearRemoveBlocker(game.player, false)) {
        return [VERBS.examine];
      }
      else if (this.pulledDown) {
        return [VERBS.examine, VERBS.remove, "Pull up"];
      }
      else {
        return [VERBS.examine, VERBS.remove, "Pull down"];
      }
    }
    else {
      if (this.getWearRemoveBlocker(game.player, true)) {
        return [VERBS.examine, VERBS.drop];
      }
      else {
        return [VERBS.examine, VERBS.drop, VERBS.wear];
      }
    }
  };
  res.byname = function(options) {
    if (!options) options = {};
    let s = "";
    if (options.article === DEFINITE) {
      s = addDefiniteArticle(this);
    }
    if (options.article === INDEFINITE) {
      s = addIndefiniteArticle(this);
    }
    s += this.alias;
    if (options && options.possessive) s += "'s";
    if (this.worn && options.modified && (this.isAtLoc(game.player.name))) {
      s += this.pulledDown ? " (around " + game.player.pronouns.poss_adj + " ankles)" : " (worn)"; 
    }
    if (this.worn && options.npc) {
      s += this.pulledDown ? " around " + w[this.loc].pronouns.poss_adj + " ankles" : ""; 
    }
    if (options && options.capital) s = sentenceCase(s);
    return s;
  }
  res.pullDown = function(char) {
    if (this.pulledDown) {
      failedmsg(pronounVerb(this, "be", true) + " already.")
      return FAILED
    }
    
    this.pulledDown = true
    char.msg("{nv:actor:pull:true} down {pa:actor} {nm:garment}.", {garment:this, actor:char})
    return SUCCESS
  }
  res.pullUp = function(char) {
    if (!this.pulledDown) {
      failedmsg("That does not need pulling up.")
      return FAILED
    }
    
    delete this.pulledDown
    char.msg("{nv:actor:pull:true} up {pa:actor} {nm:garment}.", {garment:this, actor:char})
    return SUCCESS
  }

  return res
}


const WEARABLE_THAT_PULLS_UP = function (layer, slots, toDest) {
  const res = WEARABLE_X(layer, slots)

  res.pulledUp = false
  res.getSlots = function() { return this.pulledUp ? [] : this.slots; };
  res.breakEnsemble = function() { return this.pulledUp };
  res.toDest = toDest
  res.getBaseVerbs = function() {
    if (!this.isAtLoc(game.player.name)) {
      return [VERBS.examine, VERBS.take];
    }
    else if (this.getWorn()) {
      if (this.getWearRemoveBlocker(game.player, false)) {
        return [VERBS.examine];
      }
      else if (this.pulledUp) {
        return [VERBS.examine, VERBS.remove, "Pull down"];
      }
      else {
        return [VERBS.examine, VERBS.remove, "Pull up"];
      }
    }
    else {
      if (this.getWearRemoveBlocker(game.player, true)) {
        return [VERBS.examine, VERBS.drop];
      }
      else {
        return [VERBS.examine, VERBS.drop, VERBS.wear];
      }
    }
  };
  res.byname = function(options) {
    if (!options) options = {};
    let s = "";
    if (options.article === DEFINITE) {
      s = addDefiniteArticle(this);
    }
    if (options.article === INDEFINITE) {
      s = addIndefiniteArticle(this);
    }
    s += this.alias;
    if (options && options.possessive) s += "'s";
    if (this.worn && options.modified && (this.isAtLoc(game.player.name))) {
      s += this.pulledUp ? " (around " + game.player.pronouns.poss_adj + " " + this.toDest + ")" : " (worn)"; 
    }
    if (this.worn && options.npc) {
      s += this.pulledUp ? " pulled up around " + w[this.loc].pronouns.poss_adj + " " + this.toDest : ""; 
    }
    if (options && options.capital) s = sentenceCase(s);
    return s;
  }
  res.pullUp = function(char) {
    if (this.pulledUp) {
      failedmsg(pronounVerb(this, "be", true) + " already.")
      return FAILED
    }
    
    this.pulledUp = true
    char.msg("{nv:actor:pull:true} up {pa:actor} {nm:garment}.", {garment:this, actor:char})
    return SUCCESS
  }
  res.pullDown = function(char) {
    if (!this.pulledUp) {
      failedmsg("That does not need pulling up.")
      return FAILED
    }
    
    delete this.pulledUp
    char.msg("{nv:actor:pull:true} down {pa:actor} {nm:garment}.", {garment:this, actor:char})
    return SUCCESS
  }

  return res
}


const WEARABLE_THAT_UNFASTENS = function (layer, slots, slots2) {
  const res = WEARABLE_X(layer, slots)

  res.slots2 = slots2
  res.unfastened = false
  res.getSlots = function() { return this.unfastened ? this.slots2 : this.slots; };
  res.breakEnsemble = function() { return this.unfastened };
  res.ripOff = erotica.ripOffButtoned
  res.pullsoff = "jacket"
  res.getBaseVerbs = function() {
    if (!this.isAtLoc(game.player.name)) {
      return [VERBS.examine, VERBS.take];
    }
    else if (this.getWorn()) {
      if (this.getWearRemoveBlocker(game.player, false)) {
        return [VERBS.examine];
      }
      else if (this.unfastened) {
        return [VERBS.examine, VERBS.remove, "Fasten"];
      }
      else {
        return [VERBS.examine, VERBS.remove, "Unfasten"];
      }
    }
    else {
      if (this.getWearRemoveBlocker(game.player, true)) {
        return [VERBS.examine, VERBS.drop];
      }
      else {
        return [VERBS.examine, VERBS.drop, VERBS.wear];
      }
    }
  };
  res.byname = function(options) {
    if (!options) options = {};
    let s = "";
    if (options.article === DEFINITE) {
      s = addDefiniteArticle(this);
    }
    if (options.article === INDEFINITE) {
      s = addIndefiniteArticle(this);
    }
    if (this.worn && options.npc) {
      s += this.unfastened ? "unfastened " : ""; 
    }
    s += this.alias;
    if (options && options.possessive) s += "'s";
    if (this.worn && options.modified && (this.isAtLoc(game.player.name))) {
      s += this.unfastened ? " (worn unfastened)" : " (worn)"; 
    }
    if (options && options.capital) s = sentenceCase(s);
    return s;
  }
  res.unfasten = function(char) {
    if (this.unfastened) {
      failedmsg(pronounVerb(this, "be", true) + " already.")
      return FAILED
    }
    
    this.unfastened = true
    char.msg("{nv:actor:unfasten:true} {pa:actor} {nm:garment}.", {garment:this, actor:char})
    return SUCCESS
  }
  res.fasten = function(char) {
    if (!this.unfastened) {
      failedmsg("That does not need pulling up.")
      return FAILED
    }
    
    delete this.unfastened
    char.msg("{nv:actor:fasten:true} {pa:actor} {nm:garment}.", {garment:this, actor:char})
    return SUCCESS
  }

  return res
}


// CASUAL

const TEE_SHIRT = function(lowCut) {
  const slots = ["chest", "nipple", "midriff", "upperback", "lowerback", "shoulder"];
  if (!lowCut) slots.push("cleavage");
  const res = WEARABLE_THAT_PULLS_UP(4, slots, "neck");
  res.pullsoff = "up";
  res.strength = 1
  res.garmentType = "casual"
  res.wearMsg = function(char) {
    return "{nv:actor:pull:true} the tee-shirt over {pa:actor} head, and down over {pa:actor} torso.";
  }
  res.removeMsg = function(char) {
    return "{nv:actor:pull:true} the tee-shirt up and over {pa:actor} head.";
  }
  res.ripOff = erotica.ripOffTeeShirt
  res.stripper = function(char) {
    this.loc = char.loc
    this.worn = false
    const inner = char.getOuterWearable("chest");
    if (!inner) {
      if (game.player.hasHugeBoobs) {
        char.msg("{nv:actor:pull:true} her {nm:garment} over her head, making her massive gazongas bounce. The men cheer to see them swinging free and bare.", {garment:this, actor:char});
      }
      else {
        char.msg("{nv:actor:pull:true} her {nm:garment} over her head. The men cheer at the sight of her tits exposed for their delight.");
      }
    }
    else {
      if (game.player.hasHugeBoobs) {
        char.msg("{nv:actor:pull:true} her {nm:garment} over her head, her massive gazongas, barely held by her {nm:inner}, bouncing up and down to the delight of the men watching.", {garment:this, actor:char, inner:inner});
      }
      else {
        char.msg("{nv:actor:pull:true} her {nm:garment} over her head. The men cheer, now her tits are only cover by a {nm:inner}.", {garment:this, actor:char, inner:inner});
      }
    }
  }
  return res;
};


const VEST_TOP = function(cropped) {
  const slots = ["chest", "nipple", "midriff", "upperback"];
  if (!cropped) slots.push("midriff", "lowerback");
  const res = WEARABLE_THAT_PULLS_UP(4, slots, "neck");
  res.pullsoff = "up";
  res.strength = 1
  res.garmentType = "casual"
  res.wearMsg = function(char) {
    return "{nv:actor:pull:true} the tee-shirt over {pa:actor} head, and down over {pa:actor} torso.";
  }
  res.removeMsg = function(char) {
    return "{nv:actor:pull:true} the tee-shirt up and over {pa:actor} head.";
  }
  res.ripOff = erotica.ripOffTeeShirt
  res.stripper = function(char) {
    this.loc = char.loc
    this.worn = false
    const inner = char.getOuterWearable("chest");
    if (!inner) {
      if (game.player.hasHugeBoobs) {
        char.msg("{nv:actor:pull:true} her {nm:garment} over her head, making her massive gazongas bounce. The men cheer to see them swinging free and bare.", {garment:this, actor:char});
      }
      else {
        char.msg("{nv:actor:pull:true} her {nm:garment} over her head. The men cheer at the sight of her tits.", {garment:this, actor:char});
      }
    }
    else {
      if (game.player.hasHugeBoobs) {
        char.msg("{nv:actor:pull:true} her {nm:garment} over her head, her massive gazongas, barely held by her {nm:inner}, bouncing up and down to the delight of the men watching.", {garment:this, actor:char, inner:inner});
      }
      else {
        char.msg("{nv:actor:pull:true} her {nm:garment} over her head. The men cheer, now her tits are only cover by a {nm:inner}.", {garment:this, actor:char, inner:inner});
      }
    }
  }
  return res;
};


const SHORTS = function(long) {
  const slots = ["crotch", "groin", "buttock", "hip"];
  if (long) slots.push("thigh");
  const res = WEARABLE_THAT_PULLS_DOWN(4, slots);
  res.pronouns = PRONOUNS.plural
  res.pullsoff = "down";
  res.strength = 1
  res.garmentType = "casual"
  res.wearMsg = function(char) {
    return "{nv:actor:pull:true} the denim shorts up {pa:actor} long, smooth legs, pulling up the zip and fastening the button.";
  }
  res.removeMsg = function(char) {
    if (this.pulledDown) return "{nv:actor:step:true} out of {nm:garment:the} around {pa:actor} ankles.";
    return "{nv:actor:unfasten:true} the button on {pa:actor} denim shorts, and pulls down the zip. After a bit of a wriggle, they slid down {pa:actor} smooth legs, and {pv:actor:step} out of them.";
  }
  res.ripOff = erotica.ripOffPants
  return res;
};


// SMART

const BUTTONED_SHIRT = function(cropped) {
  const slots = ["chest", "nipple", "midriff", "upperback", "shoulder", "arm"];
  if (!cropped) slots.push("midriff", "lowerback");
  const slots2 = ["upperback", "shoulder", "arm"];
  if (!cropped) slots2.push("lowerback");
  const res = WEARABLE_THAT_UNFASTENS(4, slots, slots2);
  res.fastened = false
  res.strength = 1
  res.garmentType = "smart"
  res.wearMsg = function(char) {
    return "{nv:actor:pull:true} on the shirt and fastens the buttons.";
  }
  res.removeMsg = function(char) {
    return "{nv:actor:unfasten:true} the buttons on {pa:actor} shirt, and shrugs it off.";
  }
  return res;
};


const JACKET = function(slotCount) {
  const jacketSlots = [
    ["chest", "nipple", "midriff", "upperback", "shoulder", "arm"],
    ["chest", "nipple", "midriff", "upperback", "shoulder", "arm", "midriff", "lowerback"],
    ["chest", "nipple", "midriff", "upperback", "shoulder", "arm", "midriff", "lowerback", "hip", "buttock", "groin"],
    ["chest", "nipple", "midriff", "upperback", "shoulder", "arm", "midriff", "lowerback", "hip", "buttock", "groin", "thigh"],
  ];
  const jacketSlots2 = [
    ["upperback", "shoulder", "arm"],
    ["upperback", "shoulder", "arm", "midriff", "lowerback"],
    ["upperback", "shoulder", "arm", "midriff", "lowerback", "hip", "buttock"],
    ["upperback", "shoulder", "arm", "midriff", "lowerback", "hip", "buttock", "thigh"],
  ];
  const res = WEARABLE_THAT_UNFASTENS(8, jacketSlots[slotCount], jacketSlots2[slotCount]);
  res.strength = 4
  res.garmentType = "smart"
  res.wearMsg = function(char) {
    return "{nv:actor:pull:true} on {nm:garment:the} and fastens the buttons.";
  }
  res.removeMsg = function(char) {
    return "{nv:actor:unfasten:true} the buttons on {nm:garment:the} shirt, and shrugs it off.";
  }
  return res;
};


const SKIRT = function(slotCount) {
  const skirtSlots = [
    ["groin", "buttock", "hip"],
    ["groin", "buttock", "hip", "thigh"],
    ["groin", "buttock", "hip", "thigh", "knee"],
    ["groin", "buttock", "hip", "thigh", "knee", "calf"],
  ];
  const res = WEARABLE_THAT_PULLS_UP(5, skirtSlots[slotCount], "waist");
  res.pullsoff = "skirt"
  res.strength = 1
  res.garmentType = "smart"
  res.wearMsg = function(char) {
    if (this.wrapSkirt) {
      return "{nv:actor:wrap:true} the skirt round {pa:actor} waist, and fastens it at {pa:actor} right hip.";
    }
    else {
      return "{nv:actor:pull:true} the skirt up round {pa:actor} waist, and fastens it at the back.";
    }
  }
  res.removeMsg = function(char) {
    return "{nv:actor:unfasten:true} {pa:actor} skirt, and takes it off.";
  }
  res.ripOff = erotica.ripOffPants
  res.stripper = function(char) {
    this.loc = char.loc
    this.worn = false
    const inner = char.getOuterWearable("groin");
    if (!inner) {
      char.msg("{nv:actor:unfasten:true} her {nm:garment}, and, after a moment's hesitation, takes it off. The men cheer when they saw she is wearing nothing under it, staring lustily at her exposed pussy.", {garment:this, actor:char});
    }
    else {
      char.msg("{nv:actor:unfasten:true} her {nm:garment} and takes it off. The men cheer, now her sex is covered only by {nm:inner:a}.", {garment:this, actor:char, inner:inner});
    }
  }
  return res;
};


const PANTS = function() {
  const res = WEARABLE_THAT_PULLS_DOWN(4, ["crotch", "groin", "buttock", "hip", "thigh", "knee", "calf"]);
  res.pullsoff = "down";
  res.strength = 1
  res.garmentType = "smart"
  res.pronouns = PRONOUNS.plural;
  res.wearMsg = function(char) {
    return "{nv:actor:pull:true} the denim shorts up {pa:actor} long, smooth legs, pulling up the zip and fastening the button.";
  }
  res.removeMsg = function(char) {
    if (this.pulledDown) return "{nv:actor:step:true} out of {nm:garment:the} around {pa:actor} ankles.";
    return "{nv:actor:unfasten:true} the button on {pa:actor} denim shorts, and pulls down the zip. After a bit of a wriggle, they slid down {pa:actor} smooth legs, and {pv:actor:step} out of them.";
  }
  res.ripOff = erotica.ripOffPants


  return res;
};


const DRESS = function(slots, overHead) {
  const res = WEARABLE_THAT_PULLS_UP(5, slots, "waist");
  res.slotsUpper = slots.filter(function(el) { return !["thigh", "crotch", "buttock", "groin", "knee", "calf"].includes(el)} )
  res.getSlots = function() { return this.pulledUp ? this.slotsUpper : this.slots; };
  res.overHead = overHead
  res.pullsoff = "dress";
  res.garmentType = "smart"
  res.strength = 1
  res.wearMsg = function(char) {
    if (this.overHead) {
      return "{nv:actor:pull:true} the dress over {pa:actor} head, and down {pa:actor} torso, before fastening it at the back, and then straightening it out.";
    }
    else if (this.strapless) {
      return "{nv:actor:step:true} into the dress, pulling it over {pa:actor} torso, adjusting it over {pa:actor} chest, before fastening it at the back.";
    }
    else {
      return "{nv:actor:step:true} into the dress, pulling it over {pa:actor} torso, the straps over {pa:actor} shoulders, before fastening it at the back.";
    }
  }
  res.removeMsg = function(char) {
    if (this.overHead) {
      return "{nv:actor:unfasten:true} {pa:actor} dress, then pulls it up, over {pa:actor} head."
    }
    else if (this.strapless) {
      return "{nv:actor:unfasten:true} {pa:actor} dress, letting it fall away from {pa:actor} chest, before wriggling out of it, and letting it drop to the floor. {nv:actor:step:true} out of it.";
    }
    else {
      return "{nv:actor:unfasten:true} {pa:actor} dress, then pulls the straps off {pa:actor} shoulders before it drops to the floor. {nv:actor:step:true} out of it.";
    }
  }
  res.stripper = function(char) {
    this.worn = false
    this.loc = char.loc
    const chest = char.getOuterWearable("chest");
    const groin = char.getOuterWearable("groin");
    if (!chest && !groin) {
      char.msg("Slowly {nv:actor:unfasten} the dress, conscious {nv:actor:have} no underwear on. {nv:actor:pull:true} it off, her body bare, her sex exposed; the men cheer and whistle.", {garment:this, actor:char});
    }
    else if (!chest) {
      char.msg("Slowly {nv:actor:unfasten} the dress, glad {nv:actor:be} at least wearing {nm:groin:a}. She pulls the dress off, her body almost bare, her {tits:char} exposed. The men cheer and whistle at her.", {garment:this, actor:char, groin:groin});
    }
    else if (!groin) {
      char.msg("Slowly {nv:actor:unfasten} the dress, conscious she had no panties on. She pulls it off, her body bare, apart from her " + chest.byname() + ", her sex exposed; the men cheer and whistle.", {garment:this, actor:char});
    }
    else {
      char.msg("{nv:actor:unfasten:true} the dress, glad {nv:actor:be} wearing underwear on. She pulls it off, her body bare, her sex exposed; the men cheer and whistle.", {garment:this, actor:char});
    }
  }
  res.ripOff = erotica.ripOffDress

  return res;
};


const JUMPSUIT = function(cleavageHidden) {
  const slots = ["chest", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "crotch", "thigh", "knee", "calf", "shoulder", "arm"]
  if (cleavageHidden) slots.push("cleavage")
  const res = WEARABLE(4, slots)
  //res.getSlots = function() { return this.pulledUp ? this.slotsUpper : this.slots; };
  res.fastenVerb = "zip"
  res.garmentType = "smart"
  res.wearMsg = function(char) {
    return "{nv:actor:step:true} into {nm:garment:the}, pulling it up {pa:actor} legs and over her hips. She puts her arms into the sleeves, pulling it un to her shoulders, then {cj:actor:" + this.fastenVerb + "} it up at the front."
  }
  res.removeMsg = function(char) {
    const s1 = erotica.exposeChest(p.target)
    const s2 = erotica.exposeGroin(p.target)
    return "{nv:actor:un" + this.fastenVerb + ":true} {pa:actor} {nm:garment}, then pulls it off her shoulders" + s1 + ", and down her arms. She wriggles it over her hips, and it falls to her ankles" + s2 + ". She steps out if it."
  }
  res.stripper = function(char) {
    this.worn = false
    this.loc = char.loc
    const chest = char.getOuterWearable("chest");
    const groin = char.getOuterWearable("groin");
    if (!chest && !groin) {
      char.msg("Slowly {nv:actor:un" + this.fastenVerb + "} {nm:garment:the}, conscious {nv:actor:have} no underwear on. {nv:actor:pull:true} it off, her body bare, her sex exposed; the men cheer and whistle.", {garment:this, actor:char});
    }
    else if (!chest) {
      char.msg("Slowly {nv:actor:un" + this.fastenVerb + "} {nm:garment:the}, glad {nv:actor:be} at least wearing {nm:groin:a}. She pulls it off, her body almost bare, her {tits:char} exposed. The men cheer and whistle at her.", {garment:this, actor:char, groin:groin});
    }
    else if (!groin) {
      char.msg("Slowly {nv:actor:un" + this.fastenVerb + "} {nm:garment:the}, conscious she had no panties on. She pulls it off, her body bare, apart from her " + chest.byname() + ", her sex exposed; the men cheer and whistle.", {garment:this, actor:char});
    }
    else {
      char.msg("{nv:actor:un" + this.fastenVerb + ":true} {nm:garment:the}, glad {nv:actor:be} wearing underwear on. She pulls it off, her body bare, her sex exposed; the men cheer and whistle.", {garment:this, actor:char});
    }
  }
  res.ripOff = erotica.ripOffDress

  return res;
};


// UNDERWEAR

const THONG = function() {
  const res = WEARABLE_THAT_PULLS_DOWN(2, ["crotch", "groin"]);
  res.pullsoff = "down";
  res.strength = 1
  res.wearMsg = function(char) {
    return "{nv:actor:pull:true} the tiny thong up {pa:actor} legs and over {pa:actor} hips.";
  }
  res.removeMsg = function(char) {
    if (this.pulledDown) return "{nv:actor:step:true} out of {nm:garment:the} around {pa:actor} ankles.";
    return "{nv:actor:pull:true} down {pa:actor} thong, and steps out of it.";
  }
  res.wearMsg = function(char) {
    if (char.hasBodyPart("cock")) {
      if (char.getArousal() > 60) {
         return "{nv:actor:pull:true} the thong up {pa:actor} legs and over {pa:actor} hips, struggling to tuck {pa:actor} erect cock inside as best {pv:actor:can}.";
      }
      else if (char.hasHugeCock) {
         return "{nv:actor:pull:true} the thong up {pa:actor} legs and over {pa:actor} hips, struggling to tuck {pa:actor} huge cock inside as best {pv:actor:can}.";
      }
      else if (char.getArousal() <20) {
         return "{nv:actor:pull:true} the thong up {pa:actor} legs and over {pa:actor} hips, easily covering {pa:actor} limp manhood, despite being so small...";
      }
      else {
         return "{nv:actor:pull:true} the thong up {pa:actor} legs and over {pa:actor} hips, barely covering {pa:actor} manhood.";
      }
    }
    else {
       return "{nv:actor:pull:true} the tiny thong up {pa:actor} legs and over {pa:actor} hips.";
    }
  }
  res.removeMsg = function(char) {
    return "{nv:actor:pull:true} down {pa:actor} briefs, and steps out of them.";

    if (char.hasBodyPart("cock")) {
      return "{nv:actor:pull:true} down {pa:actor} thong, revealing {pa:actor} {cock:target}. They slide down {pa:actor} legs and {pv:actor:step} out of them.";
    }
    else if (char.hasBodyPart("pussy")) {
      return "{nv:actor:pull:true} down {pa:actor} thong, baring {pa:actor} pussy. They slide down {pa:actor} legs and {pv:actor:step} out of them.";
    }
    else {
       return "{nv:actor:pull:true} down {pa:actor} thong. They slide down {pa:actor} legs and {pv:actor:step} out of them.";
    }
  }
  res.ripOff = erotica.ripOffPants
  res.garmentType = "underwear";
  return res;
};


const BRA = function() {
  const res = HALTER();
  res.garmentType = "underwear";
  res.strength = 3
  res.fastenStyle = 'bra'
  return res;
};


const CORSET = function() {
  const res = HALTER();
  res.slots = ["chest", "nipple", "upperback", "midriff"]
  res.garmentType = "underwear";
  res.fastenVerb = "fasten"
  res.fastenStyle = "strapless"
  return res;
};


const PANTIES = function() {
  const res = BRIEFS();
  res.swimwear = false;
  res.garmentType = "underwear";
  res.strength = 1
  return res;
};


const BOXERS = function() {
  const res = SHORTS();
  res.swimwear = false;
  res.garmentType = "underwear";
  res.strength = 1
  return res;
};


const TIGHTS = function() {
  const res = WEARABLE_THAT_PULLS_DOWN(3, ["crotch", "groin", "buttock", "hip", "thigh", "knee", "calf", "foot"]);
  res.pullsoff = "down";
  res.pronouns = PRONOUNS.plural
  res.strength = 1
  res.garmentType = "underwear";
  res.wearMsg = function(char) {
    return "{nv:actor:pull:true} the tights up {pa:actor} long, smooth legs.";
  }
  res.removeMsg = function(char) {
    if (this.pulledDown) return "{nv:actor:step:true} out of {nm:garment:the} around {pa:actor} ankles.";
    return "{nv:actor:unfasten:true} pulls down the tights. After a bit of a wriggle, they slid down {pa:actor} smooth legs, and {pv:actor:step} out of them.";
  }
  res.ripOff = erotica.ripOffPants
  return res;
};


// SWIMWEAR

const SWIMSUIT = function(backExposure) {
  // can have strapsBroken t/f and pulledDown 0/1/2
  const slots = ["chest", "nipple", "midriff", "crotch", "groin", "buttock"];
  if (backExposure > 0) slots.push("lowerback")
  if (backExposure > 1) slots.push("upperback")
  const res = WEARABLE_X(2, slots)
  res.pullsoff = "swimsuit";
  res.strength = 2
  res.wearMsg = function(char) {
    if (this.strapsBroken) {
      this.pulledUp = 1
      return "{nv:actor:step:true} into the swimsuit, and {cj:actor:pull} it up {pa:actor} legs, then {cj:actor:look} ruefully at the broken straps; {pv:actor:shrug} and {cj:actor:leave} the swimsuit round {pa:actor} waist.";
    }
    else {
      this.pulledUp = 0
      return "{nv:actor:step:true} into the swimsuit, and {cj:actor:pull} it up {pa:actor} legs, then up, putting {pa:actor} arms through the straps, which {nv:actor:pull} up over {pa:actor} shoulders.";
    }
  };
  res.removeMsg = function(char) {
    if (this.pulledDown === 0) {
      return "{nv:actor:pull:true} the swimsuit straps off {pa:actor} shoulders, letting it fall away to {pa:actor} waist, baring {pa:actor} breasts. {pv:actor:slide:true} the swimsuit down {pa:actor} legs, exposing her pussy and {cj:actor:step} out of it.";
    }
    if (this.pulledDown === 1) {
      return "{nv:actor:pull:true} the swimsuit down {pa:actor} legs, exposing her pussy, and {cj:actor:step} out of it.";
    }
    if (this.pulledDown === 2) {
      return "{nv:actor:step:true} out of the swimsuit around {pa:actor} ankles.";
    }
  };
  res.garmentType = "swimwear";
  res.ripOff = erotica.ripOffSwimsuit


  res.pulledDown = 0
  res.getSlots = function() {
    if (this.pulledDown === 0) return this.slots
    return this.pulledDown === 1 ? ["crotch", "groin", "buttock"] : []; 
  };
  res.breakEnsemble = function() { return this.pulledDown !== 0 };
  res.getBaseVerbs = function() {
    if (!this.isAtLoc(game.player.name)) {
      return [VERBS.examine, VERBS.take];
    }
    else if (this.getWorn()) {
      if (this.getWearRemoveBlocker(game.player, false)) {
        return [VERBS.examine];
      }
      else if (this.pulledDown === 0) {
        return [VERBS.examine, VERBS.remove, "Pull down"];
      }
      else if (this.pulledDown === 1) {
        return [VERBS.examine, VERBS.remove, "Pull up", "Pull down"];
      }
      else {
        return [VERBS.examine, VERBS.remove, "Pull up"];
      }
    }
    else {
      if (this.getWearRemoveBlocker(game.player, true)) {
        return [VERBS.examine, VERBS.drop];
      }
      else {
        return [VERBS.examine, VERBS.drop, VERBS.wear];
      }
    }
  };
  res.byname = function(options) {
    if (!options) options = {};
    let s = "";
    if (options.article === DEFINITE) {
      s = addDefiniteArticle(this);
    }
    if (options.article === INDEFINITE) {
      s = addIndefiniteArticle(this);
    }
    s += this.alias;
    if (options && options.possessive) s += "'s";
    if (this.worn && options.modified && (this.isAtLoc(game.player.name))) {
      s += this.pulledDown === 2 ? " (around " + game.player.pronouns.poss_adj + " ankles)" : (this.pulledDown === 1 ? " (around " + game.player.pronouns.poss_adj + " waist)" : " (worn)"); 
    }
    else if (this.worn && options.npc) {
      s += this.pulledDown === 2 ? " around " + w[this.loc].pronouns.poss_adj + " ankles" : (this.pulledDown === 1 ? " around " + w[this.loc].pronouns.poss_adj + " waist" : ""); 
    }
    if (options && options.capital) s = sentenceCase(s);
    return s;
  };


  res.pullDown = function(char) {
    if (this.pulledDown === 2) {
      failedmsg("It's pulled up already.")
      return FAILED
    }
    
    const target = w[this.loc]
    let s
    if (this.pulledDown === 1) {
      if (char === target) {
        s = "{nv:actor:push:true} {pa:target} {nm:garment}"
      }
      else {
        s = "{nv:actor:push:true} {nm:target:the}'s {nm:garment}"
      }
      s += " down, over her hips"
      if (target.hasBodyPart("cock")) {
        s += ", exposing {pa:target} cock"
      }
      else if (target.hasBodyPart("pussy")) {
        s += ", exposing {pa:target} {pussy:target}"
      }
      s += ". It slips down {pa:actor} legs to {pa:actor} ankles."
    }
    else {
      if (char === target) {
        s = "{nv:actor:pull:true} the straps of {pa:target} {nm:garment}"
      }
      else {
        s = "{nv:actor:pull:true} the straps of {nm:target:the}'s {nm:garment}"
      }
      s += " off {pa:target} shoulders, letting it fall to {pa:target} waist"
      if (target.hasBodyPart("tit")) {
        s += ", baring {pa:target} {tits:target}"
      }
      s += "."
    }
    char.msg(s, {target:target, actor:char, garment:this})
    this.pulledDown++
    return SUCCESS
  }
  res.pullUp = function(char) {
    if (!this.pulledDown === 0) {
      failedmsg("It does not need pulling up.")
      return FAILED
    }
    
    const target = w[this.loc]
    let s
    if (this.pulledDown === 2) {
      if (char === target) {
        s = "{nv:actor:pull:true} up {pa:target} {nm:garment}"
      }
      else {
        s = "{nv:actor:pull:true} up {nm:target:the}'s {nm:garment}"
      }
      s += ", over her hips"
      if (target.hasBodyPart("cock")) {
        s += ", hiding {pa:target} {cock:target}"
      }
      else if (target.hasBodyPart("pussy")) {
        s += ", hiding {pa:target} pussy"
      }
      s += "."
      this.pulledDown--
    }
    else if (this.strapsBroken) {
      if (char === target) {
        s = "{nv:actor:look:true} at the broken the straps of {pa:target} {nm:garment}, and {cj:actor:realise} it is not going to stay up."
      }
      else {
        s = "{nv:actor:look:true} at the broken the straps of {nm:target:the}'s {nm:garment}, and {cj:actor:realise} it is not going to stay up."
      }
    }
    else {
      if (char === target) {
        s = "{nv:actor:pull:true} the straps of {pa:target} {nm:garment}"
      }
      else {
        s = "{nv:actor:pull:true} the straps of {nm:target:the}'s {nm:garment}"
      }
      s += " up, over {pa:target} shoulders"
      if (target.hasBodyPart("tit")) {
        s += ", covering {pa:target} tits"
      }
      s += "."
      this.pulledDown--
    }
    char.msg(s, {garment:this, actor:char, target:target})
    return SUCCESS
  }

  return res;
};


const SLING_BIKINI = function() {
  const res = WEARABLE_THAT_PULLS_DOWN(2, ["crotch", "groin", "nipple"])
  res.pullsoff = "swimsuit";
  res.strength = 2
  res.wearMsg = function(char) {
    return "{nv:actor:step:true} into the sling bikini, and {cj:actor:pull} it up {pa:actor} legs, and over {pa:actor} shoulders. It does not cover much at all!";
  };
  res.removeMsg = function(char) {
    if (!this.pulledDown) {
      return "{nv:actor:pull:true} the sling bikini straps off {pa:actor} shoulders, letting it fall away to {pa:actor} ankles; {pv:actor:step}  out of it.";
    }
    if (this.pulledDown === 2) {
      return "{nv:actor:step:true} out of the sling bikini around {pa:actor} ankles.";
    }
  };
  res.garmentType = "swimwear";
  res.ripOff = erotica.ripOffSlingBikini
  res.getSlots = function() {
    return this.pulledDown ? [] : this.slots; 
  };
  res.breakEnsemble = function() { return this.pulledDown };

  res.pullDown = function(char) {
    if (this.pulledDown) {
      failedmsg("It's pulled up already.")
      return FAILED
    }
    
    const target = w[this.loc]
    let s
    if (char === target) {
      s = "{nv:actor:pull:true} the straps of {pa:target} {nm:garment}"
    }
    else {
      s = "{nv:actor:pull:true} the straps of {nm:target:the}'s {nm:garment}"
    }
    s += " off {pa:target} shoulders, letting it fall to {pa:target} ankles"

    if (target.hasBodyPart("cock")) {
      s += ", exposing {pa:target} cock"
    }
    else if (target.hasBodyPart("pussy")) {
      s += ", exposing {pa:target} {pussy:target}"
    }
    if (target.hasBodyPart("tit")) {
      if (target.hasBodyPart("cock") || target.hasBodyPart("pussy")) {
        s += " and {tits:target}"
      }
      else {
        s += " exposing {pa:target} {tits:target}"
      }
    }
    s += "."
    char.msg(s, {target:target, actor:char, garment:this})
    this.pulledDown = true
    return SUCCESS
  }
  res.pullUp = function(char) {
    if (!this.pulledDown) {
      failedmsg("It does not need pulling up.")
      return FAILED
    }
    
    const target = w[this.loc]
    let s
    if (char === target) {
      s = "{nv:actor:pull:true} the straps of {pa:target} {nm:garment}"
    }
    else {
      s = "{nv:actor:pull:true} the straps of {nm:target:the}'s {nm:garment}"
    }
    s += " up, over {pa:target} shoulders"
    if (target.hasBodyPart("tit")) {
      s += ", adjusting it to properly cover {pa:target} tits as best it can"
    }
    s += "."
    this.pulledDown = false
    char.msg(s, {garment:this, actor:char, target:target})
    return SUCCESS
  }

  return res;
};


const SWIM_SHORTS = function(long) {
  const slots = ["crotch", "groin", "buttock", "hip"];
  if (long) slots.push("thigh");
  const res = WEARABLE_THAT_PULLS_DOWN(2, slots);
  res.pullsoff = "down";
  res.strength = 2
  res.wearMsg = function(char) {
    return "{nv:actor:pull:true} the denim shorts up {pa:actor} long, smooth legs, pulling up the zip and fastening the button.";
  }
  res.removeMsg = function(char) {
    if (this.pulledDown) return "{nv:actor:step:true} out of {nm:garment:the} around {pa:actor} ankles.";
    return "{nv:actor:unfasten:true} the button on {pa:actor} denim shorts, and pulls down the zip. After a bit of a wriggle, they slid down {pa:actor} smooth legs, and {pv:actor:step} out of them.";
  }
  res.garmentType = "swimwear";
  res.ripOff = erotica.ripOffPants
  return res;
};


const HALTER = function() {
  const res = WEARABLE_THAT_PULLS_UP(2, ["chest", "nipple"], "neck");
  res.pullsoff = "halter";
  res.strength = 2
  res.fastenStyle = 'halter'
  res.wearMsg = function(char) {
    if (char.hasBodyPart("tit")) {
      if (char.hasHugeBoobs) {
        return "{nv:actor:pull:true} on {nm:garment:the} over {pa:actor} huge tits, struggling to fastening it at the back, then adjusting the cups to hold {pa:actor} boobs as best they can.";
      }
      else {
        return "{nv:actor:pull:true} on {nm:garment:the}, fastening it at the back, then adjusting the cups to hold {pa:actor} boobs comfortably.";
      }
    }
    else if (char === game.player) {
      return "{nv:actor:pull:true} on {nm:garment:the}, fastening it at the back as {pv:actor:lament} lament that {pv:actor:have} have no tits to fill it out.";
    }
    else {
      return "{nv:actor:pull:true} on {nm:garment:the}, fastening it at the back.";
    }
  }
  res.removeMsg = function(char) {
    if (char.hasBodyPart("tit")) {
      if (char.hasHugeBoobs) {
        return "{nv:actor:unfasten:true} {pa:actor} {nm:garment}, pulling it off to bare {pa:actor} huge tits.";
      }
      else {
        return "{nv:actor:unfasten:true} {pa:actor} {nm:garment}, pulling it off to bare {pa:actor} tits.";
      }
    }
    else {
      return "{nv:actor:unfasten:true} {pa:actor} {nm:garment}, pulling it off to bare {pa:actor} chest.";
    }
  }
  res.stripper = function(char) {
    this.loc = char.loc
    this.worn = false
    char.msg("Slowly {nv:actor:unfasten} {nm:garment:the}. She pulls it off, her breasts bare; the men cheer and whistle.", {garment:this, actor:char});
  }
  res.ripOff = erotica.ripOffHalter
  res.garmentType = "swimwear";
  return res;
};


const BRIEFS = function() {
  const res = WEARABLE_THAT_PULLS_DOWN(2, ["crotch", "groin", "buttock"]);
  res.wearMsg = function(char) {
    if (char.hasBodyPart("cock")) {
      return "{nv:actor:pull:true} the briefs up {pa:actor} legs and over {pa:actor} hips, covering {pa:actor} {cock:target}.";
    }
    else {
      return "{nv:actor:pull:true} the briefs up {pa:actor} legs and over {pa:actor} hips.";
    }
  }
  res.removeMsg = function(char) {
    if (this.pulledDown) return "{nv:actor:step:true} out of {nm:garment:the} around {pa:actor} ankles.";

    if (char.hasBodyPart("cock")) {
      return "{nv:actor:pull:true} down {pa:actor} briefs, revealing {pa:actor} {cock:target}. They slide down {pa:actor} legs and {pv:actor:step} out of them.";
    }
    else if (char.hasBodyPart("pussy")) {
      return "{nv:actor:pull:true} down {pa:actor} briefs, baring {pa:actor} pussy. They slide down {pa:actor} legs and {pv:actor:step} out of them.";
    }
    else {
      return "{nv:actor:pull:true} down {pa:actor} briefs. They slide down {pa:actor} legs and {pv:actor:step} out of them.";
    }
  }
  res.pullsoff = "down";
  res.pronouns = PRONOUNS.plural;
  res.strength = 2
  res.garmentType = "swimwear";
  res.ripOff = erotica.ripOffPants
  

  return res;
};


const THONG_SW = function() {
  const res = THONG()
  res.garmentType = "swimwear"
  return res
}


// FOOTWEAR

const BOOTS = function(slotCount) {
  const bootSlots = [
    ["foot"],
    ["foot", "calf"],
    ["foot", "calf", "knee"],
  ];
  const res = WEARABLE_X(8, bootSlots[slotCount]);
  res.wearMsg = function(char) {
    return "{nv:actor:pull:true} on the left boot, then the right.";
  };
  res.removeMsg = function(char) {
    return "{nv:actor:pull:true} off {pa:actor} left boot, then the right.";
  };
  res.pronouns = PRONOUNS.plural
  res.defArticle = "the pair of"
  res.indefArticle = "the pair of"
  res.ripOff = erotica.ripOffFootwear
  res.garmentType = "leatherwear"
  res.footwear =  true
  return res;
};


const SHOES = function() {
  const res = WEARABLE_X(8, ["foot"]);
  res.wearMsg = function(char) {
    return "{nv:actor:put:true} on the left shoe, then the right.";
  };
  res.removeMsg = function(char) {
    return "{nv:actor:pull:true} off {pa:actor} left shoe, then the right.";
  };
  res.pronouns = PRONOUNS.plural;
  res.defArticle = "the pair of"
  res.indefArticle = "a pair of"
  res.ripOff = erotica.ripOffFootwear
  res.garmentType = "smart"
  res.footwear = true
  return res;
};


// MISC


const PASTIES = function() {
  const res = WEARABLE_X(2, "nipple");
  res.wearMsg = function(char) {
    return "{nv:actor:stick:true} one pastie on {pa:actor} left nipple, and then the other on the right. They do not leave much to the imagination.";
  };
  res.removeMsg = function(char) {
    return "{nv:actor:gasp:true} slightly as {pv:actor:pull} the pastie off {pa:actor} left nipple; then {pv:actor:do} likewise for the right.";
  };
  res.pronouns = PRONOUNS.plural;
  res.garmentType = "erotica"
  res.ripOff = function(p) {
    this.loc = p.actor.loc
    this.worn = false
    p.actor.msg("{nv:actor:gasp:true} as {pv:actor:yank} the pastie off {pa:actor} left nipple; then {pv:actor:do} likewise for the right.", p)
    p.target.arousalBomb(p.target.hasBodyPart("tit") ? 6 : 2)
    return true
  }

  res.strength = 3
  return res;
};


const COLLAR = function() {
  const res = WEARABLE_X(2, "neck");
  res.garmentType = "erotica"
  res.wearMsg = function(char) {
    return "{nv:actor:put:true} the collar round {pa:actor} neck, and fasten it.";
  };
  res.removeMsg = function(char) {
    return "{nv:actor:unfasten:true} the collar, and take it off.";
  };
  res.ripOff = function(p) {
    this.loc = p.actor.loc
    this.worn = false
    p.actor.msg("{nv:actor:untie:true} {nm:target:the}'s {nm:garment}" + s + ", and pulls it off.", p)
    return true
  }
  return res;
};


const LOIN_CLOTH = function(backToo) {
  const res = WEARABLE_X(2, backToo ? ["groin", "buttock"] : ["groin"]);
  res.garmentType = "erotica"
  res.wearMsg = function(char) {
    let s = "{nv:actor:hold:true} the loin cloth around {pa:actor} waist, and tie it at the side.";
    if (char === game.player) s += "{once: it feels like one gust of wind and evetything is on display.}"
    return s
  };
  res.removeMsg = function(char) {
    return "{nv:actor:untie:true} the loin cloth, and remove it.";
  };
  res.ripOff = function(p) {
    this.loc = p.actor.loc
    this.worn = false
    p.actor.msg("{nv:actor:unfasten:true} {nm:target:the}'s {nm:garment}" + s + ", and pulls it off.", p)
    p.target.arousalBomb(9)
    return true
  }
  return res;
};




erotica.exposeChest = function(target) {
  const g = target.getOuterWearable("chest")
  if (g) {
    return ', revealing {pa:target} ' + g.alias
  }
  else if (target.hasHugeBoobs) {
    return ', baring {pa:target} huge tits'
  }
  else if (target.hasBodyPart("tit")) {
    return ', baring {pa:target} {tits:target}'
  }
  else {
    return ', baring {pa:target} chest'
  }
}


erotica.exposeGroin = function(target) {
  const g = target.getOuterWearable("groin")
  if (g) {
    return ', revealing {pa:target} ' + g.alias
  }
  else if (target.hasBodyPart("cock")) {
    return ', baring {pa:target} {cock:target}'
  }
  else if (target.hasBodyPart("pussy")) {
    return ', baring {pa:target} pussy'
  }
  else {
    return ', baring {pa:target} smooth crotch'
  }
}






erotica.ripOffHalter = function(p) {
  if (!p.strength) p.strength = 0
  this.worn = false
  this.loc = p.actor.loc
  const s = erotica.exposeChest(p.target)
  const arousalBomb = p.target.hasBodyPart("tit") ? 5 :1
  let res = "{nv:actor:un" + this.fastenVerb + ":true} {nm:target:the}'s {nm:garment}"
  res += this.fastenFront ? " between the cups" : " at the back"

  if (p.strength >= this.strength) {
    const verb = p.strength > 2 ? "cut" : "break"
    res = "{nv:actor:" + verb + ":true} the straps on {nm:target:the}'s {nm:garment}"
    res += " and pull it away" + s + ", dropping the remains on the floor."
    this.damage("rip")
    p.target.arousalBomb(arousalBomb + 1)
  }
  else if (this.fastenStyle === "halter" || this.fastenStyle === "strapless") {
    res += " and pull it away" + s + ", dropping the garment to the floor."
    p.target.arousalBomb(arousalBomb)
  }
  else if (this.pulledUp) {
    failedmsg(pronounVerb(this, "be", true) + " already pulled up; it is not going any more than that.")
    this.worn = true
    this.loc = p.target.name
    return false
  }
  else {
    res += " and push it up to {pa:target} neck" + s + "."
    this.worn = true
    this.loc = p.target.name
    this.pulledUp = true
    p.target.arousalBomb(arousalBomb)
  }
  p.actor.msg(res, p)
  return true
}


erotica.ripOffPants = function(p) {
  // covers skirts?, briefs, thongs, tights
  if (!p.strength) p.strength = 0
  this.loc = p.actor.loc
  this.worn = false
  const arousalBomb = p.target.getOuterWearable("groin") ? 4 : 8
  const s = erotica.exposeGroin(p.target)

  if (p.strength >= this.strength) {
    const verb = p.strength > 2 ? "cut" : "rip"
    p.actor.msg("{nv:actor:" + verb + ":true} the {nm:garment} off {nm:target:the}" + s + ".", p)
    p.target.arousalBomb(arousalBomb + 1)
    this.damage("rip");
  }
  else if (this.wrapSkirt) {
    p.target.arousalBomb(arousalBomb)
    p.actor.msg("{nv:actor:unfasten:true} {nm:target:the}'s {nm:garment}" + s + ", letting {ob:garment} drop to the ground.", p)
  }
  else if (this.sideTie) {
    p.actor.msg("{nv:actor:unfasten:true} {nm:target:the}'s {nm:garment} at the left hip" + s + ", then on the right too before letting {ob:garment} drop to the ground.", p)
    p.target.arousalBomb(arousalBomb)
  }
  else if (!p.restraint.points.includes("ankles")) {
    p.actor.msg("{nv:actor:unfasten:true} {nm:target:the}'s {nm:garment}, and {cj:pull} {ob:garment} down {pa:target} legs" + s + ", before pulling {ob:garment} off completely and dropping {ob:garment} to the ground.", p)
  }
  else if (!p.restraint.legsOpen && this.pullsDown) {
    if (this.pulledDown) {
      failedmsg(pronounVerb(this, "be", true) + " already pulled down; it is not going any more than that.")
      this.worn = true
      this.loc = p.target.name
      return false
    }
    else {
      p.actor.msg("{nv:actor:pull:true} down {nm:target:the}'s {nm:garment}" + s + ", letting them drop to {pa:target} ankles.", p)
      this.loc = p.target.name
      this.worn = true
      this.pulledDown = true;
      p.target.arousalBomb(arousalBomb)
    }
  }
  else {
    p.actor.msg("{nv:actor:try:true} to take the {nm:garment} off {nm:target:the}" + s + ", but cannot whilst {nm:target:the} is tied up like that.", p)
    this.loc = p.target.name
    this.worn = true
    p.target.arousalBomb(arousalBomb)
  }
  return true
}


erotica.ripOffTeeShirt = function(p) {
  if (!p.strength) p.strength = 0
  this.loc = p.actor.loc
  this.worn = false
  const s = erotica.exposeChest(p.target)
  const arousalBomb = p.target.hasBodyPart("tit") ? (p.target.getOuterWearable("chest") ? 3 : 6) : 2


  if (p.strength >= this.strength) {
    const verb = p.strength > 2 ? "cut" : "rip"
    p.actor.msg("{nv:actor:" + verb + ":true} the {nm:garment} off {nm:target:the}" + s + ".", p)
    this.damage("rip");
    p.target.arousalBomb(arousalBomb + 1)
  }
  else if (!p.restraint.points.includes("wrists")) {
    p.actor.msg("{nv:actor:pull:true} the {nm:garment}, over the head of {nm:target:the}" + s + ", and {cj:actor:drop} it on the floor.", p)
    p.target.arousalBomb(arousalBomb)
  }
  else if (this.pulledUp) {
    failedmsg(pronounVerb(this, "be", true) + " already pulled up; it is not going any more than that.")
    this.worn = true
    this.loc = p.target.name
    return false
  }
  else {
    p.actor.msg("{nv:actor:push:true} {nm:target:the}'s {nm:garment} up" + s + ".", p)
    this.worn = true
    this.loc = p.target.name
    this.pulledUp = true
    p.target.arousalBomb(arousalBomb)
  }
  return true
}


erotica.ripOffButtoned = function(p) {
  if (!p.strength) p.strength = 0
  this.loc = p.actor.loc
  this.worn = false
  const s = erotica.exposeChest(p.target)
  const arousalBomb = p.target.hasBodyPart("tit") ? (p.target.getOuterWearable("chest") ? 3 : 6) : 2
  
  if (p.strength >= this.strength) {
    const verb = p.strength > 2 ? "cut" : "rip"
    p.actor.msg("{nv:actor:" + verb + ":true} the {nm:garment} off {nm:target:the}" + s + ".", p)
    this.damage("rip");
    p.target.arousalBomb(arousalBomb + 1)
  }
  else if (!p.restraint.points.includes("wrists")) {
    p.actor.msg("{nv:actor:unfasten:true} {nm:target:the}'s {nm:garment}" + s + ", and pulls it off {pa:target} arms, dropping it on the floor.", p)
    p.target.arousalBomb(arousalBomb)
  }
  else if (this.unfastened) {
    failedmsg(pronounVerb(this, "be", true) + " already unfastened; it is not going any more than that.")
    this.worn = true
    this.loc = p.target.name
    return false
  }
  else {
    p.actor.msg("{nv:actor:unfasten:true} {nm:target:the}'s {nm:garment}" + s + ".", p)
    this.worn = true
    this.loc = p.target.name
    this.unfastened = true
    p.target.arousalBomb(arousalBomb)
  }

  return true
}


erotica.ripOffFootwear = function(p) {
  if (!p.strength) p.strength = 0
  this.loc = p.actor.loc
  this.worn = false
  if (!p.restraint.points.includes("ankles") || !this.getSlots().includes("calf")) {
    p.actor.msg("{nv:actor:unfasten:true} {nm:target:the}'s {nm:garment}" + s + ", and pulls them off.", p)
  }
  else if (p.strength >= this.strength) {
    const verb = p.strength > 2 ? "cut" : "rip"
    p.actor.msg("{nv:actor:" + verb + ":true} the {nm:garment} off {nm:target:the}" + s + ".", p)
    this.damage("rip");
  }
  else {
    p.actor.msg("{nv:actor:tie:true} to remove {nm:target:the}'s {nm:garment}" + s + ", but cannot whilst {sb:target} is tied up like that.", p)
    this.worn = true
    this.loc = p.target.name
  }
  return true
}


erotica.ripOffSwimsuit = function(p) {
  if (!p.strength) p.strength = 0
  this.loc = p.actor.loc
  this.worn = false
  const s1 = erotica.exposeChest(p.target)
  const s2 = erotica.exposeGroin(p.target)
  const arousalBomb = p.target.hasBodyPart("tit") ? 9 : 7

  if (p.strength >= this.strength) {
    // straps can be broken, so shred
    const verb = p.strength > 2 ? "cut" : "rip"
    p.actor.msg("{nv:actor:" + verb + ":true} the shoulder straps of {nm:target:the}'s {nm:garment} and it falls to {pa:target} waist" + s1 + ". Then {pv:actor:" + verb + ":true} the sides and crotch o {nm:garment:the}, letting the shredded remains drop to the floor" + s2 + ".", p)
    this.damage("rip");
    p.target.arousalBomb(arousalBomb + 1)
  }
  else if (!p.restraint.points.includes("ankles") && !p.restraint.points.includes("wrists")) {
    // wrists and ankles not held, so remove completely
    p.actor.msg("{nv:actor:pull:true} {nm:target:the}'s {nm:garment} off {pa:target} shoulders" + s1 + ", and then {cj:ease} {ob:garment} down {pa:target} legs, over {pa:target} hips" + s2 + ", before pulling {ob:garment} off completely and dropping {ob:garment} to the ground.", p)
    p.target.arousalBomb(arousalBomb)
  }
  else if (!p.restraint.points.includes("wrists") && !p.restraint.legsOpen) {
    // ankles held, not wrists, legs closed, so down to ankles
    p.actor.msg("{nv:actor:pull:true} {nm:target:the}'s {nm:garment} off {pa:target} shoulders" + s1 + ", and then {cj:ease} {ob:garment} down {pa:target} legs, over {pa:target} hips" + s2 + ". {nm:garment:the} falls down {pa:target} legs to {pa:target} ankles.", p)
    this.loc = p.target.name
    this.worn = true
    this.pulledDown = 2
    p.target.arousalBomb(arousalBomb)
  }
  else {
    p.actor.msg("{nv:actor:try:true} to remove {nm:target:the}'s {nm:garment}, but cannot whilst {sb:target} is tied up like that.", p)
    this.worn = true
    this.loc = p.target.name
  }
  return true
}


erotica.ripOffSlingBikini = function(p) {
  if (!p.strength) p.strength = 0
  this.loc = p.actor.loc
  this.worn = false
  const s1 = erotica.exposeChest(p.target)
  const s2 = erotica.exposeGroin(p.target)
  const arousalBomb = p.target.hasBodyPart("tit") ? 9 : 7

  if (p.strength >= this.strength) {
    // straps can be broken
    const verb = p.strength > 2 ? "cut" : "rip"
    p.actor.msg("{nv:actor:" + verb + ":true} the shoulder straps of {nm:target:the}'s {nm:garment} and it falls to the ground, leaving {pa:target} torso naked.", p)
    this.damage("rip");
    p.target.arousalBomb(arousalBomb + 1)
  }
  else if (!p.restraint.points.includes("ankles") && !p.restraint.points.includes("wrists")) {
    // ankles and wrists free
    p.actor.msg("{nv:actor:pull:true} {nm:target:the}'s {nm:garment} off {pa:target} shoulders. It slides down {nm:target:the}'s body, to her feet, leaving her torso naked. {nv:actor:pull:true} {nm:garment:the} off completely, and {cj:actor:drop} {ob:garment} on the ground.", p)
    p.target.arousalBomb(arousalBomb)
  }
  else {
    // ankles held
    p.actor.msg("{nv:actor:pull:true} {nm:target:the}'s {nm:garment} off {pa:target} shoulders. It slides down {nm:target:the}'s body, to her ankles, leaving her torso naked.", p)
    this.pulledDown = true
    this.loc = p.target.name
    this.weorn = true
    p.target.arousalBomb(arousalBomb)
  }
  return true
}


// We have an issue that a dress could be pulled up and pulled down, which means PULL UP DRESS
// could be to pull up the top to hide stuff, or the bottom pulled up to expose it! I have
// chosen to assume a dress top cannot be pulled down, but that is off if it is strapless.
// Also, dresses can be removed by going up, over the head, or from going down, and stepping out of it.
erotica.ripOffDress = function(p) {
  if (!p.strength) p.strength = 0
  this.loc = p.actor.loc
  this.worn = false
  const s1 = erotica.exposeChest(p.target)
  const s2 = erotica.exposeGroin(p.target)
  // might need revising???
  let arousalBomb = p.target.getOuterWearable("groin") ? 3 : 7
  if (p.target.hasBodyPart("tit") && !p.target.getOuterWearable("chest")) arousalBomb += 2

  if (p.strength >= this.strength) {
    const verb = p.strength > 2 ? "cut" : "rip"
    p.actor.msg("{nv:actor:" + verb + ":true} the shoulder straps of {nm:target:the}'s {nm:garment} and it falls to {pa:target} waist" + s1 + ". Then {pv:actor:" + verb + ":true} the sides and crotch too, letting the shredded remains drop to the floor" + s2 + ".", p)
    this.damage("rip");
    p.target.arousalBomb(arousalBomb + 1)
  }

  //if (this.strapless) {
  else if (!p.restraint.points.includes("ankles")) {
    p.actor.msg("{nv:actor:pull:true} down {nm:target:the}'s {nm:garment}" + s1 + ", and then {cj:ease} {ob:garment} down {pa:target} legs, over {pa:target} hips" + s2 + ", before pulling {ob:garment} off completely and dropping {ob:garment} to the ground.", p)
    p.target.arousalBomb(arousalBomb)
  }
  else if (!p.restraint.legsOpen) {
    p.actor.msg("{nv:actor:pull:true} down {nm:target:the}'s {nm:garment}" + s1 + ", and then {cj:ease} {ob:garment} down {pa:target} legs, over {pa:target} hips" + s2 + ", before pulling {ob:garment} off completely and dropping {ob:garment} to the ground.", p)
    p.target.arousalBomb(arousalBomb)
  }
  else if (!p.restraint.points.includes("ankles") && !p.restraint.points.includes("wrists")) {
    p.actor.msg("{nv:actor:pull:true} {nm:target:the}'s {nm:garment} off {pa:target} shoulders" + s1 + ", and then {cj:ease} {ob:garment} down {pa:target} legs, over {pa:target} hips" + s2 + ", before pulling {ob:garment} off completely and dropping {ob:garment} to the ground.", p)
    p.target.arousalBomb(arousalBomb)
  }
  else if (!p.restraint.points.includes("wrists") && !p.restraint.legsOpen) {
    p.actor.msg("{nv:actor:pull:true} {nm:target:the}'s {nm:garment} off {pa:target} shoulders" + s1 + ", and then {cj:ease} {ob:garment} down {pa:target} legs, over {pa:target} hips" + s2 + ". {nm:garment:the} falls down {pa:target} legs to {pa:target} ankles.", p)
    p.target.arousalBomb(arousalBomb)
  }
  else {
    p.actor.msg("{nv:actor:tie:true} to remove {nm:target:the}'s {nm:garment}" + s + ", but cannot whilst {sb:target} is tied up like that.", p)
    this.worn = true
    this.loc = p.target.name
  }
  return true
}
