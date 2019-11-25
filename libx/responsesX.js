erotica.defaultResponses = [
  // GROPE
  {
    name:"grope",
    test:function(p) { return p.action === "grope" },
    responses:[    
      {
        name:"target tied up",
        test:function(p) { return !p.target.canManipulate() },
        responses:[    
          {
            name:"very unhappy",
            test:function(p) { return p.rating < 15 },
            responses:[    
              {
                name: "tit",
                test:function(p) { return p.bodypart.name === "tit" },
                msg:"'Please no!' {vn:target:exclaim} as {nv:actor:squeeze} {pa2:target:actor} tits.",
                script:function(p) { p.target.modifyAttraction(p.actor, -15) },
              },
              {
                name: "pussy",
                test:function(p) { return p.bodypart.name === "pussy" },
                msg:"'Oh God no!' shrieks {nm:target:the} as {nv:actor:finger} {pa2:target:actor} {pussy:target}.",
                script:function(p) { p.target.modifyAttraction(p.actor, -25) },
              },
              {
                name: "bollock",
                test:function(p) { return p.bodypart.name === "bollock" },
                msg:"'Hey no!' {vn:target:exclaim} as {nv:actor:squeeze} {pa2:target:actor} ball sack.",
                script:function(p) { p.target.modifyAttraction(p.actor, -25) },
              },
              {
                name: "cock",
                test:function(p) { return p.bodypart.name === "cock" },
                msg:"'Hands off!' {vn:target:exclaim} as {nv:actor:grip} {pa2:target:actor} {cock:target}.",
                script:function(p) { p.target.modifyAttraction(p.actor, -25) },
              },
              {
                name: "ass",
                test:function(p) { return p.bodypart.name === "ass" },
                msg:"'What are you..?' {vn:target:exclaim} as {nv:actor:reach} up {pa2:target:actor} ass.",
                script:function(p) { p.target.modifyAttraction(p.actor, -20) },
              },
              {
                name: "other",
                msg:"'Please no!' {vn:target:exclaim} as {nv:actor:run} {pa:actor} hands over {pa2:target:actor} {param:bpname}.",
                script:function(p) { p.target.modifyAttraction(p.actor, -10) },
              },
            ],
          },
          {
            name:"happy",
            responses:[    
              { 
                name: "tit",
                test:function(p) { return !p.target.canManipulate() && p.bodypart.name === "tit" },
                msg:"'Hmm!' signs {nm:target:the} as {nv:actor:squeeze} {pa2:target:actor} tits.",
                script:function(p) { p.target.arousal += 5 },
              },
              { 
                name: "pussy",
                test:function(p) { return !p.target.canManipulate() && p.bodypart.name === "pussy" },
                msg:"'Oh God yes!' {vn:target:exclaim} as {nv:actor:finger} {pa2:target:actor} {pussy:target}.",
                script:function(p) { p.target.arousal += 10 },
              },
              { 
                name: "bollock",
                test:function(p) { return !p.target.canManipulate() && p.bodypart.name === "bollock" },
                msg:"'Oh God yes!' {vn:target:exclaim} as {nv:actor:squeeze} {pa2:target:actor} ball sack.",
                script:function(p) { p.target.arousal += 7 },
              },
              { 
                name: "cock",
                test:function(p) { return !p.target.canManipulate() && p.bodypart.name === "cock" },
                msg:"'Keep going, keep going!' says {nm:target:the} as {nv:actor:grip} {pa2:target:actor} {cock:target}.",
                script:function(p) { p.target.arousal += 10 },
              },
              { 
                name: "ass",
                test:function(p) { return !p.target.canManipulate() && p.bodypart.name === "ass" },
                msg:"'Oh yes,' {vn:target:exclaim} as {nv:actor:reach} up {pa2:target:actor} ass.",
                script:function(p) { p.target.arousal += 7  },
              },
              { 
                name: "other",
                msg:"{nv:target:smiles:the:true} as {nv:actor:run} {pa:actor} hands over {pa2:target:actor} {param:bpname}.",
                script:function(p) { p.target.arousal += 2  },
              },
            ],
          },
        ],
      },

      {
        name:"target not tied up",
        responses:[
          {
            name:"actor is target",
            test:function(p) { return p.actor === p.target },
            responses:[    
              {
                name:"covered",
                test:function(p) { return !!p.garment },
                responses:[    
                  {
                    name: "not happy",
                    test:function(p) { return p.rating < -15 },
                    msg:"{nv:actor:grimace:true} as {sb:actor} reluctantly {cj:actor:stroke} {pa:actor} {param:bpadj} {param:bpname} through {pa:target} {nm:garment}.",
                    script:function(p) { p.target.modifyAttraction(p.boss, -15) },
                  },
                  {
                    name: "happy",
                    msg:"{nv:actor:smile:true} as {sb:actor} eagerly {cj:actor:stroke} {pa:actor} {param:bpadj} {param:bpname} through {pa:target} {nm:garment}.",
                    script:function(p) { p.target.modifyAttraction(p.boss, -15) },
                  },
                ],
              },
              {
                name:"uncovered",
                responses:[    
                  {
                    name: "not happy",
                    test:function(p) { return p.rating < -15 },
                    msg:"{nv:actor:grimace:true} as {sb:actor} reluctantly {cj:actor:stroke} {pa:actor} {param:bpadj} {param:bpname}.",
                    script:function(p) { p.target.modifyAttraction(p.boss, -15) },
                  },
                  {
                    name: "happy",
                    msg:"{nv:actor:smile:true} as {sb:actor} eagerly {cj:actor:stroke} {pa:actor} {param:bpadj} {param:bpname}.",
                    script:function(p) { p.target.modifyAttraction(p.boss, -15) },
                  },
                ],
              },
            ],
          },
          {
            name:"actor is not target",
            responses:[    
              {
                name:"very unhappy",
                test:function(p) { return p.rating < -15 },
                msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to grope {pa:target} {param:bpname}. 'Keep your filthy hands to yourself, {param:target:insult:actor}!'",
                script:function(p) { p.target.modifyAttraction(p.actor, -25); p.actor.reputation += 10 },
                failed:true,
              },
              {
                name:'unhappy',
                test:function(p) { return p.rating < 15 },
                msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to grope {pa:target} {param:bpname}. 'Keep your hands to yourself!'",
                script:function(p) { p.target.modifyAttraction(p.actor, -5); p.actor.reputation += 2 },
                failed:true,
              },
              {
                name:'unsure',
                test:function(p) { return p.rating < 40 },
                msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to grope {pa:target} {param:bpname}. '{param:target:exclaimCheeky}'",
                script:function(p) { p.target.modifyAttraction(p.actor, -5) },
                failed:true,
              },
              {
                name:"happy",
                responses:[
                  {
                    name:'covered',
                    test:function(p) { return p.garment },
                    msg:"{nv:actor:spend:true} a few minutes running {pa:actor} fingers over {nms:target} {param:bpname}, through {pa:target} {nm:garment}.",
                    script:function(p) { p.target.modifyAttraction(p.actor, 10) },
                  },
                  {
                    name:'uncovered',
                    msg:"{nv:target:smile:true} as {nv:actor:stroke} {pa:target} {param:bpadj} {param:bpname}.",
                    script:function(p) { p.target.modifyAttraction(p.actor, 10) },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // SUCK
  {
    name:"suck",
    test:function(p) { return p.action === "suck" },
    responses:[    
      {
        name:"target tied up",
        test:function(p) { return !p.target.canManipulate() },
        responses:[    
          {
            name:"unhappy",
            test:function(p) { return p.rating < 15 },
            responses:[
              {
                name:'tit',
                test:function(p) { return p.bodypart.name === "tit" },
                msg:"'Please no!' {nv:target:exclaims} as {nv:actor:nibble} on {pa:target} nipple.",
                script:function(p) { p.target.modifyAttraction(p.actor, -5); p.target.arousal += 2, p.actor.arousal += 6 },
              },
              {
                name:"cock",
                test:function(p) { return p.bodypart.name === "cock" },
                responses:[
                  {
                    name:"flacid",
                    test:function(p) { return p.target.arousal < 20},
                    msg:"'Hey, what the fuck?' {nv:target:exclaims} as {nv:actor:suck} on {pa:target} {cock:target}. It is starting to get harder!",
                    script:function(p) { p.target.modifyAttraction(p.actor, -5); p.target.arousal += 6, p.actor.arousal += 3 },
                  },
                  {
                    name:"semi",
                    test:function(p) { return p.target.arousal < 50},
                    msg:"'Stop!' {nv:target:begs} even as {pa:target} reluctant cock becomes erect.",
                    script:function(p) { p.target.arousal += 7, p.actor.arousal += 6 },
                  },
                  {
                    name:"hard",
                    test:function(p) { return p.target.arousal < 90},
                    msg:"'Please no,' {nv:target:gasp}, unable to stop {nm:actor:the} sucking on {pa:target} {cock:target}.",
                    script:function(p) { p.target.arousal += 8, p.actor.arousal += 6 },
                  },
                  {
                    name:"coming",
                    msg:"'No!' {nv:target:gasp} as {pv:target:come} in {nms:actor:the} mouth.",
                    script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal = 10, p.actor.arousal += 12 },
                  },
                ],
              },
              {
                name:"not tit or cock!!!",
                msg:"SHOULD NOT HAPPEN!",
              },
            ],
          },
          {
            name:"happy",
            responses:[
              {
                name:'tit',
                test:function(p) { return p.bodypart.name === "tit" },
                msg:"'Hmm!' {nv:target:sigh} as {nv:actor:suck} on {pa:target} nipple.",
                script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 6, p.actor.arousal += 4 },
              },
              {
                name:"cock",
                test:function(p) { return p.bodypart.name === "cock" },
                responses:[
                  {
                    name:"flacid",
                    test:function(p) { return p.target.arousal < 20},
                    msg:"'Hmm!' {nv:target:sigh} as {nv:actor:suck} on {pa:target} {cock:target}. It is starting to get harder!",
                    script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 10, p.actor.arousal += 3 },
                  },
                  {
                    name:"semi",
                    test:function(p) { return p.target.arousal < 50},
                    msg:"'Keep going,' {nv:target:gasp} as {nv:actor:suck} on {pa:target} {cock:target}.",
                    script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 10, p.actor.arousal += 6 },
                  },
                  {
                    name:"hard",
                    test:function(p) { return p.target.arousal < 75},
                    msg:"{nv:target:grin:true} as {nv:actor:suck} on {pa:target} {cock:target}.",
                    script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 11, p.actor.arousal += 6 },
                  },
                  {
                    name:"very hard",
                    test:function(p) { return p.target.arousal < 90},
                    msg:"'Yes! Yes!' {nv:target:murmur} as {nv:actor:suck} on {pa:target} cock. {nv:actor:can} taste pre-cum.",
                    script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 13, p.actor.arousal += 6 },
                  },
                  {
                    name:"coming",
                    msg:"{nv:target:gasp:true} as {pv:target:come} in {nms:actor:the} mouth.",
                    script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal = 10, p.actor.arousal += 12 },
                  },
                ],
              },
              {
                name:"not tit or cock!!!",
                msg:"SHOULD NOT HAPPEN!",
              },
            ],
          },
        ],
      },
      {
        name:"target not tied up",
        responses:[    
          {
            name:"very unhappy",
            test:function(p) { return p.rating < -15 },
            msg:"'Hey!' {nv:target:exclaim} as {nv:actor:try} to suck {pa:target} {param:bpname}. 'What the fuck are you doing, {random:jerk:creep:wanker}?'",
            script:function(p) { p.target.modifyAttraction(p.actor, -25); p.actor.reputation += 10 },
            failed:true,
          },
          {
            name:"unhappy",
            test:function(p) { return p.rating < 15 },
            msg:"'Hey!' {nv:target:exclaim} as {nv:actor:try} to suck {pa:target} {param:bpname}. '{param:target:exclaimDisgust} Get off!'",
            script:function(p) { p.target.modifyAttraction(p.actor, -10); p.actor.reputation += 2 },
            failed:true,
          },
          {
            name:"happy",
            responses:[
              {
                name:'tit',
                test:function(p) { return p.bodypart.name === "tit" },
                msg:"'Hmm!' {nv:target:sigh} as {nv:actor:suck} on {pa:target} nipple.",
                script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 6, p.actor.arousal += 4 },
              },
              {
                name:"cock",
                test:function(p) { return p.bodypart.name === "cock" },
                responses:[
                  {
                    name:"flacid",
                    test:function(p) { return p.target.arousal < 20},
                    msg:"'Hmm!' {nv:target:sigh} as {nv:actor:suck} on {pa:target} {cock:target}. It is starting to get harder!",
                    script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 10, p.actor.arousal += 3 },
                  },
                  {
                    name:"semi",
                    test:function(p) { return p.target.arousal < 50},
                    msg:"'Keep going,' {nv:target:gasp} as {nv:actor:suck} on {pa:target} {cock:target}.",
                    script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 10, p.actor.arousal += 6 },
                  },
                  {
                    name:"hard",
                    test:function(p) { return p.target.arousal < 75},
                    msg:"{nv:target:grin:true} as {nv:actor:suck} on {pa:target} {cock:target}.",
                    script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 11, p.actor.arousal += 6 },
                  },
                  {
                    name:"very hard",
                    test:function(p) { return p.target.arousal < 90},
                    msg:"'Yes! Yes!' {nv:target:murmur} as {nv:actor:suck} on {pa:target} cock. {nv:actor:can} taste pre-cum.",
                    script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 13, p.actor.arousal += 6 },
                  },
                  {
                    name:"coming",
                    msg:"{nv:target:gasp:true} as {pv:target:come} in {nms:actor:the} mouth.",
                    script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal = 10, p.actor.arousal += 12 },
                  },
                ],
              },
              {
                name:"not tit or cock!!!",
                msg:"SHOULD NOT HAPPEN!",
              },
            ],
          },
        ],
      },
    ],
  },




  // KISS
  // Requires some work
  {
    name:"kiss",
    test:function(p) { return p.action === "kiss" },
    responses:[
      {
        name:"target tied up",
        test:function(p) { return !p.target.canManipulate() },
        responses:[
          {
            test:function(p) { return p.rating < 15 && p.bodypart.name === "mouth" },
            msg:"{nv:target:try:true} to look away as {nv:actor:kiss} {sb:target} on the mouth, but cannot prevent their lips connecting. 'Ew,' {pv:target:exclaim} in disgust.",
            script:function(p) { p.target.modifyAttraction(p.actor, -25) },
          },
          {
            test:function(p) { return p.rating < 15 && p.bodypart.name === "pussy" },
            msg:"'No!' {nv:target:exclaim} in disgust as {nv:actor:kiss} {pa:target} pussy.",
            script:function(p) { p.target.modifyAttraction(p.actor, -25) },
          },
          {
            test:function(p) { return p.rating < -15 },
            msg:"'Hey!' {vn:target:exclaim} as {nv:actor:kiss} {pa:target} {param:bpname}. 'Get off me!'",
            script:function(p) { p.target.modifyAttraction(p.actor, -15) },
          },
          {
            test:function(p) { return p.rating < 15 },
            msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to kiss {pa:target} {param:bpname}. 'Please don't do that!'",
          },
          {
            test:function(p) { return p.bodypart.name === "pussy" },
            msg:"'Oh, yes!' {nv:target:sign} as {nv:actor:kiss} {pa:target} pussy.",
            script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 1, p.actor.arousal += 2 },
          },
          {
            test:function(p) { return p.bodypart.name === "cock" },
            msg:"'Hmm!' {vn:target:exclaim} as {nv:actor:kiss} the tip of {pa:target} {cock:target}.",
            script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 1, p.actor.arousal += 2 },
          },
          {
            msg:"'Hmm!' {vn:target:exclaim} as {nv:actor:kiss} {pa:target} {param:bpname}.",
            script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 1, p.actor.arousal += 2 },
          },
        ],
      },
      {
        name:"target not tied up",
        responses:[
          {
            test:function(p) { return p.rating < -15 },
            msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to kiss {pa:target} {param:bpname}. 'Get off me, {random:jerk:creep:wanker}!'",
            script:function(p) { p.target.modifyAttraction(p.actor, -15); p.actor.reputation += 5 },
            failed:true,
          },
          {
            test:function(p) { return p.rating < 15 },
            msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to kiss {pa:target} {param:bpname}. 'Please {i:don't} do that!'",
            script:function(p) { p.actor.reputation += 1 },
            failed:true,
          },
          {
            test:function(p) { return p.bodypart.name === "mouth" },
            msg:"{nv:actor:cup:true} {pa:target:the} face, and kisses {sb:target} firmly on the mouth.",
            script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 1, p.actor.arousal += 2 },
          },
          {
            test:function(p) { return p.bodypart.name === "pussy" },
            msg:"'Oh, yes!' {nv:target:sign} as {nv:actor:kiss} {pa:target} pussy.",
            script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 1, p.actor.arousal += 2 },
          },
          {
            test:function(p) { return p.bodypart.name === "cock" },
            msg:"'Hmm!' {vn:target:exclaim} as {nv:actor:kiss} the tip of {pa:target} {cock:target}.",
            script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 1, p.actor.arousal += 2 },
          },
          {
            msg:"'Hmm!' {vn:target:exclaim} as {nv:actor:kiss} {pa:target} {param:bpname}.",
            script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 1, p.actor.arousal += 2 },
          },
        ],
      },
    ],
  },



  // TICKLE
  // Requires some work
  {
    name:"tickle",
    test:function(p) { return p.action === "tickle" },
    responses:[    
      {
        test:function(p) { return p.rating < -15 },
        msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to tickle {pa:target} {param:bpname}. 'Get off me, {random:jerk:creep:wanker}!'",
        script:function(p) { p.target.modifyAttraction(p.actor, -15); p.actor.reputation += 5 },
        failed:true,
      },
      {
        test:function(p) { return p.rating < 15 },
        msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to tickle {pa:target} {param:bpname}. 'Please {i:don't} do that!'",
        script:function(p) { p.actor.reputation += 1 },
        failed:true,
      },
      {
        msg:"'Hmm!' {vn:target:exclaim} as {nv:actor:tickle} {pa:target} {param:bpname}.",
        script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 1, p.actor.arousal += 2 },
      },
    ],
  },

  // MASSAGE
  // Requires some work
  {
    name:"massage",
    test:function(p) { return p.action === "massage" },
    responses:[    
      {
        test:function(p) { return p.rating < -15 },
        msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to massage {pa:target} {param:bpname}. 'Get off me, {random:jerk:creep:wanker}!'",
        script:function(p) { p.target.modifyAttraction(p.actor, -15); p.actor.reputation += 5 },
        failed:true,
      },
      {
        test:function(p) { return p.rating < 15 },
        msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to massage {pa:target} {param:bpname}. 'Please {i:don't} do that!'",
        script:function(p) { p.actor.reputation += 1 },
        failed:true,
      },
      {
        msg:"'Hmm!' {vn:target:exclaim} as {nv:actor:massage} {pa:target} {param:bpname}.",
        script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 1, p.actor.arousal += 2 },
      },
    ],
  },

  // SNOG
  // Requires some work
  {
    name:"snog",
    test:function(p) { return p.action === "snog" },
    responses:[    
      {
        test:function(p) { return p.rating < -15 },
        msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to make out with {sb:target}. 'Get off me, {random:jerk:creep:wanker}!'",
        script:function(p) { p.target.modifyAttraction(p.actor, -15); p.actor.reputation += 5 },
        failed:true,
      },
      {
        test:function(p) { return p.rating < 15 },
        msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to  make out with {sb:target}. 'Please {i:don't} do that!'",
        script:function(p) { p.actor.reputation += 1 },
        failed:true,
      },
      {
        msg:"'Hmm!' {vn:target:exclaim} as {nv:actor:make} out with {sb:target}.",
        script:function(p) { p.target.modifyAttraction(p.actor, 5); p.target.arousal += 1, p.actor.arousal += 2 },
      },
    ],
  },

  // SMACK
  {
    name:"smack",
    test:function(p) { return p.action === "smack" },
    responses:[    
      {
        test:function(p) { return p.rating < -15 },
        msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to smack {pa:target} {param:bpname}. 'Keep your filthy hands to yourself, {param:target:insult:actor}!'",
        script:function(p) { p.target.modifyAttraction(p.actor, -25); p.actor.reputation += 10 },
        failed:true,
      },
      {
        test:function(p) { return p.rating < 15 },
        msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to smack {pa:target} {param:bpname}. 'Keep your hands to yourself!'",
        script:function(p) { p.target.modifyAttraction(p.actor, -5); p.actor.reputation += 2 },
        failed:true,
      },
      {
        test:function(p) { return p.rating < 40 },
        msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to smack {pa:target} {param:bpname}. '{param:target:exclaimCheeky}'",
        script:function(p) { p.target.modifyAttraction(p.actor, -5) },
        failed:true,
      },
      {
        test:function(p) { return p.garment },
        msg:"{nv:actor:smack:true} {nms:target} {param:bpname}, through {pa:target} {nm:garment}.",
        script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 1, p.actor.arousal += 2 },
      },
      {
        msg:"{nv:target:gasp:true} as {nv:actor:smack} {pa:target} {param:bpadj} {param:bpname}.",
        script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 1, p.actor.arousal += 2 },
      },
    ],
  },



  // LICK
  {
    name:"lick",
    test:function(p) { return p.action === "lick" },
    responses:[    
      {
        name:'very unhappy',
        test:function(p) { return p.rating < -15 },
        msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to lick {pa:target} {param:bpname}. 'Keep your filthy hands to yourself, {param:target:insult:actor}!'",
        script:function(p) { p.target.modifyAttraction(p.actor, -25); p.actor.reputation += 10 },
        failed:true,
      },
      {
        name:'unhappy',
        test:function(p) { return p.rating < 15 },
        msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to lick {pa:target} {param:bpname}. 'Keep your hands to yourself!'",
        script:function(p) { p.target.modifyAttraction(p.actor, -5); p.actor.reputation += 2 },
        failed:true,
      },
      {
        name:'unsure',
        test:function(p) { return p.rating < 40 },
        msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to lick {pa:target} {param:bpname}. '{param:target:exclaimCheeky}'",
        script:function(p) { p.target.modifyAttraction(p.actor, -5) },
        failed:true,
      },
      {
        name:"happy",
        responses:[
          {
            test:function(p) { return p.bodypart.name === "tit" },
            msg:"'Hmm!' signs {nm:target:the} as {nv:actor:lick} {pa2:target:actor} tits.",
            script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 5, p.actor.arousal += 3 },
          },
          {
            test:function(p) { return p.bodypart.name === "pussy" },
            msg:"'Oh God yes!' {vn:target:exclaim} as {nv:actor:lick} {pa2:target:actor} {pussy:target}.",
            script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 8, p.actor.arousal += 3 },
          },
          {
            test:function(p) { return p.bodypart.name === "bollock" },
            msg:"'Oh God yes!' {vn:target:exclaim} as {nv:actor:lick} {pa2:target:actor} ball sack.",
            script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 5, p.actor.arousal += 3 },
          },
          {
            test:function(p) { return p.bodypart.name === "cock" },
            msg:"'Keep going, keep going!' says {nm:target:the} as {nv:actor:lick} {pa2:target:actor} {cock:target}.",
            script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 8, p.actor.arousal += 4 },
          },
          {
            test:function(p) { return p.bodypart.name === "ass" },
            msg:"'Oh yes,' {vn:target:exclaim} as {nv:actor:push} {pa:actor} tongue up {pa2:target:actor} ass.",
            script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 2, p.actor.arousal += 4 },
          },
          {
            msg:"{nv:target:smiles:the:true} as {nv:actor:licks} {pa2:target:actor} {param:bpname}.",
            script:function(p) { p.target.modifyAttraction(p.actor, 10); p.target.arousal += 3, p.actor.arousal += 3 },
          },
        ],
      },
    ],
  },

  // COME OVER
  {
    name:"come_over",
    assumptions:"Already checked actor has a cock and has nothing over his crotch and the destination is achievable",
    test:function(p) { return p.action === "come_over" },
    responses:[    
      {
        test:function(p) { return p.actor.arousal < 20 },
        msg:"{nv:actor:squeeze:true} {pa:actor} limp willy, trying to coax life in it, as {pv:actor:aim} it vaguely at {nm:target:the}.",
        script:function(p) { },
      },
      {
        test:function(p) { return p.actor.arousal < 75 },
        msg:"{nv:actor:caress:true} {pa:actor} cock, making it harder and harder, as {pv:actor:aim} it at {nms:target:the} {param:bpname}.",
        script:function(p) { },
      },
      {
        test:function(p) { return p.actor.arousal < 90 },
        msg:"Pre-cum drips from {nms:actor:the} cock, as {pv:actor:squeeze} it furiously, pointing it at {nms:target:the} {param:bpname}.",
        script:function(p) { },
      },

      {
        test:function(p) { return !!p.garment },
        msg:"One more squeeze and {nms:actor:the} cock is shooting its load over {nms:target:the} bare {param:bpname}.",
        script:function(p) { erotica.ejaculate(p.actor, p.target, p.bpname) },
      },

      {
        msg:"One more squeeze and {nms:actor:the} cock is shooting its load over {nms:target:the} {nm:garment}.",
        script:function(p) { erotica.ejaculate(p.actor, p.garment, p.bpname) },
      },
    ],
  },

  // FRIG
  {
    name:"frig",
    assumptions:"Already checked target has a pussy and has nothing over her crotch",
    test:function(p) { return p.action === "frig" },
    responses:[
      {
        name:"target tied up",
        test:function(p) { return !p.target.canManipulate() },
        responses:[
          {
            name:"actor is target",
            test:function(p) { return !p.target.canManipulate() },
            msg:"{nv:actor:want:true} to finger her pussy, but cannot whilst tied up.",
            script:function(p) { p.actor.arousal += 2 },
            failed:true,
          },
          {
            test:function(p) { return p.rating < 25 },
            msg:"{nv:actor:slip:true} {pa:actor} finger into {pa2:target:actor} {pussy:target}. 'Please, no!' {pn:target:exclaim}, unable to stop {sb:actor} as {pv:actor:go} deeper into {pa:target} sex.",
            script:function(p) { p.actor.arousal += 8; p.target.arousal += 2 },
          },
          {
            msg:"{nv:actor:slip:true} {pa:actor} finger into {pa2:target:actor} {pussy:target}. 'Oh yes' {pn:target:gasp}, unable in any case to stop {sb:actor} as {pv:actor:go} deeper into {pa:target} sex.",
            script:function(p) { p.actor.arousal += 5; p.target.arousal += 12 },
          },
        ],
      },
      {
        name:"target not tied up",
        responses:[
          {
            name:"target is actor",
            test:function(p) { return p.target === p.actor },
            responses:[
              {
                test:function(p) { return p.actor.arousal < 20 },
                msg:"{nv:actor:slip:true} {pa:actor} hand between {pa:actor} legs, and {cj:actor:ease} a finger into {pa:actor} pussy, quietly pleasuring {rf:actor}.",
                script:function(p) { p.actor.arousal += 7 },
              },
              {
                test:function(p) { return p.actor.arousal < 40 },
                msg:"{nv:actor:stick:true} three fingers into {pa:actor} pussy; it feels so good!",
                script:function(p) { p.actor.arousal += 9 },
              },
              {
                test:function(p) { return p.actor.arousal < 60 },
                msg:"{nv:actor:spend:true} a few minutes rubbing {pa:actor} hot clit.",
                script:function(p) { p.actor.arousal += 10 },
              },
              {
                test:function(p) { return p.actor.arousal < 80 },
                msg:"{nv:actor:whimper:true} quietly as {pv:actor:continue} to finger {pa:actor} hot, damp sex.",
                script:function(p) { p.actor.arousal += 11 },
              },
              {
                msg:"{nv:actor:sigh:true} contentedly as {pv:actor:continue} work {rf:actor} to orgasm.",
                script:function(p) { p.actor.arousal += 11 },
              },
            ],
          },
          {
            name:"target is not actor",
            responses:[
              {
                test:function(p) { return p.rating < 0 },
                msg:"{nv:actor:reach:true} {pa:actor} finger to {pa2:target:actor} crotch. 'Hands off!' {pn:target:exclaim}, giving {nm:actor} a hard slap.",
                script:function(p) { p.actor.reputation += 20 },
                failed:true,
              },
              {
                test:function(p) { return p.rating < 25 },
                msg:"{nv:actor:reach:true} {pa:actor} finger to {pa2:target:actor} crotch. 'Hands off!' {pn:target:exclaim}.",
                script:function(p) { p.actor.reputation += 10 },
                failed:true,
              },
              {
                test:function(p) { return p.rating < 50 },
                msg:"{nv:actor:reach:true} {pa:actor} finger to {pa2:target:actor} crotch. 'Hey!' {pn:target:giggle}, 'hands to yourself, naughty.'",
                script:function(p) { },
              },
              {
                test:function(p) { return p.actor.arousal < 75 },
                msg:"{nv:actor:slip:true} {pa:actor} finger into {pa2:target:actor} {pussy:target}, making her giggle.",
                script:function(p) { p.actor.arousal += 5; p.target.arousal += 6 },
              },
              {
                test:function(p) { return p.actor.arousal < 90 },
                msg:"{nv:actor:slip:true} {pa:actor} finger into {pa2:target:actor} {pussy:target}, making her gasp.",
                script:function(p) { p.actor.arousal += 5; p.target.arousal += 9 },
              },
              {
                msg:"{nv:actor:slip:true} {pa:actor} finger into {pa2:target:actor} {pussy:target}, making her come.",
                script:function(p) { p.actor.arousal += 5; p.target.arousal += 12 },
              },
            ],
          },
        ],
      },
    ],
  },


  // WANK
  // Already checked target has a cock and has nothing over his crotch
  {
    name:"wank",
    test:function(p) { return p.action === "wank" },
    responses:[
      {
        name:"target tied up",
        test:function(p) { return !p.target.canManipulate() },
        responses:[
          {
            test:function(p) { return p.target === p.actor },
            msg:"{nv:actor:want:true} to jerk off, but cannot whilst tied up.",
            script:function(p) { p.actor.arousal += 2 },
            failed:true,
          },
          {
            test:function(p) { return p.arousal > 90 },
            msg:"{nv:actor:jerk} {nm:target} off for a few moments, then suddenly, {pv:target:shoot} {pa:actor} load.",
            script:function(p) { p.actor.arousal += 12; p.target.arousal = 2 },
          },
          {
            test:function(p) { return p.rating < 25 },
            msg:"{nv:actor:put:true} a hand on {nms:target:the} cock. 'Hey, no!' {pn:target:exclaim}, unable to stop {sb:actor} as {pv:actor:jerk} {sb:target} off.",
            script:function(p) { p.actor.arousal += 8; p.target.arousal += 2 },
          },
          {
            msg:"{nv:actor:put:true} a hand on {nms:target:the} cock, and jerks {sb:target} off.",
            script:function(p) { p.actor.arousal += 5; p.target.arousal += 12 },
          },
        ],
      },
      {
        name:"target not tied up",
        responses:[
          {
            name:"target is actor",
            test:function(p) { return p.target === p.actor },
            responses:[
              {
                test:function(p) { return p.actor.arousal < 20 },
                msg:"{nv:actor:put:true} {pa:actor} hand on {pa:actor} limp cock, and slowly kneads some life into it.",
                script:function(p) { p.actor.arousal += 7 },
              },
              {
                test:function(p) { return p.actor.arousal < 40 },
                msg:"{nv:actor:squeeze:true} and {cj:actor:pull} on {pa:actor} cock",
                script:function(p) { p.actor.arousal += 9 },
              },
              {
                test:function(p) { return p.actor.arousal < 60 },
                msg:"{nv:actor:squeeze:true} and {cj:actor:pull} on {pa:actor} cock, making it even harder",
                script:function(p) { p.actor.arousal += 10 },
              },
              {
                test:function(p) { return p.actor.arousal < 80 },
                msg:"{nv:actor:pant:true} as {pv:actor:jerk} {rf:actor} off.",
                script:function(p) { p.actor.arousal += 11 },
              },
              {
                msg:"A few more tugs, and {nv:actor:gasp} as {pv:ejaculate}.",
                script:function(p) { p.actor.arousal = 0 },
              },
            ],
          },
          {
            name:"target is not actor",
            responses:[
              {
                test:function(p) { return p.rating < 0 },
                msg:"{nv:actor:put:true} a hand on {nms:target:the} cock. 'Hey, no!' {pn:target:exclaim}.",
                script:function(p) { p.actor.arousal += 8; p.target.arousal += 2 },
                failed:true,
              },
              {
                test:function(p) { return p.rating < 25 },
                msg:"{nv:actor:put:true} a hand on {nms:target:the} cock. 'Hey, no!' {pn:target:exclaim}.",
                script:function(p) { p.actor.reputation += 10 },
                failed:true,
              },
              {
                test:function(p) { return p.rating < 80 },
                msg:"{nv:actor:put:true} a hand on {nms:target:the} cock. 'Hey, yes!' {pn:target:exclaim}, as {nv:actor:jerk} {sb:target} off.",
                script:function(p) { p.actor.arousal += 5; p.target.arousal += 10 },
              },
              {
                test:function(p) { return p.actor.arousal < 90 },
                msg:"{nv:actor:keep:true} jerking off {nm:target:the}; pre-cum starts to drip from the end of {pa:target} cock.",
                script:function(p) { p.actor.arousal += 10; p.target.arousal += 15 },
              },
              {
                msg:"{nv:actor:jerk} {nm:target} off for a few moments, then suddenly, {pv:target:shoot} {pa:actor} load.",
                script:function(p) { p.actor.arousal += 10; p.target.arousal = 2 },
              },
            ],
          },
        ],
      },
    ],
  },



  // GIRL ON TOP
  // Already checked target has a cock and actor has pussy and both exposed
  {
    name:"girl_top",
    test:function(p) { return p.action === "girl_top" },
    responses:[    
      {
        test:function(p) { return !!p.target.restraint && !p.target.restraint.canManipulate && p.target === p.actor },
        msg:"{nv:actor:want:true} to jerk off, but cannot whilst tied up.",
        script:function(p) { p.actor.arousal += 2 },
        failed:true,
      },
      {
        msg:"{nv:actor:bounce:true} up and down on {nms:target:the} cock for a few minutes.",
        script:function(p) { p.actor.arousal += 2 },
      },
    ],
  },
  
  // FUCK
  // Already checked target has a cock and actor has pussy and both exposed
  {
    name:"fuck",
    test:function(p) { return p.action === "fuck" },
    responses:[    
      {
        msg:"{nv:actor:fuck:true} {nm:target:the}.",
        script:function(p) { p.actor.arousal += 2 },
      },
    ],
  },


  // FUCK WITH DILDO
  // TODO !!!
  {
    name:"fuck with dildo",
    assumptions:"Already checked target has a cock and actor has dildo and both exposed",
    test:function(p) { return p.action === "fuck with dildo" },
    responses:[
      {
        name:"target tied up",
        test:function(p) { return !p.target.canManipulate() },
        responses:[
          {
            test:function(p) { return p.target === p.actor },
            msg:"{nv:actor:want:true} to fuck {rf:actor} with the {nm:sextoy}, but cannot whilst tied up.",
            script:function(p) { p.actor.arousal += 2 },
            failed:true,
          },
          {
            name:"pussy",
            test:function(p) { return !p.target.canManipulate() },
            responses:[
              {
                msg:"{nv:target:squeal:true} as {nv:actor:thrust} the {nm:sextoy} into {nms:target:the} {nm:bodypart}.",
                script:function(p) { p.actor.arousal += 8; p.target.arousal += 2 },
              },
            ],
          },
          {
            name:"ass, enjoys",
            test:function(p) { return p.target.enjoysAnal },
            responses:[
              {
                msg:"{nv:target:squeal:true} as {nv:actor:ease} the {nm:sextoy} into {nms:target:the} {nm:bodypart}.",
                script:function(p) { p.actor.arousal += 8; p.target.arousal += 2 },
              },
            ],
          },
          {
            name:"ass, does not enjoy",
            responses:[
              {
                msg:"{nv:target:squeal:true} as {nv:actor:thrust} the {nm:sextoy} into {nms:target:the} {nm:bodypart}.",
                script:function(p) { p.actor.arousal += 8; p.target.arousal += 2 },
              },
            ],
          },
        ],
      },
      {
        name:"target not tied up",
        responses:[
          {
            name:"target is actor",
            test:function(p) { return p.target === p.actor },
            responses:[
              {
                test:function(p) { return p.actor.arousal < 20 },
                msg:"{nv:actor:put:true} {pa:actor} hand on {pa:actor} limp cock, and slowly kneads some life into it.",
                script:function(p) { p.actor.arousal += 7 },
              },
              {
                test:function(p) { return p.actor.arousal < 40 },
                msg:"{nv:actor:squeeze:true} and {cj:actor:pull} on {pa:actor} cock",
                script:function(p) { p.actor.arousal += 9 },
              },
              {
                test:function(p) { return p.actor.arousal < 60 },
                msg:"{nv:actor:squeeze:true} and {cj:actor:pull} on {pa:actor} cock, making it even harder",
                script:function(p) { p.actor.arousal += 10 },
              },
              {
                test:function(p) { return p.actor.arousal < 80 },
                msg:"{nv:actor:pant:true} as {pv:actor:jerk} {rf:actor} off.",
                script:function(p) { p.actor.arousal += 11 },
              },
              {
                msg:"A few more tugs, and {nv:actor:gasp} as {pv:ejaculate}.",
                script:function(p) { p.actor.arousal = 0 },
              },
            ],
          },
          {
            name:"target is not actor",
            responses:[
              {
                test:function(p) { return p.rating < 0 },
                msg:"{nv:actor:put:true} a hand on {nms:target:the} cock. 'Hey, no!' {pn:target:exclaim}.",
                script:function(p) { p.actor.arousal += 8; p.target.arousal += 2 },
                failed:true,
              },
              {
                test:function(p) { return p.rating < 25 },
                msg:"{nv:actor:put:true} a hand on {nms:target:the} cock. 'Hey, no!' {pn:target:exclaim}.",
                script:function(p) { p.actor.reputation += 10 },
                failed:true,
              },
              {
                test:function(p) { return p.rating < 80 },
                msg:"{nv:actor:put:true} a hand on {nms:target:the} cock. 'Hey, yes!' {pn:target:exclaim}, as {nv:actor:jerk} {sb:target} off.",
                script:function(p) { p.actor.arousal += 5; p.target.arousal += 10 },
              },
              {
                test:function(p) { return p.actor.arousal < 90 },
                msg:"{nv:actor:keep:true} jerking off {nm:target:the}; pre-cum starts to drip from the end of {pa:target} cock.",
                script:function(p) { p.actor.arousal += 10; p.target.arousal += 15 },
              },
              {
                msg:"{nv:actor:jerk} {nm:target} off for a few moments, then suddenly, {pv:target:shoot} {pa:target} load.",
                script:function(p) { p.actor.arousal += 10; p.target.arousal = 2 },
              },
            ],
          },
        ],
      },
    ],
  },


  // COMPLIMENT
  // Already checked target has a cock and actor has pussy and both exposed
  {
    name:"compliment",
    test:function(p) { return p.action === "compliment" },
    responses:[
      {
        name:"face",
        test:function(p) { return p.bodypart.name === "face" },
        responses:[
          {
            test:function(p) { return p.target.hasBodyPart("cock") },
            script:function(p) {
              p.actor.msg("'You look great,' {nv:actor:say}.", p)
              p.actor.msg("'Thanks,' {nv:target:say}.", p)
              p.target.modifyAttraction(p.actor, 10)
            },
          },
          {
            script:function(p) {
              p.actor.msg("'You're beautiful,' {nv:actor:say}.", p)
              p.actor.msg("'Thanks,' {nv:target:say}.", p)
              p.target.modifyAttraction(p.actor, 10)
            },
          },
        ],
      },
      {
        name:"unwanted",
        test:function(p) { return p.target.arousal + p.rating < 30 },
        responses:[
          {
            script:function(p) {
              p.actor.msg("'Nice {nm:bodypart},' {nv:actor:say}.", p)
              p.actor.msg("'Fuck off,' {nv:target:say}.", p)
              p.target.modifyAttraction(p.actor, -10)
            },
          },
        ],
      },
      {
        name:"wanted",
        responses:[
          {
            script:function(p) {
              p.actor.msg("'Nice {nm:bodypart},' {nv:actor:say}.", p)
              p.actor.msg("'Thanks,' {nv:target:say}.", p)
              p.target.modifyAttraction(p.actor, 10)
            },
          },
        ],
      },
    ],
  },




  // POUR ON
  {
    name:"pour on",
    test:function(p) { return p.action === "pour on" },
    responses:[
      {
        name:"no bodypart",
        test:function(p) { return p.bodypart === undefined },
        responses:[
          {
            test:function(p) { return p.target.posture === "reclining" },
            msg:"{nv:actor:pour:true} {param:substance} on to {nms:target:the} chest and abdomen.",
            script:function(p) {
              p.actor.arousal += 3
              p.target.arousal += 2
              p.source.volume -= 5
              erotica.pourOn(w.Joanna, p.substance, "midriff")
              erotica.pourOn(w.Joanna, p.substance, "chest")
              erotica.pourOn(w.Joanna, p.substance, "groin")
              if (p.target.hasBodyPart("tit")) erotica.pourOn(w.Joanna, p.substance, "tit")
              if (p.target.hasBodyPart("cock")) erotica.pourOn(w.Joanna, p.substance, "cock")
              if (p.target.hasBodyPart("pussy")) erotica.pourOn(w.Joanna, p.substance, "pussy")
            },
          },
          {
            test:function(p) { return p.target.posture === "facedown" || p.target.posture === "crawling" },
            msg:"{nv:actor:pour:true} {param:substance} on to {nms:target:the} ass and back.",
            script:function(p) {
              p.actor.arousal += 3
              p.target.arousal += 2
              p.source.volume -= 5
              erotica.pourOn(w.Joanna, p.substance, "lowerback")
              erotica.pourOn(w.Joanna, p.substance, "upperback")
              erotica.pourOn(w.Joanna, p.substance, "buttock")
            },
          },
          {
            test:function(p) { return p.target.posture === "sitting" || p.target.posture === "kneeling"},
            msg:"{nv:actor:pour:true} {param:substance} on to {nms:target:the} lap.",
            script:function(p) {
              p.actor.arousal += 3
              p.target.arousal += 2
              p.source.volume -= 2
              erotica.pourOn(w.Joanna, p.substance, "thigh")
              erotica.pourOn(w.Joanna, p.substance, "groin")
              if (p.target.hasBodyPart("cock")) erotica.pourOn(w.Joanna, p.substance, "cock")
              if (p.target.hasBodyPart("pussy")) erotica.pourOn(w.Joanna, p.substance, "pussy")
            },
          },
          {
            test:function(p) { return p.actor.posture === "standing" || p.target.posture === "kneeling"},
            msg:"{nv:actor:pour:true} {param:substance} on to {nms:target:the} head.",
            script:function(p) {
              p.actor.arousal += 3
              p.target.arousal += 2
              p.source.volume -= 2
              erotica.pourOn(w.Joanna, p.substance, "head")
              erotica.pourOn(w.Joanna, p.substance, "mouth")
            },
          },
          {
            msg:"{nv:actor:pour:true} {param:substance} on to {nms:target:the} chest, letting it dribble down {ob:target}.",
            script:function(p) {
              p.actor.arousal += 3
              p.target.arousal += 2
              p.source.volume -= 3
              erotica.pourOn(w.Joanna, p.substance, "midriff")
              erotica.pourOn(w.Joanna, p.substance, "chest")
              erotica.pourOn(w.Joanna, p.substance, "groin")
              if (p.target.hasBodyPart("tit")) erotica.pourOn(w.Joanna, p.substance, "tit")
              if (p.target.hasBodyPart("cock")) erotica.pourOn(w.Joanna, p.substance, "cock")
              if (p.target.hasBodyPart("pussy")) erotica.pourOn(w.Joanna, p.substance, "pussy")
            },
          },
        ],

        msg:"{nv:actor:pour:true} {param:substance} on to {nm:target:the}.",
        script:function(p) {
          p.actor.arousal += p.target.getExposure() / 2
          p.target.arousal += p.target.getExposure() / 3
              erotica.pourOn(w.Joanna, "honey", "thighs")
        },
      },
      {
        name:"bodypart",
        responses:[
          {
            test:function(p) { return p.rating < 0 },
            msg:"{nv:actor:pour:true} {param:substance} on to {nm:target:the} 2.",
            script:function(p) {
              p.actor.arousal += p.target.getExposure() / 2
              p.target.arousal += p.target.getExposure() / 3
              erotica.pourOn(w.Joanna, "honey", "thighs")
            },
          },
          {
            msg:"{nv:actor:pour:true} {param:substance} on to {nm:target:the} 3.",
          },
        ],
      },
    ],
  },


  // POUR DOWN
  {
    name:"pour down",
    test:function(p) { return p.action === "pour down" },
    responses:[
      {
        name:"bodypart",
        responses:[
          {
            test:function(p) { return p.rating < 0 },
            msg:"{nv:actor:pour:true} {param:substance} down {nms:target:the} {nm:garment}.",
          },
          {
            msg:"{nv:actor:pour:true} {param:substance} down {nms:target:the} {nm:garment}.",
          },
        ],
      },
    ],
  },





  // REMOVE
  {
    name:"remove",
    test:function(p) { return p.action === "remove" },
    responses:[
      {
        name:"target tied up",
        test:function(p) { return !p.target.canManipulate() },
        script:function(p) {
          if (p.garment.ripOff) {
            p.garment.ripOff(p)
          }
          else {
            errormsg("No ripOff for " + p.garment.name)
            console.log(p.garment)
          }
          p.actor.arousal += p.target.getExposure() / 2
          p.target.arousal += p.target.getExposure() / 3
        },
      },
      {
        name:"target not tied up",
        responses:[
          {
            test:function(p) { return p.rating < 0 },
            msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to remove {pa:target} {nm:garment}. 'Keep your filthy hands to yourself, {param:target:insult:actor}!'",
            script:function(p) { p.target.modifyAttraction(p.actor, -25); p.actor.reputation += 10 },
            failed:true,
          },
          {
            test:function(p) { return p.rating < 30 },
            msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to remove {pa:target} {nm:garment}. 'Keep your filthy hands to yourself, {param:target:insult:actor}!'",
            failed:true,
          },
          {
            test:function(p) { return p.exposure < 0 },
            msg:"'Hey!' {vn:target:exclaim} as {nv:actor:try} to remove {pa:target} {nm:garment}. 'I'm not taking that off!'",
            failed:true,
          },

          {
            test:function(p) { return !!p.garment.pullsoff },
            script:function(p) {
              p.actor.msg(erotica.pullOffTexts[p.garment.pullsoff], p)
              p.garment.loc = p.actor.loc
              p.garment.worn = false
              p.actor.arousal += p.target.getExposure() / 3
              p.target.arousal += p.target.getExposure() / 3
            },
          },
          {
            msg:"{nv:actor:take:true} {nms:target:the} {nm:garment} off her.",
            script:function(p) {
              p.garment.loc = p.actor.loc
              p.garment.worn = false
              p.actor.arousal += p.target.getExposure() / 3
              p.target.arousal += p.target.getExposure() / 3
            },
          },
        ],
      },
    ],
  },
  {
    name:"default",
    msg:"THIS SHOULD NEVER HAPPEN: {param:action}",
  },
]


