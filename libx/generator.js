"use strict";





erotica.prototype_man = createItem('ProtoMan', ACTOR(false), {})
erotica.prototype_woman = createItem('ProtoWoman', ACTOR(true), {})


erotica.createMan = function(loc) {
  res = erotica.createPerson(loc, false)
  res.willingToExpose = random.int(1,5) + 3
  res.attactedToWomen = random.int(1,3) + 2
  res.erection = random.int(1,5) + 3

  erotica.generate(res, erotica.maleLists, 6)
  return res
}  



erotica.createWoman = function(loc) {
  res = erotica.createPerson(loc, true)
  res.attactedToMen = random.int(1,3) + 2
          
  erotica.generate(res, erotica.femaleLists, 4)
  return res
}  
  




erotica.createPerson = function(loc, female) {
  const names = female ? erotica.girlsNames : erotica.boysNames
  const name = random.fromArray(names, true)
  res = world.isCreated ? 
          cloneObject(female ? erotica.prototype_woman : erotica.prototype_man, loc, name) :
          createItem(name, ACTOR(female), {})
  res.alias = name
  res.listAlias = name
  res.loc = loc
  res.willingToExpose = random.int(1,8)
  res.attactedToWomen = random.int(0,5)
  res.attactedToMen = random.int(0,5)
  res.slutty = random.int(0,5)
  res.exhibitionist = random.int(0,5)
  res.kinky = random.int(0,5)
  res.dirtyTalk = random.int(0,5)
  return res
}  
  
  



  
erotica.generate = function(char, list, averageSize) {
  char.eyeColor = random.fromArray(erotica.eyeColors)
  char.getDescription = erotica.getDescription
  char.properName = true
  char.size = random.int(1,3) + random.int(1,3) + averageSize - 4
  char.appearance = random.int(1,3) + random.int(1,3) + 4
  //log(random.buffer)
  
  char.features = []
  char.featuresDone = []
  if (res.appearance === 9) res.features.push('hot')
  if (res.appearance === 10) res.features.push('superHot')
  if (res.size > averageSize + 1) res.features.push('big')
  if (res.size < averageSize - 1) res.features.push('small')
  
  if (char.hasBodyPart("cock")) {
    char.cock = random.int(1,3) + random.int(1,3) - 1
    if (char.cock === 5) {
      char.hasHugeCock = true
      char.features.push('hugeCockFeature')
    }
    if (char.cock === 4) char.features.push('bigCockFeature')
    if (char.cock === 1) char.features.push('smallCockFeature')
  }

  if (char.hasBodyPart("tit")) {
    char.bust = random.int(1,3) + random.int(1,3) - 1
    if (char.bust === 5) {
      char.hasHugeBoobs = true
      char.features.push('hugeBustFeature')
    }
    if (char.bust === 4) char.features.push('bigBustFeature')
    if (char.bust === 1) char.features.push('smallBustFeature')
  }


  if (random.chance(40)) {
    char.skinTone = random.fromArray(erotica.skinTones)
    char.hairColor = random.chance(50) ? "black" : random.fromArray(erotica.naturalHairColors.concat(erotica.altHairColors))
    const skin = 'skin_' + random.int(erotica.skinToneFeatures.length - 1)
    erotica.addFeature(char, list, skin);
  }
  else if (random.chance(20)) {  
    char.skinTone = random.fromArray(erotica.paleSkinTones)
    char.hairColor = random.chance(30) ? random.fromArray(erotica.redHairColors) : random.fromArray(erotica.naturalHairColors.concat(erotica.altHairColors))
    const skin = 'skin_' + random.int(erotica.skinToneFeatures.length - 1)
    erotica.addFeature(char, list, skin);
  }
  else {  
    char.hairColor = random.fromArray(erotica.naturalHairColors.concat(erotica.altHairColors))
  }

  const hairStyle = 'hairStyle_' + random.int(list.hairStyles.length - 1)
  erotica.addFeature(char, list, hairStyle);   // !!!
  
  if (random.chance(30)) {
    const eyes = 'eyes_' + random.int(erotica.eyeFeatures.length - 1)
    erotica.addFeature(char, list, eyes)
  }
  else {
    erotica.addFeature(char, list, 'eyeGeneric');
  }
  
  if (random.chance(40)) {
    const tattoo = 'tattoo_' + random.int(list.tattoos.length - 1)
    erotica.addFeature(char, list, tattoo);   // !!!
  }

  const total = random.int(1, 3)
  for (let i = 0; i < total; i++) {
    const bonus = 'bonus_' + random.int(list.extraFeatures.length - 1)
    erotica.addFeature(char, list, bonus)
  }
}
  

// f is now a string, this needs updating. My need to be sent a list!!!
erotica.addFeature = function(char, list, f) {
  const feature = list.features[f]
  if (!feature) { log('ERROR!'); log(f); log(list.features); return }
  
  if (char.featuresDone.includes(feature.type)) return;
  if (f.hasIf && !char.hasBodyPart(feature.hasIf)) return;
  
  char.features.push(f)
  char.featuresDone.push(feature.type)
  if (feature.script) feature.script(char)
}

erotica.setTattooQuote = function(char) {
  char.tattooQuote = random.fromArray(erotica.tattooQuotes);
}

erotica.setTattooImage = function(char) {
  char.tattooImage = random.fromArray(erotica.tattooImages);
}


  





  
// want to pick a dominant feature, do that, then list others
// Slowy builds up a description using a dictionary to track progress
erotica.getDescription = function() {
  const list = this.isFemale ? erotica.femaleLists.features : erotica.maleLists.features
  //const features = this.features.map(el => list[el])
  const features = []
  for (const s of this.features) {
    if (list[s]) {
      features.push(list[s])
    }
    else {
      log('Failed to find \"' + s + '\" in list')
      log(list)
    }
  }
  const dict = {}
  for (const feature of features) {
    if (feature.bp && !this.isBodyPartBare(feature.bp)) continue
    erotica.appendToDescription(this, dict, feature.form, feature.s)
  }
  erotica.appendToDescription(this, dict)
  return processText(dict.s, {char:this})
}




erotica.appendToDescription = function(char, descDict, form, s) {
  if (s === undefined) {
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
      descDict.s = s
    }
    else {
      descDict.s += " " + s
    }
    descDict.s += "."
  }
  else if (descDict.lastForm === undefined) {
    descDict.lastForm = form
    descDict.list = []
    descDict.list.push(s)
  }
  else if (descDict.lastForm === form) {
    descDict.list.push(s)
  }
  else {
    erotica.appendAccumulatedToDescription(char, descDict, form);
    descDict.lastForm = form
    descDict.list = []
    descDict.list.push(s)
  }
}




erotica.appendAccumulatedToDescription = function(char, descDict) {
  if (descDict.s === undefined) {
    descDict.s = char.alias + " " + descDict.lastForm + " "
  }
  else {
    descDict.s += " " + sentenceCase(char.pronouns.subjective) + " " + descDict.lastForm + " "
  }
  descDict.s += formatList(descDict.list, {lastJoiner:lang.list_and, doNotSort:true}) + "."
}
