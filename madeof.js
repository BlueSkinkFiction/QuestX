


materials = {
  paper:{ fire:"ash", whip:true, rip:true, name:'paper' },
  cloth:{ fire:"ash", whip:true, rip:true, name:'cloth' },
  pvc:{ fire:"ash", name:'pvc'},
  leather:{ fire:"ash", name:'leather'},
  flesh:{ name:'flesh'},
  ceramic:{ smash:true, name:'ceramic' },
  glass:{ smash:true, name:'glass' },
  wood:{ fire:"ash", smash:true, name:'wood' },
  stone:{ smash:true, name:'stone' },
  metal:{ rust:true, name:'metal' },
  rubber:{ name:'rubber'},
};




const MADE_OF = function(material) {
  res = {
    material:material,
    damageable:function(damage) {
      return this.material[damage] !== undefined;
    },
    damage:function(damage) {
      console.log(damage)
      console.log(this.material)
      if (!this.damageable(damage)) {
        // Ideally you should test if this will work and give your own error message
        // (or none at all), this is a safety net that we hope is not used.
        failedmsg("That doesn't work.");
        return false;
      }
      console.log(typeof this.material[damage])
      const flindersName = (typeof this.material[damage] === "string" ? 
                            this.material[damage] + "_flinders" : 
                            this.material.name + "_flinders");
      console.log(flindersName)
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
  rules:[cmdRules.isHere],
  regex:/^(burn) (.+)$/,
  objects:[
    {ignore:true},
    {scope:isPresent}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
    if (!haveFireSource(char)) {
      failedmsg(nounVerb(char, "need", true) + " a source of fire to burn something.");
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
    {scope:isPresent}
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
    {scope:isPresent}
  ],
  useThisScriptForNpcs:true,
  script:function(objects) {
    const char = extractChar(this, objects)
    if (!char) return FAILED;
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
      failedmsg(sentenceCase(nomsg.replace("####", objects[i].byname({article:DEFINITE}))));
    }
    else {
      success = objects[i].damage(damage);
    }
  }
  return success ? SUCCESS : FAILED;
}  



createItem("ash_flinders", 
  {
    regex:/ash|ashes/,
    pronouns:PRONOUNS.plural,
    examine:"A pile of ashes that used to be ####.",
    takemsg:"Why would anyone want to pick up a load of ashes?",
    damagemsg:"#### burnt to ashes.",
  },
);

createItem("rust_flinders", 
  {
    pronouns:PRONOUNS.plural,
    examine:"A pile of rusted metal that used to be ####.",
    destroyMsg:"#### rusted.",
    takemsg:"Why would anyone want to pick up a useless load of rusted metal?",
    damagemsg:"#### rusted through so much it is useless.",
  },
);

createItem("cloth_flinders", 
  {
    pronouns:PRONOUNS.plural,
    examine:"A whole bunch of rags that used to be ####.",
    takemsg:"Why would anyone want to pick up a load of rags?",
    damagemsg:"#### is shredded.",
  },
);

createItem("paper_flinders", 
  {
    pronouns:PRONOUNS.plural,
    examine:"A whole bunch of torn up paper that used to be ####.",
    takemsg:"Why would anyone want to pick up a load of ripped up paper?",
    damagemsg:"#### is ripped to shreds.",
  },
);

createItem("wood_flinders", 
  {
    pronouns:PRONOUNS.plural,
    examine:"A whole bunch of splintered wood that used to be ####.",
    takemsg:"Why would anyone want to pick up a load of broken wood? {i:Think of the splinters!}",
    damagemsg:"#### is smashed to splinters.",
  },
);

createItem("glass_flinders", 
  {
    pronouns:PRONOUNS.plural,
    examine:"Some broken bits of glass that used to be ####.",
    takemsg:"Why would anyone want to pick up a load of broken glass?",
    damagemsg:"#### is smashed.",
  },
);

createItem("ceramic_flinders", 
  {
    pronouns:PRONOUNS.plural,
    examine:"Some broken bits of pottery that used to be ####.",
    takemsg:"Why would anyone want to pick up a load of broken pottery?",
    damagemsg:"#### is smashed.",
  },
);

  createItem("stone_flinders", 
  {
    pronouns:PRONOUNS.plural,
    examine:"Some broken bits of stone that used to be ####.",
    takemsg:"Why would anyone want to pick up a load of broken stones?",
    damagemsg:"#### is smashed.",
  },
);
