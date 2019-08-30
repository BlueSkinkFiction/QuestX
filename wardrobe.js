
// This file is optional


erotica.createGarment = function(proto, loc, color, ...otherOptions) {
  if (typeof proto === "string") proto = w[proto]
  o = cloneObject(proto, loc)
  if (!color) color = proto.colors
  if (Array.isArray(color)) color = randomFromArray(color)
  if (o.variFunc) {
    o.variFunc(color, otherOptions)
  }
  else if (color) {
    o.alias = o.alias.replace("black", color.toLowerCase());
    if (o.image) o.image = o.image.replace("black", color.toLowerCase());
    o.listalias = o.alias.replace("Black", sentenceCase(color));
    if (o.examine) {
      o.examine = o.examine.replace("black", color.toLowerCase());
    }
    else {
      console.log("No examine for " + proto.name)
    }
  }
  if (w[loc].npc) o.worn = true;
  return o;
}



erotica.createBikini = function(loc) {
  color = randomFromArray(erotica.colorListSwimwearF)
  if (randomChance(1)) {
    erotica.createGarment(w.halter_us, loc)
    erotica.createGarment(w.briefs_us, loc)
  }
  else if (randomChance(3)) {
    erotica.createGarment(w.halter_minimal_black, loc, color)
    erotica.createGarment(w.thong_black_sw, loc, color)
  }
  else if (randomChance(30)) {
    erotica.createGarment(w.bandeau_black, loc, color)
    erotica.createGarment(w.briefs_black, loc, color)
  }
  else {
    erotica.createGarment(w.halter_black, loc, color)
    erotica.createGarment(w.briefs_black, loc, color)
  }
}


erotica.createSwimwear = function(loc, addExtras) {
  if (w[loc].isFemale) {
    erotica.createSwimwearF(loc, addExtras)
  }
  else {
    erotica.createSwimwearM(loc, addExtras)
  }
}    


erotica.createSwimwearF = function(loc, addExtras) {
  if (randomChance(65)) {
    erotica.createBikini(loc);
    if (addExtras && randomChance(20)) {
      erotica.createGarment(w.daisy_dukes, loc)
    }
    if (addExtras && randomChance(30)) {
      erotica.createGarment(w.teeshirt_black, loc)
    }
  }
  else if (randomChance(1)) {
    erotica.createGarment(w.sling_black, loc)
  }
  else if (randomChance(3)) {
    erotica.createGarment(w.swimsuit_yellow_panel, loc)
  }
  else if (randomChance(25)) {
    erotica.createGarment(w.swimsuit_black, loc)
    if (addExtras && randomChance(35)) {
      erotica.createGarment(w.teeshirt_black, loc)
    }
    else if (addExtras && randomChance(20)) {
      erotica.createGarment(w.skirt_black, loc)
    }
  }
  else {
    erotica.createGarment(w.swimsuit_black_scooped, loc)
    if (addExtras && randomChance(25)) {
      erotica.createGarment(w.teeshirt_black, loc)
    }
  }
}



erotica.createSwimwearM = function(loc, addExtras) {
  if (randomChance(1)) {
    erotica.createGarment(w.posing_pouch, loc)
  }
  else if (randomChance(20)) {
    erotica.createGarment(w.shorts_black, loc)
  }
  else {
    erotica.createGarment(w.briefs_black_m, loc)
  }
  if (addExtras && randomChance(15)) {
    erotica.createGarment(w.teeshirt_black, loc)
  }
}




// https://digitalsynopsis.com/design/color-thesaurus-correct-names-of-shades/
erotica.colorList = [
  "white", "ivory-colored", "cream",
  "tan", "fawn", "beige",
  "yellow", "lemon", "mustard", "gold-colored",
  "orange", "amber", 
  "red", "ruby red", "cherry red",
  "pink", "fuscia", "coral", "magenta", "salmon pink",
  "purple", "mauve", "violet",
  "blue", "navy blue", "sky blue", "cerulean",
  "green", "chartreuse", "sage", "olive", "mint green",
  "brown", "tawny", "cinnamon",
  "grey", "charcoal grey", "flint grey", "dark grey",
  "black", "black", "black", "black",
]

erotica.colorListSwimwearF = [
  "white",
  "yellow", "gold-colored",
  "orange", "amber", 
  "red", "ruby red",
  "pink", "fuscia", "coral", "magenta", "salmon pink",
  "purple", "mauve", "violet",
  "blue", "navy blue", "sky blue", "cerulean",
  "green",
  "grey",
  "black", "black", "black", "black",
]

erotica.colorListUnderwear = [
  "white",
  "red", "ruby red",
  "pink", "fuscia", "coral", "magenta", "salmon pink",
  "black", "black", "black", "black",
]

erotica.colorListSwimwearM = [
  "white",
  "yellow", "gold-colored",
  "orange", "amber", 
  "red", "ruby red",
  "purple", "mauve", "violet",
  "blue", "navy blue", "sky blue", "cerulean",
  "blue", "navy blue", "sky blue", "cerulean",
  "green",
  "grey",
  "black", "black", "black", "black",
  "black", "black", "black", "black",
]



erotica.canWearRemoveWithSize = function(char, toWear) {
  if (toWear && char.size && char.size > this.size) {
    failedmsg("No way is " + char.byname({article:DEFINITE}) + " getting into something that small!");
    return false;
  }
  const garment = this.getWearRemoveBlocker(char, toWear);
  if (garment) {
    if (toWear) {
      failedmsg(CANNOT_WEAR_OVER(char, this, garment));
    }
    else {
      failedmsg(CANNOT_REMOVE_UNDER(char, this, garment));
    }
    return false;
  }
  return true;
};




//---- FOOTWEAR ----


createItem("boots_ankle", MADE_OF(materials.leather), BOOTS(0),
  {
    alias:"ankle boots",
    examine:"A pair of black, ankle-length boots.",
  }
);

createItem("boots_calf", MADE_OF(materials.leather), BOOTS(1),
  {
    alias:"boots",
    examine:"A pair of black, knee-length boots.",
  }
);

createItem("boots_thigh", MADE_OF(materials.leather), BOOTS(2),
  {
    alias:"thigh-length boots",
    examine:"A pair of black, knee-length boots, lacing up at the side.",
  }
);

createItem("heels", MADE_OF(materials.leather), SHOES(),
  {
    alias:"heels",
    examine:"A pair of black heels.",
  }
);




//---- UNDERWEAR ----



createItem("thong_black", MADE_OF(materials.cloth), THONG(),
  {
    alias:"black thong",
    examine:"The thong is black, and rather small, with lacing along the three sides of the triangle.",
    colors:erotica.colorListUnderwear,
    image:"thong_black",
    underwear:true,
  }
);

createItem("thong_fuckme_black", MADE_OF(materials.cloth), THONG(),
  {
    alias:"black \"Fuck me\" thong",
    examine:"The thong is black, and rather small, with \"Fuck me\" across the triangle.",
    colors:"black;white",
    image:"thong_black",
    underwear:true,
  }
);

createItem("thong_loveheart", MADE_OF(materials.cloth), THONG(),
  {
    alias:"loveheart thong",
    examine:"Someone's idea of romance is apparently to stick a loveheart on a tiny item of underwear.",
    image:"thong_black",
    underwear:true,
  }
);



createItem("bra", MADE_OF(materials.cloth), BRA(),
  {
    alias:"black bra",
    examine:"A lacy black bra.",
    image:"halter_black",
    colors:erotica.colorListUnderwear,
    underwear:true,
  }
);





//---- CASUAL WEAR ----


createItem("teeshirt_black", MADE_OF(materials.cloth), TEE_SHIRT(),
  {
    alias:"black tee-shirt",
    examine:"A plain black tee-shirt.",
    colors:erotica.colorList,
    image:"teeshirt_white",
  }
);

createItem("teeshirt_black_with_logo", MADE_OF(materials.cloth), TEE_SHIRT(),
  {
    alias:"black tee-shirt with logo",
    examine:"A black tee-shirt with logo across the chest.",
    colors:erotica.colorListSwimwearF,
    logos:["a rock band logo", "a stylized sunbust"],
    image:"teeshirt_white",
    variFunc:function() {
      const color = randomFromArray(this.colors)
      const logo = randomFromArray(this.logos)
      this.alias = this.alias.replace("black", color.toLowerCase());
      if (this.image) this.image = this.image.replace("black", color);
      this.listalias = this.alias.replace("Black", sentenceCase(color));
      this.examine = this.examine.replace("black", color);
      this.examine = this.examine.replace("logo", logo);
    },
  }
);

createItem("teeshirt_slut_black", MADE_OF(materials.cloth), TEE_SHIRT(true),
  {
    alias:"black \"Slut\" tee-shirt",
    examine:"A black tee-shirt with the word \"Slut\" emblazoned across the chest.",
    colors:erotica.colorList,
    image:"teeshirt_white",
  }
);


createItem("teeshirt_ripped", MADE_OF(materials.cloth), TEE_SHIRT(),
  {
    alias:"ripped tee-shirt",
    examine:"A white tee-shirt, with pretty much all the lower half ripped away.",
    colors:erotica.colorList,
    image:"teeshirt_white",
    slots:["chest", "cleavage", "nipple", "upperback", "shoulder"],
  }
);



createItem("skirt_floral", MADE_OF(materials.cloth), SKIRT(2),
  {
    alias:"floral skirt",
    examine:"A loose, wrap-around skirt, knee-length, with red and yellow flowers on it.",
    wrapSkirt:true,
  }
);

createItem("skirt_black", MADE_OF(materials.cloth), SKIRT(1),
  {
    alias:"black skirt",
    examine:"A black, wrap-around skirt that covers most of the thigh.",
    colors:erotica.colorList,
    wrapSkirt:true,
  }
);

createItem("denim_skirt", MADE_OF(materials.cloth), SKIRT(1),
  {
    alias:"denim skirt",
    examine:"A short, tight skirt, frayed along the bottom.",
    image:"skirt_floral",
  }
);

createItem("daisy_dukes", MADE_OF(materials.cloth), SHORTS(),
  {
    alias:"Daisy Dukes",
    examine:"Jean shorts, cut very short.",
    image:"daisydukes",
  }
);

createItem("mini_skirt", MADE_OF(materials.cloth), SKIRT(1),
  {
    alias:"mini-skirt",
    examine:"A tight black skirt, falling to mid-thigh",
    image:"skirt_floral",
  }
);

createItem("micro_skirt", MADE_OF(materials.cloth), SKIRT(0),
  {
    alias:"mini-skirt",
    examine:"A tight black skirt, barely decent.",
    image:"skirt_floral",
  }
);

createItem("croptop_black", MADE_OF(materials.cloth), VEST_TOP(true),
  {
    alias:"black vest-top",
    examine:"A rather short, black vest-top.",
    image:"vest_pink",
    colors:erotica.colorList,
  }
);











//---- DRESSES ----



createItem("dress_strapless", MADE_OF(materials.cloth), DRESS(["chest", "cleavage", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"short, black, strapless dress",
    examine:"A short, strapless dress, in black.",
    image:"dress_strapless_black",
  }
);

createItem("dress_micro", MADE_OF(materials.cloth), DRESS(["chest", "nipple", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"very short black dress",
    examine:"The black dress is so short it is barely decent. Spaghetti straps held it up.",
    image:"dress_micro_black",
    colors:erotica.colorListSwimwearF,
  }
);

createItem("dress_short", MADE_OF(materials.cloth), DRESS(["chest", "nipple", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"short dress",
    examine:"The black dress is laced up across the neck line, which went down to the naval.",
    image:"dress_short_black",
    colors:erotica.colorListSwimwearF,
  }
);

createItem("dress_side", MADE_OF(materials.cloth), DRESS(["chest", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh", "calf"]),
  {
    alias:"black, side-open dress",
    examine:"This long black dress is open all down the left, with just a series of short chains pulling the two halves together; it had a single strap over the left shoulder.",
    image:"dress_side_blue",
    colors:erotica.colorListSwimwearF,
  }
);

createItem("dress_split", MADE_OF(materials.cloth), DRESS(["chest", "cleavage", "nipple", "lowerback", "midriff", "hip", "groin", "buttock", "thigh", "calf"]),
  {
    alias:"long black dress",
    examine:"This silky black dress had a low neckline, and a long skirt split all the way ip the left side.",
    image:"dress_split_black",
    colors:erotica.colorListSwimwearF,
  }
);



createItem("dress_goth", MADE_OF(materials.cloth), DRESS(["chest", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"goth dress",
    examine:"A strapless, black dress, the body ribbed like a corset, while the skirt is slightly flared, and trimmed with lace.",
    image:"dress_goth",
  }
);

createItem("dress_pvc_red", MADE_OF(materials.cloth), DRESS(["chest", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"red PVC dress",
    examine:function() {
      if (this.worn) {
        msg("The red PVC dress is very short; it is laced all the way up the back, leaving a strip of bare skin about an inch side that included her ass crack.");
      }
      else {
        msg("The red PVC dress is very short; it is fastens by lacing all the way up the back.");
      }
    },
    image:"dress_pvc_red",
  }
);

createItem("dress_mesh", MADE_OF(materials.cloth), DRESS(["chest", "cleavage", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"black mesh dress",
    examine:function() {
      if (this.worn) {
        msg("The dress is very short, but more of an issue is it is made of a course mesh, so does not really hide much at all.");
      }
      else {
        msg("The dress is very short, and made of a mesh material that is more hole than fabric.");
      }
    },
    image:"dress_mesh",
    pullsoff:true,
    getRevealing:function() { return 4; },
  }
);

createItem("dress_gauze", MADE_OF(materials.cloth), DRESS(["chest", "nipple", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"very short gauze dress",
    examine:"The gauzy black dress is so short it is barely decent, but it is almost see-through too. Spaghetti straps held it up.",
    image:"dress_micro_black",
  }
);




createItem("maid_outfit", MADE_OF(materials.cloth), DRESS(["chest", "nipple", "lowerback", "midriff", "hip", "groin", "buttock"]),
  {
    alias:"maid outfit",
    examine:"A short black dress, made of slightly see-through material, with white lace trim, with a little apron at the front.",
    image:"dress_short_black",
  }
);





//---- SWIMWEAR ----

createItem("posing_pouch", MADE_OF(materials.cloth), WEARABLE(2, ["crotch", "groin"]),
  {
    alias:"black posing-pouch",
    examine:"A black posing-pouch, it leaving nothing to the imasgination...",
    colors:["black", "red", "leopard-pattern"],
  }
);

createItem("shorts_black", MADE_OF(materials.cloth), SWIM_SHORTS(true),
  {
    alias:"black swimshorts",
    examine:"A pair of baggy black, knee-length shorts.",
    colors:erotica.colorListSwimwearM,
    image:"shorts_black",
  }
);

createItem("briefs_black_m", MADE_OF(materials.cloth), BRIEFS(),
  {
    alias:"black swimbriefs",
    colors:erotica.colorListSwimwearM,
    examine:"A pair of black swim briefs.",
    image:"briefs_black",
    pullsoff:true,
  }
);


createItem("swimsuit_black_scooped", MADE_OF(materials.cloth), SWIMSUIT(0),
  {
    alias:"black scooped swimsuit",
    examine:"The swimsuit is black; it had a scooped back and high legs.",
    colors:erotica.colorListSwimwearF,
  }
);

createItem("thong_black_sw", MADE_OF(materials.cloth), THONG(),
  {
    alias:"black thong",
    examine:"The thong is black, and rather small.",
    colors:erotica.colorListSwimwearF,
    image:"thong_black",
    swimwear:true,
  }
);

createItem("swimsuit_black", MADE_OF(materials.cloth), SWIMSUIT(1),
  {
    alias:"black swimsuit",
    examine:"The black swimsuit is relatively modest, with a lower leg cut, and most of the back covered.",
  }
);

createItem("swimsuit_yellow_panel", MADE_OF(materials.cloth), SWIMSUIT(0),
  {
    alias:"yellow-panelled swimsuit",
    examine:"The swimsuit is black with a yellow panel down the front; it had a scooped back and high legs.",
    variFunc:function() {
      let color = randomFromArray(erotica.colorListSwimwearF)
      while (color === "black") {
        color = randomFromArray(erotica.colorListSwimwearF)
      }
      this.alias = this.alias.replace("yellow", color.toLowerCase());
      if (this.image) this.image = this.image.replace("yellow", color.toLowerCase());
      this.listalias = this.alias.replace("Yellow", sentenceCase(color));
      this.examine = this.examine.replace("yellow", color.toLowerCase());
    },
  }
);

createItem("halter_black", MADE_OF(materials.cloth), HALTER(),
  {
    alias:"halter_black",
    colors:erotica.colorListSwimwearF,
    image:"halter_black",
    examine:"A black, halter-neck bikini top.",
  }
);

createItem("bandeau_black", MADE_OF(materials.cloth), HALTER(),
  {
    alias:"black bandeau bikini halter",
    colors:erotica.colorListSwimwearF,
    examine:"A strapless, black bikini halter with a twist between the cups.",
    image:"bandeau_black",
  }
);

createItem("briefs_black", MADE_OF(materials.cloth), BRIEFS(),
  {
    alias:"black bikini briefs",
    colors:erotica.colorListSwimwearF,
    examine:"A pair of black bikini briefs that tie up at the side.",
    image:"briefs_black",
    pullsoff:true,
  }
);

createItem("sling_black", MADE_OF(materials.cloth), WEARABLE(1, ["crotch", "groin", "nipple"]),
  {
    alias:"black sling bikini",
    examine:"A rather revealing one-piece, this is little more than a 'V', from from crotch, over the shoulders.",
    colors:erotica.colorListSwimwearF,
    swimwear:true,
  }
);

createItem("halter_minimal_black", MADE_OF(materials.cloth), HALTER(),
  {
    alias:"indecent black bikini halter",
    examine:"Two black strips that would only cover the middle third of each breast, with some thin straps to keep them in place.",
    colors:erotica.colorListSwimwearF,
    image:"halter_black",
  }
);

createItem("halter_us", MADE_OF(materials.cloth), HALTER(),
  {
    alias:"USA bikini halter",
    examine:"One cup of the halter is red and white stripes, the other white stars on blue.",
    image:"halter_black",
  }
);

createItem("briefs_us", MADE_OF(materials.cloth), BRIEFS(),
  {
    alias:"USA bikini briefs",
    examine:"The bikini briefs are striped red and white, like the lower half of the US flag.",
    image:"briefs_black",
    pullsoff:true,
  }
);








createItem("handcuffs", MADE_OF(materials.cloth), WEARABLE(2, ["wrists"]),
  {
    alias:"handcuffs",
    examine:"A pair of furry handcuffs, obviously designed for prolonged use.",
    wearmsg:"Nervously, Lucy puts the handcuffs round her right wrist, then, hoping she is not going to regret it, puts her hands behind her back, and after some fumbling gets her left wrist secured in the handcuffs too",
    removemsg:"Lucy wished she could get the damn handcuffs off",
  }
);




createItem("loin_cloth", MADE_OF(materials.cloth), WEARABLE(2, ["groin"]),
  {
    alias:"loin cloth",
  }
);

createItem("tassels", MADE_OF(materials.cloth), WEARABLE(0, ["nipple"]),
  {
    alias:"tassels",
    examine:"A pair of sticky disks, or pasties, that adhere to the nipples, with blue tassels dangling from them.",
    wearMsg:function(char) {
      return nounVerb(char, "stick", true) + " one of the pasties to " + char.pronouns.poss_adj + " right nipple, and then the other to " + char.pronouns.poss_adj + " left. They do not leave much to the imaginations.";
    },
    removeMsg:function(char) {
      return "A little gingerly," + nounVerb(char, "pull") + " the pastie from " + char.pronouns.poss_adj + " right nipple, and then does likewise for the one on " + char.pronouns.poss_adj + " left nipple.";
    },
    image:"tassels",
    pullsoff:true,
    showwear:true,
  }
);

createItem("thong_sequined", MADE_OF(materials.cloth), THONG(),
  {
    alias:"sequinned thong",
    examine:"The thong is rather small and covered in sequins - as if there is any more need to draw the eye -  with lacing along the three sides of the triangle.",
    image:"thong_black",
    showwear:true,
  }
);

createItem("halter_leopard", MADE_OF(materials.cloth), BRA(),
  {
    alias:"leopard-skin halter",
    examine:"A halter made of fake leopard-skin.",
  }
);





createItem("leather_corset", MADE_OF(materials.leather), WEARABLE(4, ["chest", "nipple", "upperback", "midriff"]),
  {
    alias:"leather dress",
    examine:"The corset is made of soft black leather, and is fastens at the back with a series of loops and hooks. While it offered good support for her bust, it is barely high enough to cover her nipples.",
    //wearmsg:nounVerb(char, "pull", true) + " on the corset, fastening it at the back before getting her breasts comfortable in the tight garment.",
    //removemsg:nounVerb(char, "unfasten", true) + " her corset, and takes it off",
    image:"corset",
    pullsoff:true,
    stripper:function(char) {
      msg("Slowly she unfastens the corset. She pulls it off, her breasts bare; the men cheer and whistle.");
    },
  }
);

createItem("leather_belt_skirt", MADE_OF(materials.cloth), WEARABLE(2, ["groin", "buttock", "hip"]),
  {
    alias:"belt skirt",
    examine:"A wide leather belt that is just about thick enough to wear as a belt.",
    //wearmsg:nounVerb(char, "put", true) + " the belt round her hips, and fastens the buckle over her groin.",
    //removemsg:nounVerb(char, "unfasten", true) + " the buckle, taking off the belt.",
    image:"belt_skirt",
    stripper:function(char) {
      const groin = game.player.getInnerWearable("groin");
      if (groin === this) {
        msg("Slowly " + nounVerb(char, "unfasten") + " the belt, conscious she had no panties on. She pulls it off, her sex exposed; the men cheer and whistle.");
      }
      else {
        msg(nounVerb(char, "unfasten", true) + " the belt, glad she is wearing underwear. She pulls it off, exposing her " + groin.byname() + ".");
      }
    },
  }
);

createItem("leather_collar", MADE_OF(materials.leather), WEARABLE(2, ["neck"]),
  {
    alias:"leather collar",
    examine:"A studded leather collar.",
  }
);

createItem("leather_thong", MADE_OF(materials.leather), THONG(),
  {
    alias:"leather thong",
    examine:"The thong is made of soft black black, and where one might have expected a triangle of leather to preserve her modesty at least a little there is merely two straps, with studs at each end.",
    image:"thong_leather",
    getRevealing:function() { return 3; },
  }
);

createItem("leather_halter", MADE_OF(materials.leather), BRA(),
  {
    alias:"leather halter",
    examine:"The halter is made of soft black leather; three thin bands crossed each breast, offering minimal coverage.",
    wearMsg:function(char) {
      return nounVerb(char, "pull", true) + " on the halter, fastening it at the back, then adjusting the bands to cover " + char.pronouns.poss_adj + " nipples.";
    },
    image:"halter_leather",
  }
);

createItem("leather_dress", MADE_OF(materials.leather), DRESS(["chest", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"black leather dress",
    examine:function() {
      if (this.worn) {
        msg("Now she has it on, Lucy realises the black leather dress is even shorter at the back, and does not actually reach her crotch. The six inch hole over her cleavage also makes her feel rather exposed.");
      }
      else {
        msg("The black leather dress is so short it would barely be decent. It has a high neckline, but a gaping hole, six inches across, over the cleavage.");
      }
    },
    image:"dress_leather",
  }
);

createItem("leather_mini_skirt", MADE_OF(materials.leather), SKIRT(0),
  {
    alias:"leather mini-skirt",
    examine:"A tight black leather skirt, hardly covering the legs at all",
  }
);

createItem("catsuit", MADE_OF(materials.pvc), WEARABLE(4, ["chest", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "crotch", "thigh", "knee", "calf", "shoulder", "arm"]),
  {
    alias:"black PVC catsuit",
    examine:"A very tight black catsuit, that covers the entire body between ankle, wrist and neck, but nevertheless leaves nothing to the imagination.",
    colors:["black", "black", "red", "metallic blue", "metallic red"],
  }
);