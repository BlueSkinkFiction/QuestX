"use strict";

settings.title = "A First Step...";
settings.author = "Blue Skink fiction"
settings.version = "0.1";

// UI options
settings.customLibraries.push({folder:'libx', files:["setupX", "responsesX", "npcX", "templatesX", "commandsX", "worldX", "madeof", "wearableX", "wardrobe", "generator", "lists"]})

//settings.noAskTell = false

settings.playMode = 'dev'
//settings.textInput = false
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
  function() { return '<td colspan="2">' + player.status + "</td>"; },
];

settings.fluids = ['cum', 'water', 'honey', 'yoghurt', 'custard']


settings.startingDialogEnabled  = false
settings.startingDialogTitle = "Who are you?"
settings.startingDialogWidth = 600
settings.startingDialogHeight = 700

settings.startingDialogHtml = '<p>Name: <input id="namefield" type="text" value="Zoxx" /></p>';

settings.startingDialogHtml += '<div id="magic"/>'
settings.startingDialogHtml += '<div id="combat"/>'
settings.startingDialogHtml += '<div id="wealth"><p id="wealth-text"/></div>'

settings.startingDialogHtml += '<div class="row"><div class="column">'

settings.startingDialogHtml += '<div id="job"/>'
settings.startingDialogHtml += '<div id="build"/>'
settings.startingDialogHtml += '<div id="bust"/>'
settings.startingDialogHtml += '<div id="genitals"/>'

settings.startingDialogHtml += '</div><div class="column">'

settings.startingDialogHtml += '<div id="face"/>'
settings.startingDialogHtml += '<div id="hair-length"/>'
settings.startingDialogHtml += '<div id="hair-colour"/>'
settings.startingDialogHtml += '<div id="body-hair"/>'

settings.startingDialogHtml += '</div></div>'


settings.startingDialogOnClick = function() {
  const p = player
  p.alias = $("#namefield").val()
  p.magic = $('#magic-slider').slider('value')
  p.job = settings.sliders.job.values[$('#job-slider').slider('value')]
  p.build = $('#build-slider').slider('value')
  p.bust = $('#bust-slider').slider('value')
  p.genitals = $('#genitals-slider').slider('value')
  p.isFemale = (p.genitals === 0)
  p.face = $('#face-slider').slider('value')
  p.hairLength = settings.sliders['hair-length'].values[$('#hair-length-slider').slider('value')]
  p.hairColour = settings.sliders['hair-colour'].values[$('#hair-colour-slider').slider('value')]
  p.bodyHair = $('#body-hair-slider').slider('value')
  console.log(p)
}
settings.startingDialogInit = function() {
  io.addSlider('magic', 100, function(value) {
    player.magic = value
    const wealth = 200 - player.magic - player.combat
    $('#magic-text').html('Magic: ' + value)
    $('#wealth-text').html('Wealth: ' + wealth)
  })
  io.addSlider('combat', 100, function(value) {
    player.combat = value
    const wealth = 200 - player.magic - player.combat
    $('#combat-text').html('Combat: ' + value)
    $('#wealth-text').html('Wealth: ' + wealth)
  })
  io.addSlider('job', ['Student', 'Hooker', 'Exotic dancer', 'Firefighter', 'Personal trainer', 'Underwear model', 'Scientist'])
  io.addSlider('build', ['Skeletal', 'Skinny', 'Slim', 'Average', 'Strapping', 'Brawny', 'Buff'])
  io.addSlider('bust', ['None', 'Flat-chested', 'Modest tits', 'Average', 'Handful', 'Big tits', 'Huge gazongas'])
  io.addSlider('genitals', ['Pussy', 'Tiny todger', 'Disappointing dick', 'Mr average', 'Impressive', 'Big cock', 'Hey mama!'])
  io.addSlider('face', ['Butch', 'Rugged', 'Handsome', 'Average', 'Attractive', 'Pretty', 'Stunning'])
  io.addSlider('hair-length', ['Shaven', 'Cropped', 'Short', 'Shoulder-length', 'Long', 'Very long', 'Ponytail', 'Topknot'])
  io.addSlider('hair-colour', ['Black', 'Brunette', 'Fair', 'Blonde', 'Auburn', 'Ginger', 'Blue'])
  io.addSlider('body-hair', ['None at all', 'Neatly trimmed', 'Minimal', 'Some', 'Fair', 'Hairy', 'Gorilla'])
  $('#namefield').focus()
}
settings.startingDialogAlt = function() {
  // do stuff
}


