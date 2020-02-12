


materials = {
  paper:{ fire:"ash", whip:true, rip:true, name:'paper', strength:1 },
  cloth:{ fire:"ash", whip:true, rip:true, name:'cloth', strength:2 },
  pvc:{ fire:"ash", name:'pvc', strength:3 },
  leather:{ fire:"ash", name:'leather', strength:4 },
  flesh:{ name:'flesh', strength:1 },
  ceramic:{ smash:true, name:'ceramic', strength:7 },
  glass:{ smash:true, name:'glass', strength:3 },
  wood:{ fire:"ash", smash:true, name:'wood', strength:6 },
  stone:{ smash:true, name:'stone', strength:7 },
  metal:{ rust:true, name:'metal', strength:8 },
  rubber:{ name:'rubber', strength:5 },
  plastic:{ name:'plastic', strength:6 },
};




const MADE_OF = function(material) {
  res = {
    material:material,
    strength:material.strength,
    damageable:function(damage) {
      return this.material[damage] !== undefined;
    },
    damage:function(damage, report) {
      if (!this.damageable(damage)) {
        // Ideally you should test if this will work and give your own error message
        // (or none at all), this is a safety net that we hope is not used.
        failedmsg("That doesn't work.");
        return false;
      }
      const flindersName = (typeof this.material[damage] === "string" ? 
                            this.material[damage] + "_flinders" : 
                            this.material.name + "_flinders");
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
      if (report) msg(s);
      return true;
    },
  };
  return res;
};


function haveFireSource() { 
  const l = scopeReachable();
  for (let i = 0; i < l.length; i++) {
    if (l[i].firesource) {
      return l[i].firesource;
    }
  }
  return null;
}



commands.unshift(new Cmd('Burn', {
  npcCmd:true,
  rules:[cmdRules.isHere],
  regex:/^(burn) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isPresent}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    if (!haveFireSource(char)) {
      failedmsg(lang.nounVerb(char, "need", true) + " a source of fire to burn something.");
      return FAILED;
    }
    return cmdDamage("fire", char, objects[0], "#### will not burn.");
  },
}));

commands.unshift(new Cmd('Smash', {
  npcCmd:true,
  rules:[cmdRules.isHere],
  regex:/^(smash) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isPresent}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdDamage("smash", char, objects[0], "#### cannot be smashed up.");
  },
}));

commands.unshift(new Cmd('Shred', {
  npcCmd:true,
  rules:[cmdRules.isHere],
  regex:/^(shred|rip up|rip) (.+)$/,
  objects:[
    {ignore:true},
    {scope:parser.isPresent}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    return cmdDamage("rip", char, objects[0], "#### cannot be ripped.");
  },
}));


function cmdDamage(damage, char, objects, nomsg) {
  let success = false;
  const multiple = objects.length > 1 || parser.currentCommand.all;
  if (!char.canManipulate(objects[0], "damage")) {
    return FAILED;
  }
  for (let i = 0; i < objects.length; i++) {
    if (!char.getAgreement("Destroy", objects[i])) {
      // The getAgreement should give the response
      continue;
    }
    // Should be here anyway
    else if (objects[i][damage]) {
      success = objects[i][damage]();
    }
    else if (objects[i].damageable === undefined || !objects[i].damageable(damage)) {
      failedmsg(sentenceCase(nomsg.replace("####", objects[i].byname({article:DEFINITE}))));
    }
    else {
      success = objects[i].damage(damage, true);
    }
  }
  return success ? SUCCESS : FAILED;
}  



createItem("ash_flinders", 
  {
    regex:/ash|ashes/,
    pronouns:lang.pronouns.plural,
    examine:"A pile of ashes that used to be ####.",
    takemsg:"Why would anyone want to pick up a load of ashes?",
    damagemsg:"#### burnt to ashes.",
  },
);

createItem("rust_flinders", 
  {
    pronouns:lang.pronouns.plural,
    examine:"A pile of rusted metal that used to be ####.",
    destroyMsg:"#### rusted.",
    takemsg:"Why would anyone want to pick up a useless load of rusted metal?",
    damagemsg:"#### rusted through so much it is useless.",
  },
);

createItem("cloth_flinders", 
  {
    pronouns:lang.pronouns.plural,
    examine:"A whole bunch of rags that used to be ####.",
    takemsg:"Why would anyone want to pick up a load of rags?",
    damagemsg:"#### is shredded.",
  },
);

createItem("paper_flinders", 
  {
    pronouns:lang.pronouns.plural,
    examine:"A whole bunch of torn up paper that used to be ####.",
    takemsg:"Why would anyone want to pick up a load of ripped up paper?",
    damagemsg:"#### is ripped to shreds.",
  },
);

createItem("wood_flinders", 
  {
    pronouns:lang.pronouns.plural,
    examine:"A whole bunch of splintered wood that used to be ####.",
    takemsg:"Why would anyone want to pick up a load of broken wood? {i:Think of the splinters!}",
    damagemsg:"#### is smashed to splinters.",
  },
);

createItem("glass_flinders", 
  {
    pronouns:lang.pronouns.plural,
    examine:"Some broken bits of glass that used to be ####.",
    takemsg:"Why would anyone want to pick up a load of broken glass?",
    damagemsg:"#### is smashed.",
  },
);

createItem("ceramic_flinders", 
  {
    pronouns:lang.pronouns.plural,
    examine:"Some broken bits of pottery that used to be ####.",
    takemsg:"Why would anyone want to pick up a load of broken pottery?",
    damagemsg:"#### is smashed.",
  },
);

  createItem("stone_flinders", 
  {
    pronouns:lang.pronouns.plural,
    examine:"Some broken bits of stone that used to be ####.",
    takemsg:"Why would anyone want to pick up a load of broken stones?",
    damagemsg:"#### is smashed.",
  },
);
