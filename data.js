"use strict";


createItem("me",
  ACTOR(false, true), {
    loc:"lounge", 
    regex:/^me|myself|player$/, 
    examine:function() {
      msg("You are wearing {attire}. {ifposture:You are {posture}.}", {tpItem:this});
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





createItem("Joanna",
  ACTOR(true), {
    loc:"lounge", 
    properName:true,
    examine:"A hot, blonde babe. She is wearing {attire}. {ifposture:She is {posture}.}",
    bodyPartAdjectives:{upperback:"tattooed"},
    willingToExpose:5,
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
  }
);


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
    examineThis:"A bikini halter that is black.",
    examineBikini:"A black bikini.",
  }
);

createItem("briefsblack", MADE_OF(materials.cloth), BRIEFS(),
  {
    alias:"black bikini briefs",
    regex:/bikini briefs|briefs/,
    loc:"Joanna",
    worn:true,
    examine:"Some bikini briefs that are black.",
  }
);

createEnsemble("black_bikini", [w.halterblack, w.briefsblack], {
  examine:'A black bikini.',
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
    examine:"The swimsuit is red; it leaves half the back bare and has high legs.",
  }
);

createItem("teeshirtwhite", MADE_OF(materials.cloth), TEE_SHIRT(),
  {
    alias:"white teeshirt",
    loc:"lounge",
    examine:"The t-shirt is white.",
  }
);

createItem("teeshirtmesh", MADE_OF(materials.cloth), TEE_SHIRT(true),
  {
    alias:"mesh teeshirt",
    loc:"lounge",
    getRevealing:function() { return 3; },
    examine:"The t-shirt is white.",
  }
);

createItem("swimsbriefsblack", MADE_OF(materials.cloth), BRIEFS(),
  {
    alias:"black Speedos",
    pullsoff:true,
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

createItem("jeans", MADE_OF(materials.cloth), PANTS(),
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
    examine:"A short black dress, made of slightly see-through material, with white lace trim, with a little apron at the front.",
  }
);


createItem("leatherjacket", MADE_OF(materials.leather), OPENABLE(false), JACKET(3),
  {
    alias:"leather jacket",
    loc:"me",
    worn:true,
    examine:"A black jacket.",
    getSlots:function() { return this.closed ? ["chest", "nipple", "lowerback", "upperback", "midriff"] : ["lowerback", "upperback"] },
  }
);



createItem("settee", MADE_OF(materials.wood), FURNITURE({sit:true, recline:true}),
  {
    loc:"lounge",
  }
);



createItem("dildo", MADE_OF(materials.rubber), TAKEABLE(),
  {
    loc:"table",
  }
);


createItem("whip", MADE_OF(materials.leather), TAKEABLE(),
  {
    loc:"table",
  }
);



createItem("table", MADE_OF(materials.wood), EROTIC_FURNITURE({stand:true, bendover:true}), SURFACE(),
  {
    loc:"lounge",
  }
);



createItem("a_frame", MADE_OF(materials.metal), BONDAGE_DEVICE(false),
  {
    loc:"lounge",
    alias:"A-frame",
    situation:"manacled to the A-frame",
    restrainMsg:function(char, victim) { 
      return nounVerb(char, "manacle", true) + " " + victim.byname({article:DEFINITE, possessive:true}) + " wrists to the top of the A-frame, then " + conjugate(char, "make") + " " + victim.pronouns.objective + " open " + victim.pronouns.poss_adj + " legs wide, before manacling them too."
    },
    releaseMsg:function(char, victim) {
      return nounVerb(char, "release", true) + " the manacles on " + victim.byname({article:DEFINITE, possessive:true}) + " ankles, then " + conjugate(char, "reach") + " up and " + conjugate(char, "release") + " " + victim.pronouns.poss_adj + " wrists."
    },
  }
);


createItem("thin_shirt", MADE_OF(materials.cloth), BUTTONED_SHIRT(), {
  alias:"thin white shirt",
  loc:"me",
  wet:false,
  getreveal:function() { return this.wet ? 2 : 5 },
  examine:"the material this white shirt is made from is so thyin it will be almost transparent when wet.",
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