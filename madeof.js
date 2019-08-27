


materials = {
  paper:{ fire:"ash", whip:true, rip:true },
  cloth:{ fire:"ash", whip:true, rip:true },
  pvc:{ fire:"ash"},
  leather:{ fire:"ash"},
  flesh:{},
  ceramic:{ smash:true },
  glass:{ smash:true },
  wood:{ fire:"ash", smash:true },
  stone:{ smash:true },
  metal:{ rust:true },
  rubber:{},
};




const MADE_OF = function(material) {
  res = {
    material:material,
    damageable:function(damage) {
      return material[damage] !== undefined;
    },
    damage:function(damage) {
      if (!this.damageable(damage)) {
        // Ideally you should test if this will work and give your own error message
        // (or none at all), this is a safety net that we hope is not used.
        msg("That doesn't work.");
        return false;
      }
      const flindersName = (typeof material[damage] === "string" ? 
                            material[damage] + "_flinders" : 
                            damage + "_flinders");
      if (w[flindersName] === undefined) {
        errormsg("Cannot find flinders called " + flindersName + ".");
        return false;
      }
      flinders = cloneObject(w[flindersName], this.loc);
      let s = flinders["damagemsg"];
      if (s === undefined) s = "#### " + damage + ".";
      s = sentenceCase(s.replace("####", this.byname({article:DEFINITE})));
      flinders.examine = flinders.examine.replace("####", this.byname({article:DEFINITE}));
      this.loc = undefined;
      msg(s);
      return true;
    },
  };
  return res;
};


function haveFireSource() { 
  const l = scope(isReachable);
  for (let i = 0; i < l.length; i++) {
    if (l[i].firesource) {
      return l[i].firesource;
    }
  }
  return null;
}



commands.unshift(new Cmd('Burn', {
  npcCmd:true,
  rules:[cmdRules.isHereRule],
  regex:/^(burn) (.+)$/,
  objects:[
    {ignore:true},
    {scope:isPresent}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    let char;
    if (this.forNpc) {
      char = objects[0][0];
      if (!char.npc) {
        msg(NOT_NPC(char));
        return FAILED; 
      }
      objects.shift();
    }
    else {
      char = game.player;
    }
    if (!haveFireSource(char)) {
      msg(nounVerb(char, "need", true) + " a source of fire to burn something.");
      return FAILED;
    }
    return cmdDamage("fire", char, objects[0], "#### will not burn.");
  },
}));

commands.unshift(new Cmd('Smash', {
  npcCmd:true,
  rules:[cmdRules.isHereRule],
  regex:/^(smash) (.+)$/,
  objects:[
    {ignore:true},
    {scope:isPresent}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    let char;
    if (this.forNpc) {
      char = objects[0][0];
      if (!char.npc) {
        msg(NOT_NPC(char));
        return FAILED; 
      }
      objects.shift();
    }
    else {
      char = game.player;
    }
    return cmdDamage("smash", char, objects[0], "#### cannot be smashed up.");
  },
}));

commands.unshift(new Cmd('Shred', {
  npcCmd:true,
  rules:[cmdRules.isHereRule],
  regex:/^(shred|rip up|rip) (.+)$/,
  objects:[
    {ignore:true},
    {scope:isPresent}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    let char;
    if (this.forNpc) {
      char = objects[0][0];
      if (!char.npc) {
        msg(NOT_NPC(char));
        return FAILED; 
      }
      objects.shift();
    }
    else {
      char = game.player;
    }
    return cmdDamage("smash", char, objects[0], "#### cannot be ripped.");
  },
}));


function cmdDamage(damage, char, objects, nomsg) {
  let success = false;
  const multiple = objects.length > 1 || parser.currentCommand.all;
  if (!char.canManipulate()) {
    return FAILED;
  }
  for (let i = 0; i < objects.length; i++) {
    if (!char.getAgreement("Destroy", objects[i])) {
      // The getAgreement should give the response
      continue;
    }
    // Should be here anyway
    else if (objects[i].damageable === undefined || !objects[i].damageable(damage)) {
      msg(sentenceCase(nomsg.replace("####", objects[i].byname({article:DEFINITE}))));
    }
    else {
      success = objects[i].damage(damage);
    }
  }
  return success ? SUCCESS : FAILED;
}  


