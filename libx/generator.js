"use strict";






function createMan(loc) {
  res = createItem(random.fromArray(erotica.boysNames, true), ACTOR(false), {
    loc:loc, 
    willingToExpose:random.int(1,5) + 3,
    attactedToMen:random.int(0,5),
    attactedToWomen:random.int(1,3) + 2,
  })
  erotica.generate(res, erotica.maleFeatures, 6);
  console.log(res)
  return res
}  


function createWoman(loc) {
  res = createItem(random.fromArray(erotica.girlsNames, true), ACTOR(true), {
    loc:loc,
    willingToExpose:random.int(1,8),
    attactedToWomen:random.int(0,5),
    attactedToMen:random.int(1,3) + 2,
    slutty:random.int(0,5),
    exhibitionist:random.int(0,5),
    kinky:random.int(0,5),
    dirtyTalk:random.int(0,5),
  })
  erotica.generate(res, erotica.femaleFeatures, 4);
  console.log(res)
  return res
}  
  
  
  
erotica.generate = function(char, list, averageSize) {
  char.eyeColor = random.fromArray(erotica.eyeColors)
  char.getDescription = erotica.getDescription
  char.properName = true
  char.size = random.int(1,3) + random.int(1,3) + averageSize - 4
  char.appearance = random.int(1,3) + random.int(1,3) + 4
  
  char.features = []
  char.featuresDone = []
  if (res.appearance === 9) res.features.push(list.hot)
  if (res.appearance === 10) res.features.push(list.superHot)
  if (res.size > averageSize + 1) res.features.push(list.big)
  if (res.size < averageSize - 1) res.features.push(list.small)
  
  if (char.hasBodyPart("cock")) {
    char.cock = random.int(1,3) + random.int(1,3) - 1
    if (char.cock === 5) {
      char.hasHugeCock = true
      char.features.push(erotica.hugeCockFeature)
    }
    if (char.cock === 4) char.features.push(erotica.bigCockFeature)
    if (char.cock === 1) char.features.push(erotica.smallCockFeature)
  }

  if (char.hasBodyPart("tit")) {
    char.bust = random.int(1,3) + random.int(1,3) - 1
    if (char.bust === 5) {
      char.hasHugeBoobs = true
      char.features.push(erotica.hugeBustFeature)
    }
    if (char.bust === 4) char.features.push(erotica.bigBustFeature)
    if (char.bust === 1) char.features.push(erotica.smallBustFeature)
  }


  if (random.chance(50)) {
    char.skinTone = random.fromArray(erotica.skinTones)
    char.hairColor = random.chance(50) ? "black" : random.fromArray(erotica.naturalHairColors.concat(erotica.altHairColors))
    erotica.addFeature(char, random.fromArray(erotica.skinToneFeatures));
  }
  else if (random.chance(20)) {  
    char.skinTone = random.fromArray(erotica.paleSkinTones)
    char.hairColor = random.chance(50) ? random.fromArray(erotica.redHairColors) : random.fromArray(erotica.naturalHairColors.concat(erotica.altHairColors))
    erotica.addFeature(char, random.fromArray(erotica.skinToneFeatures));
  }
  else {  
    char.hairColor = random.fromArray(erotica.naturalHairColors.concat(erotica.altHairColors))
  }


  
  const hairStyle = random.fromArray(list.hairStyles)
  char.features.push(hairStyle)
  char.hairLength = hairStyle.hairLength
  if (random.chance(30)) {
    erotica.addFeature(char, random.fromArray(list.eye));
  }
  else {
    erotica.addFeature(char, list.eyeGeneric);
  }
  const total = random.int(1, 2) + random.int(1, 3) - 1
  for (let i = 0; i < random.int(1, 3); i++) {
    erotica.addFeature(char, random.fromArray(list.features));
  }
  if (random.chance(40)) {
    erotica.addFeature(char, random.fromArray(list.tattoos));
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
  char.tattooQuote = random.fromArray(erotica.tattooQuotes);
}

erotica.setTattooImage = function(char) {
  char.tattooImage = random.fromArray(erotica.tattooImages);
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
