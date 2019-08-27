"use strict";



function setup() {
}




const DISABLED = true;
const professions = [
  {name:"Prostitute", bonus:"sex"},
  {name:"Underwear model", bonus:"appearance"},
  {name:"Exotic dancer", bonus:"agility"},
  {name:"Scientist", bonus:"intelligence"},
];

const hairColours = ['black', 'brunette', 'brown', 'blond', 'blue', 'purple', 'pink'];
const eyeColours = ['blue', 'brown', 'hazel', 'green']


$(function() {
  if (DISABLED) {
    game.player.job = professions[0];
    game.player.hasCock = true;
    game.player.fullname = "Aaron";
    return; 
  }
  const diag = $("#dialog");
  diag.prop("title", "Who are you?");
  let s = '<table>';
  s += '<tr><td>Name</td><td><input id="namefield" type="text" value="Zoxx" /></td></tr>';
  
  s += '<tr><td>Job</td><td><select id="job">'
  for (var i = 0; i < professions.length; i++) {
    s += '<option value="' + professions[i].name + '">' + professions[i].name + '</option>';
  }
  s += '</select></td></tr>';
  
  s += '<tr><td>Hair colour</td><td><select id="hair">'
  for (var i = 0; i < hairColours.length; i++) {
    s += '<option value="' + hairColours[i] + '">' + hairColours[i] + '</option>';
  }
  s += '</select></td></tr>';
  
  s += '<tr><td>Eye colour</td><td><select id="eyes">'
  for (var i = 0; i < eyeColours.length; i++) {
    s += '<option value="' + eyeColours[i] + '">' + eyeColours[i] + '</option>';
  }
  s += '</select></td></tr>';
  
  s += '<tr><td colspan="2">Do you have...<br/>';
  s += '<input type="checkbox" id="cock" name="cock" value="cock">&nbsp;A cock and balls?<br/>';
  s += '<input type="checkbox" id="pussy" name="pussy" value="pussy">&nbsp;A pussy?<br/>';
  s += '<input type="checkbox" id="tits" name="tits" value="tits">&nbsp;Tits?</td></tr>';
  
  diag.html(s);
  diag.dialog({
    modal:true,
    dialogClass: "no-close",
    width: 400,
    height: 380,
    buttons: [
      {
        text: "OK",
        click: function() {
          $(this).dialog("close");
          const job = $("#job").val();
          game.player.job = professions.find(function(el) { return el.name === job; });
          const hairColour = $("#hair").val();
          game.player.hairColour = hairColours.find(function(el) { return el === hairColour; });
          const eyeColour = $("#eyes").val();
          game.player.eyeColour = eyeColours.find(function(el) { return el === eyeColour; });
          game.player.hasCock = $("#cock").is(':checked');
          game.player.hasPussy = $("#pussy").is(':checked');
          game.player.hasTits = $("#tits").is(':checked');
          game.player.fullname = $("#namefield").val();
          if (TEXT_INPUT) { $('#textbox').focus(); }
        }
      }
    ]
  });
});


