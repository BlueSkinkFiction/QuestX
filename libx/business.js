
function createShop(shopName, salesmanName, isFemale, data) {
  const salesman = createItem(salesmanName, ACTOR(isFemale))
  salesman.properNoun = true
  salesman.loc = shopName
  salesman.examine = data.examine
  salesman.isAtLoc = function(loc, situ) { return loc === this.loc && situ !== world.LOOK }

  if (data.salesmanAlias) salesman.alias = data.salesmanAlias
  delete data.examine
  delete data.salesmanAlias
  
  const topic = createItem(salesmanName.toLowerCase() + "_make_purchase", TOPIC(true), {
    alias:"Make a purchase",
    loc:salesmanName,
    script:data.makePurchaseScript,
    hideAfter:false,
  },);  
  delete data.makePurchaseScript
  
  if (data.businessScript) {
    const topic = createItem(salesmanName.toLowerCase() + "_hows_business", TOPIC(true), {
      alias:"How's business?",
      loc:salesmanName,
      script:data.businessScript
    },);  
    delete data.businessScript
  }
  
  const shop = createRoom(shopName, data)
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
  
  const app =  createRoom(name, data)
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

