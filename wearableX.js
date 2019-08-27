


const TEE_SHIRT = function(lowCut) {
  const slots = ["chest", "nipple", "midriff", "upperback", "lowerback", "shoulder"];
  if (!lowCut) slots.push("cleavage");
  const res = WEARABLE(4, slots);
  res.pullsoff = true;
  res.wearMsg = function(char) {
    return nounVerb(char, "pull", true) + " the tee-shirt over " + char.pronouns.poss_adj + " head, and down over " + char.pronouns.poss_adj + " torso.";
  }
  res.removeMsg = function(char) {
    return nounVerb(char, "pull", true) + " the tee-shirt up and over " + char.pronouns.poss_adj + " head, and down over " + char.pronouns.poss_adj + " torso.";
  }
  res.stripper = function(char) {
    const inner = game.player.getInnerWearable("chest");
    if (inner === this) {
      if (game.player.hasHugeBoobs) {
        msg(nounVerb(char, "pull", true) + " her " + this.byname() + " over her head, making her massive gazongas bounce. The men cheer to see them swinging free and bare.");
      }
      else {
        msg(nounVerb(char, "pull", true) + " her " + this.byname() + " over her head. The men cheer at the sight of her tits exposed for their delight.");
      }
    }
    else {
      if (game.player.hasHugeBoobs) {
        msg(nounVerb(char, "pull", true) + " her " + this.byname() + " over her head, her massive gazongas, barely held by her " + inner.byname() + ", bouncing up and down to the delight of the men watching.");
      }
      else {
        msg(nounVerb(char, "pull", true) + " her " + this.byname() + " over her head. The men cheer, now her tits are only cover by a " + inner.byname() + ".");
      }
    }
  }
  return res;
};

const VEST_TOP = function(cropped) {
  const slots = ["chest", "nipple", "midriff", "upperback"];
  if (!cropped) slots.push("midriff", "lowerback");
  const res = WEARABLE(4, slots);
  res.pullsoff = true;
  res.wearMsg = function(char) {
    return nounVerb(char, "pull", true) + " the tee-shirt over " + char.pronouns.poss_adj + " head, and down over " + char.pronouns.poss_adj + " torso.";
  }
  res.removeMsg = function(char) {
    return nounVerb(char, "pull", true) + " the tee-shirt up and over " + char.pronouns.poss_adj + " head, and down over " + char.pronouns.poss_adj + " torso.";
  }
  res.stripper = function(char) {
    const inner = game.player.getInnerWearable("chest");
    if (inner === this) {
      if (game.player.hasHugeBoobs) {
        msg(nounVerb(char, "pull", true) + " her " + this.byname() + " over her head, making her massive gazongas bounce. The men cheer to see them swinging free and bare.");
      }
      else {
        msg(nounVerb(char, "pull", true) + " her " + this.byname() + " over her head. The men cheer at the sight of her tits exposed for their delight.");
      }
    }
    else {
      if (game.player.hasHugeBoobs) {
        msg(nounVerb(char, "pull", true) + " her " + this.byname() + " over her head, her massive gazongas, barely held by her " + inner.byname() + ", bouncing up and down to the delight of the men watching.");
      }
      else {
        msg(nounVerb(char, "pull", true) + " her " + this.byname() + " over her head. The men cheer, now her tits are only cover by a " + inner.byname() + ".");
      }
    }
  }
  return res;
};



const BUTTONED_SHIRT = function(cropped) {
  const slots = ["chest", "nipple", "midriff", "upperback", "shoulder", "arm"];
  if (!cropped) slots.push("midriff", "lowerback");
  const res = WEARABLE(4, slots);
  res.wearMsg = function(char) {
    return nounVerb(char, "pull", true) + " on the shirt and fastens the buttons.";
  }
  res.removeMsg = function(char) {
    return nounVerb(char, "unfasten", true) + " the buttons on " + char.pronouns.poss_adj + " shirt, and shrugs it off.";
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
  const res = WEARABLE(8, jacketSlots[slotCount]);
  res.wearMsg = function(char) {
    return nounVerb(char, "pull", true) + " on " + this.byname({article:DEFINITE}) + " and fastens the buttons.";
  }
  res.removeMsg = function(char) {
    return nounVerb(char, "unfasten", true) + " the buttons on " + this.byname({article:DEFINITE}) + " shirt, and shrugs it off.";
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
  const res = WEARABLE(8, skirtSlots[slotCount]);
  res.wearMsg = function(char) {
    if (this.wrapSkirt) {
      return nounVerb(char, "wrap", true) + " the skirt round " + char.pronouns.poss_adj + " waist, and fastens it at " + char.pronouns.poss_adj + " right hip.";
    }
    else {
      return nounVerb(char, "pull", true) + " the skirt up round " + char.pronouns.poss_adj + " waist, and fastens it at the back.";
    }
  }
  res.removeMsg = function(char) {
    return nounVerb(char, "unfasten", true) + " " + char.pronouns.poss_adj + " skirt, and takes it off.";
  }
  res.stripper = function(char) {
    const inner = game.player.getInnerWearable("groin");
    if (inner === this) {
      msg(nounVerb(char, "unfasten", true) + " her " + this.byname() + ", and, after a moment's hesitation, takes it off. The men cheer when they saw she is wearing nothing under it, staring lustily at her exposed pussy.");
    }
    else {
      msg(nounVerb(char, "unfasten", true) + " her " + this.byname() + " and takes it off. The men cheer, now her sex is covered only by " + inner.byname({article:INDEFINITE}) + ".");
    }
  }
  return res;
};


const SHORTS = function(long) {
  const slots = ["crotch", "groin", "buttock", "hip"];
  if (long) slots.push("thigh");
  const res = WEARABLE(4, slots);
  res.pullsoff = true;
  res.wearMsg = function(char) {
    return nounVerb(char, "pull", true) + " the denim shorts up " + char.pronouns.poss_adj + " long, smooth legs, pulling up the zip and fastening the button..";
  }
  res.removeMsg = function(char) {
    return nounVerb(char, "unfasten", true) + " the button on " + char.pronouns.poss_adj + " denim shorts, and pulls down the zip. After a bit of a wriggle, they slid down " + char.pronouns.poss_adj + " smooth legs, and she steps out of them.";
  }
  return res;
};



const PANTS = function() {
  const res = WEARABLE(4, ["crotch", "groin", "buttock", "hip", "thigh", "knee", "calf"]);
  res.pullsoff = true;
  res.wearMsg = function(char) {
    return nounVerb(char, "pull", true) + " the denim shorts up " + char.pronouns.poss_adj + " long, smooth legs, pulling up the zip and fastening the button..";
  }
  res.removeMsg = function(char) {
    return nounVerb(char, "unfasten", true) + " the button on " + char.pronouns.poss_adj + " denim shorts, and pulls down the zip. After a bit of a wriggle, they slid down " + char.pronouns.poss_adj + " smooth legs, and she steps out of them.";
  }
  return res;
};





const DRESS = function(slots) {
  const res = WEARABLE(5, slots);
  res.pullsoff = true;
  res.wearMsg = function(char) {
    return nounVerb(char, "step", true) + " into the dress, pulling it over " + char.pronouns.poss_adj + " torso, the straps over " + char.pronouns.poss_adj + " shoulders, before fastening it at the back.{once: It fits perfectly.}";
  }
  res.removeMsg = function(char) {
    return nounVerb(char, "unfasten", true) + " " + char.pronouns.poss_adj + " dress, then pulls the straps off " + char.pronouns.poss_adj + " shoulders before it drops to the floor. She steps out of it.";
  }
  res.stripper = function(char) {
    const chest = game.player.getInnerWearable("chest");
    const groin = game.player.getInnerWearable("groin");
    debugmsg("here");
    if (chest === this && groin === this) {
    debugmsg("here");
      msg("Slowly " + nounVerb(char, "unfasten") + " the dress, conscious she had no underwear on. She pulls it off, her body bare, her sex exposed; the men cheer and whistle.");
    }
    else if (chest === this) {
      msg("Slowly " + nounVerb(char, "unfasten") + " the dress, glad she is at least wearing " + groin.byname({article:INDEFINITE}) + ". She pulls the dress off, her body almost bare, her " + player.bust + " exposed. The men cheer and whistle at her.");
    }
    else if (groin === this) {
      msg("Slowly " + nounVerb(char, "unfasten") + " the dress, conscious she had no panties on. She pulls it off, her body bare, apart from her " + chest.byname() + ", her sex exposed; the men cheer and whistle.");
    }
    else {
      msg(nounVerb(char, "unfasten", true) + " the dress, glad she is wearing underwear on. She pulls it off, her body bare, her sex exposed; the men cheer and whistle.");
    }
  }

  return res;
};








const THONG = function() {
  const res = WEARABLE(2, ["crotch", "groin"]);
  res.pullsoff = true;
  res.wearMsg = function(char) {
    return nounVerb(char, "pull", true) + " the tiny thong up " + char.pronouns.poss_adj + " legs and over " + char.pronouns.poss_adj + " hips.";
  }
  res.removeMsg = function(char) {
    return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " thong, and steps out of it.";
  }
  res.wearMsg = function(char) {
    if (char.hasBodyPart("cock")) {
      if (char.arousal > 60) {
         return nounVerb(char, "pull", true) + " the thong up " + char.pronouns.poss_adj + " legs and over " + char.pronouns.poss_adj + " hips, struggling to tuck " + char.pronouns.poss_adj + " erect cock inside as best " + pronounVerb(char, "can") + ".";
      }
      else if (char.hasHugeCock) {
         return nounVerb(char, "pull", true) + " the thong up " + char.pronouns.poss_adj + " legs and over " + char.pronouns.poss_adj + " hips, struggling to tuck " + char.pronouns.poss_adj + " huge cock inside as best " + pronounVerb(char, "can") + ".";
      }
      else if (char.arousal <20) {
         return nounVerb(char, "pull", true) + " the thong up " + char.pronouns.poss_adj + " legs and over " + char.pronouns.poss_adj + " hips, easily covering " + char.pronouns.poss_adj + " limp manhood, despite being so small...";
      }
      else {
         return nounVerb(char, "pull", true) + " the thong up " + char.pronouns.poss_adj + " legs and over " + char.pronouns.poss_adj + " hips, barely covering " + char.pronouns.poss_adj + " manhood.";
      }
    }
    else {
       return nounVerb(char, "pull", true) + " the tiny thong up " + char.pronouns.poss_adj + " legs and over " + char.pronouns.poss_adj + " hips.";
    }
  }
  res.removeMsg = function(char) {
    return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " briefs, and steps out of them.";

    if (char.hasBodyPart("cock")) {
      if (char.arousal > 60) {
         return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " thong, " + char.pronouns.poss_adj + " erect cock spring to attention. They slide down " + char.pronouns.poss_adj + " legs and " + pronounVerb(char, "step") + " out of them.";
      }
      else if (char.hasHugeCock) {
         return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " thong, unleashing " + char.pronouns.poss_adj + " huge cock. They slide down " + char.pronouns.poss_adj + " legs and " + pronounVerb(char, "step") + " out of them.";
      }
      else if (char.arousal <20) {
         return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " thong, revealing " + char.pronouns.poss_adj + " limp cock. They slide down " + char.pronouns.poss_adj + " legs and " + pronounVerb(char, "step") + " out of them.";
      }
      else {
         return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " thong, revealing " + char.pronouns.poss_adj + " cock. They slide down " + char.pronouns.poss_adj + " legs and " + pronounVerb(char, "step") + " out of them.";
      }
    }
    else if (char.hasBodyPart("pussy")) {
      return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " thong, baring " + char.pronouns.poss_adj + ". They slide down " + char.pronouns.poss_adj + " legs and " + pronounVerb(char, "step") + " out of them.";
    }
    else {
       return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " thong. They slide down " + char.pronouns.poss_adj + " legs and " + pronounVerb(char, "step") + " out of them.";
    }
  }
  res.underwear = true;
  return res;
};

const BRA = function() {
  const res = HALTER();
  res.swimwear = false;
  res.underwear = true;
  return res;
};

const PANTIES = function() {
  const res = BRIEFS();
  res.swimwear = false;
  res.underwear = true;
  return res;
};

const BOXERS = function() {
  const res = SHORTS();
  res.swimwear = false;
  res.underwear = true;
  return res;
};






const SWIMSUIT = function(backExposure) {
  const slots = ["chest", "nipple", "midriff", "crotch", "groin", "buttock"];
  if (backExposure > 0) slots.push("lowerback")
  if (backExposure > 1) slots.push("upperback")
  const res = WEARABLE(2, slots)
  res.wearMsg = function(char) {
    return nounVerb(char, "step", true) + " into the swimsuit, and pulls it up " + char.pronouns.poss_adj + " legs, then up, putting " + char.pronouns.poss_adj + " arms through the straps, which she pulls up over " + char.pronouns.poss_adj + " shoulders.";
  };
  res.removeMsg = function(char) {
    return nounVerb(char, "pull", true) + " the swimsuit straps off " + char.pronouns.poss_adj + " shoulders, letting it fall away to " + char.pronouns.poss_adj + " waist, baring " + char.pronouns.poss_adj + " breasts. " + pronounVerb(char, "slide", true) + " the swimsuit down " + char.pronouns.poss_adj + " legs, and steps out of it.";
  };
  res.swimwear = true;
  return res;
};

const SWIM_SHORTS = function(long) {
  const slots = ["crotch", "groin", "buttock", "hip"];
  if (long) slots.push("thigh");
  const res = WEARABLE(2, slots);
  res.pullsoff = true;
  res.wearMsg = function(char) {
    return nounVerb(char, "pull", true) + " the denim shorts up " + char.pronouns.poss_adj + " long, smooth legs, pulling up the zip and fastening the button..";
  }
  res.removeMsg = function(char) {
    return nounVerb(char, "unfasten", true) + " the button on " + char.pronouns.poss_adj + " denim shorts, and pulls down the zip. After a bit of a wriggle, they slid down " + char.pronouns.poss_adj + " smooth legs, and she steps out of them.";
  }
  res.swimwear = true;
  return res;
};

const HALTER = function() {
  const res = WEARABLE(2, ["chest", "nipple"]);
  res.pullsoff = true;
  res.wearMsg = function(char) {
    if (char.hasBodyPart("tit")) {
      if (char.hasHugeBoobs) {
        return nounVerb(char, "pull", true) + " on the halter over " + char.pronouns.poss_adj + " huge tits, struggling to fastening it at the back, then adjusting the cups to hold " + char.pronouns.poss_adj + " boobs as best they can.";
      }
      else {
        return nounVerb(char, "pull", true) + " on the halter, fastening it at the back, then adjusting the cups to hold " + char.pronouns.poss_adj + " boobs comfortably.";
      }
    }
    else if (char === game.player) {
      return nounVerb(char, "pull", true) + " on the halter, fastening it at the back as " + pronounVerb(char, "lament") + " lament that " + pronounVerb(char, "have") + " have no tits to fill it out.";
    }
    else {
      return nounVerb(char, "pull", true) + " on the halter, fastening it at the back.";
    }
  }
  res.removeMsg = function(char) {
    if (char.hasBodyPart("tit")) {
      if (char.hasHugeBoobs) {
        return nounVerb(char, "unfasten", true) + " " + char.pronouns.poss_adj + " halter, pulling it off to bare " + char.pronouns.poss_adj + " huge tits.";
      }
      else {
        return nounVerb(char, "unfasten", true) + " " + char.pronouns.poss_adj + " halter, pulling it off to bare " + char.pronouns.poss_adj + " tits.";
      }
    }
    else {
      return nounVerb(char, "unfasten", true) + " " + char.pronouns.poss_adj + " halter, pulling it off to bare " + char.pronouns.poss_adj + " chest.";
    }
  }
  res.stripper = function(char) {
    msg("Slowly " + nounVerb(char, "unfasten") + " the halter. She pulls it off, her breasts bare; the men cheer and whistle.");
  }
  res.swimwear = true;
  return res;
};

const BRIEFS = function() {
  const res = WEARABLE(2, ["crotch", "groin", "buttock"]);
  res.wearMsg = function(char) {
    if (char.hasBodyPart("cock")) {
      if (char.arousal > 60) {
         return nounVerb(char, "pull", true) + " the briefs up " + char.pronouns.poss_adj + " legs and over " + char.pronouns.poss_adj + " hips, tucking " + char.pronouns.poss_adj + " erect cock inside as best " + pronounVerb(char, "can") + ".";
      }
      else if (char.hasHugeCock) {
         return nounVerb(char, "pull", true) + " the briefs up " + char.pronouns.poss_adj + " legs and over " + char.pronouns.poss_adj + " hips, tucking " + char.pronouns.poss_adj + " huge cock inside as best " + pronounVerb(char, "can") + ".";
      }
      else if (char.arousal <20) {
         return nounVerb(char, "pull", true) + " the briefs up " + char.pronouns.poss_adj + " legs and over " + char.pronouns.poss_adj + " hips, covering " + char.pronouns.poss_adj + " limp manhood.";
      }
      else {
         return nounVerb(char, "pull", true) + " the briefs up " + char.pronouns.poss_adj + " legs and over " + char.pronouns.poss_adj + " hips, covering " + char.pronouns.poss_adj + " manhood.";
      }
    }
    else {
       return nounVerb(char, "pull", true) + " the briefs up " + char.pronouns.poss_adj + " legs and over " + char.pronouns.poss_adj + " hips.";
    }
  }
  res.removeMsg = function(char) {
    return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " briefs, and steps out of them.";

    if (char.hasBodyPart("cock")) {
      if (char.arousal > 60) {
         return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " briefs, " + char.pronouns.poss_adj + " erect cock spring to attention. They slide down " + char.pronouns.poss_adj + " legs and " + pronounVerb(char, "step") + " out of them.";
      }
      else if (char.hasHugeCock) {
         return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " briefs, unleashing " + char.pronouns.poss_adj + " huge cock. They slide down " + char.pronouns.poss_adj + " legs and " + pronounVerb(char, "step") + " out of them.";
      }
      else if (char.arousal <20) {
         return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " briefs, revealing " + char.pronouns.poss_adj + " limp cock. They slide down " + char.pronouns.poss_adj + " legs and " + pronounVerb(char, "step") + " out of them.";
      }
      else {
         return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " briefs, revealing " + char.pronouns.poss_adj + " cock. They slide down " + char.pronouns.poss_adj + " legs and " + pronounVerb(char, "step") + " out of them.";
      }
    }
    else if (char.hasBodyPart("pussy")) {
      return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " briefs, baring " + char.pronouns.poss_adj + ". They slide down " + char.pronouns.poss_adj + " legs and " + pronounVerb(char, "step") + " out of them.";
    }
    else {
      return nounVerb(char, "pull", true) + " down " + char.pronouns.poss_adj + " briefs. They slide down " + char.pronouns.poss_adj + " legs and " + pronounVerb(char, "step") + " out of them.";
    }
  }
  res.pullsoff = true;
  res.pronouns = PRONOUNS.plural;
  res.swimwear = true;
  return res;
};






const BOOTS = function(slotCount) {
  const bootSlots = [
    ["foot"],
    ["foot", "calf"],
    ["foot", "calf", "knee"],
  ];
  const res = WEARABLE(8, bootSlots[slotCount]);
  res.wearMsg = function(char) {
    return nounVerb(char, "pull", true) + " on the left boot, then the right.";
  };
  res.removeMsg = function(char) {
    return nounVerb(char, "pull", true) + " off " + char.pronouns.poss_adj + " left boot, then the right.";
  };
  res.pronouns = PRONOUNS.plural;
  return res;
};

const SHOES = function() {
  const res = WEARABLE(8, "foot");
  res.wearMsg = function(char) {
    return nounVerb(char, "pull", true) + " on the left shoe, then the shoe.";
  };
  res.removeMsg = function(char) {
    return nounVerb(char, "pull", true) + " off " + char.pronouns.poss_adj + " left shoe, then the shoe.";
  };
  res.pronouns = PRONOUNS.plural;
  return res;
};


