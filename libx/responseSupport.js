"use strict"



erotica.intimateProactive = function(target) {
  if (!target) target = player
  if (this.intimateCooldown) this.intimateCooldown--
  if (target.loc !== this.loc) return true
  this.intimateTerminate = false
  const p = {char:this, reactor:target}
  
  // In case the char was trying to do something, and the target already did it
  if (this.intimateAction === 'undress' && !erotica.checkWearing(target)) intimateActionUnset(p)
  if (this.intimateAction === 'getToBed' && (target.posture !== 'standing' || !p.reactor.isNaked(true)) ) intimateActionUnset(p)
  
  const res = respond(p, intimateResponses)
  //log(res)
  
  return this.intimateTerminate
}

erotica.checkWearing = function(npc) {
  const garment = w[npc.intimateActionGarment]
  return garment.worn && garment.loc === npc.name
}





const intimateTest = function(response, p) {
  // if the response level is too low, then no
  if (response.level && p.char.intimateLevel < response.level) return false
  // if the response level is too high, then no
  if (response.level && p.char.intimateLevel > (response.maxLevel ? response.maxLevel : response.level)) return false
  
  // if the reactor is in an action, and it does not match, then no
  if (p.char.intimateAction && p.char.intimateAction !== response.action ) return false
  // if the reactor is in an action, and the stage does not match, then no
  if (p.char.intimateAction && p.char.intimateActionStage !== response.actionStage ) return false
  // if the reactor is NOT in an action, and the stage is not zero, then no
  if (!p.char.intimateAction && response.actionStage !== undefined && response.actionStage !== 0) return false
  // if the reactor has stopped this action recently, then no
  if (p.char.intimateCooldown && p.char.intimateLast && p.char.intimateLast === response.action ) return false
  
  // if response.actorBare is set to a body part, and that is not bare then no
  if (response.actorBare && !p.char.isBodyPartBare(response.actorBare)) return false
  // if response.reactorBare is set to a body part, and that is not bare then no
  if (response.reactorBare && !p.reactor.isBodyPartBare(response.reactorBare)) return false
  
  return true
}

const intimateActionSet = function(response, p) {
  p.char.intimateAction = response.action
  p.char.intimateActionStage = 1
  p.reactor.intimateActionGarment = p.garment.name
  p.char.intimateActionActor = p.reactor.name
}
const intimateActionUnset = function(p) {
  p.char.intimateAction = false
  p.char.intimateActionStage = false
  p.reactor.intimateActionGarment = false
  p.char.intimateActionActor = false
}
const intimateActionStop = function(p) {
  msg("'Stop that!', says {nm:reactor}.", p)
  p.char.intimateLast = p.char.intimateAction
  p.char.intimateCooldown =  5
  intimateActionUnset(p)
}
