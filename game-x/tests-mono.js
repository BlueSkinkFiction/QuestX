"use strict";



test.tests = function() {

  erotica.verify();

  test.title("Hair dresser")
  test.assertCmd("e", ["She heads east.", "Natasha is at the west end of Olympic Road, the main strip of Lansdown City, though the commercial concerns are all further east. Natasha is starting to feel the heat; it is not like this in New York.", "Natasha's first view of the town... A dusty, nondescript assortment of mismatched buildings, but there is something odd about the place, or perhaps the people, she could not quite put her finger on."]);
  test.assertCmd("sw", ["She heads southwest.", "The salon is decorated in a retro-sixties style, with chrome everywhere, and huge mirrors along one wall. There are two chairs, but only one stylist, Larry."]);
  game.player.money = 4000
  test.menuResponseNumber = 1;
  test.assertCmd("talk to larry", test.padArray(["'I'd like my hair styled,' says Natasha."], 5));
  test.assertCmd("x n", ["Natasha has long black hair in a ponytail. She is wearing some tight leggings, a white tee-shirt and a pair of trainers."])
  test.assertEqual(1000, game.player.money)
  game.player.money = 3000
  test.menuResponseNumber = 0;
  test.assertCmd("talk to larry", test.padArray(["'I'd like my hair dyed,' says Natasha."], 5));
  test.assertCmd("x n", ["Natasha has long blonde hair in a ponytail. She is wearing some tight leggings, a white tee-shirt and a pair of trainers."])
  test.assertEqual(1000, game.player.money)
  
  test.assertCmd("talk to larry", ["She can't afford the hair dying (need $20,00)."]);
  test.assertCmd("x n", ["Natasha has long blonde hair in a ponytail. She is wearing some tight leggings, a white tee-shirt and a pair of trainers."])
  test.assertEqual(1000, game.player.money)
  /* */
};

 
    
    
    
    
    
    
  