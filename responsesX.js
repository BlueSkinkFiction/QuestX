"use strict";


// some need extra for when arousal is high

erotica.defaultResponses = {

  // GROPE
  grope:[
  // tied up and not happy
    {
      test:function(p) { return p.rating < 15 && !p.target.canManipulate() && p.bodypart.name === "tit" },
      msg:"'Please no!' exclaims {nm:target:the} as {nv:actor:squeeze} {pa2:target:actor} tits.",
      script:function(p) { p.target.modifyAttraction(p.actor, -15) },
    },
    {
      test:function(p) { return p.rating < 15 && !p.target.canManipulate() && p.bodypart.name === "pussy" },
      msg:"'Oh God no!' shrieks {nm:target:the} as {nv:actor:finger} {pa2:target:actor} {pussy:target}.",
      script:function(p) { p.target.modifyAttraction(p.actor, -25) },
    },
    {
      test:function(p) { return p.rating < 15 && !p.target.canManipulate() && p.bodypart.name === "bollock" },
      msg:"'Hey no!' exclaims {nm:target:the} as {nv:actor:squeeze} {pa2:target:actor} ball sack.",
      script:function(p) { p.target.modifyAttraction(p.actor, -25) },
    },
    {
      test:function(p) { return p.rating < 15 && !p.target.canManipulate() && p.bodypart.name === "cock" },
      msg:"'Hands off!' exclaims {nm:target:the} as {nv:actor:grip} {pa2:target:actor} {cock:target}.",
      script:function(p) { p.target.modifyAttraction(p.actor, -25) },
    },
    {
      test:function(p) { return p.rating < 15 && !p.target.canManipulate() && p.bodypart.name === "ass" },
      msg:"'What are you..?' exclaims {nm:target:the} as {nv:actor:reach} up {pa2:target:actor} ass.",
      script:function(p) { p.target.modifyAttraction(p.actor, -20) },
    },
    {
      test:function(p) { return p.rating < 15 && !p.target.canManipulate() },
      msg:"'Please no!' exclaims {nm:target:the} as {nv:actor:run} {pa:actor} hands over {pa2:target:actor} {param:bpname}.",
      script:function(p) { p.target.modifyAttraction(p.actor, -10) },
    },
    
    // tied up and happy
    { 
      test:function(p) { return !p.target.canManipulate() && p.bodypart.name === "tit" },
      msg:"'Hmm!' signs {nm:target:the} as {nv:actor:squeeze} {pa2:target:actor} tits.",
      script:function(p) { p.target.arousal += 5 },
    },
    { 
      test:function(p) { return !p.target.canManipulate() && p.bodypart.name === "pussy" },
      msg:"'Oh God yes!' exclaims {nm:target:the} as {nv:actor:finger} {pa2:target:actor} {pussy:target}.",
      script:function(p) { p.target.arousal += 10 },
    },
    { 
      test:function(p) { return !p.target.canManipulate() && p.bodypart.name === "bollock" },
      msg:"'Oh God yes!' exclaims {nm:target:the} as {nv:actor:squeeze} {pa2:target:actor} ball sack.",
      script:function(p) { p.target.arousal += 7 },
    },
    { 
      test:function(p) { return !p.target.canManipulate() && p.bodypart.name === "cock" },
      msg:"'Keep going, keep going!' says {nm:target:the} as {nv:actor:grip} {pa2:target:actor} {cock:target}.",
      script:function(p) { p.target.arousal += 10 },
    },
    { 
      test:function(p) { return !p.target.canManipulate() && p.bodypart.name === "ass" },
      msg:"'Oh yes,' exclaims {nm:target:the} as {nv:actor:reach} up {pa2:target:actor} ass.",
      script:function(p) { p.target.arousal += 7  },
    },
    { 
      test:function(p) { return !p.target.canManipulate() },
      msg:"{nv:target:smiles:the:true} as {nv:actor:run} {pa:actor} hands over {pa2:target:actor} {param:bpname}.",
      script:function(p) { p.target.arousal += 2  },
    },
     
    // Not tied up
    {
      test:function(p) { return p.rating < -15 && p.actor === p.target && p.garment},
      msg:"{nv:actor:grimace:true} as {sb:actor} reluctantly {cj:actor:stroke} {pa:actor} {param:bpadj} {param:bpname} through {pa:target} {nm:garment}.",
      script:function(p) { p.target.modifyAttraction(p.boss, -15) },
    },
    {
      test:function(p) { return p.actor === p.target && p.garment},
      msg:"{nv:actor:smile:true} as {sb:actor} eagerly {cj:actor:stroke} {pa:actor} {param:bpadj} {param:bpname} through {pa:target} {nm:garment}.",
      script:function(p) { p.target.modifyAttraction(p.boss, -15) },
    },
    {
      test:function(p) { return p.rating < -15 && p.actor === p.target},
      msg:"{nv:actor:grimace:true} as {sb:actor} reluctantly {cj:actor:stroke} {pa:actor} {param:bpadj} {param:bpname}.",
      script:function(p) { p.target.modifyAttraction(p.boss, -15) },
    },
    {
      test:function(p) { return p.actor === p.target},
      msg:"{nv:actor:smile:true} as {sb:actor} eagerly {cj:actor:stroke} {pa:actor} {param:bpadj} {param:bpname}.",
      script:function(p) { p.target.modifyAttraction(p.boss, -15) },
    },


    {
      test:function(p) { return p.rating < -15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to grope {pa:target} {param:bpname}. 'Keep your filthy hands to yourself, {param:target:insult:actor}!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -25); p.actor.reputation += 10 },
    },
    {
      test:function(p) { return p.rating < 15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to grope {pa:target} {param:bpname}. 'Keep your hands to yourself!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -5); p.actor.reputation += 2 },
    },
    {
      test:function(p) { return p.rating < 40 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to grope {pa:target} {param:bpname}. '{param:target:exclaimCheeky}'",
      script:function(p) { p.target.modifyAttraction(p.actor, -5) },
    },
    {
      test:function(p) { return p.garment },
      msg:"{nv:actor:spend:true} a few minutes running {pa:actor} fingers over {nm:target}'s {param:bpname}, through {pa:target} {nm:garment}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10) },
    },
    {
      test:function(p) { return p.action === "grope" },
      msg:"{nv:target:smile:true} as {nv:actor:stroke} {pa:target} {param:bpadj} {param:bpname}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10) },
    },
  ],




  // SUCK
  suck:[
    {
      test:function(p) { return p.rating < -15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to suck {pa:target} {param:bpname}. 'What the fuck are you doing, {random:jerk:creep:wanker}?'",
      script:function(p) { p.target.modifyAttraction(p.actor, -25); p.actor.reputation += 10 },
    },
    {
      test:function(p) { return p.rating < 15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to suck {pa:target} {param:bpname}. '{param:target:exclaimDisgust} Get off!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -10); p.actor.reputation += 2 },
    },
  ],




  // KISS
  kiss:[
    {
      test:function(p) { return p.rating < -15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to kiss {pa:target} {param:bpname}. 'Get off me, {random:jerk:creep:wanker}!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -15); p.actor.reputation += 5 },
    },
    {
      test:function(p) { return p.rating < 15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to kiss {pa:target} {param:bpname}. 'Please {i:don't} do that!'",
      script:function(p) { p.actor.reputation += 1 },
    },
    {
      test:function(p) { return p.rating < -15 },
      msg:"'Hmm!' exclaims {nm:target:the} as {nv:actor:kiss} {pa:target} {param:bpname}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 1, p.actor.arousal += 2 },
    },
  ],




  // SMACK
  smack:[
    {
      test:function(p) { return p.rating < -15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to smack {pa:target} {param:bpname}. 'Keep your filthy hands to yourself, {param:target:insult:actor}!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -25); p.actor.reputation += 10 },
    },
    {
      test:function(p) { return p.rating < 15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to smack {pa:target} {param:bpname}. 'Keep your hands to yourself!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -5); p.actor.reputation += 2 },
    },
    {
      test:function(p) { return p.rating < 40 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to smack {pa:target} {param:bpname}. '{param:target:exclaimCheeky}'",
      script:function(p) { p.target.modifyAttraction(p.actor, -5) },
    },
    {
      test:function(p) { return p.garment },
      msg:"{nv:actor:smack:true} {nm:target}'s {param:bpname}, through {pa:target} {nm:garment}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 1, p.actor.arousal += 2 },
    },
    {
      test:function(p) { return p.action === "smack" },
      msg:"{nv:target:gasp:true} as {nv:actor:smack} {pa:target} {param:bpadj} {param:bpname}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 1, p.actor.arousal += 2 },
    },
  ],




  // LICK
  lick:[
    {
      test:function(p) { return p.rating < -15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to lick {pa:target} {param:bpname}. 'Keep your filthy hands to yourself, {param:target:insult:actor}!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -25); p.actor.reputation += 10 },
    },
    {
      test:function(p) { return p.rating < 15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to lick {pa:target} {param:bpname}. 'Keep your hands to yourself!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -5); p.actor.reputation += 2 },
    },
    {
      test:function(p) { return p.rating < 40 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to lick {pa:target} {param:bpname}. '{param:target:exclaimCheeky}'",
      script:function(p) { p.target.modifyAttraction(p.actor, -5) },
    },
    {
      test:function(p) { return p.bodypart.name === "tit" },
      msg:"'Hmm!' signs {nm:target:the} as {nv:actor:lick} {pa2:target:actor} tits.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 1, p.actor.arousal += 2 },
    },
    {
      test:function(p) { return p.bodypart.name === "pussy" },
      msg:"'Oh God yes!' exclaims {nm:target:the} as {nv:actor:lick} {pa2:target:actor} {pussy:target}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 1, p.actor.arousal += 2 },
    },
    {
      test:function(p) { return p.bodypart.name === "bollock" },
      msg:"'Oh God yes!' exclaims {nm:target:the} as {nv:actor:lick} {pa2:target:actor} ball sack.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 1, p.actor.arousal += 2 },
    },
    {
      test:function(p) { return p.bodypart.name === "cock" },
      msg:"'Keep going, keep going!' says {nm:target:the} as {nv:actor:lick} {pa2:target:actor} {cock:target}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 1, p.actor.arousal += 2 },
    },
    {
      test:function(p) { return p.bodypart.name === "ass" },
      msg:"'Oh yes,' exclaims {nm:target:the} as {nv:actor:push} {pa:actor} tongue up {pa2:target:actor} ass.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 1, p.actor.arousal += 2 },
    },
    {
      test:function(p) { return p.action === "lick" },
      msg:"{nv:target:smiles:the:true} as {nv:actor:licks} {pa2:target:actor} {param:bpname}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 1, p.actor.arousal += 2 },
    },
  ],




  // REMOVE
  remove:[
    {
      test:function(p) { return p.target.canManipulate() && p.rating < 0 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to remove {pa:target} {nm:garment}. 'Keep your filthy hands to yourself, {param:target:insult:actor}!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -25); p.actor.reputation += 10 },
    },
    {
      test:function(p) { return p.target.canManipulate() && p.rating < 30 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to remove {pa:target} {nm:garment}. 'Keep your filthy hands to yourself, {param:target:insult:actor}!'",
    },
    {
      test:function(p) { return p.target.canManipulate() && p.exposure < 0 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to remove {pa:target} {nm:garment}. 'I'm not taking that off!'",
    },


    {
      test:function(p) { return p.rating < 100 && p.target.restraint },
      script:function(p) {
        if (p.garment.ripOff) {
          p.garment.ripOff(p)
        }
        else {
          errormsg("No ripOff for " + p.garment.name)
          console.log(p.garment)
        }
        // modify arousal, depending of what is now bare
      },
    },
    {
      test:function(p) { return p.rating < 30 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:remove} {pa:target} {nm:garment}.",
      script:function(p) {
        p.garment.loc = p.actor.loc
        p.garment.worn = false
        // modify arousal, depending of what is now bare
      },
    },
    
    {
      test:function(p) { return p.garment.pullsoff === "up"},
      msg:"{nv:actor:lift:true} up {nm:target:the}'s {nm:garment}, pulling it up over {pa2:target:actor} head.",
      script:function(p) {
        p.garment.loc = p.actor.loc
        p.garment.worn = false
        // modify arousal, depending of what is now bare
        
      },
    },
    {
      test:function(p) { return p.garment.pullsoff === "down"},
      msg:"{nv:actor:pull:true} down {nm:target:the}'s {nm:garment}, letting {ob:garment} slide down {pa:target} legs.",
      script:function(p) {
        p.garment.loc = p.actor.loc
        p.garment.worn = false
        // modify arousal, depending of what is now bare
        
      },
    },
    {
      test:function(p) { return p.garment.pullsoff === "swimsuit"},
      msg:"{nv:actor:ease:true} the straps of {nm:target:the}'s {nm:garment} off {pa:target} shoulders, then peel {ob:garment} down {pa:target} her body, letting {ob:garment} slide down {pa:target} legs to the floor.",
      script:function(p) {
        p.garment.loc = p.actor.loc
        p.garment.worn = false
        // modify arousal, depending of what is now bare
        
      },
    },
    {
      test:function(p) { return p.garment.pullsoff === "halter"},
      msg:"{nv:actor:unfasten:true} {nm:target:the}'s {nm:garment}, pulling {ob:garment} off {ob:target}.",
      script:function(p) {
        p.garment.loc = p.actor.loc
        p.garment.worn = false
        // modify arousal, depending of what is now bare
        
      },
    },
    {
      test:function(p) { return p.garment.pullsoff === "dress"},
      msg:"{nv:actor:lift:true} up {nm:target:the}'s {nm:garment}, pulling {ob:garment} up over {pa2:target:actor} head.",
      script:function(p) {
        p.garment.loc = p.actor.loc
        p.garment.worn = false
        // modify arousal, depending of what is now bare
        
      },
    },
    {
      test:function(p) { return p.garment.pullsoff === "skirt"},
      msg:"{nv:actor:unfasten:true} {nm:target:the}'s {nm:garment}, letting {ob:garment} fall to the floor.",
      script:function(p) {
        p.garment.loc = p.actor.loc
        p.garment.worn = false
        // modify arousal, depending of what is now bare
        
      },
    },
    {
      test:function(p) { return p.action === "remove" },
      msg:"{nv:actor:take:true} {nm:target:the}'s {nm:garment} off her.",
      script:function(p) {
        p.garment.loc = p.actor.loc
        p.garment.worn = false
        // modify arousal, depending of what is now bare
        
      },
    },
  ],
}


