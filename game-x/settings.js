"use strict";

settings.title = "A First Step...";
settings.author = "Blue Skink fiction"
settings.version = "0.1";

// UI options

settings.dropdownForConv = false;
settings.customLibraries.push({folder:'libx', files:["setupX", "responsesX", "npcX", "templatesX", "commandsX", "worldX", "madeof", "wearableX", "wardrobe", "generator", "lists"]})

settings.noAskTell = false

settings.tests = true
settings.givePlayerSayMsg = false
settings.npcReactionsAlways = true
settings.saveDisabled = true // so objects can be created in tests

settings.roomTemplate = [
  "#{cap:{hereName}}",
  "{terse:{hereDesc}}",
  "{objectsHere:You can see {objects} here.}",
]

settings.status = [
  "hitpoints",
  function() { return "<td>Spell points:</td><td>3</td>"; },
  function() { return "<td>Health points:</td><td>" + game.player.hitpoints + "</td>"; },
  function() { return '<td colspan="2">' + game.player.status + "</td>"; },
];








