"use strict";



test.tests = function() {
  
  erotica.verify();

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

  
  
  
  
  
  test.title("Grope");
  test.assertCmd("grope joanna's thigh", "You spend a few minutes running your fingers over Joanna's smooth thighs.");
  test.assertCmd("clive, grope joanna's left thigh", "Clive spends a few minutes running his fingers over Joanna's left thigh.");
  test.assertCmd("grope joanna's tits", "You spend a few minutes running your fingers over Joanna's firm tits, through her black bikini halter.");
  test.assertCmd("grope joanna's back", "You spend a few minutes running your fingers over Joanna's tattooed back.");
  test.assertCmd("grope maid's thigh", "You spend a few minutes running your fingers over the maid's tanned thighs.");
  test.assertCmd("grope my cock", "You spend a few minutes running your fingers over your hard cock.");
  test.assertCmd("maid, grope my cock", "The maid spends a few minutes running her fingers over your hard cock.");
  
  
  
  test.title("Posture");
  test.assertCmd("x jo", "A hot, blonde babe. She is wearing a black bikini halter and some black bikini briefs.");
  test.assertCmd("jo, bend over table", "Joanna bends over the table.");
  test.assertCmd("x jo", "A hot, blonde babe. She is wearing a black bikini halter and some black bikini briefs. She is bending over the table.");
  test.assertCmd("jo, crawl", ["Joanna gets off the table.", "Joanna is now on her hands and knees."]);
  test.assertCmd("jo, kneel", ["Joanna is now kneeling."]);
  test.assertCmd("jo, stand", ["Joanna stands up."]);
  

  test.title("Order to wear or remove");
  test.assertCmd("jo, remove halter", ["'I guess...'", "Joanna unfastens her halter, pulling it off to bare her tits."]);
  //test.assertCmd("jo, wear halter", ["Joanna pulls on the halter, fastening it at the back, then adjusting the cups to hold her boobs comfortably."]);

  console.log(game.player.hasBodyPart("tit"));

};

 
    
    
    
    
    
    
  