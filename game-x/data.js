"use strict";


/*
Lucy swears like a trooper. She is from Burnley and has a bit of a chip on her shoulder about it. Shy about her body and sex, but may discover she has a leather fetish. Tattoos? Usually wearing black tights, shorts and tee-shirt.

Joanna is very feminist, and something of a hippy. She believes all sorts of mumbo-jumbo, and sees "signs" everywhere. Studying English, and likes to mediate and do yoga (naked?). Usually wearing loose skirt and top (no underwear)

Carmen is very upper class. She has no inhibitions about being naked (and often poses for Elisha and her classmates). Hates dirt, almost obsessively. Studying politics. Tattoos? Usually wears ripped jeans and crop top.

Nina is Danish. She is very sporting; good at tennis, netball and karate. Overly competitive. Studying chemistry. Goes jogging very early everyday, and wears very little make up. usually wearing leggings and halter top.

Tina is studying physics; it just comes naturally to her so she does not work that hard though she says she does as she is a little embarrassed at how bright she is. Though quite shy, she is very adventurous in bed.

Brooklyn is from the US, and a complete slut. Raised on a farm in Arkansas, her family were very religious and controlling; as soon as she was away from them she went wild. Maybe still religious, so feels guilty after the event. Never swears, and while happy to suck a cock, is reluctant to say the word. Studying English with Joanna. Usually wearing tiny denim shorts and crop top.

Sung Hi (K-Goth) is from Korea, and studying physics with Tina, but is not that good at it, and wants to change or just drop out. In Korea she was quite submissive to her boyfriends, but has since fond out she really likes to be dominant. She is considering getting a tattoo on her back. Usually wearing black mini-skirt, black top and black boots .





Priyanka is studying engineering. She wants to be a mechanic, and loves tinkers with her motor bike. Her parents wanted her to be a doctor or similar, so engineering is a compromise.



Elisha is studying photography.

Holly is Australian


Goth

Intellectual
Ti chi
Religious
Fussy
Leather fetish
Fussy




*/


createItem("me",
  ACTOR(false, true), {
    loc:"lounge", 
    regex:/^me|myself|player$/, 
    examine:function() {
      msg("You are wearing {attire}. {ifposture:You are {posture}.}", {item:this});
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
  properName:true,
  examine:"A hot, blonde babe. She is wearing {attire}. {ifposture:She is {posture}.}",
  bodyPartAdjectives:{upperback:"tattooed"},
  willingToExpose:5,
  eyeColor:'blue',
  getDescription:'Joanna has a warm smile, and long blonde hair.',
  size:3,
  appearance:9,
  skinTone:'tanned',
  hairColor:'dark blonde',
  hairLength:7,
  bust:3,
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
});


addResponse("suck", {
    test:function(p) { return p.bodypart.name === "cock" && p.rating > 14 && p.target.arousal > 89 && p.actor.name === "Joanna"},
    msg:"Joanna giggles as {nv:target:come} in her mouth, letting some cum dribble down her chin.",
    script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal = 10, p.actor.arousal += 12 },
})

addResponse("lick", {
    test:function(p) { return p.bodypart.name === "pussy" && p.rating > 14 && p.target.arousal > 89 && p.target.name === "Joanna"},
    msg:"{nv:actor:tickle} Joanna's throbbing clit; she squeals as she comes.",
    script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 10, p.actor.arousal += 12 },
})


createItem("maid",
  ACTOR(true), {
    loc:"lounge", 
    examine: "A helpful brunette, with a big smile. She is wearing {attire}. {ifposture:She is {posture}.}",
    willingToExpose:10,
    getDefaultBodyPartAdjective:function() {
      return "tanned";
    },
  }
);


createItem("Clive",
  ACTOR(false), {
    loc:"lounge", 
    properName:true,
    examine: "A cool dude. He is wearing {attire}. {ifposture:He is {posture}.}", 
  }
);


createItem("halterblack", MADE_OF(materials.cloth), HALTER(),
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

createItem("briefsblack", MADE_OF(materials.cloth), BRIEFS(),
  {
    alias:"black bikini briefs",
    regex:/bikini briefs|briefs/,
    loc:"Joanna",
    worn:true,
    sideTie:true,
    exam:"Some bikini briefs that are black.",
  }
);

createEnsemble("black_bikini", [w.halterblack, w.briefsblack], {
  exam:'A black bikini.',
  examine:function() {
    msg(this.exam + (this.coveredInCum ? " " + pronounVerb(this, "be", true) + " covered in cum." : ""))
    return true
  },
});

createItem("thongred", MADE_OF(materials.cloth), THONG(),
  {
    alias:"red thong",
    loc:"lounge",
  }
);


createItem("swimsuitred", MADE_OF(materials.cloth), SWIMSUIT(1),
  {
    alias:"red swimsuit",
    loc:"lounge",
    exam:"The swimsuit is red; it leaves half the back bare and has high legs.",
  }
);

createItem("teeshirtwhite", MADE_OF(materials.cloth), TEE_SHIRT(),
  {
    alias:"white teeshirt",
    loc:"lounge",
    exam:"The t-shirt is white.",
  }
);

createItem("teeshirtmesh", MADE_OF(materials.cloth), TEE_SHIRT(true),
  {
    alias:"mesh teeshirt",
    loc:"lounge",
    getRevealing:function() { return 3; },
    exam:"The t-shirt is white.",
  }
);

createItem("swimsbriefsblack", MADE_OF(materials.cloth), BRIEFS(),
  {
    alias:"black Speedos",
  }
);

createItem("swimshortsblue", MADE_OF(materials.cloth), SHORTS(true),
  {
    alias:"blue swim shorts",
    loc:"Clive",
    worn:true,
    swimwear:true,
  }
);

createItem("daisydukes", MADE_OF(materials.cloth), SHORTS(),
  {
    alias:"Daisy Dukes",
    loc:"lounge",
    pronouns:PRONOUNS.plural,
  }
);

createItem("jeans2", MADE_OF(materials.cloth), PANTS(),
  {
    alias:"jeans",
    loc:"lounge",
    pronouns:PRONOUNS.plural,
  }
);


createItem("maidoutfit", MADE_OF(materials.cloth), DRESS(["chest", "nipple", "lowerback", "midriff", "hip", "groin", "buttock"]),
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
  }
);



createItem("dildo", MADE_OF(materials.rubber), TAKEABLE(), PHALLUS(true),
  {
    loc:"table",
  }
);


createItem("whip", MADE_OF(materials.leather), TAKEABLE(),
  {
    loc:"table",
  }
);


createItem("knife", MADE_OF(materials.metal), TAKEABLE(),
  {
    cutter:true,
  }
);



createItem("table", MADE_OF(materials.wood), EROTIC_FURNITURE({stand:true, bendover:true}), SURFACE(), {
  loc:"lounge",
});

createItem("chair", MADE_OF(materials.plastic), EROTIC_FURNITURE({sit:true, straddle:true}), {
  hidesWhenSitting:["buttocks", "lowerback"],
  hidesWhenStraddling:["crotch", "groin", "midriff"],
});

createItem("bed", MADE_OF(materials.wood), EROTIC_FURNITURE({recline:true, sit:true}), {
});


createItem("a_frame", MADE_OF(materials.metal), BONDAGE_DEVICE(false),
  {
    loc:"lounge",
    alias:"A-frame",
    situation:"manacled to the A-frame",
    legsOpen:true,
    armsOpen:false,
    points:["wrists", "ankles"],
    restrainMsg:function(char, victim) { 
      return nounVerb(char, "manacle", true) + " " + victim.byname({article:DEFINITE, possessive:true}) + " wrists to the top of the A-frame, then " + conjugate(char, "make") + " " + victim.pronouns.objective + " open " + victim.pronouns.poss_adj + " legs wide, before manacling them too."
    },
    releaseMsg:function(char, victim) {
      return nounVerb(char, "release", true) + " the manacles on " + victim.byname({article:DEFINITE, possessive:true}) + " ankles, then " + conjugate(char, "reach") + " up and " + conjugate(char, "release") + " " + victim.pronouns.poss_adj + " wrists."
    },
  }
);

createItem("bondage_table", MADE_OF(materials.metal), BONDAGE_DEVICE(false),
  {
    situation:"manacled to the metal table",
    legsOpen:true,
    armsOpen:true,
    points:["wrists", "ankles"],
    posture:'reclining',
    getHides:function(actor) { return actor.posture === "reclining" ? ["buttock", "lowerback", "upperback"] : ["groin", "midriff", "chest", "tit", "nipple"] },
    restrainMsg:function(char, victim) { 
      return nounVerb(victim, "lie", true) + " back on the metal table and " + nounVerb(char, "secure") + " " + victim.pronouns.poss_adj + " wrists in the manacles above " + victim.pronouns.poss_adj + " head, then " + conjugate(char, "make") + " " + victim.pronouns.objective + " open " + victim.pronouns.poss_adj + " legs wide, so " + pronounVerb(char, "can") + " secure " + victim.pronouns.poss_adj + " ankles too."
    },
    releaseMsg:function(char, victim) {
      return nounVerb(char, "unfasten", true) + " the manacles on " + victim.byname({article:DEFINITE, possessive:true}) + " ankles, then the ones on " + victim.pronouns.poss_adj + " wrists. " + nounVerb(victim, "get", true) + " off the table."
    },
  }
);




createItem("thin_shirt", MADE_OF(materials.cloth), BUTTONED_SHIRT(), {
  alias:"thin white shirt",
  //loc:"me",
  wet:false,
  getreveal:function() { return this.wet ? 2 : 5 },
  exam:"the material this white shirt is made from is so thin it will be almost transparent when wet.",
})

createItem("dress_cursed", MADE_OF(materials.cloth), DRESS([]),
  {
    alias:"short, black, strapless dress",
    examine:function() {
      const n = Math.floor(this.count / this.countRate)
      if (n < this.states.length - 1) {
        return this.states[n].desc;
      }
      else if (this.getWorn()) {
        return "A red strap that goes round " + w[this.loc].byname({article:DEFINITE,possessive:true}) + " bust, without covering the nipples, held up by thin straps over " + w[this.loc].pronouns.poss_adj + " shoulders.";
      }
      else {
        return "A red strap that would go round the bust, without covering much at all, held up by thin straps.";
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
    byname:function(options) {
      let s;
      if (options && options.article === DEFINITE) {
        s = "the " + this.getAlias();
      }
      else if (options && options.article === INDEFINITE) {
        s =  "a " + this.getAlias();
      }
      else {
        s =  this.getAlias();
      }
      if (options && options.possessive) {
        s += "'s";
      }
      return s;
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



/*
Shops, bars, restaurants
Bondage, food fetish, water bondage
Sports
Casino

*/

createRoom("lobby", {
  desc:"The lobby is all gold and marble. In the center is a large square planter, set at an angle to the wall, that contains verdant bushes and yellow flowers.",
  north:new Exit("poolside"),
  east:new Exit("bar"),
});



createRoom("poolside", {
  desc:"The pool looks very inviting in this heat! The poolside area runs along its south side, and features a number of white loungers.",
  south:new Exit("lobby"),
  in:new Exit("pool"),
  north:new Exit("pool"),
});



createRoom("pool", {
  desc:"The pool is deep, the water warm.",
  getPublicRating:function() { return 3; },
  south:new Exit("poolside"),
  out:new Exit("poolside"),
});


createRoom("bar", {
  desc:"The bar is great!",
  west:new Exit("lobby"),
});
