"use strict";



test.tests = function() {

  erotica.verify();




  test.title("ensemble");
  w.briefsblack.worn = false
  w.halterblack.worn = false
  w.briefsblack.loc = "lounge"
  w.halterblack.loc = "lounge"
  test.assertCmd("look", ["The lounge is lavishly appointed.", "You can see an A-frame, a black bikini, Clive (wearing a blue swim shorts), some Daisy Dukes, some jeans, Joanna, a maid (wearing a maid outfit), a settee, a red swimsuit, a table (with a dildo and a whip on it), a mesh teeshirt, a white teeshirt and a red thong here."]);
  test.assertCmd("x halter", "It is just your typical, every day black bikini halter.")
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
  test.assertCmd("look", ["The lounge is lavishly appointed.", "You can see an A-frame, Clive (wearing a blue swim shorts), some Daisy Dukes, a black bikini halter, some jeans, Joanna, a maid (wearing a maid outfit), a settee, a red swimsuit, a table (with a dildo and a whip on it), a mesh teeshirt, a white teeshirt and a red thong here."]);
  test.assertCmd("x halter", "It is just your typical, every day black bikini halter.")
  test.assertCmd("x briefs", "You can't see anything you might call 'briefs' here.")
  test.assertCmd("x bikini", "It is just your typical, every day black bikini halter.")
  w.briefsblack.loc = "lounge"
  w.halterblack.loc = "balcony"
  world.scopeSnapshot();
  test.assertCmd("look", ["The lounge is lavishly appointed.", "You can see an A-frame, some black bikini briefs, Clive (wearing a blue swim shorts), some Daisy Dukes, some jeans, Joanna, a maid (wearing a maid outfit), a settee, a red swimsuit, a table (with a dildo and a whip on it), a mesh teeshirt, a white teeshirt and a red thong here."]);
  w.Joanna.dressUp("halterblack", "briefsblack");
  world.scopeSnapshot();
  
  



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
  w.Joanna.dressUp("jeans", "teeshirtwhite", "halterblack", "briefsblack", "heels");
  test.assertEqual("heels", w.Joanna.firstToRemove().name);
  w.Joanna.dressUp("jeans", "teeshirtwhite", "halterblack", "briefsblack");
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
  w.Joanna.dressUp("jeans", "teeshirtwhite", "halterblack", "briefsblack", "heels");
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

  
  
  test.title("Grope");
  test.assertCmd("grope joanna's thigh", "You spend a few minutes running your fingers over Joanna's smooth thighs.");
  test.assertCmd("clive, grope joanna's left thigh", "Clive spends a few minutes running his fingers over Joanna's left thigh.");
  test.assertCmd("grope joanna's tits", "You spend a few minutes running your fingers over Joanna's firm tits, through her black bikini halter.");
  test.assertCmd("grope joanna's back", "You spend a few minutes running your fingers over Joanna's tattooed back.");
  test.assertCmd("grope maid's thigh", "You spend a few minutes running your fingers over the maid's tanned thighs.");
  test.assertCmd("grope my cock", "You spend a few minutes running your fingers over your hard cock.");
  test.assertCmd("maid, grope my cock", "The maid spends a few minutes running her fingers over your hard cock.");



  test.title("Suck");
  test.assertCmd("j, suck my cock", "'Eww! I'm not sucking your cock!'");
  test.assertCmd("j, suck my arm", "That is not a body part you can do that with, is it?");

  test.assertCmd("j, go down on me", "'Eww! I'm not sucking your cock!'");
  test.assertCmd("go down on j", "You can't do that when Joanna is wearing the black bikini briefs.");
  w.Joanna.dressUp("halterblack");
  test.assertCmd("go down on j", ["Doing lick", "false"]);
  test.assertCmd("blow j", "You can only suck off character's with dicks.");
  w.Joanna.dressUp("halterblack", "briefsblack");



  test.title("Wank");
  test.assertCmd("j, wank me", "Joanna spends a few minutes running her fingers over your hard cock.");
  test.assertCmd("j, jerk me off", "Joanna spends a few minutes running her fingers over your hard cock.");
  test.assertCmd("jill off j", "You spend a few minutes running your fingers over Joanna's smooth pussy, through her black bikini briefs.");
  test.assertCmd("jill j off", "You spend a few minutes running your fingers over Joanna's smooth pussy, through her black bikini briefs.");
  test.assertCmd("wank j", "You spend a few minutes running your fingers over Joanna's smooth pussy, through her black bikini briefs.");
  test.assertCmd("jack off j", "You can only jack off character's with dicks.");


  test.title("WankSelf");
  test.assertCmd("wank", "You spend a few minutes running your fingers over your hard cock.");
  test.assertCmd("j, jack off", "You can only jack off character's with dicks.");
  test.assertCmd("j, jill off", "Joanna spends a few minutes running her fingers over Joanna's smooth pussy, through her black bikini briefs.");

  
  
  test.title("Posture");
  test.assertCmd("x jo", "A hot, blonde babe. She is wearing a black bikini.");
  test.assertCmd("jo, bend over table", "Joanna bends over the table.");
  test.assertCmd("x jo", "A hot, blonde babe. She is wearing a black bikini. She is bending over the table.");
  test.assertCmd("jo, crawl", ["Joanna gets off the table.", "Joanna is now on her hands and knees."]);
  test.assertCmd("jo, kneel", ["Joanna is now kneeling."]);
  test.assertCmd("jo, stand", ["Joanna stands up."]);

  
  test.title("Order to wear or remove");
  test.assertCmd("jo, remove halter", ["'I guess...'", "Joanna unfastens her halter, pulling it off to bare her tits."]);
  test.assertCmd("jo, wear halter", ["Joanna pulls on the halter, fastening it at the back, then adjusting the cups to hold her boobs comfortably."]);


  test.title("Undress");
  w.Joanna.dressUp("jeans", "teeshirtwhite", "halterblack", "briefsblack", "heels");
  test.assertCmd("undress j", ["You pull the heels off Joanna."]);
  test.assertCmd("undress j", ["You pull the white teeshirt off Joanna."]);
  test.assertCmd("strip j", ["You pull the jeans off Joanna."]);
  test.assertCmd("undress j", ["You pull the black bikini halter off Joanna."]);

  w.Joanna.dressUp("jeans", "teeshirtwhite", "halterblack", "briefsblack", "heels");
  test.assertCmd("j,undress", ["'Sure thing!'", "Joanna pulls off her left shoe, then the right."]);
  test.assertCmd("j,undress", ["'Sure thing!'", "Joanna pulls the tee-shirt up and over her head, and down over her torso."]);
  test.assertCmd("j,strip", ["'Sure thing!'", "Joanna unfastens the button on her denim shorts, and pulls down the zip. After a bit of a wriggle, they slid down her smooth legs, and she steps out of them."]);
  test.assertCmd("j,undress", ["'I guess...'", "Joanna unfastens her halter, pulling it off to bare her tits."]);


  w.Joanna.dressUp("halterblack", "briefsblack");
  w.Joanna.willingToExpose = 3;
  test.assertCmd("j,undress", ["'No way!'"]);
  w.Joanna.willingToExpose = 5;


  test.title("Remove from other");
  test.assertCmd("remove h from j", ["You pull the black bikini halter off Joanna."]);
  test.assertCmd("remove halter from j", ["Joanna is not wearing a black bikini halter."]);
  w.Joanna.willingToExpose = 3;
  w.Joanna.dressUp("halterblack", "briefsblack");
  test.assertCmd("remove h from j", ["You try to pull the black bikini halter off Joanna, but Joanna is having none of it."]);
  const tmp = w.Joanna.canManipulate
  w.Joanna.canManipulate = function() {return false; }
  test.assertCmd("remove h from j", ["You rip the black bikini halter off Joanna."]);
  w.Joanna.canManipulate = tmp
  w.Joanna.willingToExpose = 5;
  w.Joanna.dressUp("halterblack", "briefsblack");



  test.title("getAgreementInteract");
  w.Joanna.getAgreementInteract = function(target, action, bodypart) {
    msg("'I'd rather poke my own eyes out.'")
    return false;
  }
  test.assertCmd("j, grope my cock", "'I'd rather poke my own eyes out.'");
  delete w.Joanna.getAgreementInteract
  
  
  test.title("Bondage");
  test.assertCmd("tie j up", ["You take the heels, the jeans and the white teeshirt from Joanna and you put them on the ground.", "You manacle Joanna's wrists to the top of the A-frame, then make her open her legs wide, before manacling them too."]);
  test.assertCmd("j, undress", ["'Not while I'm tied up.'"]);
  test.assertCmd("j, e", ["'Not while I'm tied up.'"]);
  test.assertCmd("j, get whip", ["'Not while I'm tied up.'"]);
  test.assertCmd("look", ["The lounge is lavishly appointed.", "You can see an A-frame, Clive (wearing a blue swim shorts), some heels, some jeans, Joanna (manacled to the A-frame; and wearing a black bikini), a maid (wearing a maid outfit), a settee, a table (with a dildo and a whip on it) and a white teeshirt here."]);
  test.assertCmd("free j", ["You release the manacles on Joanna's ankles, then reach up and release her wrists."]);



  test.assertCmd("j,tie me up", ["Joanna takes the thin white shirt from you and she puts it on the ground.", "Joanna manacles your wrists to the top of the A-frame, then makes you open your legs wide, before manacling them too."]);
  test.assertCmd("undress", ["You cannot remove the leather jacket whilst you are manacled to the A-frame."]);
  test.assertCmd("e", ["You cannot go anywhere whilst you are manacled to the A-frame."]);
  test.assertCmd("get whip", ["You cannot do anything with the whip whilst you are manacled to the A-frame."]);
  test.assertCmd("j, free me", ["Joanna releases the manacles on your ankles, then reaches up and releases your wrists."]);

  test.title("createGarment");
  const g1 = createItem("testthong", MADE_OF(materials.cloth), THONG(),{
    alias:"black thong",
    examine:"The thong is black, and rather small, with lacing along the three sides of the triangle.",
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
  g1.variFunc = function(colour, ...otherOptions) {
    this.alias = colour + " panties"
  }
  const g4 = erotica.createGarment(g1, "Joanna", "magenta")
  test.assertEqual("magenta panties", g4.alias);
  delete w[g4.name]
  g1.variFunc = function(colour, otherOptions) {
    this.alias = colour + " panties with " + otherOptions[0] + " and " + otherOptions[1]
  }
  const g5 = erotica.createGarment(g1, "Joanna", "red", "spots", "lace frills")
  test.assertEqual("red panties with spots and lace frills", g5.alias);
  delete w[g4.name]
  delete w[g1.name]
  
 

  //for (let i = 0; i < 1000; i++) {
  //  erotica.createSwimwearF("Joanna")
  //}
  //console.log(createMan("lounge"));
  //const w1 = createWoman("lounge");
  for (let i = 0; i < 900; i++){
    msg(createWoman("lounge").getDescription());
    msg(createMan("lounge").getDescription());
  }
  
};

 
    
    
    
    
    
    
  