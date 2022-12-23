"use strict";


// This file is optional

// May need to consider how player will refer to tee-shirts


erotica.createGarment = function(proto, loc, options = {}) {
  if (loc && !w[loc]) return errormsg("Unknown location in wardrobe:" + loc)

  // normalize options
  if (typeof options === 'string') options = {color:options}
  if (Array.isArray(options)) options = {color:options}
  if (!options.color) options.color = proto.colors
  if (Array.isArray(options.color)) options.color = random.fromArray(options.color)
    
  // find prototype and clone
  if (typeof proto === "string") {
    if (w[proto] === undefined) return errormsg("Failed to find a garment called " + proto + " for createGarment.", true)
    proto = w[proto]
  }
  let name = (loc && (w[loc].npc || w[loc].player)) ? loc + '_' + proto.name : proto.name
  if (options.color) name = name.replace('black', options.color)
    
  const o = world.isCreated ?
    cloneObject(proto, loc, util.findUniqueName(name)) :
    copyObject(proto, loc, util.findUniqueName(name)) 
    
  // set options
  if (o.variFunc) {
    o.variFunc(options)
  }
  else if (options.color) {
    o.alias = o.alias.replace("black", options.color.toLowerCase());
    if (o.image) o.image = o.image.replace("black", options.color.toLowerCase());
    o.listAlias = sentenceCase(o.alias.replace("Black", sentenceCase(options.color)))
    if (o.exam) {
      o.exam = o.exam.replace("black", options.color.toLowerCase());
    }
    else {
      console.log("No exam for " + proto.name)
    }
  }
  for (let key in options) {
    o[key] = options[key]
  }

  // place in world
  if (loc && (w[loc].npc || w[loc].player)) {
    o.worn = true;
    o.owner = loc;
    o.afterMove = function(options) {
      // garment picked up from room by player, whilst owner present
      if (w[options.fromLoc].room && options.toLoc === player.name && w[this.owner].isHere()) {
        w[this.owner].pause()
        msg(this.pickupMsg, {char:this.owner, garment:this})
      }
    }
  }
  
  return o;
}


erotica.stripNaked = function(npcName) {
  for (let key in w) {
    if (w[key].loc === npcName && w[key].worn) {
      w[key].worn = false
      delete w[key].loc
    }
  }
}

erotica.createOutfit = function(npcName, data) {
  for (let el of data) {
    el.splice(1, 0, npcName)
    erotica.createGarment(...el)
  }
}




erotica.createBikini = function(loc) {
  let color = random.fromArray(erotica.colorListSwimwearF)
  let halter, briefs, desc
  if (random.chance(1)) {
    halter = erotica.createGarment(w.halter_us, loc)
    briefs = erotica.createGarment(w.briefs_us, loc)
    desc = 'A "stars and stripes" bikini.'
    color = 'stars and stripes'
  }
  else if (random.chance(3)) {
    halter = erotica.createGarment(w.halter_minimal_black, loc, color)
    briefs = erotica.createGarment(w.thong_black_sw, loc, color)
    desc = 'A ' + color + ' thong bikini.'
  }
  else if (random.chance(30)) {
    halter = erotica.createGarment(w.bandeau_black, loc, color)
    briefs = erotica.createGarment(w.briefs_black, loc, color)
    desc = 'A ' + color + ' bikini, with a strapless bandeau halter.' 
  }
  else {
    halter = erotica.createGarment(w.halter_black, loc, color)
    briefs = erotica.createGarment(w.briefs_black, loc, color)
    desc = 'A ' + color + ' side-tie bikini.' 
  }
  let ensembleAlias = halter.bikiniAlias ? halter.bikiniAlias : halter.alias.replace(/ (bikini )?halter/, " bikini");
  ensembleAlias = ensembleAlias.replace("black", color);
  const ensembleName = util.findUniqueName(halter.name.replace("_halter", "_ensemble"))
  
  const ensemble = erotica.createBikiniEnsemble(ensembleName, halter, briefs, ensembleAlias, desc);
  return [halter, briefs, color, ensemble]
}



erotica.createBikiniEnsemble = function(ensembleName, halter, briefs, ensembleAlias, desc) {
  const ensemble = createEnsemble(ensembleName, [halter, briefs], {
    exam:desc,
    alias:ensembleAlias,
    examine:function(multiple) {
      let s = this.exam
      if (this.ensembleMembers[0].cumMess && this.ensembleMembers[0].cumMess.length > 0) {
        if (this.ensembleMembers[1].cumMess && this.ensembleMembers[1].cumMess.length > 0) {
          s += " There is cum on both the halter and the briefs."
        }
        else {
          s += " There is cum on the halter."
        }
      }
      else if (this.ensembleMembers[1].cumMess && this.ensembleMembers[1].cumMess.length > 0) {
        s += " There is cum on the briefs."
      }
      msg(s)
    },
  });
  return ensemble
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
  if (random.chance(65)) {
    erotica.createBikini(loc);
    if (addExtras && random.chance(20)) {
      erotica.createGarment(w.daisy_dukes, loc)
    }
    if (addExtras && random.chance(30)) {
      erotica.createGarment(w.teeshirt_black, loc)
    }
  }
  else if (random.chance(1)) {
    erotica.createGarment(w.sling_black, loc)
  }
  else if (random.chance(1)) {
    erotica.createGarment(w.briefs_black, loc)
  }
  else if (random.chance(1)) {
    erotica.createGarment(w.thong_black, loc)
  }
  else if (random.chance(3)) {
    erotica.createGarment(w.swimsuit_yellow_panel, loc)
  }
  else if (random.chance(25)) {
    erotica.createGarment(w.swimsuit_black, loc)
    if (addExtras && random.chance(35)) {
      erotica.createGarment(w.teeshirt_black, loc)
    }
    else if (addExtras && random.chance(20)) {
      erotica.createGarment(w.skirt_black, loc)
    }
  }
  else {
    erotica.createGarment(w.swimsuit_black_scooped, loc)
    if (addExtras && random.chance(25)) {
      erotica.createGarment(w.teeshirt_black, loc)
    }
  }
}



erotica.createSwimwearM = function(loc, addExtras) {
  if (random.chance(1)) {
    erotica.createGarment(w.posing_pouch, loc)
  }
  else if (random.chance(20)) {
    erotica.createGarment(w.shorts_black, loc)
  }
  else {
    erotica.createGarment(w.briefs_black_m, loc)
  }
  if (addExtras && random.chance(15)) {
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
    return failedmsg("No way is " + lang.getName(char, {article:DEFINITE}) + " getting into something that small!");
  }
  const garment = this.getWearRemoveBlocker(char, toWear);
  if (garment) {
    if (toWear) {
      failedmsg(cannot_wear_over(char, this, garment));
    }
    else {
      failedmsg(cannot_remove_under(char, this, garment));
    }
    return false;
  }
  return true;
};




//---- FOOTWEAR ----


createItem("boots_ankle", BOOTS(0), MADE_OF(materials.leather),
  {
    alias:"ankle boots",
    exam:"A pair of black, ankle-length boots.",
  }
);

createItem("boots_calf", BOOTS(1), MADE_OF(materials.leather),
  {
    alias:"boots",
    exam:"A pair of black, knee-length boots.",
  }
);

createItem("boots_thigh", BOOTS(2), MADE_OF(materials.leather),
  {
    alias:"thigh-length boots",
    exam:"A pair of black, knee-length boots, lacing up at the side.",
  }
);

createItem("heels", SHOES(), MADE_OF(materials.leather),
  {
    alias:"heels",
    exam:"A pair of black heels.",
  }
);

createItem("sandals", SHOES('sandal'), MADE_OF(materials.plastic),
  {
    alias:"sandals",
    exam:"A pair of black sandals.",
  }
);

createItem("trainers", SHOES('trainer'), MADE_OF(materials.plastic),
  {
    alias:"trainers",
    exam:"A pair of black trainers.",
    garmentType:"casual",
  }
);

createItem("shoes", SHOES('shoe'), MADE_OF(materials.leather),
  {
    alias:"shoes",
    exam:"A pair of black shoes.",
  }
);

createItem("pumps", SHOES('pump'), MADE_OF(materials.plastic),
  {
    alias:"pumps",
    exam:"A pair of black pumps.",
  }
);




//---- UNDERWEAR ----



createItem("thong_black", THONG(),
  {
    alias:"black thong",
    exam:"The thong is black, and rather small, with lacing along the three sides of the triangle.",
    colors:erotica.colorListUnderwear,
    image:"thong_black",
    underwear:true,
  }
);

createItem("thong_fuckme_black", THONG(),
  {
    alias:"black \"Fuck me\" thong",
    exam:"The thong is black, and rather small, with \"Fuck me\" across the triangle.",
    colors:"black;white",
    image:"thong_black",
    underwear:true,
  }
);

createItem("thong_loveheart", THONG(),
  {
    alias:"loveheart thong",
    exam:"Someone's idea of romance is apparently to stick a loveheart on a tiny item of underwear.",
    image:"thong_black",
    underwear:true,
  }
);

createItem("panties_black", PANTIES(),
  {
    alias:"lacy black briefs",
    exam:"The briefs are black and lacy, and rather small.",
    colors:erotica.colorListUnderwear,
    image:"thong_black",
    underwear:true,
  }
);

createItem("briefs_black", PANTIES(),
  {
    alias:"black briefs",
    exam:"The briefs are black, and rather small.",
    colors:erotica.colorListUnderwear,
    image:"thong_black",
    underwear:true,
  }
);

createItem("boxers_black", BOXERS(),
  {
    alias:"plain black boxers",
    exam:"The boxers are black and pretty boring.",
    colors:erotica.colorListUnderwear,
    underwear:true,
  }
)


createItem("thong_black_m", THONG_M(),
  {
    alias:"black thong",
    exam:"The thong is black and pouch-like; molded to give support to the male body.",
    colors:erotica.colorListUnderwear,
    underwear:true,
  }
);

createItem("thong_black_m_huge", THONG_M(),
  {
    alias:"black thong",
    exam:"The thong is black and pouch-like; molded to give support to the male body - a particularly well-endowed one.",
    colors:erotica.colorListUnderwear,
    underwear:true,
  }
);


createItem("bra_black", BRA(),
  {
    alias:"black bra",
    exam:"A lacy black bra.",
    image:"halter_black",
    colors:erotica.colorListUnderwear,
    underwear:true,
  }
);

createItem("sports_bra", BRA(),
  {
    alias:"black sports bra",
    exam:"A plain black sports bra.",
    image:"halter_black",
    colors:erotica.colorListUnderwear,
    underwear:true,
  }
);

createItem("thick_tights_black", TIGHTS(),
  {
    alias:"black tights",
    exam:"A pair of thick, black tights.",
    colors:erotica.colorListUnderwear,
    underwear:true,
  }
);

createItem("socks_black", HOSE(1),
  {
    alias:"black socks",
    exam:"A pair of black socks.",
    colors:erotica.colorListSwimwearF,
    underwear:true,
  }
);

createItem("stockings_black", HOSE(3),
  {
    alias:"black stockings",
    exam:"A pair of black stockings.",
    underwear:true,
  }
);

createItem("fishnet_stockings", HOSE(3),
  {
    alias:"fishnet stockings",
    exam:"A pair of fishnet stockings.",
    underwear:true,
  }
);


createItem("corset_black", CORSET(),
  {
    alias:"black crset",
    exam:"The corset fastens at the back with a series of loops and hooks. While it offered good support for her bust, it is barely high enough to cover {pa:char} nipples.",
    msgWear:"{nv:char:pull:true} on the corset, fastening it at the back before getting {pa:char} breasts comfortable in the tight garment.",
    msgRemove:"{nv:char:unfasten:true} {pa:char} corset, and takes it off",
    image:"corset",
    pullsoff:'jacket',
    stripper:function() {
      return "Slowly she unfastens the corset. She pulls it off, {pa:char} breasts bare; the men cheer and whistle."
    },
  }
)



//---- CASUAL WEAR ----


createItem("jacket_black", JACKET(),
  {
    alias:"black jacket",
    exam:"A long-sleeved jacket, with buttons.",
    colors:erotica.colorList,
  }
);

createItem("teeshirt_black", TEE_SHIRT(),
  {
    alias:"black tee-shirt",
    exam:"A plain black tee-shirt.",
    colors:erotica.colorList,
    image:"teeshirt_white",
  }
);

createItem("teeshirt_black_with_logo", TEE_SHIRT(),
  {
    alias:"black tee-shirt",
    exam:"A black tee-shirt with logo across the chest.",
    colors:erotica.colorListSwimwearF,
    logos:["a rock band logo", "a stylized sunbust"],
    image:"teeshirt_white",
    variFunc:function(options) {
      if (!options) options = {}
      if (!options.color) options.color = random.fromArray(this.colors)
      if (!options.logo) options.logo = random.fromArray(this.logos)
      this.setAlias(this.alias.replace("black", options.color.toLowerCase()))
      if (this.image) this.image = this.image.replace("black", options.color);
      this.exam = this.exam.replace("black", options.color);
      this.exam = this.exam.replace("logo", options.logo);
    },
  }
);

createItem("teeshirt_slut_black", TEE_SHIRT(true),
  {
    alias:"black \"Slut\" tee-shirt",
    exam:"A black tee-shirt with the word \"Slut\" emblazoned across the chest.",
    colors:erotica.colorList,
    image:"teeshirt_white",
  }
);


createItem("teeshirt_ripped", TEE_SHIRT(),
  {
    alias:"ripped tee-shirt",
    exam:"A white tee-shirt, with pretty much all the lower half ripped away.",
    colors:erotica.colorList,
    image:"teeshirt_white",
    slots:["chest", "cleavage", "nipple", "upperback", "shoulder"],
  }
);

createItem("croptop_black", VEST_TOP(true),
  {
    alias:"black vest-top",
    exam:"A rather short, black vest-top that leaves most of the midriff bare.",
    image:"vest_pink",
    colors:erotica.colorList,
  }
);

createItem("vesttop_black", VEST_TOP(false),
  {
    alias:"black vest-top",
    exam:"A black vest-top that just about reaches the waist.",
    image:"vest_pink",
    colors:erotica.colorList,
  }
);

createItem("blouse_black", BUTTONED_SHIRT(),
  {
    alias:"black blouse",
    exam:"A long-sleeved blouse that buttons down the front.",
    colors:erotica.colorList,
  }
);

createItem("shirt_black", BUTTONED_SHIRT(),
  {
    alias:"black shirt",
    exam:"A long-sleeved shirt that buttons down the front.",
    colors:erotica.colorList,
  }
);

createItem("pullover_shirt_black", PULLOVER_SHIRT(),
  {
    alias:"black shirt",
    exam:"A long-sleeved pullover-style shirt.",
    colors:erotica.colorList,
  }
);


createItem("skirt_floral", SKIRT(2),
  {
    alias:"floral skirt",
    exam:"A loose, wrap-around skirt, knee-length, with red and yellow flowers on it.",
    wrapSkirt:true,
  }
);

createItem("skirt_black", SKIRT(1),
  {
    alias:"black skirt",
    exam:"A black, wrap-around skirt that covers most of the thigh.",
    colors:erotica.colorList,
  }
);

createItem("denim_skirt", SKIRT(1),
  {
    alias:"denim skirt",
    exam:"A short, tight skirt, frayed along the bottom.",
    image:"skirt_floral",
  }
);

createItem("mini_skirt", SKIRT(1),
  {
    alias:"mini-skirt",
    exam:"A tight black skirt, falling to mid-thigh",
    image:"skirt_floral",
  }
);

createItem("micro_skirt", SKIRT(0),
  {
    alias:"mini-skirt",
    exam:"A tight black skirt, barely decent.",
    image:"skirt_floral",
  }
);

createItem("daisy_dukes", SHORTS(),
  {
    alias:"Daisy Dukes",
    exam:"Jean shorts, cut very short.",
    image:"daisydukes",
  }
);

createItem("jeans", PANTS("jeans"),
  {
    alias:"tight jeans",
    exam:"A pair of tight jeans.",
  }
);

createItem("ripped_jeans", PANTS("jeans"),
  {
    exam:"A pair of tight jeans, ripped across the knees to give a tantalising glimpse of bare skin beneath.",
  }
);

createItem("loose_jeans", PANTS("jeans"),
  {
    alias:"comfortable jeans",
    exam:"A pair of comfortable jeans.",
  }
);

createItem("leggings_black", PANTS("leggings"),
  {
    alias:"tight leggings",
    exam:"A pair of tight black leggings.",
    garmentType:"casual",
  }
);

createItem("pants_black", PANTS("pants"),
  {
    alias:"pants",
    exam:"A pair of black pants.",
    garmentType:"smart",
  }
);


createItem("casual_shorts_black", SHORTS(true),
  {
    alias:"black shorts",
    exam:"A pair of loose black, knee-length shorts.",
    colors:erotica.colorList,
    wear_layer:4,
  }
);






//---- DRESSES ----



createItem("dress_strapless", DRESS(["chest", "cleavage", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"short, black, strapless dress",
    exam:"A short, strapless dress, in black.",
    image:"dress_strapless_black",
    strapless:true,
    quick:'Short strapless',
  }
);

createItem("dress_micro", DRESS(["chest", "nipple", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"very short black dress",
    exam:"The black dress is so short it is barely decent. Spaghetti straps held it up.",
    image:"dress_micro_black",
    colors:erotica.colorListSwimwearF,
    quick:'Very short',
  }
)

createItem("dress_short", DRESS(["chest", "nipple", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"short dress",
    exam:"The black dress is laced up across the neck line, which went down to the naval.",
    image:"dress_short_black",
    colors:erotica.colorListSwimwearF,
    quick:'Short, laced-up',
  }
)

createItem("dress_side", DRESS(["chest", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh", "calf"]),
  {
    alias:"black, side-open dress",
    exam:"This long black dress is open all down the left, with just a series of short chains pulling the two halves together; it has a single strap over the left shoulder.",
    image:"dress_side_blue",
    colors:erotica.colorListSwimwearF,
    quick:'Side-open',
  }
)

createItem("dress_split", DRESS(["chest", "cleavage", "nipple", "lowerback", "midriff", "hip", "groin", "buttock", "thigh", "calf"]),
  {
    alias:"long black dress",
    exam:"This silky black dress had a low neckline, and a long skirt split all the way up the left side.",
    image:"dress_split_black",
    colors:erotica.colorListSwimwearF,
    quick:'Long, left split',
  }
)



createItem("dress_long", DRESS(["chest", "cleavage", "nipple", "lowerback", "midriff", "hip", "groin", "buttock", "thigh", "calf"]),
  {
    alias:"long black dress",
    exam:"This elegant black dress had an intricate neckline that hides most of the cleavage, and a long skirt.",
    image:"dress_split_black",
    colors:erotica.colorListSwimwearF,
    quick:'Long, elegant',
  }
)

createItem("dress_goth", DRESS(["chest", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"goth dress",
    exam:"A strapless, black dress, the body ribbed like a corset, while the skirt is slightly flared, and trimmed with lace.",
    image:"dress_goth",
    strapless:true,
    quick:'Goth-style',
  }
)

createItem("dress_pvc_red", DRESS(["chest", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"red PVC dress",
    examine:function() {
      if (this.worn) {
        msg("The red PVC dress is very short; it is laced all the way up the back, leaving a strip of bare skin about an inch side that included her ass crack.");
      }
      else {
        msg(this.exam);
      }
    },
    exam:"The red PVC dress is very short; it is fastens by lacing all the way up the back.",
    image:"dress_pvc_red",
    quick:'Short PVC',
  }
);

createItem("dress_mesh", DRESS(["chest", "cleavage", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"black mesh dress",
    examine:function(multiple) {
      if (this.worn) {
        msg("The dress is very short, but more of an issue is it is made of a course mesh, so does not really hide much at all.");
      }
      else {
        msg("The dress is very short, and made of a mesh material that is more hole than fabric.");
      }
    },
    image:"dress_mesh",
    pullsoff:'dress',
    getRevealing:function() { return 4; },
    quick:'Short mesh',
    exam:"The dress is very short, and made of a mesh material that was more hole than fabric.",
  }
);

createItem("dress_gauze", DRESS(["chest", "nipple", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]),
  {
    alias:"very short gauze dress",
    exam:"The gauzy black dress is so short it is barely decent, but it is almost see-through too. Spaghetti straps held it up.",
    image:"dress_micro_black",
    quick:'Short gauze',
  }
);




createItem("maid_outfit", DRESS(["chest", "nipple", "lowerback", "midriff", "hip", "groin", "buttock"]),
  {
    alias:"maid outfit",
    exam:"A short black dress, made of slightly see-through material, with white lace trim, with a little apron at the front.",
    image:"dress_short_black",
  }
);





//---- SWIMWEAR ----

createItem("posing_pouch", THONG(),
  {
    alias:"black posing-pouch",
    exam:"A black posing-pouch, it leaving nothing to the imagination...",
    colors:["black", "red", "leopard-pattern"],
  }
);

createItem("shorts_black", SWIM_SHORTS(true),
  {
    alias:"black swimshorts",
    exam:"A pair of baggy black, knee-length shorts.",
    colors:erotica.colorListSwimwearM,
    image:"shorts_black",
  }
);

createItem("briefs_black_m", BRIEFS(),
  {
    alias:"black swimbriefs",
    colors:erotica.colorListSwimwearM,
    exam:"A pair of black swim briefs.",
    image:"briefs_black",
    pullsoff:'down',
  }
);


createItem("swimsuit_black_scooped", SWIMSUIT(0),
  {
    alias:"black scooped swimsuit",
    exam:"The swimsuit is black; it had a scooped back and high legs.",
    colors:erotica.colorListSwimwearF,
  }
);

createItem("thong_black_sw", THONG(),
  {
    alias:"black thong",
    exam:"The thong is black, and rather small.",
    colors:erotica.colorListSwimwearF,
    image:"thong_black",
    garmentType:'swimwear',
  }
);

createItem("swimsuit_black", SWIMSUIT(1),
  {
    alias:"black swimsuit",
    exam:"The black swimsuit is relatively modest, with a lower leg cut, and most of the back covered.",
  }
);

createItem("swimsuit_yellow_panel", SWIMSUIT(0),
  {
    alias:"yellow-panelled swimsuit",
    exam:"The swimsuit is black with a yellow panel down the front; it had a scooped back and high legs.",
    variFunc:function(options) {
      let color = options.color ? options.color : random.fromArray(erotica.colorListSwimwearF)
      while (color === "black") {
        color = random.fromArray(erotica.colorListSwimwearF)
      }
      this.alias = this.alias.replace("yellow", color.toLowerCase());
      if (this.image) this.image = this.image.replace("yellow", color.toLowerCase());
      this.listAlias = this.alias.replace("Yellow", sentenceCase(color));
      this.exam = this.exam.replace("yellow", color.toLowerCase());
    },
  }
);

createItem("halter_black", HALTER(),
  {
    alias:random.fromArray(["black halter", "skimpy black halter"]),
    colors:erotica.colorListSwimwearF,
    image:"halter_black",
    exam:"A black, halter-neck bikini top.",
  }
);

createItem("bandeau_black", HALTER(),
  {
    alias:"black bandeau bikini halter",
    colors:erotica.colorListSwimwearF,
    exam:"A strapless, black bikini halter with a twist between the cups.",
    image:"bandeau_black",
    fastenStyle:"strapless",
  }
);

createItem("briefs_black_sw", BRIEFS(),
  {
    alias:"black bikini briefs",
    regex:/bikini bottoms?$/,
    colors:erotica.colorListSwimwearF,
    exam:"A pair of black bikini briefs that tie up at the side.",
    image:"briefs_black",
    pullsoff:'down',
  }
);

createItem("sling_black", SLING_BIKINI(1, ["crotch", "groin", "nipple"]),
  {
    alias:"black sling bikini",
    exam:"A rather revealing one-piece, this is little more than a 'V', from from crotch, over the shoulders.",
    colors:erotica.colorListSwimwearF,
  }
);


createItem("halter_minimal_black", HALTER(),
  {
    alias:"indecent black bikini halter",
    exam:"Two black strips that would only cover the middle third of each breast, with some thin straps to keep them in place.",
    colors:erotica.colorListSwimwearF,
    image:"halter_black",
  }
);

createItem("halter_us", HALTER(),
  {
    alias:"USA bikini halter",
    exam:"One cup of the halter is red and white stripes, the other white stars on blue.",
    image:"halter_black",
  }
);

createItem("briefs_us", BRIEFS(),
  {
    alias:"USA bikini briefs",
    exam:"The bikini briefs are striped red and white, like the lower half of the US flag.",
    image:"briefs_black",
    pullsoff:'down',
  }
);












createItem("leather_corset", CORSET(), MADE_OF(materials.leather),
  {
    alias:"leather corset",
    garmentType:'leatherwear',
    exam:"The corset is made of soft black leather, and is fastens at the back with a series of loops and hooks. While it offered good support for her bust, it is barely high enough to cover {pa:char} nipples.",
    msgWear:"{nv:char:pull:true} on the corset, fastening it at the back before getting {pa:char} breasts comfortable in the tight garment.",
    msgRemove:"{nv:char:unfasten:true} {pa:char} corset, and takes it off",
    image:"corset",
    pullsoff:'jacket',
    stripper:function() {
      return "Slowly she unfastens the corset. She pulls it off, {pa:char} breasts bare; the men cheer and whistle."
    },
  }
)

createItem("leather_belt_skirt", SKIRT(0), MADE_OF(materials.leather),
  {
    alias:"belt skirt",
    garmentType:'leatherwear',
    slots:["groin", "buttock", "hip"],
    exam:"A wide leather belt that is just about thick enough to wear as a belt.",
    stripper:function(options) {
      if (!options.groin) {
        return "Slowly {nv:char:unfasten} the belt, conscious {nv:char:have} no panties on. {nv:char:pull:true} it off, {pa:char} sex exposed; the men cheer and whistle."
      }
      else {
        return "{nv:char:unfasten:true} the belt, glad she is wearing underwear. She pulls it off, exposing {pa:char} {nm:groin}."
      }
    },
  }
);


createItem("leather_thong_m", THONG(), MADE_OF(materials.leather),
  {
    alias:"leather thong",
    garmentType:'leatherwear',
    exam:"The thong is made of soft black black, and is shaped to cover a cock and balls.",
    image:"thong_leather",
    garmentType:'leatherwear',
    getRevealing:function() { return 3; },
  }
)

createItem("leather_thong", THONG(), MADE_OF(materials.leather),
  {
    alias:"leather thong",
    garmentType:'leatherwear',
    exam:"The thong is made of soft black black, and where one might have expected a triangle of leather to preserve {pa:char} modesty at least a little there is merely two straps, with studs at each end.",
    image:"thong_leather",
    garmentType:'leatherwear',
    getRevealing:function() { return 3; },
  }
)

createItem("leather_halter", BRA(), MADE_OF(materials.leather),
  {
    alias:"leather halter",
    garmentType:'leatherwear',
    exam:"The halter is made of soft black leather; three thin bands crossed each breast, offering minimal coverage.",
    msgWear: "{nv:char:pull:true} on the halter, fastening it at the back, then adjusting the bands to cover {pa:char} nipples.",
    image:"halter_leather",
  }
);

createItem("leather_dress", DRESS(["chest", "nipple", "upperback", "lowerback", "midriff", "hip", "groin", "buttock", "thigh"]), MADE_OF(materials.leather),
  {
    alias:"black leather dress",
    garmentType:'leatherwear',
    examine:function(multiple) {
      if (this.worn) {
        msg("Now she has it on, Lucy realises the black leather dress is even shorter at the back, and does not actually reach her crotch. The six inch hole over her cleavage also makes her feel rather exposed.");
      }
      else {
        msg("The black leather dress is so short it would barely be decent. It has a high neckline, but a gaping hole, six inches across, over the cleavage.");
      }
    },
    image:"dress_leather",
    quick:'Short leather',
    exam:"The black leather dress is so short it is barely be decent. It has a high neckline, but a gaping hole, six inches across, over the cleavage."
  }
);

createItem("leather_mini_skirt", SKIRT(0), MADE_OF(materials.leather),
  {
    alias:"leather mini-skirt",
    garmentType:'leatherwear',
    exam:"A tight black leather skirt, hardly covering the legs at all",
  }
);

createItem("leather_collar", COLLAR(), MADE_OF(materials.leather),
  {
    alias:"leather collar",
    exam:"A studded leather collar.",
  }
);






createItem("thong_sequined", THONG(),
  {
    alias:"sequinned thong",
    exam:"The thong is rather small and covered in sequins - as if there is any more need to draw the eye -  with lacing along the three sides of the triangle.",
    image:"thong_black",
    garmentType:"showwear",
  }
);

createItem("halter_leopard", BRA(),
  {
    alias:"leopard-skin halter",
    exam:"A halter made of fake leopard-skin.",
  }
);




createItem("catsuit", JUMPSUIT("zip", false), MADE_OF(materials.pvc),
  {
    alias:"black PVC catsuit",
    exam:"A very tight black catsuit, that covers the entire body between ankle, wrist and neck - apart from the cleavage - but nevertheless leaves nothing to the imagination.",
    colors:["black", "black", "red", "metallic blue", "metallic red"],
  }
);

createItem("loin_cloth", LOIN_CLOTH(),
  {
    alias:"loin cloth",
    image:'loincloth',
    exam:"A piece of heavy cloth, about a foot long, but only three inches wide, hanging from a cord.",
  }
);

createItem("belt_black", WEARABLE_X(7, []), MADE_OF(materials.leather),
  {
    alias:"leather belt",
    exam:"A black leather belt with a simple metal buckle.",
    ripOff:erotica.ripOffBelt,
    msgWear:"{nv:char:pull:true} on {nm:item:the} and fastens it.",
    msgRemove:"{nv:char:unfasten:true} the buckle on {nm:item:the}, and pulls it off.",
  }
);

createItem("tassels", PASTIES(),
  {
    alias:"tassels",
    exam:"A pair of sticky disks, or pasties, that adhere to the nipples, with blue tassels dangling from them.",
    garmentType:"showwear",
  }
);



createItem("bowtie_black", TIE(),
  {
    alias:"black bowtie",
    exam:"A black bowtie.",
    garmentType:"smart",
  }
);

createItem("tie_black", TIE(),
  {
    alias:"black tie",
    exam:"A black tie.",
    garmentType:"smart",
  }
);