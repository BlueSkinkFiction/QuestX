"use strict";

createItem("me",
  ACTOR(false, true), {
    loc:"lounge", 
    regex:/^(me|myself|player)$/, 
    examine:function() {
      msg("You are wearing {attire}. {ifPosture:You are {posture}.}", {item:this});
      if (!this.hasCock && !this.hasPussy) msg("You have no genitals...");
      if (this.hasCock && this.hasPussy) msg("You have both male and female genitals...");
      if (this.hasCock && this.hasTits) msg("Your plump breasts contrast with the cock hanging between your legs.");
    },
    hasBodyPart:function(bp) {
      if (typeof bp !== "string") bp = bp.name;
      if (bp === "cock") return this.hasCock;
      if (bp === "bollock") return this.hasCock;
      if (bp === "cleavage") return this.hasTits;
      if (bp === "pussy") return this.hasPussy;
      if (bp === "tit") return this.hasTits;
      if (bp.notStd) return false;
      return true;
    },
  }
);


createRoom("lounge", {
  desc:"The lounge is lavishly appointed.",
  west:new Exit("private_room"),
  east:new Exit("balcony"),
});



createRoom("private_room", {
  desc:"The lounge is lavishly appointed.",
  getPublicRating:function() { return 0; },
  east:new Exit("lounge"),
});



createRoom("balcony", {
  desc:"The balcony overlooks the city plaza; anyone here can be seen by thousands of people.",
  getPublicRating:function() { return 10; },
  west:new Exit("lounge"),
});





createItem("Joanna", ACTOR(true), {
  loc:"lounge", 
  properNoun:true,
  bodyPartAdjectives:{upperback:"tattooed"},
  willingToExpose:5,
  eyeColor:'blue',
  description:'Joanna has a warm smile, and long blonde hair.',
  size:3,
  appearance:9,
  skinTone:'tanned',
  hairColor:'dark blonde',
  hairLength:7,
  bust:3,
  
  features:[
    { type:'hair', hairLength:8, form:'has', bp:'head', s:function(char) { return w.Joanna.pronouns.possAdj + "long " + char.hairColor + " hair in a high ponytail that falls halfway down " + char.pronouns.possAdj + " back"}},
    { type:'eyes', form:'has', bp:'face', s:function(char) { return char.eyeColor + ' eyes'}},
  ],
  insult:function(target) { return target.hasBodyPart("cock") ? "jerk" : "bitch" },
  exclaimHappy:"Hey, wow!",
  exclaimAngry:"Fuck off!",
  exclaimDisgust:"Ew!",
  exclaimCheeky:'Hey, cheeky!',
  arousal:0,
    
  getAgreementPosture:function(name, object) {
    return true;
  },
  getAgreementInteract:function(target, action, bodypart, actionName) {
    if (action.name === "suck") {
      msg("'Eww! I'm not sucking your " + bodypart.name + "!'")
      return false;
    }
    return true;
  },
  
  sayState:'waitingMaidButler',
  sayBasePriority:10,
  sayPriority:10,
  sayResponse:function(s, verb) {
    msg("Joanna responds to: " + s)
    return true
  },
  sayCanHear:function(actor) {
    return actor.loc === this.loc;
  }
});






createItem("joanna_hello", TOPIC(true), {
  loc:'Joanna',
  alias:'Hello',
  //nowShow:['naomi_maid', 'naomi_butler', 'naomi_neither'],
  script:function() {
    msg("'Hi,' you say to the maid.");
    msg("'Hi,' she replies. 'I'm Joanna your personal maid. It's my pleasure to make your holiday with us as wonderful as possible.'");
  },
})


util.addResponse(["suck", "target not tied up", "happy", "cock"], {
    test:function(p) { return p.char.name === "Joanna" && p.item.arousal > 90 },
    msg:"Joanna giggles as {nv:item:come} in her mouth, letting some cum dribble down her chin.",
    script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal = 10, p.char.arousal += 12 },
}, erotica.defaultResponses)

util.addResponse(["lick", "happy"], {
    test:function(p) { return p.bodypart.name === "pussy" && p.item.name === "Joanna" && p.item.arousal > 90},
    msg:"{nv:char:lick} Joanna's throbbing clit; she squeals as she comes.",
    script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 10, p.char.arousal += 12 },
}, erotica.defaultResponses)


createItem("maid",
  ACTOR(true), {
    loc:"lounge",
    properNoun:false,
    examine: "A helpful brunette, with a big smile. She is wearing {attire}. {ifPosture:She is {posture}.}",
    willingToExpose:10,
    getDefaultBodyPartAdjective:function() {
      return "tanned";
    },
  }
);


createItem("Clive",
  ACTOR(false), {
    loc:"lounge", 
    properNoun:true,
    examine: "A cool dude. He is wearing {attire}. {ifPosture:He is {posture}.}", 
  }
);


createItem("halterblack", HALTER(),
  {
    alias:"black bikini halter",
    regex:/bikini halter|halter/,
    loc:"Joanna",
    worn:true,
    fastenVerb:"tie",
    exam:"A bikini halter that is black.",
    //examineBikini:"A black bikini.",
  }
);

createItem("briefsblack", BRIEFS(),
  {
    alias:"black bikini briefs",
    regex:/bikini briefs|briefs/,
    loc:"Joanna",
    worn:true,
    sideTie:true,
    exam:"Some bikini briefs that are black.",
  }
);

erotica.createBikiniEnsemble("black_bikini", w.halterblack, w.briefsblack, 'black bikini', 'A black bikini.');

createItem("thongred", THONG(),
  {
    alias:"red thong",
    loc:"lounge",
    exam:'A tiny red triangle and some thin cords.',
  }
);

createItem("thongblackf", THONG(),
  {
    alias:"black thong",
    exam:'A tiny black triangle and some thin cords.',
  }
);

createItem("thongblackm", THONG(),
  {
    alias:"black thong",
    exam:'A moulded pouch clearly designed for the male body, together with cords.',
  }
);

createItem("bowtie", THONG(),
  {
    alias:"black bowtie",
    exam:'A neat, black bowtie (that fixes with Velcro).',
  }
);

createItem("heels2", SHOES(), MADE_OF(materials.leather),
  {
    alias:"heels",
    exam:"A pair of black heels.",
  }
);

createItem("swimsuitred", SWIMSUIT(1),
  {
    alias:"red swimsuit",
    loc:"lounge",
    exam:"The swimsuit is red; it leaves half the back bare and has high legs.",
  }
);

createItem("teeshirtwhite", TEE_SHIRT(),
  {
    alias:"white teeshirt",
    loc:"lounge",
    exam:"The t-shirt is white.",
  }
);

createItem("teeshirtmesh", TEE_SHIRT(true),
  {
    alias:"mesh teeshirt",
    loc:"lounge",
    getRevealing:function() { return 3; },
    exam:"The t-shirt is white.",
  }
);

createItem("swimsbriefsblack", BRIEFS(),
  {
    alias:"black Speedos",
    exam:'Skimpy black Speedos',
  }
);

createItem("swimshortsblue", SHORTS(true),
  {
    alias:"blue swim shorts",
    loc:"Clive",
    worn:true,
    exam:'These swim shorts are different shades of blue in a camoglage style pattern.',
    swimwear:true,
  }
);

createItem("daisydukes", DAISY_DUKES(),
  {
    alias:"Daisy Dukes",
    properNoun:false,
    loc:"lounge",
    exam:'Tiny demin shorts.',
    pronouns:lang.pronouns.plural,
  }
);

createItem("jeans2", PANTS("jeans"),
  {
    alias:"jeans",
    loc:"lounge",
    exam:"A pair of grey jeans.", 
    pronouns:lang.pronouns.plural,
  }
);


createItem("maidoutfit", DRESS(["chest", "nipple", "lowerback", "midriff", "hip", "groin", "buttock"]),
  {
    alias:"maid outfit",
    loc:"maid",
    worn:true,
    exam:"A short black dress, made of slightly see-through material, with white lace trim, with a little apron at the front.",
  }
);


createItem("leatherjacket", MADE_OF(materials.leather), OPENABLE(false), JACKET(3),
  {
    alias:"leather jacket",
    worn:true,
    exam:"A black jacket.",
    getSlots:function() { return this.closed ? ["chest", "nipple", "lowerback", "upperback", "midriff", "shoulder", "arm", "cleavage"] : ["lowerback", "upperback", "shoulder", "arm"] },
  }
);



createItem("settee", MADE_OF(materials.wood), FURNITURE({sit:true, recline:true}),
  {
    loc:"lounge",
    examine:'To fit three people.',
  }
);



createItem("dildo", MADE_OF(materials.rubber), TAKEABLE(), PHALLUS(true),
  {
    loc:"table",
    examine:'Purple.',
  }
);


createItem("whip", MADE_OF(materials.leather), TAKEABLE(),
  {
    loc:"table",
    examine:'More of a riding crop perjaps.',
  }
);

createItem("jug", MADE_OF(materials.ceramic), TAKEABLE(), VESSEL(), {
  loc:"table",
  examine:function() {
    if (this.containedFluidName) {
      msg("A big jug containing " + this.containedFluidName + ".")
    }
    else {
      msg("A big, empty jug.")
    }
  },
  containedFluidName:'custard',
})


createItem("knife", MADE_OF(materials.metal), TAKEABLE(),
  {
    cutter:true,
    examine:'A sharp kitchen knife.',
  }
);



createItem("table", MADE_OF(materials.wood), EROTIC_FURNITURE({stand:true, bendover:true}), SURFACE(), {
  loc:"lounge",
  examine:'Just a table.',
});

createItem("chair", MADE_OF(materials.plastic), EROTIC_FURNITURE({sit:true, straddle:true}), {
  hidesWhenSitting:["buttocks", "lowerback"],
  hidesWhenStraddling:["crotch", "groin", "midriff"],
  examine:'Just a chair',
});

createItem("bed", MADE_OF(materials.wood), EROTIC_FURNITURE({recline:true, sit:true}), {
    examine:'A bed.',
});


createItem("a_frame", MADE_OF(materials.metal), BONDAGE_DEVICE(false),
  {
    loc:"lounge",
    alias:"A-frame",
    situation:"manacled to the A-frame",
    properNoun:false,
    legsOpen:true,
    armsOpen:false,
    points:["wrists", "ankles"],
    restrainMsg:"{nv:char:manacle:true} {nms:item:the} wrists to the top of the A-frame, then {cj:char:make} {ob:item} open {pa:item} legs wide, before manacling them too.",
    releaseMsg:"{nv:char:unlock:true} the manacles on {nms:item:the} ankles, then {cj:char:reach} up and {cj:char:release} {pa:item} wrists.",
    examine:'Two solid lengths of metal that meet at the top, with manacles in the corners.',
  }
);

createItem("bondage_table", MADE_OF(materials.metal), BONDAGE_DEVICE(false), OPENABLE(false),
  {
    situation:"manacled to the metal table",
    legsOpen:true,
    armsOpen:true,
    closed:true,
    points:["wrists", "ankles"],
    posture:'reclining',
    examine:'A metal table with manacles in the corners.',
    getHides:function(actor) { 
      if (this.closed) {
        return actor.posture === "reclining" ? ["buttock", "lowerback", "upperback"] : ["groin", "midriff", "chest", "tit", "nipple"] 
      }
      else {
        return actor.posture === "reclining" ? ["lowerback", "upperback"] : ["midriff", "chest", "tit", "nipple"] 
      }
    },
    restrainMsg:"{nv:item:lie:true} back on the metal table and {nv:char:secure} {pa:item} wrists in the manacles above {pa:item} head, then {cj:char:make} {ob:item} open {pa:item} legs wide, so {pv:char:can} secure {pa:item} ankles too.",
    releaseMsg:"{nv:char:unfasten:true} the manacles on {nms:item:the} ankles, then the ones on {pa:item} wrists. {nv:item:get:true} off the table.",
    openMsg:function(options) {
      options.victim = this.victim
      let s = "{nv:char:slide:true} open the panel in the centre of the metal table, "
      if (this.victim) {
        s += "right under {nms:victim:the} buttocks, leaving {pa:victim} ass exposed."
      }
      else {
        s += "right about where the victim's ass would be."
      }
      msg(s, options)
    },
    closeMsg:function(options) {
      let s = "{nv:char:slide:true} the panel in the centre of the metal table closed"
      if (this.victim) s += "; " + lang.getName(w[this.victim], {article:DEFINITE, possessive:true}) + " buttocks rest on the cool metal"
      s += "."
      msg(s, options)
    },
  }
);




createItem("thin_shirt", BUTTONED_SHIRT(), {
  alias:"thin white shirt",
  //loc:"me",
  wet:false,
  getreveal:function() { return this.wet ? 2 : 5 },
  exam:"the material this white shirt is made from is so thin it will be almost transparent when wet.",
})

createItem("dress_cursed", DRESS([]),
  {
    alias:"short, black, strapless dress",
    examine:function() {
      const n = Math.floor(this.count / this.countRate)
      if (n < this.states.length - 1) {
        msg(this.states[n].desc);
      }
      else if (this.getWorn()) {
        msg("A red strap that goes round " + lang.getName(w[this.loc], {article:DEFINITE,possessive:true}) + " bust, without covering the nipples, held up by thin straps over " + w[this.loc].pronouns.possAdj + " shoulders.");
      }
      else {
        msg("A red strap that would go round the bust, without covering much at all, held up by thin straps.");
      }
    },
    getSlots:function() {
      const n = Math.floor(this.count / this.countRate)
      if (n < this.states.length) {
        return this.states[n].slots;
      }
      else {
        return this.states[this.states.length - 1].slots;
      }
    },
    getAlias:function() {
      const n = Math.floor(this.count / this.countRate)
      if (n < this.states.length) {
        return this.states[n].slots;
      }
      else {
        return this.states[this.states.length - 1].slots;
      }
    },
    count:0,
    countRate:2,
    image:"dress_strapless_black",
    states:[
      { 
        alias:"long red dress",
        slots:["chest", "cleavage", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh", "knee", "calf"],
        desc:"A long, blood-red dress that falls to the ankles, with thin straps over the shoulders"
      },
      { 
        alias:"long red dress",
        slots:["chest", "cleavage", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh", "knee", "calf"],
        desc:"A long, blood-red dress that falls halfway down the calf, with thin straps over the shoulders"
      },
      { 
        alias:"red dress",
        slots:["chest", "cleavage", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh", "knee"],
        desc:"A long, blood-red dress that falls to just cover the knees, with thin straps over the shoulders"
      },
      { 
        alias:"red dress",
        slots:["chest", "cleavage", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"],
        desc:"A blood-red dress that falls to just above the knees, with thin straps over the shoulders"
      },
      { 
        alias:"short red dress",
        slots:["chest", "cleavage", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"],
        desc:"A blood-red dress that falls to part way down the thigh, with thin straps over the shoulders"
      },
      { 
        alias:"short red dress",
        slots:["chest", "cleavage", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock"],
        desc:"A short blood-red dress that leaves most of the thigh bare, with thin straps over the shoulders"
      },
      { 
        alias:"short red dress",
        slots:["chest", "cleavage", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock"],
        desc:"A barely-decent blood-red dress that just about reaches the crotch, with thin straps over the shoulders"
      },
      { 
        alias:"red vest-top",
        slots:["chest", "cleavage", "nipple", "upperback", "lowerback", "midriff"],
        desc:"A blood-red top that falls to just below the waist, with thin straps over the shoulders"
      },
      { 
        alias:"red vest-top",
        slots:["chest", "cleavage", "nipple", "upperback", "lowerback", "midriff"],
        desc:"A blood-red top that falls to just below the waist, with thin straps over the shoulders"
      },
      { 
        alias:"red vest-top",
        slots:["chest", "cleavage", "nipple", "upperback", "lowerback", "midriff"],
        desc:"A blood-red top that almost reaches the waist, with thin straps over the shoulders"
      },
      { 
        alias:"red cropped top",
        slots:["chest", "cleavage", "nipple", "upperback"],
        desc:"A cropped blood-red top that leaves most of the midriff bare, with thin straps over the shoulders"
      },
      { 
        alias:"red cropped top",
        slots:["chest", "cleavage", "nipple", "upperback"],
        desc:"A cropped blood-red top that barely covers the bust, with thin straps over the shoulders"
      },
      { 
        alias:"red strap",
        slots:[],
      },
    ],
  }
);

util.createQuestion("butler_maid_question", [
  {
    regex:/^(maid)$/,
    response:function() {
      msg("'Can I have a maid?' you say to the receptionist.");
      msg("'Sure. There will be someone in your room for you.'");
      const maid = erotica.createWoman("your_room")
      maid.dressUp("thongblackf", "maidoutfit", "heels2");
    }
  },
  {
    regex:/^(butler)$/,
    response:function() {
      msg("'Can I have a butler?' you say to the receptionist.");
      msg("'Sure. There will be someone in your room for you.'");
      const butler = erotica.createMan("your_room")
      butler.dressUp("thongblackm", "bowtie");
    }
  },
  {
    regex:/^(no)$/,
    response:function() {
      msg("'No thanks to the maid or butler,' you say.");
      msg("'That's fine.'");
    }
  },
])  




