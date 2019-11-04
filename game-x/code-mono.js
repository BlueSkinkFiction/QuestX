"use strict";

const MAX = 4


createItem("me", ACTOR(false, true), {
  loc:"room",
  regex:/^me|myself|player$/,
  reputation:50,
  state:0,
  alias:'Aaron',
  cock:3,
  muscles:3,
  numbers:Array(MAX),
  examine:function() {
    msg("You are wearing {attire}. {ifposture:You are {posture}.}", {item:this});
  },
});

erotica.createGarment("boxers_black", "me", "white")
erotica.createGarment("teeshirt_black_with_logo", "me")
erotica.createGarment("jeans", "me")
erotica.createGarment("trainers", "me", "beige")



createItem("Julia", ACTOR(true), {
  properName:true,
  loc:"room",
  willingToExpose:8,
  eyeColor:'blue',
  getDescription:'Brooklyn is slim, her beautiful face set up by her long blonde hair, which falls down her back, with a single braid on her right. Her blue eyes seem to suggest she is laughing at something.{ifbare:buttock: She has a tattoo of a rose on her left buttock.}',
  size:3,
  appearance:9,
  skinTone:'tanned',
  hairColor:'blonde',
  hairLength:6,
  bust:3,
  numbers:Array(MAX),
});


erotica.createGarment("thong_black", "Julia", "black")
erotica.createGarment("bra_black", "Julia", "black")
erotica.createGarment("croptop_black", "Julia", "purple")
erotica.createGarment("daisy_dukes", "Julia")
erotica.createGarment("heels", "Julia", "black")



createRoom("room", {
  alias:"Julia's Room",
  desc:function() { 
    let s = "You are in Julia's room."
    msg(s)
  },
  north:new Exit("main_hall"),
});



function setup() {
  msg("'So...' says Julia, 'you want to play a game? Who evr loses removes an item of clothing.'")
  msg("'Sure!'")
}

const g = {
  state:0,
  numbers:Array(MAX),
}


 

function play() {
  if (g.state === 0) {
    msg("New game!")
    w.Julia.numbers.fill(false)
    w.me.numbers.fill(false)
    g.numbers.fill(false)
    w.Julia.score = 0
    w.me.score = 0
    g.state = 1
  }
  const gl = []
  for (let i = 0; i < MAX; i++) {
    if (!g.numbers[i]) gl.push(i + 1)
  }
  g.n = randomFromArray(gl)
  g.numbers[g.n - 1] = true
  console.log(g.numbers)
  msg("Julia turns over the card to bid for: {b:" + toWords(g.n) + "}")

  const l = []
  for (let i = 0; i < MAX; i++) {
    if (!w.me.numbers[i]) l.push(toWords(i + 1))
  }
  showMenu("Pick a number to play:", l, playTwo)
}


const playTwo = function(res) {
  const n1 = parseInt(convertNumbers(res))
  msg("You pick " + res + " or " + n1)
  w.me.numbers[n1 - 1] = true

  const l = []
  for (let i = 0; i < MAX; i++) {
    if (!w.Julia.numbers[i]) l.push(i + 1)
  }
  const n2 = randomFromArray(l)
  msg("Julia picks " + toWords(n2) + " or " + n2)
  w.Julia.numbers[n2 - 1] = true
  
  if (n1 === n2) {
    msg("A draw! The bid card is discarded, no points.")
  }
  else if (n1 < n2) {
    msg("Julia won! She gets " + g.n + " points.")
    w.Julia.score += g.n
  }
  else {
    msg("You won! You get " + g.n + " points.")
    w.me.score += g.n
  }
  
  let end = true
  for (let i = 0; i < MAX; i++) {
    if (!w.me.numbers[i]) end = false
  }
  
  if (end) endGame()
  
}



const endGame  = function() {
  msg("That ends the game.")
  g.state = 0
  msg("Your total: " + w.me.score)
  msg("Julia's total: " + w.Julia.score)
}



commands.push(new Cmd('Play', {
  npcCmd:true,
  rules:[cmdRules.isHeld],
  regex:/^play$/,
  objects:[
  ],
  script:function() { play() }
}));
  