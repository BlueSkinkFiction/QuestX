"use strict"

/*
Turns off the command line (except in dev mode), 

Turns off the command echo, so I recommend putting this in your style.css
.old-text {
  color:grey;
}






*/



// Default warning
settings.warnings = 'This game does involve sexual themes and may include graphic descriptions of sex between adults.'

// Dynamic conversations
settings.noTalkTo = false
settings.funcForDynamicConv = 'showMenuDiag'


settings.showSceneryInSidePanes = true
settings.panesCollapseAt = 0
settings.textInput = settings.playMode === 'dev'

settings.cmdEcho = settings.playMode === 'dev'





const sidePaneX = {}
io.modulesToInit.push(sidePaneX)
io.modulesToUpdate.push(sidePaneX)

sidePaneX.init = function() {
  const standButton = document.querySelector('#exit-Help')
  standButton.title = "Stand up"
}


sidePaneX.update = function() {
  const standButton = document.querySelector('#exit-Help')
  if (player.posture && player.posture !== 'standing') {
    standButton.innerHTML = '<i class="fas fa-arrow-up"></i>'
    standButton.onclick = function() { runCmd('stand') }
  }
  else {
    standButton.innerHTML = ''
    delete standButton.onclick
  }
}


findCmd('MetaHelp').script = function() {
  return runCmd('stand')
}


const createPlayerActor = function(name, isFemale, data) {
  return sidePaneX.createActor(name, isFemale, true, data)
}

const createActor = function(name, isFemale, data) {
  return sidePaneX.createActor(name, isFemale, false, data)
}

sidePaneX.createActor = function(name, isFemale, isPlayer, data) {
  const actor = createItem(name, ACTOR(isFemale, isPlayer), data)
  //log('created ' + name)
  
  actor.verbFunctions.push(function(o, list) {
    for (const el of sidePaneX.newCmds) {
      const cmd = findCmd(el.name)
      if (cmd.testPermitted(player, o)) list.push({name:cmd.name, action:cmd.name, style:cmd.style})
    }
  })

  for (const el of sidePaneX.newCmds) {
    actor[verbify(el.name)] = el.verb
  }
  
  if (data.garments) {
    for (const garment of data.garments) {
      erotica.createGarment(garment[0], name, garment[1])
    }
    delete actor.garments
  }

  actor.cumOnFaceCount = 0
  actor.arousal = 5

  actor.actor = true
  actor.finger_arousalBoost = 3
  actor.finger_permissionRequired = 5
  actor.gropetits_target = 'pussy'
  actor.finger_start = function() {
    return "You gently put you hand on {nms:npc:the} midriff, and slide it slowly down. She gasps as you find her sex, and start to tease her clit."
  }
  actor.finger_responses = [
    "You rub {nms:npc:the} clit, teasing and squeezing it",
    "You ease two fingers in and out of {nms:npc:the} cunt",
    "You flick {nms:npc:the} clit",
    "You run your finger over the lips of {nms:npc:the} sex",
  ]
  actor.finger_arousalComment = function() {
    if (this.arousal > 20) {
      this.arousal = 20
      s += ' She whimpers as she orgasms.'
    }
    else if (this.arousal > 15) {
      s += ' Her pussy is hot and dripping.'
    }
    else if (this.arousal > 10) {
      s += ' Her pussy is hot.'
    }
  }

  actor.gropetits_arousalBoost = 1
  actor.gropetits_permissionRequired = 4
  actor.gropetits_target = 'tits'
  actor.gropetits_start = function() {
    this.permissionGranted = this.finger_permissionRequired
    return "You cup {nms:npc:the} {show:npc:tits} breasts, and squeeze, feeling her nipples start to harden."
  }
  actor.gropetits_responses = [
    "You squeeze {nms:npc:the} fine breastsm grinning at her",
    "You tease {nms:npc:the} nipples",
  ]
  actor.gropetits_arousalComment = function() {
    if (this.arousal > 20) {
      this.arousal = 20
      s += ' She whimpers as she orgasms.'
    }
    else if (this.arousal > 15) {
      s += ' Her nipples are like bullets.'
    }
  }
  

  actor.molest = function(action) {
    if (!this.permissionGranted > this[action + '_permissionRequired'] && this[action + '_objection'] && this[action + '_abuse']) {
      msg("You reach for {nms:npc:the} " + this[action + '_target'] + ", but notices, and punches you in the mouth. It hurts! In the virtual world, women are as strong as men.", {npc:this})
      return false
    }
    if (!this.permissionGranted > this[action + '_permissionRequired'] && this[action + '_objection']) {
      this[action + '_objection']()
      this[action + '_abuse'] = true
      return false
    }
    let s
    if (this[action + '_last'] === game.turnCount - 1) {
      const l = this[action + '_responses']
      s = l[Math.floor(this.arousal / 2 % l.length)]
    }
    else {
      s = this[action + '_start']()
    }
    this.arousal += this[action + '_arousalBoost']
    
    msg(s, {npc:this})
    this[action + '_last'] = game.turnCount
    return true
  }

  // Can this actor get his/her hands on the given actor's genitals?
  // May need reviewing, especially for other positions
  actor.canHandleBits = function(char) {
    if (char.getOuterWearable('groin')) return false
    if (this.posture === 'standing' && char.posture === 'standing') return true
    if (this.posture === 'standing') return false
    if (this.posture === 'sitting') return false
    if (char.posture === 'sitting') return false
    return true
  }
  
  actor.cockDescs = [
    'flacid dick',
    'limp dick',
    'semi-hard dick',
    'semi-hard dick',
    'hardening cock',
    'hardening cock',
    'hardening cock',
    'erect cock',
    'erect cock',
    'erect cock',
    'hard cock',
    'hard cock',
    'hard cock',
    'swollen cock',
    'swollen cock',
    'swollen cock',
    'iron-hard cock',
    'iron-hard cock',
    'cock dripping with pre-cum',
    'cock dripping with pre-cum',
  ]
  actor.cockAdjectives = [
    'flacid',
    'limp',
    'semi-hard',
    'semi-hard',
    'hardening',
    'hardening',
    'hardening',
    'erect',
    'erect',
    'erect',
    'hard',
    'hard',
    'hard',
    'swollen',
    'swollen',
    'swollen',
    'iron-hard',
    'iron-hard',
    'dripping with pre-cum',
    'dripping with pre-cum',
  ]
  
  return actor
}










 







sidePaneX.newCmds = [
  // Undress
  {
    name:'Undress',
    isPossible:function(char1, char2) {
      if (char1.posture !== char2.posture) return false
      return (char2.getWearing().length > 0)
    },
    intimateLevel:2,
    verb:function() {
      log(this)
      return cmdRemoveGarment(player, this, this.firstToRemove(), 0)
    },
  },
  { 
    name:'Kiss cock',
    style:'xxx',
    char2BPCheck:'cock',
    char2BareCheck:'groin',
    isPossible:function(char1, char2) {
      if (char2.posture !== 'standing') return false
      if (char1.posture !== 'kneeling') return false
      return true
    },
    intimateLevel:1,
    verb:function() {
      if (this.kissCock) return this.kissCock()
      msg("You put your lips to {nms:npc:the} cock, and kiss the tip.", {npc:this})
      this.arousal++
      return true
    },
  },
  { 
    name:'Kiss pussy',
    style:'xxx',
    char2BPCheck:'pussy',
    char2BareCheck:'groin',
    isPossible:function(char1, char2) {
      if (char2.posture !== 'standing') return false
      if (char1.posture !== 'kneeling') return false
      return true
    },
    intimateLevel:1,
    verb:function() {
      if (this.kissPussy) return this.kissPussy()
      msg("You put your lips to {nms:npc:the} pussy, and kiss it.", {npc:this})
      this.arousal++
      return true
    },
  },
  { 
    name:'Suck off',
    style:'xxx',
    char2BPCheck:'cock',
    char2BareCheck:'groin',
    isPossible:function(char1, char2) {
      if (char2.posture !== 'standing') return false
      if (char1.posture !== 'kneeling') return false
      return true
    },
    intimateLevel:3,
    // Handles elsewhere
    /*verb:function() {
      if (!player.isFemale && !player.suckoffFlag) {
        msg("The thought of having another man's cock in your mouth makes you feel ill... And what about when he ejaculates!")
        player.suckoffFlag = true
      }
      if (this.name === 'wagon_driver' && !this.shortsDown) {
        msg("You ease down the wagon driver's shorts, to reveal his big cock in your mouth{first: - his big cock that will soon be in your mouth}.")
        this.shortsDown = true
      }
      if (!player.isFemale && this.notGay) {
        msg("You spend a few minutes licking {nms:npc:the} {select:npc:cockDescs:arousal}, teasing him with your tongue.|'What... are yo doing?' he asks.|You stop for a moment, looking up at his face. 'I'm sucking you off. And you're enjoying it - I can feel how hard your cock is.'", {npc:this})
        this.notGay = false
      }
      else if (this.arousal < 8) {
        msg("You spend a few minutes licking {nms:npc:the} {select:npc:cockDescs:arousal}, teasing him with your tongue.", {npc:this})
      }
      else if (this.arousal < 12) {
        msg("You take {nms:npc:the} {select:npc:cockDescs:arousal} in your mouth, and gently rocking back and forth on it.", {npc:this})
      }
      else if (this.arousal < 16) {
        msg("Sensing {nm:npc:the} is close to coming, you let him push his {select:npc:cockDescs:arousal} deeper into your mouth, as you bob up and down on him.", {npc:this})
      }
      else {
        msg("You taste pre-cum, and suddenly {nm:npc:the} is shooting his load into your mouth.|You have a mouthful of cum.", {npc:this})
        player.cumInMouth = this.name
        this.hasCome = true
        this.arousal = 3
      }
      this.arousal += 4
      return true
    },*/
  },
  { 
    name:'Lick pussy',
    style:'xxx',
    char2BPCheck:'pussy',
    char2BareCheck:'groin',
    isPossible:function(char1, char2) {
      if (char2.posture !== 'standing') return false
      if (char1.posture !== 'kneeling') return false
      return true
    },
    intimateLevel:3,
    // Handles elsewhere

    /*verb:function() {
      if (player.isFemale && !player.lickpussyFlag) {
        msg("The thought of putting your tongue in another woman's sex makes you feel slighty ill, but...")
        player.lickpussyFlag = true
      }
      if (player.isFemale && this.notGay) {
        msg("You spend a few minutes licking {nms:npc:the} pussy, teasing her clit with your tongue.|'What... are yo doing?' she asks.|You stop for a moment, looking up at her face. 'I'm licking your pussy. And you're enjoying it - I can feel how damp you are.'", {npc:this})
        this.notGay = false
      }
      else if (this.arousal < 8) {
        msg("You spend a few minutes licking {nms:npc:the} pussy, teasing her clit with your tongue.", {npc:this})
      }
      else if (this.arousal < 12) {
        msg("You explore {nms:npc:the} sex with your mouth, running your tongue round the lips of her cunt.", {npc:this})
      }
      else if (this.arousal < 16) {
        msg("Sensing {nm:npc:the} is close to coming, you focus your tongue on her clit, which is now hot and hard.", {npc:this})
      }
      else {
        msg("{nm:npc:the} starts gasping, and shuddering; you know she is coming. You gently bite her clit, making her whimper.", {npc:this})
        this.hasCome = true
      }
      if (this.arousal < 18) this.arousal += 3
      return true
    },*/
  },
  {
    name:'Offer pussy',
    style:'xxx',
    char1BPCheck:'pussy',
    char1BareCheck:'groin',
    isPossible:function(char1, char2) {
      if (char1.posture !== 'standing') return false
      if (char2.posture === 'standing' && !char2.isFemale) return true
      if (char2.posture !== 'kneeling') return false
      return true
    },
    intimateLevel:4,
    verb:function() {
      if (this.posture === 'standing' && !this.isFemale) {
        if (fuck_count === 0) {
          msg("You face {nm:char:the}, and thrust your pelvis towards {sb:char}, starting to rub your pussy against his hip. 'You want to stick that big cock of yours into me?'")
          let s = "He looks up and down your naked body"
          if (this.arousal < 7) {
            s += ", his d becoming more erect as he does so,"
            this.arousal = 7
          }
          msg(s + " and grins. 'Sure!' He wastes no time, putting one hand on your ass, and uses the other to guide his cock in to you.")
        }
      }
      else {
        msg("You push your hips into {nms:char:the} face...")
      }
      return true
    },
  },
  { 
  name:'Offer ass',
    style:'xxx',
    char1BareCheck:'groin',
    isPossible:function(char1, char2) {
      if (char1.posture !== 'standing') return false
      if (char2.posture !== 'kneeling') return false
      return true
    },
    intimateLevel:4,
    verb:function() {
      msg("You push your ass into {nms:char:the} face...")

      return true
    },
  },
  {
    name:'Fuck',
    style:'xxx',
    char1BPCheck:'cock',
    char1BareCheck:'groin',
    char2BPCheck:'pussy',
    char2BareCheck:'groin',
    isPossible:function(char1, char2) {
      if (char1.posture === 'standing' && char2.posture === 'standing') return true
      return false
    },
    intimateLevel:5,
    verb:function(options) {
      // to do !!!
      if (fuck_count === 0) {
        msg("You face {nm:char:the}, and thrust your pelvis towards him, starting to rub your pussy against his hip. 'You want to stick that big cock of yours into me?'")
        let s = "He looks up and down your naked body"
        if (this.arousal < 7) {
          s += ", his d becoming more erect as he does so,"
          this.arousal = 7
        }
        msg(s + " and grins. 'Sure!' He wastes no time, putting one hand on your ass, and uses the other to guide his ")
      }
      return true
    },
  },
  {
    name:'Come over',
    style:'xxx',
    char1BPCheck:'cock',
    char1BareCheck:'groin',
    isPossible:function(char1, char2) {
      if (char1.arousal < 16) return false
      if (char1.posture !== 'standing') return false
      if (char2.posture === 'standing') return false
      return false
    },
    intimateLevel:5,
    verb:function() {
      msg("Knowing you are close to coming, you take your erection in both hards, gripping it, rubbing up and down, all the time keeping your cock pointed at {nm:npc:the}. Suddenly you gasp as you ejaculate, spitting your man-muck over {nm:npc:the} face.", {npc:this})
      if (this.comeover_reaction) msg(this.comeover_reaction())

      return true
    },
  },
  /*{
    name:'Fuck face',
    char1BPCheck:'cock',
    char1BareCheck:'groin',
    isPossible:function(char1, char2) {
      return false
    },
  },*/
  {
    name:'Grope tits',
    style:'xxx',
    char2BPCheck:'tits',
    char2BareCheck:'chest',
    intimateLevel:2,
    isPossible:function(char1, char2) {
      return (char1.posture === char2.posture === 'standing')
    },
    verb:function() { this.molest('gropetits') },
  },
  {
    name:'Finger',
    style:'xxx',
    char2BPCheck:'pussy',
    char2BareCheck:'groin',
    isPossible:function(char1, char2) {
      if (!char2.isFemale) return false
      return char1.canHandleBits(char2)
    },
    intimateLevel:3,
    verb:function() { this.molest('finger') },
  },
  {
    name:'Caress balls',
    char2BPCheck:'cock',
    char2BareCheck:'groin',
    isPossible:function(char1, char2) {
      //log(char1)
      //log(char2)
      if (char2.isFemale) return false
      return char1.canHandleBits(char2)
    },
    intimateLevel:2,
    verb:function() {
      if (!player.isFemale && this.notGay) {
        msg("You gently caress {nms:npc:the} ballsack, conscious of his {select:npc:cockDescs:arousal} getting harder.|'What the fuck?' he says.|'Come on,' you whispered, 'you're enjoying this. I can see how hard your cock is.'", {npc:this})
        this.notGay = false
        this.arousal += 3
      }
      else if (this.arousal < 11) {
        msg("You gently caress {nms:npc:the} ballsack, conscious of his {select:npc:cockDescs:arousal} getting harder.", {npc:this})
        this.arousal += 2
      }
      else {
        msg("You gently caress {nms:npc:the} ballsack.", {npc:this})
        this.arousal += 1
      }
      return true
    },
  },
  {
    name:'Jerk off',
    style:'xxx',
    char2BPCheck:'cock',
    char2BareCheck:'groin',
    isPossible:function(char1, char2) {
      if (char2.isFemale) return false
      return char1.canHandleBits(char2)
    },
    intimateLevel:3,
    verb:function() {
      if (!player.isFemale && this.notGay) {
        msg("You spend a few minutes stroking {nms:npc:the} {select:npc:cockDescs:arousal}, watching as it grows more erect.|'Please... stop' he says.|'Come on,' you whispered, 'you're enjoying this. I can feel how hard your cock is.'", {npc:this})
        this.notGay = false
      }
      else if (this.arousal < 8) {
        msg("You spend a few minutes stroking {nms:npc:the} {select:npc:cockDescs:arousal}, watching as it grows more erect.", {npc:this})
      }
      else if (this.arousal < 12) {
        msg("You grip {nms:npc:the} {select:npc:cockDescs:arousal} in both hands, squeezing gently as you push back on his foreskin.", {npc:this})
      }
      else if (this.arousal < 16) {
        msg("{nms:npc:the:true} cock feels so hard, you know it is close to coming. You run you fingers along it, teasing him for a moment, before continuing to jerk him off. A thread of pre-cum falls from the tip.", {npc:this})
      }
      else {
        msg("You give his cock another pull, and suddenly {nm:npc:the} is shooting his load. You manage to aim it out of the cage.", {npc:this})
        this.hasCome = true
        this.arousal = 3
      }
      this.arousal += 3
      return true
    },
  },
  
  // Cum disposition
  {
    name:'Spit cum over face',
    style:'cum',
    isPossible:function(char1, char2) {
      if (!char1.cumInMouth) return false
      if (char1.posture === 'standing' && char2.posture === 'standing') return true
      if (char1.posture === 'sitting' && char2.posture === 'sitting') return true
      if (char1.posture === 'kneeling' && char2.posture === 'sitting') return true
      if (char1.posture === 'kneeling' && char2.posture === 'kneeling') return true
      return false
    },
    verb:function() {
      if (player.cumInMouth === this.name) {
        msg("You spit out {nms:npc:the} cum over his face.|'You dirty bitch,' he says, with a smile.", {npc:this})
      }
      else {
        msg("You spit out {nms:cummer:the} cum over {nms:npc:the} face.", {npc:this, cummer:w[player.cumInMouth]})
        if (this.cumOnFaceCount === 0 && this.cumSpatOnFaceFirst) {
          this.cumSpatOnFaceFirst(w[player.cumInMouth])
        }
        else {
          this.cumSpatOnFace(w[player.cumInMouth])
        }
      }
      this.cumOnFaceCount++
      delete player.cumInMouth
      return true
    },
  },
  {
    name:'Swallow his cum',
    style:'cum',
    isPossible:function(char1, char2) {
      if (char1.cumInMouth === char2.name) return true
      return false
    },
    verb:function() {
      if (player.cumSwallowed === 0) {
        msg("Reluctantly, you swallow {nms:npc:the} cum, feeling the sticky, salty muck go down your throat.", {npc:this})
      }
      else if (player.cumSwallowed < 50) {
        msg("You swallow {nms:npc:the} cum, but you can still taste it.", {npc:this})
      }
      else {
        msg("You eagerly swallow {nms:npc:the} cum, enjoying the feeling of it going down your throat.", {npc:this})
      }
      player.cumSwallowed += 4 + random.int(1,5) + random.int(1,5)
      delete player.cumInMouth
      return true
    },
  },
  {
    name:'Spit out his cum',
    style:'cum',
    isPossible:function(char1, char2) {
      if (char1.cumInMouth === char2.name) return true
      return false
    },
    verb:function() {
      msg("You spit out {nms:npc:the} foul muck; some of it dribbles down your chin, and dangles in thin threads as it falls to the ground{first:, it is disgusting, and you can still taste it..}.", {npc:this})
      delete player.cumInMouth
      return true
    },
  },
  
  /*  
  Postures      name           furniture/
  
  Sit on        sitting
  Stand on      standing
  Recline on    reclining
  Straddle      straddling
  Bend over     bending (over)
  Kneel before  kneeling
  Stand over    standing
  Roll over     
  Face down     facedown
  Crawl         crawling
  
  
  

  */  
  // Postures
  {
    name:'Lie on',
    style:'posture',
    isPossible:function(char1, char2) {
      if (char2.posture === 'reclining') return true
      return false
    },
    intimateLevel:5,
    verb:function() {
      player.posture = 'reclining'
      player.postureFurniture = this.name
      this.underChar = player.name
      msg("You lie on {nm:char:the}.", {char:this})
      return true
    },
  },
  {
    name:'Roll over',
    style:'posture',
    isPossible:function(char1, char2) {
      if (char2.posture !== 'reclining' && char2.posture !== 'straddling') return false
      if (char2.postureFurniture !== player.name) return false
      return true
    },
    intimateLevel:5,
    verb:function() {
      player.posture = 'reclining'
      player.postureFurniture = this.name
      this.underChar = player.name
      msg("You roll over {nm:char:the}, to lie on top.", {char:this})
      return true
    },
  },
  {
    name:'Straddle',
    style:'posture',
    isPossible:function(char1, char2) {
      if (char2.posture === 'reclining') return true
      return false
    },
    intimateLevel:5,
    verb:function() {
      player.posture = 'straddling'
      player.postureFurniture = this.name
      this.underChar = player.name
      msg("You straddle {nm:char:the}.", {char:this})
      return true
    },
  },
  {
    name:'Kneel before',
    style:'posture',
    isPossible:function(char1, char2) {
      if (char1.posture === 'standing' || char1.posture === 'sitting') return true
      return false
    },
    intimateLevel:1,
    verb:function() {
      player.posture = 'kneeling'
      msg("You go down on you knees in front of {nm:npc:the}.", {npc:this})
      return true
    },
  },
  {
    name:'Sit beside',
    style:'posture',
    isPossible:function(char1, char2) {
      if (char2.posture === 'sitting' && char1.posture === 'standing') return true
      return false
    },
    verb:function() {
      player.posture = 'sitting'
      msg("You sit down beside {nm:npc:the}.", {npc:this})
      return true
    },
  },
  
  // Violence
  {
    name:'Squeeze balls',
    style:'painful',
    char2BPCheck:'cock',
    char2BareCheck:'groin',
    intimateLevel:5,
    isPossible:function(char1, char2) {
      if (char2.isFemale) return false
      return char1.canHandleBits(char2)
    },
    verb:function() {
      if (this.isGropingPlayer) {
        msg("You grab {nms:npc:the} balls, and squeeze, making him gasp in pain. 'Hands off my " + this.isGropingPlayer + "!' you say to him.|'Sorry!' he says in a high voice, his hands quickly off your " + this.isGropingPlayer + ", and cupping your hands over his balls. You give them another quick squeeze to let him know you are not kidding, making him gasp.", {npc:this})
      }
      else if (this.isFuckingPlayer) {
        msg("You grab {nms:npc:the} balls, and squeeze hard, making him gasp in pain. 'Keep you filthy dick away from me!' you say to him.|'Sorry!' he says in a high voice, his hands quickly off your ass as he steps away and cups your hands over his balls. You give them another quick squeeze to let him know you are not kidding, making him gasp.", {npc:this})
      }
      else {
        msg("You grab {nms:npc:the} balls, and squeeze, making him gasp in pain.|'What's that for?' he asks in a high voice, his hands quickly cupping your hands over his balls.|'I just like to see guys in pain.' You give them another quick squeeze to let him know you are not kidding, making him gasp.", {npc:this})
      }
      this.arousal -= 4
      this.likesPlayer -= 3
      return true
    },
  },
/*  {
    name:'Punch',
    style:'painful',
    intimateLevel:1,
    isPossible:function(char1, char2) {
      if (char1.posture === 'standing' && char2.posture === 'standing') return true
      if (char1.posture === 'kneeling' && char2.posture === 'kneeling') return true
      return false
    },
  },*/
  {
    name:'Punch balls',
    style:'painful',
    char1BPCheck:'pussy',
    char2BPCheck:'cock',
    intimateLevel:2,
    isPossible:function(char1, char2) {
      if (char1.posture === 'kneeling' && char2.posture === 'standing' && !char2.isFemale) return true
      return false
    },
  },
  {
    name:'Knee balls',
    style:'painful',
    char1BPCheck:'pussy',
    char2BPCheck:'cock',
    intimateLevel:2,
    isPossible:function(char1, char2) {
      if (char1.posture === 'standing' && char2.posture === 'standing' && !char2.isFemale) return true
      return false
    },
  },
  
]



for (let el of sidePaneX.newCmds) {
  const cmd = new Cmd(el.name, {
    regex:new RegExp('^' + el.name.toLowerCase() + ' (.+)$'),
    attName:verbify(el.name),
    objects:[
      {scope:el.scopeHeld ? parser.isHeld : parser.isHere},
    ],
    defmsg:"{pv:item:'be:true} not something you can do that with.",
  })
  for (const key in el) {
    if (key !== 'name') cmd[key] = el[key]
  }
  cmd.testPermitted = function(char1, char2) {
    // char1 is the one doing it, probably the player
    
    
    if (char1['intimateLevel_' + char2.name] !== undefined && this.intimateLevel) {
      if (this.intimateLevel > char1['intimateLevel_' + char2.name]) return false
    }
    if (!this._testCharForCommand(char1, this.char1BPCheck, this.char1BareCheck)) return false
    if (!this._testCharForCommand(char2, this.char2BPCheck, this.char2BareCheck)) return false
    if (this.isPossible && !this.isPossible(char1, char2)) return false
    return true
  }
  cmd._testCharForCommand = function(char, bpCheck, bareCheck) {
    if (bpCheck && !char.hasBodyPart(bpCheck)) return false//msg("{nv:char:would:true} would have to have {nm:bp:a} for that.", {char:char, bp:w[bpCheck]})
    if (bareCheck) {
      const garment = char.getOuterWearable(bareCheck)
      if (garment) return false//msg("{nv:char:would:true} would have to take off {pa:char} {nm:garment} for that.", {char:char, garment:garment})
    }
    return true
  }
}




function cmdRemoveGarment(char, target, garment, strength) {
  const options = {
    char:char, item:target, garment:garment,
    cutter:char.findCutter(),
    blocker:garment.getWearRemoveBlocker(target, false),
  }
  if (!char.isHere()) return failedmsg("{nv:char:be:true} not here.", options)
  if (!target.isHere()) return failedmsg("{nv:item:be:true} not here.", options)
  if (!garment.getWorn() || !garment.isAtLoc(target.name)) return failedmsg("{nv:item:be:true} not wearing {nm:garment:a}.", options)
  if (strength > 2 && !options.cutter) return failedmsg("{nv:char:need:true} a knife or something to do that.", options)
  if (options.blocker) return failedmsg("{nv:char:can:true} not remove {nm:garment:the} whilst {nv:item:be} wearing {nm:blocker:a}.", options)
  if (char === target && !char.getAgreement("Remove", {item:garment})) return world.FAILED

  if (char === target) return garment.remove({char:char}) ? world.SUCCESS : world.FAILED

  let rating = target.attractionTo(char) * 10 + target.arousal
  if (char.reputation) rating -= char.reputation
  if (target === player) rating = 100  // you want it done to yourself
  
  // if positive, will be reluctant
  const exposeRating = target.getExposureWithout(garment) - target.getWillingToExpose(w[target.loc])
  if (exposeRating > 0) rating -= exposeRating * 5
  //log(target.attractionTo(char))
  //log("target.getWillingToExpose(w[target.loc]): " + target.getWillingToExpose(w[target.loc]))
  //log("target.getExposureWithout(garment): " + target.getExposureWithout(garment))
  //log("char.reputation: " + char.reputation)
  //log("rating: " + rating)

  const targetNoChoice = target.restraint && !w[target.restraint].testManipulate
  if (!char.getAgreement("RemoveOther", {item:garment, target:target, rating:rating, targetNoChoice:targetNoChoice})) return world.FAILED

  // By now we have a character, char, willing to try to remove an item, garment, from a different character, target
  //console.log(char.name + ":remove:" + garment.name)
  const firstName = "remove_" + garment.name
  options.boss = player
  options.action = "remove"
  options.rating = rating
  options.strength = strength
  options.exposure = target.getWillingToExpose(w[target.loc]) - target.getExposureWithout(garment)
  options.first = !target[firstName]
  options.firstFail = !target[firstName + "_failed"]
  options.afterScript = respondCompleted
  if (target.restraint) options.restraint = w[target.restraint]

  respond(options, erotica.defaultResponses);
  return world.SUCCESS;
}



function respondCompleted(params, response) {
  if (!response) {
    console.log("No response found")
    console.log(params)
    return 
  }
  //log(params)
  if (!params.action) console.log(params)
  let s = params.action + "_"
  if (params.bodypart) s += params.bodypart.name
  if (params.garment) s += params.garment.name
  if (response.failed) s += "failed"
  params.item[s] = true
}  

