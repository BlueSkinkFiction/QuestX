"use strict";


// GENERAL TEMPATES

erotica.pullOffTexts = {
  up:"{nv:char:lift:true} up {nms:item:the} {nm:garment}, pulling it up over {pa2:item:char} head.",
  down:"{nv:char:pull:true} down {nms:item:the} {nm:garment}, letting {ob:garment} slide down {pa:item} legs.",
  swimsuit:"{nv:char:ease:true} the straps of {nms:item:the} {nm:garment} off {pa:item} shoulders, then peel {ob:garment} down {pa:item} her body, letting {ob:garment} slide down {pa:item} legs to the floor.",
  halter:"{nv:char:unfasten:true} {nms:item:the} {nm:garment}, pulling {ob:garment} off {ob:item}.",
  jacket:"{nv:char:unfasten:true} {nms:item:the} {nm:garment}, pulling {ob:garment} off {ob:item}.",
  dress:"{nv:char:lift:true} up {nms:item:the} {nm:garment}, pulling {ob:garment} up over {pa2:item:char} head.",
  skirt:"{nv:char:unfasten:true} {nms:item:the} {nm:garment}, letting {ob:garment} fall to the floor.",
}

const WEARABLE_X = function (layer, slots) {
  const res = Object.assign(WEARABLE(layer, slots), MADE_OF(materials.cloth))
  
  
  res.examine = function() {
    if (!this.exam) {
      debugmsg("No description set for " + this.name)
      return false
    }
    let s = this.exam
    
    if (this.substanceMess && this.substanceMess.length > 0) {
      s += " {pv:item:be:true} covered in " + formatList(this.substanceMess, {lastJoiner:lang.list_and}) + "."
    }
    if (this.cumMess && this.cumMess.length > 0) {
      const list = this.cumMess.map(el => lang.getName(w[el], {article:DEFINITE, possessive:true}))
      s += " {pv:item:have:true} " + formatList(list, {lastJoiner:lang.list_and}) + " cum on them."
    }
    
    msg(s, {item:this})
    return true
  }
  
  //res.getNameModifier = function() {
  //  return this.worn && this.isAtLoc(player.name) ? " (worn)" : ''
  //}
  res.testRemove = function(char) {
    if (settings.testRemove) return settings.testRemove(this, char)
    return true
  }
  res.testWear = function(char) {
    if (settings.testWear) return settings.testWear(this, char)
    return true
  }


  res.wear = function(options) {
    options.item = this
    if (!this._canWearRemove(true, options)) return false
    if (!options.char.canManipulate(this, "wear")) return false

    if (this.specialWearMsg) {
      msg(this.specialWearMsg(options.char), options)
    }
    else {
      msg(this.wearMsg, options)
    }
    this.worn = true
    if (this.afterWear) this.afterWear(options)
    return true
  };

  res.remove = function(options) {
    options.item = this
    if (!this.testRemove(options.char)) { return false; }
    if (!options.char.canManipulate(this, "remove")) { return false; }
    if (this.specialRemoveMsg) {
      msg(this.specialRemoveMsg(options.char), options)
    }
    else {
      msg(this.removeMsg, options)
    }
    const startExposure = options.char.getExposure()
    this.worn = false;
    if (this.afterRemove) this.afterRemove(options)
    options.char.arousalBomb(options.char.getExposure() / 3)
    for (let npc of scopeNpcHere()) {
      npc.stripReaction(options.char, this, startExposure, options.char.getExposure())
    }
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
  res.breakEnsemble = function() { return this.pulledDown }
  res.afterCreation = function(o) {
    o.verbFunctions.push(function(o, list) {
      if (!o.isAtLoc(player.name)) {
        list.push("Take")
      }
      else if (o.getWorn()) {
        if (!o.getWearRemoveBlocker(player, false)) {
          list.push("Remove")
          list.push(o.pulledDown ? "Pull up" : "Pull down")
        }
      }
      else {
        list.push("Drop")
        if (!o.getWearRemoveBlocker(player, true)) list.push("Wear")
      }
    })
    o.nameModifierFunctions.push(function(o, list, options) {
      if (!o.worn) return
      if (options.noWorn && !o.pulledDown) return
      list.push(o.pulledDown ? "around " + w[o.loc].pronouns.poss_adj + " ankles" : "worn")
    })
  }
  res.pullDown = function(char) {
    if (this.pulledDown) {
      failedmsg("{pv:item:be:true} already.")
      return world.FAILED
    }
    
    this.pulledDown = true
    char.msg("{nv:char:pull:true} down {pa:char} {nm:item}.", {item:this, char:char})
    return world.SUCCESS
  }
  res.pullUp = function(char) {
    if (!this.pulledDown) {
      failedmsg("That does not need pulling up.")
      return world.FAILED
    }
    
    delete this.pulledDown
    char.msg("{nv:char:pull:true} up {pa:char} {nm:item}.", {item:this, char:char})
    return world.SUCCESS
  }

  return res
}


const WEARABLE_THAT_PULLS_UP = function (layer, slots, toDest) {
  const res = WEARABLE_X(layer, slots)

  res.pulledUp = false
  res.getSlots = function() { return this.pulledUp ? [] : this.slots; };
  res.breakEnsemble = function() { return this.pulledUp };
  res.toDest = toDest

  res.afterCreation = function(o) {
    o.verbFunctions.push(function(o, list) {
      if (!o.isAtLoc(player.name)) {
        list.push("Take")
      }
      else if (o.getWorn()) {
        if (!o.getWearRemoveBlocker(player, false)) {
          list.push("Remove")
          list.push(o.pulledUp ? "Pull down" : "Pull up")
        }
      }
      else {
        list.push("Drop")
        if (!o.getWearRemoveBlocker(player, true)) list.push("Wear")
      }
    })
    o.nameModifierFunctions.push(function(o, list, options) {
      if (!o.worn) return
      if (options.noWorn && !o.pulledUp) return
      list.push(o.pulledUp ? "pulled up around " + w[o.loc].pronouns.poss_adj + " " + o.toDest : "worn")
    })
  }

  res.pullUp = function(char) {
    if (this.pulledUp) {
      failedmsg("{pv:item:be:true} already.")
      return world.FAILED
    }
    
    this.pulledUp = true
    char.msg("{nv:char:pull:true} up {pa:char} {nm:item}.", {item:this, char:char})
    return world.SUCCESS
  }
  
  res.pullDown = function(char) {
    if (!this.pulledUp) {
      failedmsg("That does not need pulling up.")
      return world.FAILED
    }
    
    delete this.pulledUp
    char.msg("{nv:char:pull:true} down {pa:char} {nm:item}.", {item:this, char:char})
    return world.SUCCESS
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
  
  res.afterCreation = function(o) {
    o.verbFunctions.push(function(o, list) {
      if (!o.isAtLoc(player.name)) {
        list.push("Take")
      }
      else if (o.getWorn()) {
        if (!o.getWearRemoveBlocker(player, false)) {
          list.push("Remove")
          list.push(o.unfastened ? "Fasten" : "Unfasten")
        }
      }
      else {
        list.push("Drop")
        if (!o.getWearRemoveBlocker(player, true)) list.push("Wear")
      }
    })
    o.nameModifierFunctions.push(function(o, list, options) {
      if (!o.worn) return
      if (options.noWorn && !o.pulledDown) return
      list.push(o.unfastened ? (o === player ? "worn unfastened" : "unfastened") : "worn")
    })
  }

  res.unfasten = function(char) {
    if (this.unfastened) {
      failedmsg("{pv:item:be:true} already.")
      return world.FAILED
    }
    
    this.unfastened = true
    char.msg("{nv:char:unfasten:true} {pa:char} {nm:item}.", {item:this, char:char})
    return world.SUCCESS
  }
  res.fasten = function(char) {
    if (!this.unfastened) {
      failedmsg("That does not need pulling up.")
      return world.FAILED
    }
    
    delete this.unfastened
    char.msg("{nv:char:fasten:true} {pa:char} {nm:item}.", {item:this, char:char})
    return world.SUCCESS
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
  res.subtype = 'teeshirt'
  res.ripOff = erotica.ripOffTeeShirt
  res.wearMsg = "{nv:char:pull:true} the tee-shirt over {pa:char} head, and down over {pa:char} torso."
  res.removeMsg = "{nv:char:pull:true} the tee-shirt up and over {pa:char} head."
  res.stripper = function(options) {
    if (!options.chest) {
      if (char.hasHugeBoobs) {
        return "{nv:char:pull:true} her {nm:item} over her head, making her massive gazongas bounce. The men cheer to see them swinging free and bare."
      }
      else {
        return "{nv:char:pull:true} her {nm:item} over her head. The men cheer at the sight of her tits exposed for their delight."
      }
    }
    else {
      if (char.hasHugeBoobs) {
        return "{nv:char:pull:true} her {nm:item} over her head, her massive gazongas, barely held by her {nm:chest}, bouncing up and down to the delight of the men watching."
      }
      else {
        return "{nv:char:pull:true} her {nm:item} over her head. The men cheer, now her tits are only cover by {nm:chest:a}."
      }
    }
  }
  return res;
};


const VEST_TOP = function(cropped) {
  const slots = ["chest", "nipple", "midriff", "upperback"];
  if (!cropped) slots.push("midriff", "lowerback");
  const res = WEARABLE_THAT_PULLS_UP(3, slots, "neck");
  res.pullsoff = "up";
  res.strength = 1
  res.garmentType = "casual"
  res.subtype = 'vesttop'
  res.wearMsg = "{nv:char:pull:true} the tee-shirt over {pa:char} head, and down over {pa:char} torso."
  res.removeMsg = "{nv:char:pull:true} the tee-shirt up and over {pa:char} head."
  res.ripOff = erotica.ripOffTeeShirt
  res.stripper = function(options) {
    if (!options.chest) {
      if (options.char.hasHugeBoobs) {
        return "{nv:char:pull:true} her {nm:item} over her head, making her massive gazongas bounce. The men cheer to see them swinging free and bare."
      }
      else {
        return "{nv:char:pull:true} her {nm:item} over her head. The men cheer at the sight of her tits."
      }
    }
    else {
      if (options.char.hasHugeBoobs) {
        return "{nv:char:pull:true} her {nm:item} over her head, her massive gazongas, barely held by her {nm:chest}, bouncing up and down to the delight of the men watching."
      }
      else {
        return "{nv:char:pull:true} her {nm:item} over her head. The men cheer, now her tits are only cover by a {nm:chest}."
      }
    }
  }
  return res;
};


const SHORTS = function(long) {
  const slots = ["crotch", "groin", "buttock", "hip"];
  if (long) slots.push("thigh");
  const res = WEARABLE_THAT_PULLS_DOWN(4, slots);
  res.pronouns = lang.pronouns.plural
  res.pullsoff = "down";
  res.strength = 1
  res.garmentType = "casual"
  res.subtype = 'shorts'
  res.wearMsg = "{nv:char:pull:true} the shorts up {pa:char} {bpAdjective:char:thigh} legs, pulling up the zip and fastening the button."
  res.specialRemoveMsg = function(char) {
    if (this.pulledDown) return "{nv:char:step:true} out of {nm:item:the} around {pa:char} ankles.";
    return "{nv:char:pull:true} {pa:char} shorts down until they slid down {pa:char} {bpAdjective:char:thigh} legs, and {pv:char:step} out of them.";
  }
  res.ripOff = erotica.ripOffPants
  return res;
};

const DAISY_DUKES = function() {
  const res = SHORTS(false);
  res.strength = 2
  res.wearMsg = "{nv:char:pull:true} the denim shorts up {pa:char} {bpAdjective:char:thigh} legs, pulling up the zip and fastening the button."
  res.specialRemoveMsg = function(char) {
    if (this.pulledDown) return "{nv:char:step:true} out of {nm:item:the} around {pa:char} ankles.";
    return "{nv:char:unfasten:true} the button on {pa:char} denim shorts, and {cj:char:pull} down the zip. After a bit of a wriggle, they slid down {pa:char} {bpAdjective:char:thigh} legs, and {pv:char:step} out of them.";
  }
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
  res.subtype = 'shirt'
  res.wearMsg = "{nv:char:pull:true} on the shirt and fastens the buttons."
  res.removeMsg = "{nv:char:unfasten:true} the buttons on {pa:char} shirt, and shrugs it off."
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
  res.subtype = 'jacket'
  res.wearMsg = "{nv:char:pull:true} on {nm:item:the} and fastens the buttons."
  res.removeMsg = "{nv:char:unfasten:true} the buttons on {nm:item:the} shirt, and shrugs it off."
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
  res.subtype = 'skirt'
  res.wearMsg = "{if:item:wrapSkirt:{nv:char:wrap:true} the skirt round {pa:char} waist, and fastens it at {pa:char} right hip.::{nv:char:pull:true} the skirt up round {pa:char} waist, and fastens it at the back.}"
  res.removeMsg = "{nv:char:unfasten:true} {pa:char} skirt, and takes it off."
  res.ripOff = erotica.ripOffPants
  res.stripper = function(options) {
    if (!options.groin) {
      return "{nv:char:unfasten:true} her {nm:item}, and, after a moment's hesitation, takes it off. The men cheer when they saw she is wearing nothing under it, staring lustily at her exposed pussy."
    }
    else {
      return "{nv:char:unfasten:true} her {nm:item} and takes it off. The men cheer, now her sex is covered only by {nm:groin:a}."
    }
  }
  return res;
};


const PANTS = function(shortName) {
  const res = WEARABLE_THAT_PULLS_DOWN(4, ["crotch", "groin", "buttock", "hip", "thigh", "knee", "calf"]);
  res.pullsoff = "down";
  res.strength = 1
  res.garmentType = "smart"
  res.subtype = 'pants'
  res.pronouns = lang.pronouns.plural;
  res.shortName = shortName || 'pants'
  res.wearMsg = "{nv:char:pull:true} the {show:item:shortName} up {pa:char} {bpAdjective:char:thigh} legs and fastens them up."
  res.specialRemoveMsg = function(char) {
    if (this.pulledDown) return "{nv:char:step:true} out of {nm:item:the} around {pa:char} ankles.";
    return "{nv:char:unfasten:true} {pa:char} {show:item:shortName}, and {cj:char:pull} them down {pa:char} {bpAdjective:char:thigh} legs, before stepping out of them.";
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
  res.subtype = 'dress'
  res.strength = 1
  res.specialWearMsg = function(char) {
    if (this.overHead) {
      return "{nv:char:pull:true} the dress over {pa:char} head, and down {pa:char} torso, before fastening it at the back, and then straightening it out.";
    }
    else if (this.strapless) {
      return "{nv:char:step:true} into the dress, pulling it over {pa:char} torso, adjusting it over {pa:char} chest, before fastening it at the back.";
    }
    else {
      return "{nv:char:step:true} into the dress, pulling it over {pa:char} torso, the straps over {pa:char} shoulders, before fastening it at the back.";
    }
  }
  res.specialRemoveMsg = function(char) {
    if (this.overHead) {
      return "{nv:char:unfasten:true} {pa:char} dress, then {cj:char:pull} it up, over {pa:char} head."
    }
    else if (this.strapless) {
      return "{nv:char:unfasten:true} {pa:char} dress, letting it fall away from {pa:char} chest, before wriggling out of it, and letting it drop to the floor. {nv:char:step:true} out of it.";
    }
    else {
      return "{nv:char:unfasten:true} {pa:char} dress, then {cj:char:pull} the straps off {pa:char} shoulders before it drops to the floor. {nv:char:step:true} out of it.";
    }
  }
  res.stripper = function(options) {
    if (!options.chest && !options.groin) {
      return "Slowly {nv:char:unfasten} the dress, conscious {nv:char:have} no underwear on. {nv:char:pull:true} it off, her body bare, her sex exposed; the men cheer and whistle."
    }
    else if (!options.chest) {
      return "Slowly {nv:char:unfasten} the dress, glad {nv:char:be} at least wearing {nm:groin:a}. She pulls the dress off, her body almost bare, her {tits:char} exposed. The men cheer and whistle at her."
    }
    else if (!options.groin) {
      return "Slowly {nv:char:unfasten} the dress, conscious she had no panties on. She pulls it off, her body bare, apart from her " + lang.getName(chest, ) + ", her sex exposed; the men cheer and whistle."
    }
    else {
      return "{nv:char:unfasten:true} the dress, glad {nv:char:be} wearing underwear on. She pulls it off, her body bare, her sex exposed; the men cheer and whistle."
    }
  }

  res.ripOff = erotica.ripOffDress
  return res
}


const JUMPSUIT = function(cleavageHidden) {
  const slots = ["chest", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "crotch", "thigh", "knee", "calf", "shoulder", "arm"]
  if (cleavageHidden) slots.push("cleavage")
  const res = WEARABLE(5, slots)
  //res.getSlots = function() { return this.pulledUp ? this.slotsUpper : this.slots; };
  res.fastenVerb = "zip"
  res.garmentType = "casual"
  res.subtype = 'jumpsuit'
  res.specialWearMsg = function(char) {
    return "{nv:char:step:true} into {nm:item:the}, pulling it up {pa:char} legs and over her hips. She puts her arms into the sleeves, pulling it un to her shoulders, then {cj:char:" + this.fastenVerb + "} it up at the front."
  }
  res.specialRemoveMsg = function(char) {
    const s1 = erotica.exposeChest(p.target)
    const s2 = erotica.exposeGroin(p.target)
    return "{nv:char:un" + this.fastenVerb + ":true} {pa:char} {nm:item}, then {cj:char:pull} it off her shoulders" + s1 + ", and down her arms. She wriggles it over her hips, and it falls to her ankles" + s2 + ". She steps out if it."
  }
  res.stripper = function(options) {
    if (!options.chest && !options.groin) {
      return "Slowly {nv:char:un" + this.fastenVerb + "} {nm:item:the}, conscious {nv:char:have} no underwear on. {nv:char:pull:true} it off, her body bare, her sex exposed; the men cheer and whistle."
    }
    else if (!options.chest) {
      return "Slowly {nv:char:un" + this.fastenVerb + "} {nm:item:the}, glad {nv:char:be} at least wearing {nm:groin:a}. She pulls it off, her body almost bare, her {tits:char} exposed. The men cheer and whistle at her."
    }
    else if (!options.groin) {
      return "Slowly {nv:char:un" + this.fastenVerb + "} {nm:item:the}, conscious she had no panties on. She pulls it off, her body bare, apart from her " + lang.getName(chest, ) + ", her sex exposed; the men cheer and whistle."
    }
    else {
      return "{nv:char:un" + this.fastenVerb + ":true} {nm:item:the}, glad {nv:char:be} wearing underwear on. She pulls it off, her body bare, her sex exposed; the men cheer and whistle."
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
  res.specialWearMsg = function(char) {
    if (char.hasBodyPart("cock")) {
      if (char.getArousal() > 60) {
         return "{nv:char:pull:true} the thong up {pa:char} legs and over {pa:char} hips, struggling to tuck {pa:char} erect cock inside as best {pv:char:can}.";
      }
      else if (char.hasHugeCock) {
         return "{nv:char:pull:true} the thong up {pa:char} legs and over {pa:char} hips, struggling to tuck {pa:char} huge cock inside as best {pv:char:can}.";
      }
      else if (char.getArousal() <20) {
         return "{nv:char:pull:true} the thong up {pa:char} legs and over {pa:char} hips, easily covering {pa:char} limp manhood, despite being so small...";
      }
      else {
         return "{nv:char:pull:true} the thong up {pa:char} legs and over {pa:char} hips, barely covering {pa:char} manhood.";
      }
    }
    else {
       return "{nv:char:pull:true} the tiny thong up {pa:char} legs and over {pa:char} hips.";
    }
  }
  res.specialRemoveMsg = function(char) {
    return "{nv:char:pull:true} down {pa:char} briefs, and steps out of them.";

    if (char.hasBodyPart("cock")) {
      return "{nv:char:pull:true} down {pa:char} thong, revealing {pa:char} {cock:char}. They slide down {pa:char} legs and {pv:char:step} out of them.";
    }
    else if (char.hasBodyPart("pussy")) {
      return "{nv:char:pull:true} down {pa:char} thong, baring {pa:char} pussy. They slide down {pa:char} legs and {pv:char:step} out of them.";
    }
    else {
       return "{nv:char:pull:true} down {pa:char} thong. They slide down {pa:char} legs and {pv:char:step} out of them.";
    }
  }
  res.ripOff = erotica.ripOffPants
  res.garmentType = "underwear";
  res.subtype = 'underwear'
  return res;
};


const THONG_M = function() {
  const res = THONG();
  res.specialWearMsg = function(char) {
    if (char.hasBodyPart("cock")) {
      if (char.hasHugeCock) {
         return "{nv:char:pull:true} the thong up {pa:char} legs and over {pa:char} hips, struggling to tuck {pa:char} huge cock inside as best {pv:char:can}.";
      }
      else if (char.getArousal() > 60) {
         return "{nv:char:pull:true} the thong up {pa:char} legs and over {pa:char} hips, and {cj:char:tuck} {pa:char} erect cock inside.";
      }
      else if (char.getArousal() <20) {
         return "{nv:char:pull:true} the thong up {pa:char} legs and over {pa:char} hips, and {cj:char:tuck} {pa:char} limp cock inside.";
      }
      else {
         return "{nv:char:pull:true} the thong up {pa:char} legs and over {pa:char} hips, and {cj:char:tuck} {pa:char} cock inside.";
      }
    }
    else {
       return "{nv:char:pull:true} the thong up {pa:char} legs and over {pa:char} hips.";
    }
  }
  return res;
};


const BRA = function() {
  const res = HALTER();
  res.garmentType = "underwear";
  res.subtype = 'halter'
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
  res.subtype = 'corset'
  return res;
};


const PANTIES = function() {
  const res = BRIEFS();
  res.swimwear = false;
  res.garmentType = "underwear";
  res.subtype = 'underwear'
  res.strength = 1
  return res;
};


const BOXERS = function() {
  const res = SHORTS();
  res.swimwear = false;
  res.wear_layer = 2
  res.garmentType = "underwear";
  res.subtype = 'underwear'
  res.strength = 1
  return res;
};


const TIGHTS = function() {
  const res = WEARABLE_THAT_PULLS_DOWN(3, ["crotch", "groin", "buttock", "hip", "thigh", "knee", "calf", "foot"]);
  res.pullsoff = "down";
  res.pronouns = lang.pronouns.plural
  res.strength = 1
  res.garmentType = "underwear";
  res.subtype = 'tights'
  res.wearMsg = "{nv:char:pull:true} the tights up {pa:char} long, smooth legs."
  res.removeMsg = "{if:item:pulledDown:{nv:char:step:true} out of {nm:item:the} around {pa:char} ankles.:{nv:char:unfasten:true} {cj:char:pull} down the tights. After a bit of a wriggle, they slid down {pa:char} smooth legs, and {pv:char:step} out of them.}"
  res.ripOff = erotica.ripOffPants
  return res;
};


// SWIMWEAR

const SWIMSUIT = function(backExposure) {
  // can have strapsBroken t/f and pulledDown 0/1/2 (not/waist/ankles)
  const slots = ["chest", "nipple", "midriff", "crotch", "groin", "buttock"];
  if (backExposure > 0) slots.push("lowerback")
  if (backExposure > 1) slots.push("upperback")
  const res = WEARABLE_X(2, slots)
  res.pullsoff = "swimsuit"
  res.strength = 2
  res.pulledDown = 0
  res.garmentType = "swimwear"
  res.subtype = 'swimsuit'
  res.ripOff = erotica.ripOffSwimsuit
  
  res.specialWearMsg = function(char) {
    if (this.strapsBroken) {
      this.pulledDown = 1
      return "{nv:char:step:true} into the swimsuit, and {cj:char:pull} it up {pa:char} legs, then {cj:char:look} ruefully at the broken straps; {pv:char:shrug} and {cj:char:leave} the swimsuit round {pa:char} waist.";
    }
    else {
      this.pulledDown = 0
      return "{nv:char:step:true} into the swimsuit, and {cj:char:pull} it up {pa:char} legs, then up, putting {pa:char} arms through the straps, which {nv:char:pull} up over {pa:char} shoulders.";
    }
  }
  
  res.specialRemoveMsg = function(char) {
    if (this.pulledDown === 0) {
      return "{nv:char:pull:true} the swimsuit straps off {pa:char} shoulders, letting it fall away to {pa:char} waist, baring {pa:char} breasts. {pv:char:slide:true} the swimsuit down {pa:char} legs, exposing her pussy and {cj:char:step} out of it.";
    }
    if (this.pulledDown === 1) {
      return "{nv:char:pull:true} the swimsuit down {pa:char} legs, exposing her pussy, and {cj:char:step} out of it.";
    }
    if (this.pulledDown === 2) {
      return "{nv:char:step:true} out of the swimsuit around {pa:char} ankles.";
    }
  }

  res.getSlots = function() {
    if (this.pulledDown === 0) return this.slots
    return this.pulledDown === 1 ? ["crotch", "groin", "buttock"] : []
  }

  res.breakEnsemble = function() { return this.pulledDown !== 0 }

  res.afterCreation = function(o) {
    o.verbFunctions.push(function(o, list) {
      if (!o.isAtLoc(player.name)) {
        list.push("Take")
      }
      else if (o.getWorn()) {
        if (!o.getWearRemoveBlocker(player, false)) {
          list.push("Remove")
          if (o.pulledDown < 2) list.push("Pull down")
          if (o.pulledDown > 0) list.push("Pull up")
        }
      }
      else {
        list.push("Drop")
        if (!o.getWearRemoveBlocker(player, true)) list.push("Wear")
      }
    })
    o.nameModifierFunctions.push(function(o, list, options) {
      if (!o.worn) return
      if (options.noWorn && o.pulledDown === 0) return
      if (o.pulledDown === 0) {
        list.push("worn")
      }
      else {
        list.push("around " + w[o.loc].pronouns.poss_adj + (o.pulledDown === 1 ? " waist" : " ankles"))
      }
    })
  }

  res.getNameModifier = function(options) {
    if (!this.worn) return ''
    if (options.npc) {
      return this.pulledDown === 2 ? " around " + w[this.loc].pronouns.poss_adj + " ankles" : (this.pulledDown === 1 ? " around " + w[this.loc].pronouns.poss_adj + " waist" : ""); 
    }
    else {
      return this.pulledDown === 2 ? " (around " + player.pronouns.poss_adj + " ankles)" : (this.pulledDown === 1 ? " (around " + player.pronouns.poss_adj + " waist)" : " (worn)"); 
    }
  };


  res.pullDown = function(char) {
    if (this.pulledDown === 2) {
      failedmsg("It's pulled up already.")
      return world.FAILED
    }
    
    const target = w[this.loc]
    let s
    if (this.pulledDown === 1) {
      if (char === target) {
        s = "{nv:char:push:true} {pa:item} {nm:garment}"
      }
      else {
        s = "{nv:char:push:true} {nms:item:the} {nm:garment}"
      }
      s += " down, over her hips"
      if (target.hasBodyPart("cock")) {
        s += ", exposing {pa:item} cock"
      }
      else if (target.hasBodyPart("pussy")) {
        s += ", exposing {pa:item} {pussy:item}"
      }
      s += ". It slips down {pa:char} legs to {pa:char} ankles."
    }
    else {
      if (char === target) {
        s = "{nv:char:pull:true} the straps of {pa:item} {nm:garment}"
      }
      else {
        s = "{nv:char:pull:true} the straps of {nms:item:the} {nm:garment}"
      }
      s += " off {pa:item} shoulders, letting it fall to {pa:item} waist"
      if (target.hasBodyPart("tit")) {
        s += ", baring {pa:item} {tits:item}"
      }
      s += "."
    }
    char.msg(s, {item:target, char:char, garment:this})
    this.pulledDown++
    return world.SUCCESS
  }
  res.pullUp = function(char) {
    if (!this.pulledDown === 0) {
      failedmsg("It does not need pulling up.")
      return world.FAILED
    }
    
    const target = w[this.loc]
    let s
    if (this.pulledDown === 2) {
      if (char === target) {
        s = "{nv:char:pull:true} up {pa:item} {nm:garment}"
      }
      else {
        s = "{nv:char:pull:true} up {nms:item:the} {nm:garment}"
      }
      s += ", over her hips"
      if (target.hasBodyPart("cock")) {
        s += ", hiding {pa:item} {cock:item}"
      }
      else if (target.hasBodyPart("pussy")) {
        s += ", hiding {pa:item} pussy"
      }
      s += "."
      this.pulledDown--
    }
    else if (this.strapsBroken) {
      if (char === target) {
        s = "{nv:char:look:true} at the broken the straps of {pa:item} {nm:garment}, and {cj:char:realise} it is not going to stay up."
      }
      else {
        s = "{nv:char:look:true} at the broken the straps of {nms:item:the} {nm:garment}, and {cj:char:realise} it is not going to stay up."
      }
    }
    else {
      if (char === target) {
        s = "{nv:char:pull:true} the straps of {pa:item} {nm:garment}"
      }
      else {
        s = "{nv:char:pull:true} the straps of {nms:item:the} {nm:garment}"
      }
      s += " up, over {pa:item} shoulders"
      if (target.hasBodyPart("tit")) {
        s += ", covering {pa:item} tits"
      }
      s += "."
      this.pulledDown--
    }
    char.msg(s, {garment:this, char:char, item:target})
    return world.SUCCESS
  }

  return res;
};


const SLING_BIKINI = function() {
  const res = WEARABLE_THAT_PULLS_DOWN(2, ["crotch", "groin", "nipple"])
  res.pullsoff = "swimsuit";
  res.strength = 2
  res.regex = /sling bikini/
  res.wearMsg = "{nv:char:step:true} into the sling bikini, and {cj:char:pull} it up {pa:char} legs, and over {pa:char} shoulders. It does not cover much at all!"
  res.specialRemoveMsg = function(char) {
    if (!this.pulledDown) {
      return "{nv:char:pull:true} the sling bikini straps off {pa:char} shoulders, letting it fall away to {pa:char} ankles; {pv:char:step}  out of it.";
    }
    if (this.pulledDown === 2) {
      return "{nv:char:step:true} out of the sling bikini around {pa:char} ankles.";
    }
  };
  res.garmentType = "swimwear";
  res.subtype = 'slingbikini'
  res.ripOff = erotica.ripOffSlingBikini
  res.getSlots = function() {
    return this.pulledDown ? [] : this.slots; 
  };
  res.breakEnsemble = function() { return this.pulledDown };

  res.pullDown = function(char) {
    if (this.pulledDown) {
      failedmsg("It's pulled up already.")
      return world.FAILED
    }
    
    const target = w[this.loc]
    let s
    if (char === target) {
      s = "{nv:char:pull:true} the straps of {pa:item} {nm:garment}"
    }
    else {
      s = "{nv:char:pull:true} the straps of {nms:item:the} {nm:garment}"
    }
    s += " off {pa:item} shoulders, letting it fall to {pa:item} ankles"

    if (target.hasBodyPart("cock")) {
      s += ", exposing {pa:item} cock"
    }
    else if (target.hasBodyPart("pussy")) {
      s += ", exposing {pa:item} {pussy:item}"
    }
    if (target.hasBodyPart("tit")) {
      if (target.hasBodyPart("cock") || target.hasBodyPart("pussy")) {
        s += " and {tits:item}"
      }
      else {
        s += " exposing {pa:item} {tits:item}"
      }
    }
    s += "."
    char.msg(s, {target:target, char:char, garment:this})
    this.pulledDown = true
    return world.SUCCESS
  }
  res.pullUp = function(char) {
    if (!this.pulledDown) {
      failedmsg("It does not need pulling up.")
      return world.FAILED
    }
    
    const target = w[this.loc]
    let s
    if (char === target) {
      s = "{nv:char:pull:true} the straps of {pa:item} {nm:garment}"
    }
    else {
      s = "{nv:char:pull:true} the straps of {nms:item:the} {nm:garment}"
    }
    s += " up, over {pa:item} shoulders"
    if (target.hasBodyPart("tit")) {
      s += ", adjusting it to properly cover {pa:item} tits as best it can"
    }
    s += "."
    this.pulledDown = false
    char.msg(s, {garment:this, char:char, target:target})
    return world.SUCCESS
  }

  return res;
};


const SWIM_SHORTS = function(long) {
  const slots = ["crotch", "groin", "buttock", "hip"]
  if (long) slots.push("thigh")
  const res = WEARABLE_THAT_PULLS_DOWN(2, slots)
  res.pullsoff = "down"
  res.strength = 2
  res.pronouns = lang.pronouns.plural
  res.wearMsg = "{nv:char:pull:true} the denim shorts up {pa:char} long, smooth legs, pulling up the zip and fastening the button."
  res.removeMsg = "{if:item:pulledDown:{nv:char:step:true} out of {nm:item:the} around {pa:char} ankles.:{nv:char:unfasten:true} the button on {pa:char} denim shorts, and {cj:char:pull} down the zip. After a bit of a wriggle, they slid down {pa:char} smooth legs, and {pv:char:step} out of them.}"
  res.garmentType = "swimwear";
  res.subtype = 'underwear'
  res.ripOff = erotica.ripOffPants
  return res;
};


const HALTER = function() {
  const res = WEARABLE_THAT_PULLS_UP(2, ["chest", "nipple"], "neck");
  res.pullsoff = "halter";
  res.strength = 2
  res.fastenStyle = 'halter'
  res.specialWearMsg = function(char) {
    if (char.hasBodyPart("tit")) {
      if (char.hasHugeBoobs) {
        return "{nv:char:pull:true} on {nm:item:the} over {pa:char} huge tits, struggling to fastening it at the back, then adjusting the cups to hold {pa:char} boobs as best they can.";
      }
      else {
        return "{nv:char:pull:true} on {nm:item:the}, fastening it at the back, then adjusting the cups to hold {pa:char} boobs comfortably.";
      }
    }
    else if (char === player) {
      return "{nv:char:pull:true} on {nm:item:the}, fastening it at the back as {pv:char:lament} that {pv:char:have} have no tits to fill it out.";
    }
    else {
      return "{nv:char:pull:true} on {nm:item:the}, fastening it at the back.";
    }
  }
  res.specialRemoveMsg = function(char) {
    if (char.hasBodyPart("tit")) {
      if (char.hasHugeBoobs) {
        return "{nv:char:unfasten:true} {pa:char} {nm:item}, pulling it off to bare {pa:char} huge tits.";
      }
      else {
        return "{nv:char:unfasten:true} {pa:char} {nm:item}, pulling it off to bare {pa:char} tits.";
      }
    }
    else {
      return "{nv:char:unfasten:true} {pa:char} {nm:item}, pulling it off to bare {pa:char} chest.";
    }
  }
  res.stripper = function() {
    return "Slowly {nv:char:unfasten} {nm:item:the}. She pulls it off, her breasts bare; the men cheer and whistle."
  }
  res.ripOff = erotica.ripOffHalter
  res.garmentType = "swimwear";
  res.subtype = 'halter'
  return res;
};


const BRIEFS = function() {
  const res = WEARABLE_THAT_PULLS_DOWN(2, ["crotch", "groin", "buttock"]);
  res.parserPriority = 5 // for ensembles, so one garment gets priority
  res.specialWearMsg = function(char) {
    if (char.hasBodyPart("cock")) {
      return "{nv:char:pull:true} the briefs up {pa:char} legs and over {pa:char} hips, covering {pa:char} {cock:char}.";
    }
    else {
      return "{nv:char:pull:true} the briefs up {pa:char} legs and over {pa:char} hips.";
    }
  }
  res.specialRemoveMsg = function(char) {
    if (this.pulledDown) return "{nv:char:step:true} out of {nm:item:the} around {pa:char} ankles.";

    if (char.hasBodyPart("cock")) {
      return "{nv:char:pull:true} down {pa:char} briefs, revealing {pa:char} {cock:char}. They slide down {pa:char} legs and {pv:char:step} out of them.";
    }
    else if (char.hasBodyPart("pussy")) {
      return "{nv:char:pull:true} down {pa:char} briefs, baring {pa:char} pussy. They slide down {pa:char} legs and {pv:char:step} out of them.";
    }
    else {
      return "{nv:char:pull:true} down {pa:char} briefs. They slide down {pa:char} legs and {pv:char:step} out of them.";
    }
  }
  res.pullsoff = "down";
  res.pronouns = lang.pronouns.plural;
  res.strength = 2
  res.garmentType = "swimwear";
  res.subtype = 'underwear'
  res.ripOff = erotica.ripOffPants
  

  return res;
};


const THONG_SW = function() {
  const res = THONG()
  res.garmentType = "swimwear"
  res.subtype = 'underwear'
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
  res.wearMsg = "{nv:char:pull:true} on the left boot, then the right."
  res.removeMsg = "{nv:char:pull:true} off {pa:char} left boot, then the right."
  res.pronouns = lang.pronouns.plural
  res.defArticle = "the pair of"
  res.indefArticle = "a pair of"
  res.ripOff = erotica.ripOffFootwear
  res.garmentType = "leatherwear"
  res.subtype = 'shoe'
  res.footwear =  true
  return res;
};


const SHOES = function(shortName) {
  const res = WEARABLE_X(8, ["foot"]);
  res.wearMsg = "{nv:char:put:true} on the left {show:item:shortName}, then the right."
  res.removeMsg = "{nv:char:pull:true} off {pa:char} left {show:item:shortName}, then the right."
  res.pronouns = lang.pronouns.plural;
  res.shortName = shortName || 'shoe'
  res.defArticle = "the pair of"
  res.indefArticle = "a pair of"
  res.ripOff = erotica.ripOffFootwear
  res.garmentType = "smart"
  res.subtype = 'shoe'
  res.footwear = true
  return res;
};


// MISC


const PASTIES = function() {
  const res = WEARABLE_X(2, "nipple");
  res.wearMsg = "{nv:char:stick:true} one pastie on {pa:char} left nipple, and then the other on the right. They do not leave much to the imagination."
  res.removeMsg = "{nv:char:gasp:true} slightly as {pv:char:pull} the pastie off {pa:char} left nipple; then {pv:char:do} likewise for the right."
  res.pronouns = lang.pronouns.plural;
  res.garmentType = "erotica"
  res.subtype = 'pasties'
  res.ripOff = function(p) {
    this.loc = p.char.loc
    this.worn = false
    p.char.msg("{nv:char:gasp:true} as {pv:char:yank} the pastie off {pa:char} left nipple; then {pv:char:do} likewise for the right.", p)
    p.target.arousalBomb(p.target.hasBodyPart("tit") ? 6 : 2)
    return true
  }

  res.strength = 3
  return res;
};


const COLLAR = function() {
  const res = WEARABLE_X(2, "neck");
  res.garmentType = "erotica"
  res.subtype = 'collar'
  res.wearMsg = "{nv:char:put:true} the collar round {pa:char} neck, and {cj:char:fasten} it."
  res.removeMsg = "{nv:char:unfasten:true} the collar, and take it off."
  res.ripOff = function(p) {
    this.loc = p.char.loc
    this.worn = false
    p.char.msg("{nv:char:untie:true} {nms:item:the} {nm:item}" + s + ", and {cj:char:pull} it off.", p)
    return true
  }
  return res;
};

const TIE = function() {
  const res = WEARABLE_X(5, "neck");
  res.garmentType = "smart"
  res.subtype = 'tie'
  res.wearMsg = "{nv:char:put:true} {nm:item:the} round {pa:char} neck, and {cj:char:fasten} it."
  res.removeMsg = "{nv:char:unfasten:true} {nm:item:the}, and take it off."
  res.ripOff = function(p) {
    this.loc = p.char.loc
    this.worn = false
    p.char.msg("{nv:char:untie:true} {nms:item:the} {nm:item}" + s + ", and {cj:char:pull} it off.", p)
    return true
  }
  return res;
};


const LOIN_CLOTH = function(backToo) {
  const res = WEARABLE_X(2, backToo ? ["groin", "buttock"] : ["groin"]);
  res.garmentType = "erotica"
  res.subtype = 'loincloth'
  res.wearMsg = "{nv:char:hold:true} the loin cloth around {pa:char} waist, and tie it at the side.{ifPlayer:char:{once: it feels like one gust of wind and everything is on display to the world.}}"
  res.removeMsg = "{nv:char:untie:true} the loin cloth, and remove it."
  res.ripOff = function(p) {
    this.loc = p.char.loc
    this.worn = false
    p.char.msg("{nv:char:unfasten:true} {nms:item:the} {nm:item}" + s + ", and {cj:char:pull} it off.", p)
    p.target.arousalBomb(9)
    return true
  }
  return res;
};




erotica.exposeChest = function(target) {
  const g = target.getOuterWearable("chest")
  if (g) {
    return ', revealing {pa:item} ' + g.alias
  }
  else if (target.hasHugeBoobs) {
    return ', baring {pa:item} huge tits'
  }
  else if (target.hasBodyPart("tit")) {
    return ', baring {pa:item} {tits:item}'
  }
  else {
    return ', baring {pa:item} chest'
  }
}


erotica.exposeGroin = function(target) {
  const g = target.getOuterWearable("groin")
  if (g) {
    return ', revealing {pa:item} ' + g.alias
  }
  else if (target.hasBodyPart("cock")) {
    return ', baring {pa:item} {cock:item}'
  }
  else if (target.hasBodyPart("pussy")) {
    return ', baring {pa:item} pussy'
  }
  else {
    return ', baring {pa:item} smooth crotch'
  }
}






erotica.ripOffHalter = function(p) {
  if (!p.strength) p.strength = 0
  this.worn = false
  this.loc = p.char.loc
  const s = erotica.exposeChest(p.item)
  const arousalBomb = p.item.hasBodyPart("tit") ? 5 :1
  let res = "{nv:char:un" + this.fastenVerb + ":true} {nms:item:the} {nm:garment}"
  res += this.fastenFront ? " between the cups" : " at the back"

  if (p.strength >= this.strength) {
    const verb = p.strength > 2 ? "cut" : "break"
    res = "{nv:char:" + verb + ":true} the straps on {nms:item:the} {nm:garment}"
    res += " and pull it away" + s + ", dropping the remains on the floor."
    this.damage("rip")
    p.item.arousalBomb(arousalBomb + 1)
  }
  else if (this.fastenStyle === "halter" || this.fastenStyle === "strapless") {
    res += " and pull it away" + s + ", dropping the garment to the floor."
    p.item.arousalBomb(arousalBomb)
  }
  else if (this.pulledUp) {
    failedmsg("{pv:garment:be:true} already pulled up; it is not going any more than that.", p)
    this.worn = true
    this.loc = p.item.name
    return false
  }
  else {
    res += " and push it up to {pa:item} neck" + s + "."
    this.worn = true
    this.loc = p.item.name
    this.pulledUp = true
    p.item.arousalBomb(arousalBomb)
  }
  p.char.msg(res, p)
  return true
}


erotica.ripOffPants = function(p) {
  // covers skirts?, briefs, thongs, tights
  if (!p.strength) p.strength = 0
  this.loc = p.char.loc
  this.worn = false
  const arousalBomb = p.item.getOuterWearable("groin") ? 4 : 8
  const s = erotica.exposeGroin(p.item)

  if (p.strength >= this.strength) {
    const verb = p.strength > 2 ? "cut" : "rip"
    p.char.msg("{nv:char:" + verb + ":true} the {nm:garment} off {nm:item:the}" + s + ".", p)
    p.item.arousalBomb(arousalBomb + 1)
    this.damage("rip");
  }
  else if (this.wrapSkirt) {
    p.item.arousalBomb(arousalBomb)
    p.char.msg("{nv:char:unfasten:true} {nms:item:the} {nm:garment}" + s + ", letting {ob:garment} drop to the ground.", p)
  }
  else if (this.sideTie) {
    p.char.msg("{nv:char:unfasten:true} {nms:item:the} {nm:garment} at the left hip" + s + ", then on the right too before letting {ob:garment} drop to the ground.", p)
    p.item.arousalBomb(arousalBomb)
  }
  else if (!p.restraint.points.includes("ankles")) {
    p.char.msg("{nv:char:unfasten:true} {nms:item:the} {nm:garment}, and {cj:pull} {ob:garment} down {pa:item} legs" + s + ", before pulling {ob:garment} off completely and dropping {ob:garment} to the ground.", p)
  }
  else if (!p.restraint.legsOpen && this.pullsDown) {
    if (this.pulledDown) {
      failedmsg("{pv:item:be:true} already pulled down; it is not going any more than that.", p)
      this.worn = true
      this.loc = p.item.name
      return false
    }
    else {
      p.char.msg("{nv:char:pull:true} down {nms:item:the} {nm:garment}" + s + ", letting them drop to {pa:item} ankles.", p)
      this.loc = p.item.name
      this.worn = true
      this.pulledDown = true;
      p.item.arousalBomb(arousalBomb)
    }
  }
  else {
    p.char.msg("{nv:char:try:true} to take the {nm:garment} off {nm:item:the}" + s + ", but cannot whilst {nm:item:the} is tied up like that.", p)
    this.loc = p.item.name
    this.worn = true
    p.item.arousalBomb(arousalBomb)
  }
  return true
}


erotica.ripOffTeeShirt = function(p) {
  if (!p.strength) p.strength = 0
  this.loc = p.char.loc
  this.worn = false
  const s = erotica.exposeChest(p.item)
  const arousalBomb = p.item.hasBodyPart("tit") ? (p.item.getOuterWearable("chest") ? 3 : 6) : 2


  if (p.strength >= this.strength) {
    const verb = p.strength > 2 ? "cut" : "rip"
    p.char.msg("{nv:char:" + verb + ":true} the {nm:garment} off {nm:item:the}" + s + ".", p)
    this.damage("rip");
    p.item.arousalBomb(arousalBomb + 1)
  }
  else if (!p.restraint.points.includes("wrists")) {
    p.char.msg("{nv:char:pull:true} the {nm:garment}, over the head of {nm:item:the}" + s + ", and {cj:char:drop} it on the floor.", p)
    p.item.arousalBomb(arousalBomb)
  }
  else if (this.pulledUp) {
    failedmsg("{pv:garment:be:true} already pulled up; it is not going any more than that.", p)
    this.worn = true
    this.loc = p.item.name
    return false
  }
  else {
    p.char.msg("{nv:char:push:true} {nms:item:the} {nm:garment} up" + s + ".", p)
    this.worn = true
    this.loc = p.item.name
    this.pulledUp = true
    p.item.arousalBomb(arousalBomb)
  }
  return true
}


erotica.ripOffButtoned = function(p) {
  if (!p.strength) p.strength = 0
  this.loc = p.char.loc
  this.worn = false
  const s = erotica.exposeChest(p.item)
  const arousalBomb = p.item.hasBodyPart("tit") ? (p.item.getOuterWearable("chest") ? 3 : 6) : 2
  
  if (p.strength >= this.strength) {
    const verb = p.strength > 2 ? "cut" : "rip"
    p.char.msg("{nv:char:" + verb + ":true} the {nm:garment} off {nm:item:the}" + s + ".", p)
    this.damage("rip");
    p.item.arousalBomb(arousalBomb + 1)
  }
  else if (!p.restraint.points.includes("wrists")) {
    p.char.msg("{nv:char:unfasten:true} {nms:item:the} {nm:garment}" + s + ", and {cj:char:pull} it off {pa:item} arms, dropping it on the floor.", p)
    p.item.arousalBomb(arousalBomb)
  }
  else if (this.unfastened) {
    failedmsg("{pv:item:be:true} already unfastened; it is not going any more than that.", p)
    this.worn = true
    this.loc = p.item.name
    return false
  }
  else {
    p.char.msg("{nv:char:unfasten:true} {nms:item:the} {nm:garment}" + s + ".", p)
    this.worn = true
    this.loc = p.item.name
    this.unfastened = true
    p.item.arousalBomb(arousalBomb)
  }

  return true
}


erotica.ripOffFootwear = function(p) {
  if (!p.strength) p.strength = 0
  this.loc = p.char.loc
  this.worn = false
  if (!p.restraint.points.includes("ankles") || !this.getSlots().includes("calf")) {
    p.char.msg("{nv:char:unfasten:true} {nms:item:the} {nm:garment}" + s + ", and {cj:char:pull} them off.", p)
  }
  else if (p.strength >= this.strength) {
    const verb = p.strength > 2 ? "cut" : "rip"
    p.char.msg("{nv:char:" + verb + ":true} the {nm:garment} off {nm:item:the}" + s + ".", p)
    this.damage("rip");
  }
  else {
    p.char.msg("{nv:char:tie:true} to remove {nms:item:the} {nm:garment}" + s + ", but cannot whilst {sb:item} is tied up like that.", p)
    this.worn = true
    this.loc = p.item.name
  }
  return true
}


erotica.ripOffSwimsuit = function(p) {
  if (!p.strength) p.strength = 0
  this.loc = p.char.loc
  this.worn = false
  const s1 = erotica.exposeChest(p.item)
  const s2 = erotica.exposeGroin(p.item)
  const arousalBomb = p.item.hasBodyPart("tit") ? 9 : 7

  if (p.strength >= this.strength) {
    // straps can be broken, so shred
    const verb = p.strength > 2 ? "cut" : "rip"
    p.char.msg("{nv:char:" + verb + ":true} the shoulder straps of {nms:item:the} {nm:garment} and it falls to {pa:item} waist" + s1 + ". Then {pv:char:" + verb + ":true} the sides and crotch o {nm:garment:the}, letting the shredded remains drop to the floor" + s2 + ".", p)
    this.damage("rip");
    p.item.arousalBomb(arousalBomb + 1)
  }
  else if (!p.restraint.points.includes("ankles") && !p.restraint.points.includes("wrists")) {
    // wrists and ankles not held, so remove completely
    p.char.msg("{nv:char:pull:true} {nms:item:the} {nm:garment} off {pa:item} shoulders" + s1 + ", and then {cj:ease} {ob:garment} down {pa:item} legs, over {pa:item} hips" + s2 + ", before pulling {ob:garment} off completely and dropping {ob:garment} to the ground.", p)
    p.item.arousalBomb(arousalBomb)
  }
  else if (!p.restraint.points.includes("wrists") && !p.restraint.legsOpen) {
    // ankles held, not wrists, legs closed, so down to ankles
    p.char.msg("{nv:char:pull:true} {nms:item:the} {nm:garment} off {pa:item} shoulders" + s1 + ", and then {cj:ease} {ob:garment} down {pa:item} legs, over {pa:item} hips" + s2 + ". {nm:garment:the} falls down {pa:item} legs to {pa:item} ankles.", p)
    this.loc = p.item.name
    this.worn = true
    this.pulledDown = 2
    p.item.arousalBomb(arousalBomb)
  }
  else {
    p.char.msg("{nv:char:try:true} to remove {nms:item:the} {nm:garment}, but cannot whilst {sb:item} is tied up like that.", p)
    this.worn = true
    this.loc = p.item.name
  }
  return true
}


erotica.ripOffSlingBikini = function(p) {
  if (!p.strength) p.strength = 0
  this.loc = p.char.loc
  this.worn = false
  const s1 = erotica.exposeChest(p.item)
  const s2 = erotica.exposeGroin(p.item)
  const arousalBomb = p.item.hasBodyPart("tit") ? 9 : 7

  if (p.strength >= this.strength) {
    // straps can be broken
    const verb = p.strength > 2 ? "cut" : "rip"
    p.char.msg("{nv:char:" + verb + ":true} the shoulder straps of {nms:item:the} {nm:garment} and it falls to the ground, leaving {pa:item} torso naked.", p)
    this.damage("rip");
    p.item.arousalBomb(arousalBomb + 1)
  }
  else if (!p.restraint.points.includes("ankles") && !p.restraint.points.includes("wrists")) {
    // ankles and wrists free
    p.char.msg("{nv:char:pull:true} {nms:item:the} {nm:garment} off {pa:item} shoulders. It slides down {nms:item:the} body, to her feet, leaving her torso naked. {nv:char:pull:true} {nm:garment:the} off completely, and {cj:char:drop} {ob:garment} on the ground.", p)
    p.item.arousalBomb(arousalBomb)
  }
  else {
    // ankles held
    p.char.msg("{nv:char:pull:true} {nms:item:the} {nm:garment} off {pa:item} shoulders. It slides down {nms:item:the} body, to her ankles, leaving her torso naked.", p)
    this.pulledDown = true
    this.loc = p.item.name
    this.weorn = true
    p.item.arousalBomb(arousalBomb)
  }
  return true
}


// We have an issue that a dress could be pulled up and pulled down, which means PULL UP DRESS
// could be to pull up the top to hide stuff, or the bottom pulled up to expose it! I have
// chosen to assume a dress top cannot be pulled down, but that is off if it is strapless.
// Also, dresses can be removed by going up, over the head, or from going down, and stepping out of it.
erotica.ripOffDress = function(p) {
  if (!p.strength) p.strength = 0
  this.loc = p.char.loc
  this.worn = false
  const s1 = erotica.exposeChest(p.item)
  const s2 = erotica.exposeGroin(p.item)
  // might need revising???
  let arousalBomb = p.item.getOuterWearable("groin") ? 3 : 7
  if (p.item.hasBodyPart("tit") && !p.item.getOuterWearable("chest")) arousalBomb += 2

  if (p.strength >= this.strength) {
    const verb = p.strength > 2 ? "cut" : "rip"
    p.char.msg("{nv:char:" + verb + ":true} the shoulder straps of {nms:item:the} {nm:garment} and it falls to {pa:item} waist" + s1 + ". Then {pv:char:" + verb + ":true} the sides and crotch too, letting the shredded remains drop to the floor" + s2 + ".", p)
    this.damage("rip");
    p.item.arousalBomb(arousalBomb + 1)
  }

  //if (this.strapless) {
  else if (!p.restraint.points.includes("ankles")) {
    p.char.msg("{nv:char:pull:true} down {nms:item:the} {nm:garment}" + s1 + ", and then {cj:ease} {ob:garment} down {pa:item} legs, over {pa:item} hips" + s2 + ", before pulling {ob:garment} off completely and dropping {ob:garment} to the ground.", p)
    p.item.arousalBomb(arousalBomb)
  }
  else if (!p.restraint.legsOpen) {
    p.char.msg("{nv:char:pull:true} down {nms:item:the} {nm:garment}" + s1 + ", and then {cj:ease} {ob:garment} down {pa:item} legs, over {pa:item} hips" + s2 + ", before pulling {ob:garment} off completely and dropping {ob:garment} to the ground.", p)
    p.item.arousalBomb(arousalBomb)
  }
  else if (!p.restraint.points.includes("ankles") && !p.restraint.points.includes("wrists")) {
    p.char.msg("{nv:char:pull:true} {nms:item:the} {nm:garment} off {pa:item} shoulders" + s1 + ", and then {cj:ease} {ob:garment} down {pa:item} legs, over {pa:item} hips" + s2 + ", before pulling {ob:garment} off completely and dropping {ob:garment} to the ground.", p)
    p.item.arousalBomb(arousalBomb)
  }
  else if (!p.restraint.points.includes("wrists") && !p.restraint.legsOpen) {
    p.char.msg("{nv:char:pull:true} {nms:item:the} {nm:garment} off {pa:item} shoulders" + s1 + ", and then {cj:ease} {ob:garment} down {pa:item} legs, over {pa:item} hips" + s2 + ". {nm:garment:the} falls down {pa:item} legs to {pa:item} ankles.", p)
    p.item.arousalBomb(arousalBomb)
  }
  else {
    p.char.msg("{nv:char:tie:true} to remove {nms:item:the} {nm:garment}" + s + ", but cannot whilst {sb:item} is tied up like that.", p)
    this.worn = true
    this.loc = p.item.name
  }
  return true
}
