"use strict";






function createMan(loc) {
  res = createItem(randomFromArray(erotica.boysNames, true), ACTOR(false), {
    loc:loc, 
    willingToExpose:randomInt(1,5) + 3,
    attactedToMen:randomInt(0,5),
    attactedToWomen:randomInt(1,3) + 2,
  })
  erotica.generate(res, erotica.maleFeatures, 6);
  console.log(res)
  return res
}  


function createWoman(loc) {
  res = createItem(randomFromArray(erotica.girlsNames, true), ACTOR(true), {
    loc:loc,
    willingToExpose:randomInt(1,8),
    attactedToWomen:randomInt(0,5),
    attactedToMen:randomInt(1,3) + 2,
  })
  erotica.generate(res, erotica.femaleFeatures, 4);
  console.log(res)
  return res
}  
  
  
  
erotica.generate = function(char, list, averageSize) {
  char.examine = "{description} " + pronounVerb(char, "be", true) + " wearing {attire}.{ifposture: " + pronounVerb(char, "be", true) + " is {posture}.}{ifrestraint: " + pronounVerb(char, "be", true) + " is {restraint}.}"
  char.eyeColor = randomFromArray(erotica.eyeColors)
  char.getDescription = erotica.getDescription
  char.properName = true
  char.size = randomInt(1,3) + randomInt(1,3) + averageSize - 4
  char.appearance = randomInt(1,3) + randomInt(1,3) + 4
  
  char.features = []
  char.featuresDone = []
  if (res.appearance === 9) res.features.push(list.hot)
  if (res.appearance === 10) res.features.push(list.superHot)
  if (res.size > averageSize + 1) res.features.push(list.big)
  if (res.size < averageSize - 1) res.features.push(list.small)
  
  if (char.hasBodyPart("cock")) {
    char.cock = randomInt(1,3) + randomInt(1,3) - 1
    if (char.cock === 5) {
      char.hasHugeCock = true
      char.features.push(erotica.hugeCockFeature)
    }
    if (char.cock === 4) char.features.push(erotica.bigCockFeature)
    if (char.cock === 1) char.features.push(erotica.smallCockFeature)
  }

  if (char.hasBodyPart("tit")) {
    char.bust = randomInt(1,3) + randomInt(1,3) - 1
    if (char.bust === 5) {
      char.hasHugeBoobs = true
      char.features.push(erotica.hugeBustFeature)
    }
    if (char.bust === 4) char.features.push(erotica.bigBustFeature)
    if (char.bust === 1) char.features.push(erotica.smallBustFeature)
  }


  if (randomChance(50)) {
    char.skinTone = randomFromArray(erotica.skinTones)
    char.hairColor = randomChance(50) ? "black" : randomFromArray(erotica.naturalHairColors.concat(erotica.altHairColors))
    erotica.addFeature(char, randomFromArray(erotica.skinToneFeatures));
  }
  else if (randomChance(20)) {  
    char.skinTone = randomFromArray(erotica.paleSkinTones)
    char.hairColor = randomChance(50) ? randomFromArray(erotica.redHairColors) : randomFromArray(erotica.naturalHairColors.concat(erotica.altHairColors))
    erotica.addFeature(char, randomFromArray(erotica.skinToneFeatures));
  }
  else {  
    char.hairColor = randomFromArray(erotica.naturalHairColors.concat(erotica.altHairColors))
  }


  
  const hairStyle = randomFromArray(list.hairStyles)
  char.features.push(hairStyle)
  char.hairLength = hairStyle.hairLength
  if (randomChance(30)) {
    erotica.addFeature(char, randomFromArray(list.eye));
  }
  else {
    erotica.addFeature(char, list.eyeGeneric);
  }
  const total = randomInt(1, 2) + randomInt(1, 3) - 1
  for (let i = 0; i < randomInt(1, 3); i++) {
    erotica.addFeature(char, randomFromArray(list.features));
  }
  if (randomChance(40)) {
    erotica.addFeature(char, randomFromArray(list.tattoos));
  }
}
  
  
  // want to pick a dominant feature, do that, then list others
    
erotica.getDescription = function() {
  const dict = {}
  for (let i = 0; i < this.features.length; i++) {
    if (this.features[i].bp && !this.isBodyPartBare(this.features[i].bp)) continue
    erotica.appendToDescription(this, dict, this.features[i].form, this.features[i].s)
  }
  erotica.appendToDescription(this, dict)
  return dict.s
}

erotica.addFeature = function(char, f) {
  if (char.featuresDone.includes(f.type)) return;
  if (f.hasIf && !char.hasBodyPart(f.hasIf)) return;
  
  char.features.push(f)
  char.featuresDone.push(f.type)
  if (f.script) f.script(char)
}

erotica.setTattooQuote = function(char) {
  char.tattooQuote = randomFromArray(erotica.tattooQuotes);
}

erotica.setTattooImage = function(char) {
  char.tattooImage = randomFromArray(erotica.tattooImages);
}





erotica.appendToDescription = function(char, descDict, form, stringOrFunc) {
  if (stringOrFunc === undefined) {
    if (descDict.lastForm !== undefined) {
      erotica.appendAccumulatedToDescription(char, descDict, form);
    }
  }
  else if (form === "iso") {
    if (descDict.lastForm !== undefined) {
      erotica.appendAccumulatedToDescription(char, descDict, form);
      delete descDict.lastForm
    }
    if (descDict.s === undefined) {
      descDict.s = erotica.appendGetStringOrFunc(char, stringOrFunc, true)
    }
    else {
      descDict.s += " " + erotica.appendGetStringOrFunc(char, stringOrFunc, false)
    }
    descDict.s += "."
  }
  else if (descDict.lastForm === undefined) {
    descDict.lastForm = form
    descDict.list = []
    descDict.list.push(erotica.appendGetStringOrFunc(char, stringOrFunc))
  }
  else if (descDict.lastForm === form) {
    descDict.list.push(erotica.appendGetStringOrFunc(char, stringOrFunc))
  }
  else {
    erotica.appendAccumulatedToDescription(char, descDict, form);
    descDict.lastForm = form
    descDict.list = []
    descDict.list.push(erotica.appendGetStringOrFunc(char, stringOrFunc))
  }
}


erotica.appendGetStringOrFunc = function(char, stringOrFunc, isFirst) {
  return (typeof stringOrFunc === "function" ? stringOrFunc(char, isFirst) : stringOrFunc)
}

erotica.appendAccumulatedToDescription = function(char, descDict) {
  if (descDict.s === undefined) {
    descDict.s = char.alias + " " + descDict.lastForm + " "
  }
  else {
    descDict.s += " " + sentenceCase(char.pronouns.subjective) + " " + descDict.lastForm + " "
  }
  descDict.s += formatList(descDict.list, {lastJoiner:" and ", doNotSort:true}) + "."
}
