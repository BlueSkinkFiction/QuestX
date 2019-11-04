"use strict";

const TITLE = "The Game";
const AUTHOR = "Blue Skink fiction"
const VERSION = "0.1";

// UI options
const PANES = 'Left';  //Can be set to Left, Right or None.
// Setting PANES to None will more than double the speed of your game!
const COMPASS = true;

const STATUS_PANE = "Status";  // Set to false to turn off
const STATUS_WIDTH_LEFT = 120; // How wide the columns are in the status pane
const STATUS_WIDTH_RIGHT = 40;

const USE_DROPDOWN_FOR_CONV = true;

const FAILS_COUNT_AS_TURNS = false;
const LOOK_COUNTS_AS_TURN = false;

const TEXT_INPUT = true;
const CURSOR = ">";
const CMD_ECHO = true;               // echo commands to the screen
const CONVERT_NUMBERS_IN_PARSER = false;
const SAVE_DISABLED = true;  // so we can use create when test ing

const LANG_FILENAME = "lang-en.js";  // set to the language file of your choice
const DEBUG = true;                  // set to false when releasing
const CUSTOM_EXITS = false;          // set to true to use custom exits, in exits.js
const FILES = ["setupX", "responsesX", "npcX", "templatesX", "commandsX", "worldX", "madeof", "wearableX", "wardrobe", "code-mono"];
const MAX_UNDO = 10;
const ROOM_HEADINGS = true;
const NO_TALK_TO = false;
const NO_ASK_TELL = "ASK/TELL ABOUT is not a feature in this game.";
const NPC_REACTIONS_AWAYS = false;

const MONEY_FORMAT =  "!$1,2!($1,2)!";

const PARSER_DEBUG = false;      // If true, will report the data the parser outputs
const SPLIT_LINES_ON = "<br>";   // Strings sent to msg will be broken into separate lines

const SECONDS_PER_TURN = 60;
const DATE_TIME_LOCALE = 'en-GB';
const DATE_TIME_START = new Date('February 14, 2020 14:43:00');
const DATE_TIME_OPTIONS = {
  year:"numeric",
  month:"short",
  day:"2-digit",
  hour:"2-digit",
  minute:"2-digit",
};

const ROOM_TEMPLATE = [
  "%",
  "{objectsHere:You can see {objects} here.}",
];

const STATUS = [
  function() { return "<td>Cash:</td><td>" + displayMoney(game.player.money) + "</td>"; },
  function() { return "<td>Modesty:</td><td>" + game.player.modesty + "</td>"; },
  function() { return '<td colspan="2">' + game.player.status + "</td>"; },
];


// Change the name values to alter how items are displayed
// You can add (or remove) inventories too
const INVENTORIES = [
  {name:'Items Held', alt:'itemsHeld', test:util.isHeldNotWorn, getLoc:function() { return game.player.name; } },
  {name:'Items Worn', alt:'itemsWorn', test:util.isWorn, getLoc:function() { return game.player.name; } },
  {name:'Items Here', alt:'itemsHere', test:util.isHere, getLoc:function() { return game.player.loc; } },
];



// Based on Goofspiel


