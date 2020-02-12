"use strict";



test.tests = function() {

  erotica.verify();

  w.Joanna.loc = "lounge"
  world.setRoom(w.me, "lounge")
  game.player.hasTits = false
  game.player.hasCock = true

  // General stuff used by other parts

  test.title("pairs");
  test.assertEqual("heels", w.heels.byname())
  test.assertEqual("the pair of heels", w.heels.byname({article:DEFINITE}))
  test.assertEqual("a pair of heels", w.heels.byname({article:INDEFINITE}))
  
  
  test.title("responses");
  const sublist = util.getResponseSubList(["suck", "target not tied up", "happy", "cock"], erotica.defaultResponses)
  test.assertEqual("Joanna giggles as {nv:target:come} in her mouth, letting some cum dribble down her chin.", sublist[0].msg)
  
  commands.unshift(new Cmd("test response", {
    regex:/^response$/,
    objects:[
    ],
    script:function(objects) {
      respond({action:'nonsense', actor:w.Joanna, target:w.me}, erotica.defaultResponses)
      return SUCCESS;
    },
  }));  
  test.assertCmd("response", "THIS SHOULD NEVER HAPPEN: nonsense", )


  test.title("ensemble");
  w.briefsblack.worn = false
  w.halterblack.worn = false
  w.briefsblack.loc = "lounge"
  w.halterblack.loc = "lounge"
  game.update();
  test.assertCmd("look", ["The lounge is lavishly appointed.", "You can see an A-frame, a black bikini, Clive (wearing some blue swim shorts), some Daisy Dukes, some jeans, Joanna, a maid (wearing a maid outfit), a settee, a red swimsuit, a table (with a dildo, a jug and a whip on it), a mesh teeshirt, a white teeshirt and a red thong here."]);
  test.assertCmd("x halter", "A bikini halter that is black.")
  test.assertCmd("x briefs", "Some bikini briefs that are black.")
  test.assertCmd("x bikini", "A black bikini.")
  test.assertCmd("get halter", "You take the black bikini halter.")
  w.halterblack.loc = "lounge"
  test.assertCmd("get briefs", "You take the black bikini briefs.")
  w.briefsblack.loc = "lounge"
  test.assertCmd("get bikini", "You take the black bikini.")
  w.briefsblack.loc = "lounge"
  w.halterblack.loc = "lounge"
  w.briefsblack.loc = "balcony"
  world.scopeSnapshot();
  test.assertCmd("look", ["The lounge is lavishly appointed.", "You can see an A-frame, Clive (wearing some blue swim shorts), some Daisy Dukes, a black bikini halter, some jeans, Joanna, a maid (wearing a maid outfit), a settee, a red swimsuit, a table (with a dildo, a jug and a whip on it), a mesh teeshirt, a white teeshirt and a red thong here."]);
  test.assertCmd("x halter", "A bikini halter that is black.")
  test.assertCmd("x briefs", "You can't see anything you might call 'briefs' here.")
  test.assertCmd("x bikini", "A bikini halter that is black.")
  w.briefsblack.loc = "lounge"
  w.halterblack.loc = "balcony"
  world.scopeSnapshot();
  test.assertCmd("look", ["The lounge is lavishly appointed.", "You can see an A-frame, some black bikini briefs, Clive (wearing some blue swim shorts), some Daisy Dukes, some jeans, Joanna, a maid (wearing a maid outfit), a settee, a red swimsuit, a table (with a dildo, a jug and a whip on it), a mesh teeshirt, a white teeshirt and a red thong here."]);
  w.Joanna.dressUp("halterblack", "briefsblack");
  world.scopeSnapshot();
  
  
  test.title("ensemble breaking");
  test.assertEqual(true, w.black_bikini.isAllTogether());
  test.assertEqual(2, w.Joanna.getWearingSlottedVisible().length);
  test.assertEqual(0, w.Joanna.getWearingUnslotted().length);
  test.assertEqual("a black bikini", processText("{attire}", {item:w.Joanna}));
  w.briefsblack.pulledDown = true
  test.assertEqual(false, w.black_bikini.isAllTogether());
  test.assertEqual(1, w.Joanna.getWearingSlottedVisible().length);
  test.assertEqual(1, w.Joanna.getWearingUnslotted().length);
  test.assertEqual("some black bikini briefs around her ankles and a black bikini halter", processText("{attire}", {item:w.Joanna}));
  test.assertCmd("look", ["The lounge is lavishly appointed.", "You can see an A-frame, Clive (wearing some blue swim shorts), some Daisy Dukes, some jeans, Joanna (wearing some black bikini briefs around her ankles and a black bikini halter), a maid (wearing a maid outfit), a settee, a red swimsuit, a table (with a dildo, a jug and a whip on it), a mesh teeshirt, a white teeshirt and a red thong here."]);
  test.assertCmd("x jo", ["Joanna has a warm smile, and long blonde hair. She is wearing some black bikini briefs around her ankles and a black bikini halter."]);
  w.briefsblack.pulledDown = false
  
  
  test.title("attractionTo");
  test.assertEqual(0, w.Joanna.attractionTo(w.Clive));
  test.assertEqual(0, w.Joanna.attractionTo(w.maid));
  w.Joanna.attraction_Clive = 20
  test.assertEqual(20, w.Joanna.attractionTo(w.Clive));
  test.assertEqual(0, w.Joanna.attractionTo(w.maid));
  w.Joanna.modifyAttraction(w.Clive, 5)
  test.assertEqual(25, w.Joanna.attractionTo(w.Clive));
  test.assertEqual(0, w.Joanna.attractionTo(w.maid));
  w.Joanna.attraction_Clive = function() { return -5 }
  test.assertEqual(-5, w.Joanna.attractionTo(w.Clive));
  test.assertEqual(0, w.Joanna.attractionTo(w.maid));
  delete w.Joanna.attraction_Clive
  
  
  test.title("getInstantAttraction");
  test.assertEqual(7, w.Joanna.getInstantAttraction(w.Clive));
  w.Joanna.attactedToWomen = 0
  w.maid.dressUp();
  w.maid.appearance = 0
  // lowest it can be:
  test.assertEqual(-5, w.Joanna.getInstantAttraction(w.maid));
  w.maid.appearance = 10
  // target max, char phobic
  test.assertEqual(-5, w.Joanna.getInstantAttraction(w.maid));
  w.Joanna.attactedToWomen = 5
  // highest it can be:
  test.assertEqual(10, w.Joanna.getInstantAttraction(w.maid));
  w.maid.dressUp("maidoutfit");
  w.maid.appearance = 8
  w.Joanna.attactedToWomen = 4
  test.assertEqual(7, w.Joanna.getInstantAttraction(w.maid));
  
  
  test.title("firstToRemove");
  w.Joanna.dressUp("jeans2", "teeshirtwhite", "halterblack", "briefsblack", "heels");
  test.assertEqual("heels", w.Joanna.firstToRemove().name);
  w.Joanna.dressUp("jeans2", "teeshirtwhite", "halterblack", "briefsblack");
  test.assertEqual("teeshirtwhite", w.Joanna.firstToRemove().name);
  w.Joanna.dressUp("halterblack", "briefsblack");
  test.assertEqual("halterblack", w.Joanna.firstToRemove().name);
  w.Joanna.dressUp("briefsblack");
  test.assertEqual("briefsblack", w.Joanna.firstToRemove().name);
  w.Joanna.dressUp();
  test.assertEqual(null, w.Joanna.firstToRemove());
  

  test.title("hasBodyPart");
  test.assertEqual(true, w.Clive.hasBodyPart(w.chest));
  test.assertEqual(true, w.Clive.hasBodyPart(w.cock));
  test.assertEqual(false, w.Clive.hasBodyPart(w.tit));
  test.assertEqual(false, w.Clive.hasBodyPart(w.wing));
  test.assertEqual(true, w.Joanna.hasBodyPart(w.chest));
  test.assertEqual(true, w.Joanna.hasBodyPart(w.tit));
  test.assertEqual(false, w.Joanna.hasBodyPart(w.cock));


  test.title("reveal");
  w.Joanna.dressUp("teeshirtmesh", "halterblack", "briefsblack");
  test.assertEqual(1, w.midriff.getAllCoverings(w.Joanna).length);
  test.assertEqual(2, w.chest.getAllCoverings(w.Joanna).length);
  test.assertEqual(3, w.midriff.getReveal(w.Joanna));
  test.assertEqual(false, w.chest.getReveal(w.Joanna));
  w.Joanna.dressUp("halterblack", "briefsblack");


  test.title("getExposure - F");
  test.assertEqual(8, w.Joanna.getExposure());
  w.Joanna.dressUp("teeshirtwhite", "halterblack", "briefsblack");
  test.assertEqual(6, w.Joanna.getExposure());
  w.Joanna.dressUp("teeshirtmesh", "halterblack", "briefsblack");
  test.assertEqual(7, w.Joanna.getExposure());
  w.Joanna.dressUp("teeshirtmesh", "briefsblack");
  test.assertEqual(14, w.Joanna.getExposure());
  w.Joanna.dressUp("daisydukes", "teeshirtwhite", "halterblack", "briefsblack");
  test.assertEqual(4, w.Joanna.getExposure());
  w.Joanna.dressUp("jeans2", "teeshirtwhite", "halterblack", "briefsblack", "heels");
  test.assertEqual(1, w.foot.getAllCoverings(w.Joanna).length);
  test.assertEqual(0, w.Joanna.getExposure());
  w.Joanna.dressUp("briefsblack");
  test.assertEqual(18, w.Joanna.getExposure());
  w.Joanna.dressUp("thongred");
  test.assertEqual(20, w.Joanna.getExposure());
  w.Joanna.dressUp("swimsuitred");
  test.assertEqual(6, w.Joanna.getExposure());
  w.Joanna.dressUp("halterblack", "thongred");
  test.assertEqual(18, w.Joanna.getExposure());
  w.Joanna.dressUp();
  test.assertEqual(24, w.Joanna.getExposure());
  w.Joanna.dressUp("halterblack", "briefsblack");


  test.title("getExposure - M");
  test.assertEqual(4, w.Clive.getExposure());
  w.Clive.dressUp("teeshirtwhite", "swimshortsblue");
  test.assertEqual(0, w.Clive.getExposure());
  w.Clive.dressUp("swimsbriefsblack");
  test.assertEqual(6, w.Clive.getExposure());
  w.Clive.dressUp("thongred");
  test.assertEqual(16, w.Clive.getExposure());
  w.Clive.dressUp();
  test.assertEqual(24, w.Clive.getExposure());
  w.Clive.dressUp("swimshortsblue");
  
  
  test.title("getExposureWithout");
  test.assertEqual(18, w.Joanna.getExposureWithout(w.halterblack));
  test.assertEqual(24, w.Clive.getExposureWithout(w.swimshortsblue));
  

  test.title("getWillingToRemove and getWillingToExposeHere");
  test.assertEqual(18, w.Joanna.getWillingToExposeHere());
  test.assertEqual(erotica.RELUCTANT, w.Joanna.getWillingToRemove(w.halterblack));
  w.Joanna.willingToExpose = 6;
  test.assertEqual(20, w.Joanna.getWillingToExposeHere());
  test.assertEqual(erotica.RELUCTANT, w.Joanna.getWillingToRemove(w.halterblack));
  test.assertEqual(erotica.REFUSE, w.Joanna.getWillingToRemove(w.briefsblack));
  w.Joanna.willingToExpose = 10;
  test.assertEqual(25, w.Joanna.getWillingToExposeHere());
  test.assertEqual(erotica.HAPPY, w.Joanna.getWillingToRemove(w.halterblack));
  test.assertEqual(erotica.HAPPY, w.Joanna.getWillingToRemove(w.briefsblack));
  w.Joanna.loc = "balcony"
  w.Joanna.willingToExpose = 5;
  test.assertEqual(12, w.Joanna.getWillingToExposeHere());
  test.assertEqual(erotica.REFUSE, w.Joanna.getWillingToRemove(w.halterblack));
  w.Joanna.willingToExpose = 10;
  test.assertEqual(25, w.Joanna.getWillingToExposeHere());
  test.assertEqual(erotica.HAPPY, w.Joanna.getWillingToRemove(w.halterblack));
  test.assertEqual(erotica.HAPPY, w.Joanna.getWillingToRemove(w.briefsblack));
  w.Joanna.loc = "private_room"
  w.Joanna.willingToExpose = 5;
  test.assertEqual(25, w.Joanna.getWillingToExposeHere());
  test.assertEqual(erotica.HAPPY, w.Joanna.getWillingToRemove(w.halterblack));
  w.Joanna.willingToExpose = 0;
  test.assertEqual(25, w.Joanna.getWillingToExposeHere());
  test.assertEqual(erotica.HAPPY, w.Joanna.getWillingToRemove(w.halterblack));
  test.assertEqual(erotica.HAPPY, w.Joanna.getWillingToRemove(w.briefsblack));
  w.Joanna.loc = "lounge"
  w.Joanna.willingToExpose = 5;  
  

  test.title("getWillingToGo");
  test.assertEqual(erotica.HAPPY, w.Joanna.getWillingToGo("east"));
  w.Joanna.willingToExpose = 3;
  test.assertEqual(erotica.REFUSE, w.Joanna.getWillingToGo("east"));
  test.assertEqual(erotica.HAPPY, w.Joanna.getWillingToGo("west"));
  w.Joanna.dressUp("thongred");
  w.Joanna.willingToExpose = 8;
  test.assertEqual(erotica.RELUCTANT, w.Joanna.getWillingToGo("east"));
  w.Joanna.dressUp();
  w.Joanna.willingToExpose = 11;
  test.assertEqual(erotica.HAPPY, w.Joanna.getWillingToGo("east"));
  w.Joanna.willingToExpose = 5;
  w.Joanna.dressUp("halterblack", "briefsblack");

 
  test.title("create description")
  let dict = []
  erotica.appendToDescription(w.Joanna, dict, "is", "tall")
  erotica.appendToDescription(w.Joanna, dict, "is", "blue")
  erotica.appendToDescription(w.Joanna, dict, "has", "teeth")
  erotica.appendToDescription(w.Joanna, dict, "iso", "She looks sad")
  erotica.appendToDescription(w.Joanna, dict)
  test.assertEqual("Joanna is tall and blue. She has teeth. She looks sad.", dict.s)
  dict = []
  erotica.appendToDescription(w.Joanna, dict, "is", "tall")
  erotica.appendToDescription(w.Joanna, dict, "is", "blue")
  erotica.appendToDescription(w.Joanna, dict, "has", "teeth")
  erotica.appendToDescription(w.Joanna, dict, "iso", "She looks sad")
  erotica.appendToDescription(w.Joanna, dict)
  test.assertEqual("Joanna is tall and blue. She has teeth. She looks sad.", dict.s)
  w.Joanna.features = [
    {form:'is', s:"small"},
    {form:'has', s:"feet"},
    {form:'has', s:"hands"},
    {form:'has', s:"a boob tattoo", bp:'tit'},
  ]
  w.Joanna.getDescription = erotica.getDescription
  test.assertEqual("Joanna is small. She has feet and hands.", w.Joanna.getDescription(), true)
  w.halterblack.worn = false
  test.assertEqual("Joanna is small. She has feet, hands and a boob tattoo.", w.Joanna.getDescription(), true)
  w.halterblack.worn = true


  test.title("getWearingVisible");
  test.assertEqual("black bikini", formatList(w.Joanna.getWearingVisible()))
  w.Joanna.dressUp("halterblack", "briefsblack", "leatherjacket", "teeshirtwhite");
  test.assertEqual("black bikini, leather jacket", formatList(w.Joanna.getWearingVisible()))
  w.Joanna.dressUp("halterblack", "briefsblack");
  w.Joanna.attraction_Clive = 0
  w.Joanna.getDescription = 'Joanna has a warm smile, and long blonde hair.'


  // COMMANDS - LOOK AT

  
  test.title("Look at");
  test.assertCmd("look at joanna's thigh", "She has smooth thighs.");
  test.assertCmd("look at joanna's pussy", "You wonder what her pussy looks like under her clothes.");
  test.assertCmd("look at joanna's tits", "She has firm tits.");
  test.assertCmd("look at joanna's face", "She has a pretty face.");
  w.Joanna.bodyPartDescs.tit = 'She has perfect breasts.'
  test.assertCmd("look at joanna's tits", 'She has perfect breasts.');
  test.assertCmd("look at joanna's halter", 'A bikini halter that is black.');
  

  // COMMANDS - GROPE

  
  test.title("Grope");
  w.Joanna.arousal = 0
  test.assertCmd("grope joanna's thigh", "'Hey!' exclaims Joanna as you try to grope her thighs. 'Keep your filthy hands to yourself, jerk!'");
  
  w.Joanna.attraction_me = 25
  test.assertCmd("grope joanna's thigh", "'Hey!' exclaims Joanna as you try to grope her thighs. 'Keep your hands to yourself!'");
  w.Joanna.oldCanManipulate = w.Joanna.canManipulate
  w.Joanna.canManipulate = function() { return false }
  test.assertCmd("grope joanna's thigh", "'Please no!' exclaims Joanna as you run your hands over her thighs.");
  test.assertCmd("grope joanna's tit", "'Please no!' exclaims Joanna as you squeeze her tits.");
  test.assertCmd("maid, grope joanna's tit", "'Please no!' exclaims Joanna as the maid squeezes Joanna's tits.");
  w.Joanna.canManipulate = w.Joanna.oldCanManipulate
  w.Joanna.attraction_me = 50
  test.assertCmd("grope joanna's thigh", "'Hey!' exclaims Joanna as you try to grope her thighs. 'Hey, cheeky!'");
  w.Joanna.attraction_me = 100
  w.Joanna.attraction_Clive = 100
  test.assertCmd("clive, grope joanna's left thigh", "Joanna smiles as Clive strokes her smooth left thigh.", true);
  test.assertCmd("grope joanna's tits", "You spend a few minutes running your fingers over Joanna's tits, through her black bikini halter.");
  test.assertCmd("grope joanna's back", "Joanna smiles as you stroke her tattooed back.");
  test.assertCmd("grope my cock", "You smile as you eagerly stroke your hard cock.");
  test.assertCmd("maid, grope my cock", "You smile as the maid strokes your hard cock.");
  w.maid.attraction_me = 100
  test.assertCmd("grope maid's thigh", "The maid smiles as you stroke her tanned thighs.");


  // COMMANDS - SUCK

  test.title("Suck");
  test.assertCmd("j, suck my cock", "'Eww! I'm not sucking your cock!'");
  test.assertCmd("j, suck my arm", "That is not a body part you can do that with, is it?");

  test.assertCmd("j, go down on me", "'Eww! I'm not sucking your cock!'");
  test.assertCmd("go down on j", "You can't do that when Joanna is wearing the black bikini briefs.");
  w.Joanna.dressUp("halterblack");
  test.assertCmd("go down on j", "'Oh God yes!' exclaims Joanna as you lick her hot pussy.");

  //parser.debug = true
  test.assertCmd("blow j", "You can only suck off character's with dicks.");
  w.Joanna.dressUp("halterblack", "briefsblack");


  // COMMANDS - WANK (requires work)
  test.title("Wank");
  test.assertCmd("j, wank me", "Joanna keeps jerking off you; pre-cum starts to drip from the end of your cock.");
  test.assertCmd("j, jerk me off", "Joanna keeps jerking off you; pre-cum starts to drip from the end of your cock.");
  test.assertCmd("jill off j", "You would have to get to Joanna's black bikini briefs off her to do that!");
  w.briefsblack.worn = false
  test.assertCmd("jill j off", "You slip your finger into her hot pussy, making her giggle.");
  test.assertCmd("wank j", "You slip your finger into her hot pussy, making her giggle.");
  test.assertCmd("jack off j", "Only characters with dicks can be jerked off.");
  test.assertCmd("frig j", ["You slip your finger into her hot pussy, making her giggle."])
  test.assertCmd("flick j's bean", ["You slip your finger into her hot pussy, making her gasp."])

  test.title("WankSelf");
  test.assertCmd("wank", "You pant as you jerk yourself off.");
  test.assertCmd("j, jack off", "Only characters with dicks can be jerked off.");
  test.assertCmd("j, jill off", "Joanna whimpers quietly as she continues to finger her hot, damp sex.");
  w.briefsblack.worn = true
  w.Joanna.arousal = 40



  // COMMANDS - POSTURES

  test.title("Posture");
  test.assertCmd("x jo", "Joanna has a warm smile, and long blonde hair. She is wearing a black bikini.");
  test.assertCmd("jo, bend over table", "Joanna bends over the table.");
  test.assertCmd("x jo", "Joanna has a warm smile, and long blonde hair. She is wearing a black bikini. She is bending over the table.");
  test.assertCmd("jo, crawl", ["Joanna gets off the table.", "Joanna goes down on her hands and knees."]);
  test.assertCmd("jo, kneel", ["Joanna kneels."]);
  test.assertCmd("jo, stand", ["Joanna stands up."]);
  test.assertEqual("standing", w.Joanna.posture)
  test.assertCmd("jo, lie down", ["Joanna lies back on the floor."]);
  test.assertEqual("reclining", w.Joanna.posture)
  test.assertCmd("jo, lie face down", ["Joanna rolls over, to lie face down."]);
  
  test.assertEqual("facedown", w.Joanna.posture)
  test.assertCmd("jo, roll over", ["Joanna rolls on to her back."]);
  test.assertEqual("reclining", w.Joanna.posture)
  test.assertCmd("jo, stand", ["Joanna stands up."]);
  test.assertEqual("standing", w.Joanna.posture)
  w.lounge.postureSurface = "carpet"
  test.assertCmd("jo, lie down", ["Joanna lies back on the carpet."]);
  test.assertCmd("jo, stand", ["Joanna stands up."]);
  
  test.title("Posture and furniture");
  w.bed.loc = 'lounge'
  test.assertCmd("jo, lie on bed", ["Joanna lies down on the bed."]);
  test.assertEqual("reclining", w.Joanna.posture)
  test.assertCmd("jo, lie face down on the bed", ["Joanna rolls on to her front."]);
  test.assertEqual("facedown", w.Joanna.posture)
  test.assertCmd("jo, roll over", ["Joanna rolls on to her back."]);
  test.assertEqual("reclining", w.Joanna.posture)
  test.assertCmd("jo, stand", ["Joanna gets off the bed.", "Joanna stands up."]);
  delete w.bed.loc


  // COMMANDS - UNDRESS

  test.title("Undress");
  w.Joanna.dressUp("jeans2", "teeshirtwhite", "halterblack", "briefsblack", "heels");
  w.Joanna.attraction_me = 30
  test.assertCmd("undress j", ["'Hey!' exclaims Joanna as you try to remove her heels. 'Keep your filthy hands to yourself, jerk!'"]);
  w.Joanna.attraction_me = 40
  test.assertCmd("undress j", ["You take Joanna's heels off her."]);
  test.assertCmd("undress j", ["You lift up Joanna's white teeshirt, pulling it up over her head."]);
  test.assertCmd("strip j", ["You pull down Joanna's jeans, letting them slide down her legs."]);
  test.assertCmd("undress j", ["You unfasten Joanna's black bikini halter, pulling it off her."]);
  w.Joanna.dressUp("jeans2", "teeshirtwhite", "halterblack", "briefsblack", "heels");
  test.assertCmd("j,undress", ["'Sure thing!'", "Joanna pulls off her left shoe, then the right."]);
  test.assertCmd("j,undress", ["'Sure thing!'", "Joanna pulls the tee-shirt up and over her head."]);
  test.assertCmd("j,strip", ["'Sure thing!'", "Joanna unfastens her jeans, and pulls them down her smooth legs, before stepping out of them."]);
  test.assertCmd("j,undress", ["'I guess...'", "Joanna unfastens her black bikini halter, pulling it off to bare her tits."]);
  w.Joanna.dressUp("halterblack", "briefsblack");
  w.Joanna.willingToExpose = 3;
  test.assertCmd("j,undress", ["'No way!'"]);
  w.Joanna.willingToExpose = 5;


  // COMMANDS - PULL DOWN/UP

  test.title("Pull down");
  test.assertCmd("j,pull down briefs", ["Joanna pulls down her black bikini briefs."]);
  test.assertCmd("x j", ["Joanna has a warm smile, and long blonde hair. She is wearing some black bikini briefs around her ankles and a black bikini halter."]);
  test.assertCmd("j,pull up briefs", ["Joanna pulls up her black bikini briefs."]);
  w.Joanna.dressUp("swimsuitred");
  test.assertCmd("j,pull down swimsuit", ["Joanna pulls the straps of her red swimsuit off her shoulders, letting it fall to her waist, baring her firm tits."]);
  test.assertCmd("x j", ["Joanna has a warm smile, and long blonde hair. She is wearing a red swimsuit around her waist."]);
  test.assertCmd("j,pull down swimsuit", ["Joanna pushes her red swimsuit down, over her hips, exposing her hot pussy. It slips down her legs to her ankles."]);
  test.assertCmd("x j", ["Joanna has a warm smile, and long blonde hair. She is wearing a red swimsuit around her ankles."]);
  test.assertCmd("j,pull up swimsuit", ["Joanna pulls up her red swimsuit, over her hips, hiding her pussy."]);
  test.assertCmd("j,pull up swimsuit", ["Joanna pulls the straps of her red swimsuit up, over her shoulders, covering her tits."]);
  w.Joanna.dressUp("halterblack", "briefsblack");


  // COMMANDS - UNDRESS OTHER

  test.title("Remove from other");
  test.assertCmd("remove h from j", ["You unfasten Joanna's black bikini halter, pulling it off her."]);
  test.assertCmd("remove halter from j", ["Joanna is not wearing a black bikini halter."]);
  w.Joanna.willingToExpose = 3;
  w.Joanna.dressUp("halterblack", "briefsblack");
  test.assertCmd("remove h from j", ["'Hey!' exclaims Joanna as you try to remove her black bikini halter. 'I'm not taking that off!'"]);
  

  // COMMANDS - ORDER TO ...

  test.title("Order to ...");
  w.Joanna.willingToExpose = 5
  test.assertCmd("jo, remove halter", ["'I guess...'", "Joanna unfastens her black bikini halter, pulling it off to bare her tits."]);
  test.assertCmd("jo, wear halter", ["Joanna pulls on the black bikini halter, fastening it at the back, then adjusting the cups to hold her boobs comfortably."]);
  w.Joanna.getAgreementInteract = function(target, action, bodypart) {
    msg("'I'd rather poke my own eyes out.'")
    return false;
  }
  test.assertCmd("j, grope my cock", "'I'd rather poke my own eyes out.'");
  delete w.Joanna.getAgreementInteract
  
  
  // BONDAGE

  test.title("Bondage 1");
  w.Joanna.dressUp("halterblack", "briefsblack", "teeshirtwhite");  
  test.assertCmd("tie j up", ["You take the pair of heels and the jeans from Joanna and you put them on the ground.", "You manacle Joanna's wrists to the top of the A-frame, then make her open her legs wide, before manacling them too."]);
  test.assertCmd("j, undress", ["'Not while I'm tied up.'"]);
  test.assertCmd("j, e", ["'Not while I'm tied up.'"]);
  test.assertCmd("j, get whip", ["'Not while I'm tied up.'"]);
  test.assertCmd("look", ["The lounge is lavishly appointed.", "You can see an A-frame, Clive (wearing some blue swim shorts), a pair of heels, some jeans, Joanna (manacled to the A-frame; and wearing a black bikini and a white teeshirt), a maid (wearing a maid outfit), a settee and a table (with a dildo, a jug and a whip on it) here."]);
  test.assertCmd("remove t from j", ["You push Joanna's white teeshirt up, revealing her black bikini halter."]);
  test.assertCmd("remove t from j", ["It is already pulled up; it is not going any more than that."]);
  test.assertCmd("x jo", ["Joanna has a warm smile, and long blonde hair. She is wearing a black bikini and a white teeshirt pulled up around her neck."]);
  test.assertCmd("remove h from j", ["You untie Joanna's black bikini halter at the back and pull it away, baring her firm tits, dropping the garment to the floor."]);
  test.assertCmd("remove briefs from j", ["You unfasten Joanna's black bikini briefs at the left hip, baring her pussy, then on the right too before letting them drop to the ground."]);

 
  test.title("Bondage 2");
  w.Joanna.dressUp("swimsuitred");  
  test.assertCmd("remove swimsuit from j", ["You try to remove Joanna's red swimsuit, but cannot whilst she is tied up like that."]);
  test.assertCmd("rip swimsuit from j", ["You rip the shoulder straps of Joanna's red swimsuit and it falls to her waist, baring her firm tits. Then You rip the sides and crotch o the red swimsuit, letting the shredded remains drop to the floor, baring her pussy."]);
  test.assertCmd("free j", ["You release the manacles on Joanna's ankles, then reach up and release her wrists."]);
  w.Joanna.dressUp("halterblack", "briefsblack");  

  test.title("Bondage me");
  w.leatherjacket.worn = true
  w.leatherjacket.loc = "me"
  test.assertCmd("j,tie me up", ["Joanna manacles your wrists to the top of the A-frame, then makes you open your legs wide, before manacling them too."]);
  test.assertCmd("undress", ["You cannot remove the leather jacket whilst you are manacled to the A-frame."]);
  test.assertCmd("e", ["You cannot go anywhere whilst you are manacled to the A-frame."]);
  test.assertCmd("get whip", ["You cannot take the whip whilst you are manacled to the A-frame."]);
  test.assertCmd("j, free me", ["Joanna releases the manacles on your ankles, then reaches up and releases your wrists."]);
  
  
  
  test.title("Bondage me 2");
  w.bondage_table.loc = "lounge"
  game.update();
  test.assertCmd("j, tie me to bondage table", ["You lie back on the metal table and Joanna secures your wrists in the manacles above your head, then makes you open your legs wide, so she can secure your ankles too."]);
  test.assertEqual("reclining", w.me.posture)
  test.assertEqual(w.bondage_table, w.me.getOuterWearable("buttock", true))
  test.assertEqual(false, w.me.getOuterWearable("buttock"))
  test.assertCmd("j, get dildo", ["Joanna takes the dildo."]);
  
  test.assertEqual(true, w.bondage_table.closed)
  
  test.assertCmd("j, fuck me with dildo", ["Joanna cannot do that while you are secured to the bondage table like that."]);
  
  test.assertEqual(w.bondage_table, w.me.getOuterWearable("buttock", true))
  test.assertCmd("j, open bondage table", ["Joanna slides open the panel in the centre of the metal table, right under your buttocks, leaving your ass exposed."]);
  test.assertEqual(false, w.me.getOuterWearable("buttock", true))
  test.assertCmd("j, fuck me with dildo", ["You squeal as Joanna thrusts the dildo into your ass."]);
  
  test.assertCmd("j, drop dildo", ["Joanna drops the dildo."]);
  test.assertCmd("j, fuck me", ["Not while Joanna is wearing some black bikini briefs."]);
  w.briefsblack.worn = false
  test.assertCmd("j, fuck me", ["Joanna fucks you."]);
  
  
  
  w.briefsblack.worn = true
  test.assertCmd("j, free me", ["Joanna unfastens the manacles on your ankles, then the ones on your wrists. You get off the table."]);
  test.assertEqual("standing", w.me.posture)

  // AROUSAL

  test.title("Arousal")
  w.Joanna.arousal = 0
  w.Clive.arousal = 0
  w.me.arousal = 0
  w.Clive.attactedToMen = 0
  //w.Joanna.report = true
  //w.Clive.report = true
  w.Joanna.updateArousal()
  w.Clive.updateArousal()
  w.me.updateArousal()
  test.assertEqual("lifeless willy", w.Clive.descCock())
  test.assertAlmostEqual(4.4, w.Joanna.arousal)
  test.assertAlmostEqual(2, w.Clive.arousal)
  test.assertAlmostEqual(4.4, w.me.arousal)
  w.Joanna.updateArousal()
  w.Clive.updateArousal()
  test.assertAlmostEqual(8.36, w.Joanna.arousal)
  test.assertAlmostEqual(3.8, w.Clive.arousal)
  w.Joanna.updateArousal()
  w.Clive.updateArousal()
  test.assertAlmostEqual(11.924, w.Joanna.arousal)
  test.assertAlmostEqual(5.42, w.Clive.arousal)

  for (let i = 0; i < 100; i++) {
    w.Joanna.updateArousal()
    w.Clive.updateArousal()
    w.me.updateArousal()
  }
  test.assertAlmostEqual(44, w.Joanna.arousal)
  test.assertAlmostEqual(20, w.Clive.arousal)
  test.assertEqual("limp willy", w.Clive.descCock())
  test.assertEqual("erect dick", w.me.descCock())
  test.assertCmd("j, remove halter", ["'I guess...'", "Joanna unfastens her black bikini halter, pulling it off to bare her tits."])
  test.assertAlmostEqual(44, w.Joanna.arousal)
  test.assertAlmostEqual(25.06, w.Clive.arousal)
  test.assertAlmostEqual(49.1, w.me.arousal)
  test.assertEqual("erect dick", w.me.descCock())
  w.Joanna.willingToExpose = 10
  test.assertCmd("j, remove briefs", ["'I guess...'", "Joanna pulls down her briefs, baring her pussy. They slide down her legs and she steps out of them."])
  test.assertAlmostEqual(44, w.Joanna.arousal)
  test.assertAlmostEqual(31.23, w.Clive.arousal)
  test.assertAlmostEqual(55.23, w.me.arousal)
  test.assertEqual("swollen cock", w.me.descCock())
  

  test.title("Suck cock")
  w.Joanna.arousal = 0
  w.me.arousal = 0
  test.assertCmd("j, suck my cock", ["'Hmm!' you sigh as Joanna sucks on your limp willy. It is starting to get harder!"])
  test.assertCmd("j, suck my cock", ["'Hmm!' you sigh as Joanna sucks on your swelling dick. It is starting to get harder!"])
  test.assertCmd("j, suck my cock", ["'Keep going,' you gasp as Joanna sucks on your semi-erect dick."])
  test.assertCmd("j, suck my cock", ["'Keep going,' you gasp as Joanna sucks on your erect dick."])
  test.assertCmd("j, suck my cock", ["'Keep going,' you gasp as Joanna sucks on your swollen cock."])
  test.assertCmd("j, suck my cock", ["You grin as Joanna sucks on your hard cock."])
  test.assertCmd("j, suck my cock", ["You grin as Joanna sucks on your hard cock."])
  test.assertCmd("j, suck my cock", ["You grin as Joanna sucks on your steel-hard cock."])  
  test.assertCmd("j, suck my cock", ["'Yes! Yes!' you murmur as Joanna sucks on your cock. Joanna can taste pre-cum."])
  test.assertCmd("j, suck my cock", ["'Yes! Yes!' you murmur as Joanna sucks on your cock. Joanna can taste pre-cum."])
  test.assertCmd("j, suck my cock", ["Joanna giggles as you come in her mouth, letting some cum dribble down her chin."])


  test.title("Suck tit")
  w.Joanna.arousal = 0
  w.Joanna.modifyAttraction(game.player, 50)
  w.me.arousal = 0
  test.assertCmd("suck j's tit", ["'Hmm!' Joanna sighs as you suck on her nipple."])
  test.assertCmd("suck j's tit", ["'Hmm!' Joanna sighs as you suck on her nipple."])


  test.title("Lick pussy")
  test.assertCmd("lick j's pussy", ["'Oh God yes!' exclaims Joanna as you lick her hot pussy."])


  test.title("Come over")
  test.assertCmd("come over j's face", ["You would need Joanna to get lower to do that."])
  test.assertCmd("come over j's ass", ["You caress your cock, making it harder and harder, as you aim it at Joanna's ass."])
  test.assertCmd("kneel", ["You kneel."])
  test.assertCmd("come over j's ass", ["You would have to get up to do that."])
  test.assertCmd("come over j's feet", ["You caress your cock, making it harder and harder, as you aim it at Joanna's feet."])
  test.assertCmd("j, crawl", ["Joanna goes down on her hands and knees."])
  test.assertCmd("come over j's ass", ["You caress your cock, making it harder and harder, as you aim it at Joanna's ass."])

  test.title("Substances 1")
  const substances = {}
  substances.cum1 = erotica.ejaculate(game.player, w.Joanna, "face")
  test.assertEqual(0, erotica.findSubstances(w.jeans2).length);
  substances.cum2 = erotica.ejaculate(game.player, w.jeans2)


//    const list = erotica.findSubstances(this)
//    msg(this.exam + (list.length > 0 ? " " + lang.pronounVerb(this, "be", true) + " covered in " + formatList(list, {lastJoiner:", and "}) + "." : ""))

  test.assertEqual(1, erotica.findSubstances(w.jeans2).length);
  test.assertEqual("cum", formatList(erotica.findSubstances(w.jeans2), {lastJoiner:", and "}));

  test.assertCmd("x jeans", ["A pair of grey jeans. They are covered in cum."])
  test.assertCmd("x jo", ["Joanna has a warm smile, and long blonde hair. She is wearing nothing. She is on her hands and knees. She has cum on her face."])
  substances.cum3 = erotica.ejaculate(game.player, w.Joanna, "ass")
  test.assertCmd("x jo", ["Joanna has a warm smile, and long blonde hair. She is wearing nothing. She is on her hands and knees. She has cum on her ass and face."])
  
  substances.custard = erotica.pourOn(w.Joanna, "custard", "tits")
  substances.honey = erotica.pourOn(w.Joanna, "honey", "thighs")
  
  test.assertCmd("x jo", ["Joanna has a warm smile, and long blonde hair. She is wearing nothing. She is on her hands and knees. She has cum on her ass and face; custard on her tits; and honey on her thighs."])

  delete substances.custard
  delete substances.honey
  delete substances.cum1
  delete substances.cum2
  delete substances.cum3
  
  test.title("Substances 2")
  test.assertEqual(true, w.jug.isSource("custard"))
  test.assertEqual(false, w.jug.isSource("honey"))
  test.assertEqual(false, erotica.findSource(game.player, "custard"))
  test.assertCmd("get jug", ["You take the jug."])
  test.assertEqual("jug", erotica.findSource(game.player, "custard").name)
  test.assertCmd("pour custard over joanna", ["You pour custard on to Joanna's chest, letting it dribble down her."])



  
  
  // RANDOM GENERATORS

  

  test.title("createGarment");
  const g1 = createItem("testthong", MADE_OF(materials.cloth), THONG(),{
    alias:"black thong",
    exam:"The thong is black, and rather small, with lacing along the three sides of the triangle.",
    colours:"black;white",
    image:"thong_black",
    swimwear:true,
  });

  const g2 = erotica.createGarment(g1, "lounge", "pink")
  test.assertEqual("pink thong", g2.alias);
  test.assertEqual(true, !g2.worn);
  delete w[g2.name]
  const g3 = erotica.createGarment(g1, "Joanna", ["coral", "coral"])
  test.assertEqual("coral thong", g3.alias);
  test.assertEqual(true, g3.worn);
  delete w[g3.name]
  g1.variFunc = function(colour) {
    this.alias = colour + " panties"
  }
  const g4 = erotica.createGarment(g1, "Joanna", "magenta")
  test.assertEqual("magenta panties", g4.alias);
  delete w[g4.name]
  delete w[g1.name]
  
  
  const c = commands.find(function(el) { return el.name === "NpcPullDown1" })
  
  


  for (let i = 0; i < 100; i++) {
    erotica.createBikini("Joanna")
    //console.log(erotica.createBikini("Joanna")[1].alias)
  }
  //console.log(createMan("lounge"));
  //const w1 = createWoman("lounge");
  //for (let i = 0; i < 900; i++){
  //  msg(createWoman("lounge").getDescription());
  //  msg(createMan("lounge").getDescription());
  //}*/
  
};

 
    
    
    
    
    
    
  