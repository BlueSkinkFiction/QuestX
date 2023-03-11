
function createShop(shopName, salesmanName, isFemale, data) {
  const salesman = createItem(salesmanName, ACTOR(isFemale), {
    loc:shopName,
    examine:data.examine,
    isAtLoc:function(loc, situ) { return loc === this.loc && situ !== world.LOOK },
    convTopics:data.convTopics,
  })
  
  if (data.salesmanAlias) salesman.setAlias(data.salesmanAlias)

  delete data.examine
  delete data.salesmanAlias
  delete data.convTopics
  
  if (data.makePurchaseScript) {
    const topic = createItem(salesmanName.toLowerCase() + "_make_purchase", TOPIC(true), {
      alias:"Make a purchase",
      loc:salesmanName,
      script:data.makePurchaseScript,
      hideAfter:false,
    },);  
    delete data.makePurchaseScript
  }
  
  if (data.businessScript) {
    const topic = createItem(salesmanName.toLowerCase() + "_hows_business", TOPIC(true), {
      alias:"How's business?",
      loc:salesmanName,
      script:data.businessScript
    },);  
    delete data.businessScript
  }
  
  const shop = createRoom(shopName, {
    clothingStock:[],
    mapDrawBase:function(o) {
      let s = '<circle cx="'
      s += this.mapX
      s += '" cy="'
      s += this.mapY
      s += '" r="10" stroke="black" fill="#8f8"/>'
      return s
    },}, data)
  
  const merch = MERCH(0, [shop.name])
  
  for (const el of shop.clothingStock) {
    const garment = erotica.createGarment(el[0], false, el[1])
    for (const key in merch) {
      if (key !== 'getPrice') garment[key] = merch[key]
    }
    //if (settings.doNotListMerchanise) garment.isAtLoc = function(loc, situation) {
    //  if (situation !== 
    //}
  }
  delete shop.clothingStock
  
}



function createBar(name, data) {
  const waitress = createItem(name + "_waitress", ACTOR(true))
  waitress.properNoun = false
  waitress.loc = name
  waitress.scenery = true
  waitress.alias = "waitress"
  waitress.listAlias = "Waitress"
  waitress.examine = data.waitress
  delete data.waitress
  waitress.talkto = data.waitressSpeak
  //console.log(waitress)
  waitress.state = 0
  //console.log(waitress)
  delete data.waitressSpeak
  
  const app = createRoom(name, {
    clothingStock:[],
    mapDrawBase:function(o) {
      let s = '<circle cx="'
      s += this.mapX
      s += '" cy="'
      s += this.mapY
      s += '" r="10" stroke="black" fill="#f88"/>'
      return s
    },}, data)
}



function createVariation(prototypeName, newWord, oldWord) {
  if (oldWord === undefined) oldWord = "black"
  const o = cloneObject(w[prototypeName], undefined, prototypeName.replace(oldWord, newWord))
  o.alias = o.alias.replace(oldWord, newWord)
  o.examine = o.examine.replace(oldWord, newWord)
  o.alias = o.alias.replace(sentenceCase(oldWord), sentenceCase(newWord))
  o.examine = o.examine.replace(sentenceCase(oldWord), sentenceCase(newWord))
  return o
}

