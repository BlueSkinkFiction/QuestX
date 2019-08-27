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
    loc:"Joanna",
    worn:true,
  }
);

createItem("briefsblack", MADE_OF(materials.cloth), BRIEFS(),
  {
    alias:"black bikini briefs",
    loc:"Joanna",
    worn:true,
  }
);


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
  }
);

createItem("jeans", MADE_OF(materials.cloth), PANTS(),
  {
    alias:"jeans",
    loc:"lounge",
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

