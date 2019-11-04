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
      failed:true,
    },
    {
      test:function(p) { return p.rating < 15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to grope {pa:target} {param:bpname}. 'Keep your hands to yourself!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -5); p.actor.reputation += 2 },
      failed:true,
    },
    {
      test:function(p) { return p.rating < 40 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to grope {pa:target} {param:bpname}. '{param:target:exclaimCheeky}'",
      script:function(p) { p.target.modifyAttraction(p.actor, -5) },
      failed:true,
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
      msg:"'Hey!' {nv:target:exclaim} as {nv:actor:try} to suck {pa:target} {param:bpname}. 'What the fuck are you doing, {random:jerk:creep:wanker}?'",
      script:function(p) { p.target.modifyAttraction(p.actor, -25); p.actor.reputation += 10 },
      failed:true,
    },
    {
      test:function(p) { return p.rating < 15 },
      msg:"'Hey!' {nv:target:exclaim} as {nv:actor:try} to suck {pa:target} {param:bpname}. '{param:target:exclaimDisgust} Get off!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -10); p.actor.reputation += 2 },
      failed:true,
    },
    {
      test:function(p) { return p.bodypart.name === "tit" && p.first },
      msg:"'Hmm!' {nv:target:sigh} as {nv:actor:suck} on {pa:target} nipple.",
      script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 6, p.actor.arousal += 4 },
    },
    {
      test:function(p) { return p.bodypart.name === "cock" && p.target.arousal < 20},
      msg:"'Hmm!' {nv:target:sigh} as {nv:actor:suck} on {pa:target} {cock:target}. It is starting to get harder!",
      script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 10, p.actor.arousal += 3 },
    },
    {
      test:function(p) { return p.bodypart.name === "cock" && p.target.arousal < 50},
      msg:"'Keep going,' {nv:target:gasp} as {nv:actor:suck} on {pa:target} {cock:target}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 10, p.actor.arousal += 6 },
    },
    {
      test:function(p) { return p.bodypart.name === "cock" && p.target.arousal < 75},
      msg:"{nv:target:grin:true} as {nv:actor:suck} on {pa:target} {cock:target}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 11, p.actor.arousal += 6 },
    },
    {
      test:function(p) { return p.bodypart.name === "cock" && p.target.arousal < 90},
      msg:"'Yes! Yes!' {nv:target:murmur} as {nv:actor:suck} on {pa:target} cock. {nv:actor:can} taste pre-cum.",
      script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 13, p.actor.arousal += 6 },
    },
    {
      test:function(p) { return p.bodypart.name === "cock"},
      msg:"{nv:target:gasp:true} as {pv:target:come} in {nm:actor:the}'s mouth.",
      script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal = 10, p.actor.arousal += 12 },
    },
    {
      test:function(p) { return true},
      msg:"SHOULD NOT HAPPEN!",
    },
  ],




  // KISS
  kiss:[
    {
      test:function(p) { return p.rating < -15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to kiss {pa:target} {param:bpname}. 'Get off me, {random:jerk:creep:wanker}!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -15); p.actor.reputation += 5 },
      failed:true,
    },
    {
      test:function(p) { return p.rating < 15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to kiss {pa:target} {param:bpname}. 'Please {i:don't} do that!'",
      script:function(p) { p.actor.reputation += 1 },
      failed:true,
    },
    {
      test:function(p) { return p.rating < -15 },
      msg:"'Hmm!' exclaims {nm:target:the} as {nv:actor:kiss} {pa:target} {param:bpname}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 1, p.actor.arousal += 2 },
    },
  ],




  // TICKLE
  tickle:[
    {
      test:function(p) { return p.rating < -15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to tickle {pa:target} {param:bpname}. 'Get off me, {random:jerk:creep:wanker}!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -15); p.actor.reputation += 5 },
      failed:true,
    },
    {
      test:function(p) { return p.rating < 15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to tickle {pa:target} {param:bpname}. 'Please {i:don't} do that!'",
      script:function(p) { p.actor.reputation += 1 },
      failed:true,
    },
    {
      test:function(p) { return p.rating < -15 },
      msg:"'Hmm!' exclaims {nm:target:the} as {nv:actor:tickle} {pa:target} {param:bpname}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 1, p.actor.arousal += 2 },
    },
  ],


  // SMACK
  smack:[
    {
      test:function(p) { return p.rating < -15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to smack {pa:target} {param:bpname}. 'Keep your filthy hands to yourself, {param:target:insult:actor}!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -25); p.actor.reputation += 10 },
      failed:true,
    },
    {
      test:function(p) { return p.rating < 15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to smack {pa:target} {param:bpname}. 'Keep your hands to yourself!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -5); p.actor.reputation += 2 },
      failed:true,
    },
    {
      test:function(p) { return p.rating < 40 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to smack {pa:target} {param:bpname}. '{param:target:exclaimCheeky}'",
      script:function(p) { p.target.modifyAttraction(p.actor, -5) },
      failed:true,
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
      failed:true,
    },
    {
      test:function(p) { return p.rating < 15 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to lick {pa:target} {param:bpname}. 'Keep your hands to yourself!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -5); p.actor.reputation += 2 },
      failed:true,
    },
    {
      test:function(p) { return p.rating < 40 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to lick {pa:target} {param:bpname}. '{param:target:exclaimCheeky}'",
      script:function(p) { p.target.modifyAttraction(p.actor, -5) },
      failed:true,
    },
    {
      test:function(p) { return p.bodypart.name === "tit" },
      msg:"'Hmm!' signs {nm:target:the} as {nv:actor:lick} {pa2:target:actor} tits.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 5, p.actor.arousal += 3 },
    },
    {
      test:function(p) { return p.bodypart.name === "pussy" },
      msg:"'Oh God yes!' exclaims {nm:target:the} as {nv:actor:lick} {pa2:target:actor} {pussy:target}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 8, p.actor.arousal += 3 },
    },
    {
      test:function(p) { return p.bodypart.name === "bollock" },
      msg:"'Oh God yes!' exclaims {nm:target:the} as {nv:actor:lick} {pa2:target:actor} ball sack.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 5, p.actor.arousal += 3 },
    },
    {
      test:function(p) { return p.bodypart.name === "cock" },
      msg:"'Keep going, keep going!' says {nm:target:the} as {nv:actor:lick} {pa2:target:actor} {cock:target}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 8, p.actor.arousal += 4 },
    },
    {
      test:function(p) { return p.bodypart.name === "ass" },
      msg:"'Oh yes,' exclaims {nm:target:the} as {nv:actor:push} {pa:actor} tongue up {pa2:target:actor} ass.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 2, p.actor.arousal += 4 },
    },
    {
      test:function(p) { return true },
      msg:"{nv:target:smiles:the:true} as {nv:actor:licks} {pa2:target:actor} {param:bpname}.",
      script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 3, p.actor.arousal += 3 },
    },
  ],


  // COME OVER
  // Already checked actor has a cock and has nothing over his crotch and the destination is achievable
  come_over:[
    {
      test:function(p) { return p.actor.arousal < 20 },
      msg:"{nv:actor:squeeze:true} {pa:actor} limp willy, trying to coax life in it, as {pv:actor:aim} it vaguely at {nm:target:the}.",
      script:function(p) { },
    },
    {
      test:function(p) { return p.actor.arousal < 75 },
      msg:"{nv:actor:caress:true} {pa:actor} cock, making it harder and harder, as {pv:actor:aim} it at {nm:target:the}'s {param:bpname}.",
      script:function(p) { },
    },
    {
      test:function(p) { return p.actor.arousal < 90 },
      msg:"Pre-cum drips from {nm:actor:the}'s cock, as {pv:actor:squeeze} it furiously, pointing it at {nm:target:the}'s {param:bpname}.",
      script:function(p) { },
    },

    {
      test:function(p) { return p.garment === undefined },
      msg:"One more squeeze and {nm:actor:the}'s cock is shooting its load over {nm:target:the}'s bare {param:bpname}.",
      script:function(p) { p.target.coveredInCum.push(p.bpname) },
    },

    {
      test:function(p) { return true },
      msg:"One more squeeze and {nm:actor:the}'s cock is shooting its load over {nm:target:the}'s {nm:garment}.",
      script:function(p) { p.garment.coveredInCum = true },
    },
  ],


  // FRIG
  // Already checked target has a pussy and has nothing over her crotch
  frig:[
    {
      test:function(p) { return p.target.restraint !== undefined && !p.target.restraint.canManipulate && p.target === p.actor },
      msg:"{nv:actor:want:true} to finger her pussy, but cannot whilst tied up.",
      script:function(p) { p.actor.arousal += 2;console.log(p) },
      failed:true,
    },
    {
      test:function(p) { return p.actor.arousal < 20 && p.target === p.actor },
      msg:"{nv:actor:slip:true} {pa:actor} hand between her legs, and {cj:actor:ease} a finger into {pa:actor} pussy, quietly pleasuring {rf:actor}.",
      script:function(p) { p.actor.arousal += 7 },
    },
    {
      test:function(p) { return p.actor.arousal < 40 && p.target === p.actor },
      msg:"{nv:actor:stick:true} three fingers into {pa:actor} pussy; it feels so good!",
      script:function(p) { p.actor.arousal += 9 },
    },
    {
      test:function(p) { return p.actor.arousal < 60 && p.target === p.actor },
      msg:"{nv:actor:spend:true} a few minutes rubbing {pa:actor} hot clit.",
      script:function(p) { p.actor.arousal += 10 },
    },
    {
      test:function(p) { return p.actor.arousal < 80 && p.target === p.actor },
      msg:"{nv:actor:whimper:true} quietly as {pv:actor:continue} to finger {pa:actor} hot, damp sex.",
      script:function(p) { p.actor.arousal += 11 },
    },
    {
      test:function(p) { return p.target === p.actor },
      msg:"{nv:actor:sigh:true} contentedly as {pv:actor:continue} work {rf:actor} to orgasm.",
      script:function(p) { p.actor.arousal += 11 },
    },

    {
      test:function(p) { return p.target.restraint !== undefined && p.rating < 25 },
      msg:"{nv:actor:slip:true} {pa:actor} finger into {pa2:target:actor} {pussy:target}. 'Please, no!' {pn:target:exclaim}, unable to stop {sb:actor} as {pv:actor:go} deeper into {pa:target} sex.",
      script:function(p) { p.actor.arousal += 8; p.target.arousal += 2 },
    },
    {
      test:function(p) { return p.target.restraint !== undefined },
      msg:"{nv:actor:slip:true} {pa:actor} finger into {pa2:target:actor} {pussy:target}. 'Oh yes' {pn:target:gasp}, unable in any case to stop {sb:actor} as {pv:actor:go} deeper into {pa:target} sex.",
      script:function(p) { p.actor.arousal += 5; p.target.arousal += 12 },
    },
    
    {
      test:function(p) { return p.rating < 0 },
      msg:"{nv:actor:reach:true} {pa:actor} finger to {pa2:target:actor} crotch. 'Hands off!' {pn:target:exclaim}, giving {nm:actor} a hard slap.",
      script:function(p) { p.actor.reputation += 20 },
      failed:true,
    },
    {
      test:function(p) { return p.rating < 25 },
      msg:"{nv:actor:reach:true} {pa:actor} finger to {pa2:target:actor} crotch. 'Hands off!' {pn:target:exclaim}.",
      script:function(p) { p.actor.reputation += 10 },
      failed:true,
    },
    {
      test:function(p) { return p.rating < 50 },
      msg:"{nv:actor:reach:true} {pa:actor} finger to {pa2:target:actor} crotch. 'Hey!' {pn:target:giggle}, 'hands to yourself, naughty.'",
      script:function(p) { },
    },
    {
      test:function(p) { return p.actor.arousal < 75 },
      msg:"{nv:actor:slip:true} {pa:actor} finger into {pa2:target:actor} {pussy:target}, making her giggle.",
      script:function(p) { p.actor.arousal += 5; p.target.arousal += 6 },
    },
    {
      test:function(p) { return p.actor.arousal < 90 },
      msg:"{nv:actor:slip:true} {pa:actor} finger into {pa2:target:actor} {pussy:target}, making her gasp.",
      script:function(p) { p.actor.arousal += 5; p.target.arousal += 9 },
    },
    {
      test:function(p) { return true },
      msg:"{nv:actor:slip:true} {pa:actor} finger into {pa2:target:actor} {pussy:target}, making her come.",
      script:function(p) { p.actor.arousal += 5; p.target.arousal += 12 },
    },
  ],


  // WANK
  // Already checked target has a cock and has nothing over his crotch
  wank:[
    {
      test:function(p) { return p.target.restraint !== undefined && !p.target.restraint.canManipulate && p.target === p.actor },
      msg:"{nv:actor:want:true} to jerk off, but cannot whilst tied up.",
      script:function(p) { p.actor.arousal += 2;console.log(p) },
      failed:true,
    },
    {
      test:function(p) { return p.actor.arousal < 20 && p.target === p.actor },
      msg:"{nv:actor:put:true} {pa:actor} hand on {pa:actor} limp cock, and slowly kneads some life into it.",
      script:function(p) { p.actor.arousal += 7 },
    },
    {
      test:function(p) { return p.actor.arousal < 40 && p.target === p.actor },
      msg:"{nv:actor:squeeze:true} and {cj:actor:pull} on {pa:actor} cock",
      script:function(p) { p.actor.arousal += 9 },
    },
    {
      test:function(p) { return p.actor.arousal < 60 && p.target === p.actor },
      msg:"{nv:actor:squeeze:true} and {cj:actor:pull} on {pa:actor} cock, making it even harder",
      script:function(p) { p.actor.arousal += 10 },
    },
    {
      test:function(p) { return p.actor.arousal < 80 && p.target === p.actor },
      msg:"{nv:actor:pant:true} as {pv:actor:jerk} {rf:actor} off.",
      script:function(p) { p.actor.arousal += 11 },
    },
    {
      test:function(p) { return p.target === p.actor },
      msg:"A few more tugs, and {nv:actor:gasp} as {pv:ejaculate}.",
      script:function(p) { p.actor.arousal = 0 },
    },

    {
      test:function(p) { return p.target.restraint !== undefined && p.arousal > 90 },
      msg:"{nv:actor:jerk} {nm:target} off for a few moments, then suddenly, {pv:target:shoot} {pa:actor} load.",
      script:function(p) { p.actor.arousal += 12; p.target.arousal = 2 },
    },
    {
      test:function(p) { return p.target.restraint !== undefined && p.rating < 25 },
      msg:"{nv:actor:put:true} a hand on {nm:target:the}'s cock. 'Hey, no!' {pn:target:exclaim}, unable to stop {sb:actor} as {pv:actor:jerk} {sb:target} off.",
      script:function(p) { p.actor.arousal += 8; p.target.arousal += 2 },
    },
    {
      test:function(p) { return p.target.restraint !== undefined },
      msg:"{nv:actor:put:true} a hand on {nm:target:the}'s cock, and jerks {sb:target} off.",
      script:function(p) { p.actor.arousal += 5; p.target.arousal += 12 },
    },
    
    {
      test:function(p) { return p.rating < 0 },
      msg:"{nv:actor:put:true} a hand on {nm:target:the}'s cock. 'Hey, no!' {pn:target:exclaim}.",
      script:function(p) { p.actor.arousal += 8; p.target.arousal += 2 },
      script:function(p) { p.actor.reputation += 20 },
      failed:true,
    },
    {
      test:function(p) { return p.rating < 25 },
      msg:"{nv:actor:put:true} a hand on {nm:target:the}'s cock. 'Hey, no!' {pn:target:exclaim}.",
      script:function(p) { p.actor.reputation += 10 },
      failed:true,
    },
    {
      test:function(p) { return p.rating < 80 },
      msg:"{nv:actor:put:true} a hand on {nm:target:the}'s cock. 'Hey, yes!' {pn:target:exclaim}, as {nv:actor:jerk} {sb:target} off.",
      script:function(p) { p.actor.arousal += 5; p.target.arousal += 10 },
    },
    {
      test:function(p) { return p.actor.arousal < 90 },
    msg:"{nv:actor:keep:true} jerking off {nm:target:the}; pre-cum starts to drip from the end of {ps:target:the}'s cock.",
      script:function(p) { p.actor.arousal += 10; p.target.arousal += 15 },
    },
    {
      test:function(p) { return true },
      msg:"{nv:actor:jerk} {nm:target} off for a few moments, then suddenly, {pv:target:shoot} {pa:actor} load.",
      script:function(p) { p.actor.arousal += 10; p.target.arousal = 2 },
    },
  ],




  // GIRL ON TOP
  // Already checked target has a cock and actor has pussy and both exposed
  girl_top:[
    {
      test:function(p) { return p.target.restraint !== undefined && !p.target.restraint.canManipulate && p.target === p.actor },
      msg:"{nv:actor:want:true} to jerk off, but cannot whilst tied up.",
      script:function(p) { p.actor.arousal += 2;console.log(p) },
      failed:true,
    },
  ],





  // REMOVE
  remove:[
    {
      test:function(p) { return p.target.canManipulate() && p.rating < 0 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to remove {pa:target} {nm:garment}. 'Keep your filthy hands to yourself, {param:target:insult:actor}!'",
      script:function(p) { p.target.modifyAttraction(p.actor, -25); p.actor.reputation += 10 },
      failed:true,
    },
    {
      test:function(p) { return p.target.canManipulate() && p.rating < 30 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to remove {pa:target} {nm:garment}. 'Keep your filthy hands to yourself, {param:target:insult:actor}!'",
      failed:true,
    },
    {
      test:function(p) { return p.target.canManipulate() && p.exposure < 0 },
      msg:"'Hey!' exclaims {nm:target:the} as {nv:actor:try} to remove {pa:target} {nm:garment}. 'I'm not taking that off!'",
      failed:true,
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



function addResponse(action, data) {
  erotica.defaultResponses[action].unshift(data)
}

