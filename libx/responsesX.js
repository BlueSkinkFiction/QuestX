erotica.defaultResponses = [
  // GROPE
  {
    name:"grope",
    test:function(p) { return p.action === "grope" },
    responses:[    
      {
        name:"target tied up",
        test:function(p) { return !p.item.canUseHands() },
        responses:[    
          {
            name:"very unhappy",
            test:function(p) { return p.rating < 15 },
            responses:[    
              {
                name: "tit",
                test:function(p) { return p.bodypart.name === "tit" },
                msg:"'Please no!' {vn:item:exclaim} as {nv:char:squeeze} {pa2:item:char} tits.",
                script:function(p) { p.item.modifyAttraction(p.char, -15) },
              },
              {
                name: "pussy",
                test:function(p) { return p.bodypart.name === "pussy" },
                msg:"'Oh God no!' shrieks {nm:item:the} as {nv:char:finger} {pa2:item:char} {pussy:item}.",
                script:function(p) { p.item.modifyAttraction(p.char, -25) },
              },
              {
                name: "bollock",
                test:function(p) { return p.bodypart.name === "bollock" },
                msg:"'Hey no!' {vn:item:exclaim} as {nv:char:squeeze} {pa2:item:char} ball sack.",
                script:function(p) { p.item.modifyAttraction(p.char, -25) },
              },
              {
                name: "cock",
                test:function(p) { return p.bodypart.name === "cock" },
                msg:"'Hands off!' {vn:item:exclaim} as {nv:char:grip} {pa2:item:char} {cock:item}.",
                script:function(p) { p.item.modifyAttraction(p.char, -25) },
              },
              {
                name: "ass",
                test:function(p) { return p.bodypart.name === "ass" },
                msg:"'What are you..?' {vn:item:exclaim} as {nv:char:reach} up {pa2:item:char} ass.",
                script:function(p) { p.item.modifyAttraction(p.char, -20) },
              },
              {
                name: "other",
                msg:"'Please no!' {vn:item:exclaim} as {nv:char:run} {pa:char} hands over {pa2:item:char} {show:bpname}.",
                script:function(p) { p.item.modifyAttraction(p.char, -10) },
              },
            ],
          },
          {
            name:"happy",
            responses:[ 
              { 
                name: "tit",
                test:function(p) { return p.bodypart.name === "tit" },
                msg:"'Hmm!' sighs {nm:item:the} as {nv:char:squeeze} {pa2:item:char} tits.",
                script:function(p) { p.item.arousal += 5 },
              },
              { 
                name: "pussy",
                test:function(p) { return p.bodypart.name === "pussy" },
                msg:"'Oh God yes!' {vn:item:exclaim} as {nv:char:finger} {pa2:item:char} {pussy:item}.",
                script:function(p) { p.item.arousal += 10 },
              },
              { 
                name: "bollock",
                test:function(p) { return p.bodypart.name === "bollock" },
                msg:"'Oh God yes!' {vn:item:exclaim} as {nv:char:squeeze} {pa2:item:char} ball sack.",
                script:function(p) { p.item.arousal += 7 },
              },
              { 
                name: "cock",
                test:function(p) { return p.bodypart.name === "cock" },
                msg:"'Keep going, keep going!' says {nm:item:the} as {nv:char:grip} {pa2:item:char} {cock:item}.",
                script:function(p) { p.item.arousal += 10 },
              },
              { 
                name: "ass",
                test:function(p) { return p.bodypart.name === "ass" },
                msg:"'Oh yes,' {vn:item:exclaim} as {nv:char:reach} up {pa2:item:char} ass.",
                script:function(p) { p.item.arousal += 7  },
              },
              { 
                name: "other",
                msg:"{nv:item:smile:the:true} as {nv:char:run} {pa:char} hands over {pa2:item:char} {show:bpname}.",
                script:function(p) { p.item.arousal += 2  },
              },
            ],
          },
        ],
      },

      {
        name:"target not tied up",
        responses:[
          {
            name:"char is item",
            test:function(p) { return p.char === p.item },
            responses:[    
              {
                name:"covered",
                test:function(p) { return !!p.garment },
                responses:[    
                  {
                    name: "not happy",
                    test:function(p) { return p.rating < -15 },
                    msg:"{nv:char:grimace:true} as {sb:char} reluctantly {cj:char:stroke} {pa:char} {show:bpadj} {show:bpname} through {pa:item} {nm:garment}.",
                    script:function(p) { p.item.modifyAttraction(p.boss, -15) },
                  },
                  {
                    name: "happy",
                    msg:"{nv:char:smile:true} as {sb:char} eagerly {cj:char:stroke} {pa:char} {show:bpadj} {show:bpname} through {pa:item} {nm:garment}.",
                    script:function(p) { p.item.modifyAttraction(p.boss, -15) },
                  },
                ],
              },
              {
                name:"uncovered",
                responses:[    
                  {
                    name: "not happy",
                    test:function(p) { return p.rating < -15 },
                    msg:"{nv:char:grimace:true} as {sb:char} reluctantly {cj:char:stroke} {pa:char} {show:bpadj} {show:bpname}.",
                    script:function(p) { p.item.modifyAttraction(p.boss, -15) },
                  },
                  {
                    name: "happy",
                    msg:"{nv:char:smile:true} as {sb:char} eagerly {cj:char:stroke} {pa:char} {show:bpadj} {show:bpname}.",
                    script:function(p) { p.item.modifyAttraction(p.boss, -15) },
                  },
                ],
              },
            ],
          },
          {
            name:"char is not item",
            responses:[    
              {
                name:"very unhappy",
                test:function(p) { return p.rating < -15 },
                msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to grope {pa:item} {show:bpname}. 'Keep your filthy hands to yourself, {insult:item:char}!'",
                script:function(p) { p.item.modifyAttraction(p.char, -25); p.char.reputation += 10 },
                failed:true,
              },
              {
                name:'unhappy',
                test:function(p) { return p.rating < 15 },
                msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to grope {pa:item} {show:bpname}. 'Keep your hands to yourself!'",
                script:function(p) { p.item.modifyAttraction(p.char, -5); p.char.reputation += 2 },
                failed:true,
              },
              {
                name:'unsure',
                test:function(p) { return p.rating < 40 },
                msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to grope {pa:item} {show:bpname}. '{show:item:exclaimCheeky}'",
                script:function(p) { p.item.modifyAttraction(p.char, -5) },
                failed:true,
              },
              {
                name:"happy",
                responses:[
                  {
                    name:'covered',
                    test:function(p) { return p.garment },
                    msg:"{nv:char:spend:true} a few minutes running {pa:char} fingers over {nms:item} {show:bpname}, through {pa:item} {nm:garment}.",
                    script:function(p) { p.item.modifyAttraction(p.char, 10) },
                  },
                  {
                    name:'uncovered',
                    msg:"{nv:item:smile:true} as {nv:char:stroke} {pa:item} {show:bpadj} {show:bpname}.",
                    script:function(p) { p.item.modifyAttraction(p.char, 10) },
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
        test:function(p) { return !p.item.canUseHands() },
        responses:[    
          {
            name:"unhappy",
            test:function(p) { return p.rating < 15 },
            responses:[
              {
                name:'tit',
                test:function(p) { return p.bodypart.name === "tit" },
                msg:"'Please no!' {nv:item:exclaims} as {nv:char:nibble} on {pa:item} nipple.",
                script:function(p) { p.item.modifyAttraction(p.char, -5); p.item.arousal += 2, p.char.arousal += 6 },
              },
              {
                name:"cock",
                test:function(p) { return p.bodypart.name === "cock" },
                responses:[
                  {
                    name:"flacid",
                    test:function(p) { return p.item.arousal < 20},
                    msg:"'Hey, what the fuck?' {nv:item:exclaims} as {nv:char:suck} on {pa:item} {cock:item}. It is starting to get harder!",
                    script:function(p) { p.item.modifyAttraction(p.char, -5); p.item.arousal += 6, p.char.arousal += 3 },
                  },
                  {
                    name:"semi",
                    test:function(p) { return p.item.arousal < 50},
                    msg:"'Stop!' {nv:item:begs} even as {pa:item} reluctant cock becomes erect.",
                    script:function(p) { p.item.arousal += 7, p.char.arousal += 6 },
                  },
                  {
                    name:"hard",
                    test:function(p) { return p.item.arousal < 90},
                    msg:"'Please no,' {nv:item:gasp}, unable to stop {nm:char:the} sucking on {pa:item} {cock:item}.",
                    script:function(p) { p.item.arousal += 8, p.char.arousal += 6 },
                  },
                  {
                    name:"coming",
                    msg:"'No!' {nv:item:gasp} as {pv:item:come} in {nms:char:the} mouth.",
                    script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal = 10, p.char.arousal += 12 },
                  },
                ],
              },
              {
                name:"not tit or cock!!!",
                msg:"SHOULD not HAPPEN!",
              },
            ],
          },
          {
            name:"happy",
            responses:[
              {
                name:'tit',
                test:function(p) { return p.bodypart.name === "tit" },
                msg:"'Hmm!' {nv:item:sigh} as {nv:char:suck} on {pa:item} nipple.",
                script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 6, p.char.arousal += 4 },
              },
              {
                name:"cock",
                test:function(p) { return p.bodypart.name === "cock" },
                responses:[
                  {
                    name:"flacid",
                    test:function(p) { return p.item.arousal < 20},
                    msg:"'Hmm!' {nv:item:sigh} as {nv:char:suck} on {pa:item} {cock:item}. It is starting to get harder!",
                    script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 10, p.char.arousal += 3 },
                  },
                  {
                    name:"semi",
                    test:function(p) { return p.item.arousal < 50},
                    msg:"'Keep going,' {nv:item:gasp} as {nv:char:suck} on {pa:item} {cock:item}.",
                    script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 10, p.char.arousal += 6 },
                  },
                  {
                    name:"hard",
                    test:function(p) { return p.item.arousal < 75},
                    msg:"{nv:item:grin:true} as {nv:char:suck} on {pa:item} {cock:item}.",
                    script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 11, p.char.arousal += 6 },
                  },
                  {
                    name:"very hard",
                    test:function(p) { return p.item.arousal < 90},
                    msg:"'Yes! Yes!' {nv:item:murmur} as {nv:char:suck} on {pa:item} cock. {nv:char:can} taste pre-cum.",
                    script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 13, p.char.arousal += 6 },
                  },
                  {
                    name:"coming",
                    msg:"{nv:item:gasp:true} as {pv:item:come} in {nms:char:the} mouth.",
                    script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal = 10, p.char.arousal += 12 },
                  },
                ],
              },
              {
                name:"not tit or cock!!!",
                msg:"SHOULD not HAPPEN!",
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
            msg:"'Hey!' {nv:item:exclaim} as {nv:char:try} to suck {pa:item} {show:bpname}. 'What the fuck are you doing, {random:jerk:creep:wanker}?'",
            script:function(p) { p.item.modifyAttraction(p.char, -25); p.char.reputation += 10 },
            failed:true,
          },
          {
            name:"unhappy",
            test:function(p) { return p.rating < 15 },
            msg:"'Hey!' {nv:item:exclaim} as {nv:char:try} to suck {pa:item} {show:bpname}. '{show:item:exclaimDisgust} Get off!'",
            script:function(p) { p.item.modifyAttraction(p.char, -10); p.char.reputation += 2 },
            failed:true,
          },
          {
            name:"happy",
            responses:[
              {
                name:'tit',
                test:function(p) { return p.bodypart.name === "tit" },
                msg:"'Hmm!' {nv:item:sigh} as {nv:char:suck} on {pa:item} nipple.",
                script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 6, p.char.arousal += 4 },
              },
              {
                name:"cock",
                test:function(p) { return p.bodypart.name === "cock" },
                responses:[
                  {
                    name:"flacid",
                    test:function(p) { return p.item.arousal < 20},
                    msg:"'Hmm!' {nv:item:sigh} as {nv:char:suck} on {pa:item} {cock:item}. It is starting to get harder!",
                    script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 10, p.char.arousal += 3 },
                  },
                  {
                    name:"semi",
                    test:function(p) { return p.item.arousal < 50},
                    msg:"'Keep going,' {nv:item:gasp} as {nv:char:suck} on {pa:item} {cock:item}.",
                    script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 10, p.char.arousal += 6 },
                  },
                  {
                    name:"hard",
                    test:function(p) { return p.item.arousal < 75},
                    msg:"{nv:item:grin:true} as {nv:char:suck} on {pa:item} {cock:item}.",
                    script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 11, p.char.arousal += 6 },
                  },
                  {
                    name:"very hard",
                    test:function(p) { return p.item.arousal < 90},
                    msg:"'Yes! Yes!' {nv:item:murmur} as {nv:char:suck} on {pa:item} cock. {nv:char:can} taste pre-cum.",
                    script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 13, p.char.arousal += 6 },
                  },
                  {
                    name:"coming",
                    msg:"{nv:item:gasp:true} as {pv:item:come} in {nms:char:the} mouth.",
                    script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal = 10, p.char.arousal += 12 },
                  },
                ],
              },
              {
                name:"not tit or cock!!!",
                msg:"SHOULD not HAPPEN!",
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
        test:function(p) { return !p.item.canUseHands() },
        responses:[
          {
            test:function(p) { return p.rating < 15 && p.bodypart.name === "mouth" },
            msg:"{nv:item:try:true} to look away as {nv:char:kiss} {sb:item} on the mouth, but cannot prevent their lips connecting. 'Ew,' {pv:item:exclaim} in disgust.",
            script:function(p) { p.item.modifyAttraction(p.char, -25) },
          },
          {
            test:function(p) { return p.rating < 15 && p.bodypart.name === "pussy" },
            msg:"'No!' {nv:item:exclaim} in disgust as {nv:char:kiss} {pa:item} pussy.",
            script:function(p) { p.item.modifyAttraction(p.char, -25) },
          },
          {
            test:function(p) { return p.rating < -15 },
            msg:"'Hey!' {vn:item:exclaim} as {nv:char:kiss} {pa:item} {show:bpname}. 'Get off me!'",
            script:function(p) { p.item.modifyAttraction(p.char, -15) },
          },
          {
            test:function(p) { return p.rating < 15 },
            msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to kiss {pa:item} {show:bpname}. 'Please don't do that!'",
          },
          {
            test:function(p) { return p.bodypart.name === "pussy" },
            msg:"'Oh, yes!' {nv:item:sign} as {nv:char:kiss} {pa:item} pussy.",
            script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 1, p.char.arousal += 2 },
          },
          {
            test:function(p) { return p.bodypart.name === "cock" },
            msg:"'Hmm!' {vn:item:exclaim} as {nv:char:kiss} the tip of {pa:item} {cock:item}.",
            script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 1, p.char.arousal += 2 },
          },
          {
            msg:"'Hmm!' {vn:item:exclaim} as {nv:char:kiss} {pa:item} {show:bpname}.",
            script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 1, p.char.arousal += 2 },
          },
        ],
      },
      {
        name:"target not tied up",
        responses:[
          {
            test:function(p) { return p.rating < -15 },
            msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to kiss {pa:item} {show:bpname}. 'Get off me, {random:jerk:creep:wanker}!'",
            script:function(p) { p.item.modifyAttraction(p.char, -15); p.char.reputation += 5 },
            failed:true,
          },
          {
            test:function(p) { return p.rating < 15 },
            msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to kiss {pa:item} {show:bpname}. 'Please {i:don't} do that!'",
            script:function(p) { p.char.reputation += 1 },
            failed:true,
          },
          {
            test:function(p) { return p.bodypart.name === "mouth" },
            msg:"{nv:char:cup:true} {pa:item:the} face, and kisses {sb:item} firmly on the mouth.",
            script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 1, p.char.arousal += 2 },
          },
          {
            test:function(p) { return p.bodypart.name === "pussy" },
            msg:"'Oh, yes!' {nv:item:sign} as {nv:char:kiss} {pa:item} pussy.",
            script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 1, p.char.arousal += 2 },
          },
          {
            test:function(p) { return p.bodypart.name === "cock" },
            msg:"'Hmm!' {vn:item:exclaim} as {nv:char:kiss} the tip of {pa:item} {cock:item}.",
            script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 1, p.char.arousal += 2 },
          },
          {
            msg:"'Hmm!' {vn:item:exclaim} as {nv:char:kiss} {pa:item} {show:bpname}.",
            script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 1, p.char.arousal += 2 },
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
        msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to tickle {pa:item} {show:bpname}. 'Get off me, {random:jerk:creep:wanker}!'",
        script:function(p) { p.item.modifyAttraction(p.char, -15); p.char.reputation += 5 },
        failed:true,
      },
      {
        test:function(p) { return p.rating < 15 },
        msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to tickle {pa:item} {show:bpname}. 'Please {i:don't} do that!'",
        script:function(p) { p.char.reputation += 1 },
        failed:true,
      },
      {
        msg:"'Hmm!' {vn:item:exclaim} as {nv:char:tickle} {pa:item} {show:bpname}.",
        script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 1, p.char.arousal += 2 },
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
        msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to massage {pa:item} {show:bpname}. 'Get off me, {random:jerk:creep:wanker}!'",
        script:function(p) { p.item.modifyAttraction(p.char, -15); p.char.reputation += 5 },
        failed:true,
      },
      {
        test:function(p) { return p.rating < 15 },
        msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to massage {pa:item} {show:bpname}. 'Please {i:don't} do that!'",
        script:function(p) { p.char.reputation += 1 },
        failed:true,
      },
      {
        msg:"'Hmm!' {vn:item:exclaim} as {nv:char:massage} {pa:item} {show:bpname}.",
        script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 1, p.char.arousal += 2 },
      },
    ],
  },

  // Snog
  // Requires some work
  {
    name:"snog",
    test:function(p) { return p.action === "snog" },
    responses:[    
      {
        test:function(p) { return p.rating < -15 },
        msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to make out with {sb:item}. 'Get off me, {random:jerk:creep:wanker}!'",
        script:function(p) { p.item.modifyAttraction(p.char, -15); p.char.reputation += 5 },
        failed:true,
      },
      {
        test:function(p) { return p.rating < 15 },
        msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to  make out with {sb:item}. 'Please {i:don't} do that!'",
        script:function(p) { p.char.reputation += 1 },
        failed:true,
      },
      {
        msg:"'Hmm!' {vn:item:exclaim} as {nv:char:make} out with {sb:item}.",
        script:function(p) { p.item.modifyAttraction(p.char, 5); p.item.arousal += 1, p.char.arousal += 2 },
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
        msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to smack {pa:item} {show:bpname}. 'Keep your filthy hands to yourself, {insult:item:char}!'",
        script:function(p) { p.item.modifyAttraction(p.char, -25); p.char.reputation += 10 },
        failed:true,
      },
      {
        test:function(p) { return p.rating < 15 },
        msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to smack {pa:item} {show:bpname}. 'Keep your hands to yourself!'",
        script:function(p) { p.item.modifyAttraction(p.char, -5); p.char.reputation += 2 },
        failed:true,
      },
      {
        test:function(p) { return p.rating < 40 },
        msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to smack {pa:item} {show:bpname}. '{show:item:exclaimCheeky}'",
        script:function(p) { p.item.modifyAttraction(p.char, -5) },
        failed:true,
      },
      {
        test:function(p) { return p.garment },
        msg:"{nv:char:smack:true} {nms:item} {show:bpname}, through {pa:item} {nm:garment}.",
        script:function(p) { p.item.modifyAttraction(p.char, 10); p.item.arousal += 1, p.char.arousal += 2 },
      },
      {
        msg:"{nv:item:gasp:true} as {nv:char:smack} {pa:item} {show:bpadj} {show:bpname}.",
        script:function(p) { p.item.modifyAttraction(p.char, 10); p.item.arousal += 1, p.char.arousal += 2 },
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
        msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to lick {pa:item} {show:bpname}. 'Keep your filthy hands to yourself, {insult:item:char}!'",
        script:function(p) { p.item.modifyAttraction(p.char, -25); p.char.reputation += 10 },
        failed:true,
      },
      {
        name:'unhappy',
        test:function(p) { return p.rating < 15 },
        msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to lick {pa:item} {show:bpname}. 'Keep your hands to yourself!'",
        script:function(p) { p.item.modifyAttraction(p.char, -5); p.char.reputation += 2 },
        failed:true,
      },
      {
        name:'unsure',
        test:function(p) { return p.rating < 40 },
        msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to lick {pa:item} {show:bpname}. '{show:item:exclaimCheeky}'",
        script:function(p) { p.item.modifyAttraction(p.char, -5) },
        failed:true,
      },
      {
        name:"happy",
        responses:[
          {
            test:function(p) { return p.bodypart.name === "tit" },
            msg:"'Hmm!' sighs {nm:item:the} as {nv:char:lick} {pa2:item:char} tits.",
            script:function(p) { p.item.modifyAttraction(p.char, 10); p.item.arousal += 5, p.char.arousal += 3 },
          },
          {
            test:function(p) { return p.bodypart.name === "pussy" },
            msg:"'Oh God yes!' {vn:item:exclaim} as {nv:char:lick} {pa2:item:char} {pussy:item}.",
            script:function(p) { p.item.modifyAttraction(p.char, 10); p.item.arousal += 8, p.char.arousal += 3 },
          },
          {
            test:function(p) { return p.bodypart.name === "bollock" },
            msg:"'Oh God yes!' {vn:item:exclaim} as {nv:char:lick} {pa2:item:char} ball sack.",
            script:function(p) { p.item.modifyAttraction(p.char, 10); p.item.arousal += 5, p.char.arousal += 3 },
          },
          {
            test:function(p) { return p.bodypart.name === "cock" },
            msg:"'Keep going, keep going!' says {nm:item:the} as {nv:char:lick} {pa2:item:char} {cock:item}.",
            script:function(p) { p.item.modifyAttraction(p.char, 10); p.item.arousal += 8, p.char.arousal += 4 },
          },
          {
            test:function(p) { return p.bodypart.name === "ass" },
            msg:"'Oh yes,' {vn:item:exclaim} as {nv:char:push} {pa:char} tongue up {pa2:item:char} ass.",
            script:function(p) { p.item.modifyAttraction(p.char, 10); p.item.arousal += 2, p.char.arousal += 4 },
          },
          {
            msg:"{nv:item:smile:the:true} as {nv:char:lick} {pa2:item:char} {show:bpname}.",
            script:function(p) { p.item.modifyAttraction(p.char, 10); p.item.arousal += 3, p.char.arousal += 3 },
          },
        ],
      },
    ],
  },

  // COME OVER
  {
    name:"come_over",
    assumptions:"Already checked char has a cock and has nothing over his crotch and the destination is achievable",
    test:function(p) { return p.action === "come_over" },
    responses:[    
      {
        test:function(p) { return p.char.arousal < 20 },
        msg:"{nv:char:squeeze:true} {pa:char} limp willy, trying to coax life in it, as {pv:char:aim} it vaguely at {nm:item:the}.",
        script:function(p) { },
      },
      {
        test:function(p) { return p.char.arousal < 75 },
        msg:"{nv:char:caress:true} {pa:char} cock, making it harder and harder, as {pv:char:aim} it at {nms:item:the} {show:bpname}.",
        script:function(p) { },
      },
      {
        test:function(p) { return p.char.arousal < 90 },
        msg:"Pre-cum drips from {nms:char:the} cock, as {pv:char:squeeze} it furiously, pointing it at {nms:item:the} {show:bpname}.",
        script:function(p) { },
      },

      {
        test:function(p) { return !!p.garment },
        msg:"One more squeeze and {nms:char:the} cock is shooting its load over {nms:item:the} bare {show:bpname}.",
        script:function(p) { erotica.ejaculate(p.char, p.item, p.bpname) },
      },

      {
        msg:"One more squeeze and {nms:char:the} cock is shooting its load over {nms:item:the} {nm:garment}.",
        script:function(p) { erotica.ejaculate(p.char, p.garment, p.bpname) },
      },
    ],
  },

  // FRIG
  {
    name:"frig",
    assumptions:"Already checked item has a pussy and has nothing over her crotch",
    test:function(p) { return p.action === "frig" },
    responses:[
      {
        name:"target tied up",
        test:function(p) { return !p.item.canUseHands() },
        responses:[
          {
            name:"char is item",
            test:function(p) { return p.char === p.item },
            msg:"{nv:char:want:true} to finger her pussy, but cannot whilst tied up.",
            script:function(p) { p.char.arousal += 2 },
            failed:true,
          },
          {
            test:function(p) { return p.rating < 25 },
            msg:"{nv:char:slip:true} {pa:char} finger into {pa2:item:char} {pussy:item}. 'Please, no!' {pv:item:exclaim}, unable to stop {sb:char} as {pv:char:go} deeper into {pa:item} sex.",
            script:function(p) { p.char.arousal += 8; p.item.arousal += 2 },
          },
          {
            msg:"{nv:char:slip:true} {pa:char} finger into {pa2:item:char} {pussy:item}. 'Oh yes' {pv:item:gasp}, unable in any case to stop {sb:char} as {pv:char:go} deeper into {pa:item} sex.",
            script:function(p) { p.char.arousal += 5; p.item.arousal += 12 },
          },
        ],
      },
      {
        name:"target not tied up",
        responses:[
          {
            name:"item is char",
            test:function(p) { return p.item === p.char },
            responses:[
              {
                test:function(p) { return p.char.arousal < 20 },
                msg:"{nv:char:slip:true} {pa:char} hand between {pa:char} legs, and {cj:char:ease} a finger into {pa:char} pussy, quietly pleasuring {rf:char}.",
                script:function(p) { p.char.arousal += 7 },
              },
              {
                test:function(p) { return p.char.arousal < 40 },
                msg:"{nv:char:stick:true} three fingers into {pa:char} pussy; it feels so good!",
                script:function(p) { p.char.arousal += 9 },
              },
              {
                test:function(p) { return p.char.arousal < 60 },
                msg:"{nv:char:spend:true} a few minutes rubbing {pa:char} hot clit.",
                script:function(p) { p.char.arousal += 10 },
              },
              {
                test:function(p) { return p.char.arousal < 80 },
                msg:"{nv:char:whimper:true} quietly as {pv:char:continue} to finger {pa:char} hot, damp sex.",
                script:function(p) { p.char.arousal += 11 },
              },
              {
                msg:"{nv:char:sigh:true} contentedly as {pv:char:continue} work {rf:char} to orgasm.",
                script:function(p) { p.char.arousal += 11 },
              },
            ],
          },
          {
            name:"item is not char",
            responses:[
              {
                test:function(p) { return p.rating < 0 },
                msg:"{nv:char:reach:true} {pa:char} finger to {pa2:item:char} crotch. 'Hands off!' {pv:item:exclaim}, giving {nm:char} a hard slap.",
                script:function(p) { p.char.reputation += 20 },
                failed:true,
              },
              {
                test:function(p) { return p.rating < 25 },
                msg:"{nv:char:reach:true} {pa:char} finger to {pa2:item:char} crotch. 'Hands off!' {pv:item:exclaim}.",
                script:function(p) { p.char.reputation += 10 },
                failed:true,
              },
              {
                test:function(p) { return p.rating < 50 },
                msg:"{nv:char:reach:true} {pa:char} finger to {pa2:item:char} crotch. 'Hey!' {pv:item:giggle}, 'hands to yourself, naughty.'",
                script:function(p) { },
              },
              {
                test:function(p) { return p.char.arousal < 75 },
                msg:"{nv:char:slip:true} {pa:char} finger into {pa2:item:char} {pussy:item}, making her giggle.",
                script:function(p) { p.char.arousal += 5; p.item.arousal += 6 },
              },
              {
                test:function(p) { return p.char.arousal < 90 },
                msg:"{nv:char:slip:true} {pa:char} finger into {pa2:item:char} {pussy:item}, making her gasp.",
                script:function(p) { p.char.arousal += 5; p.item.arousal += 9 },
              },
              {
                msg:"{nv:char:slip:true} {pa:char} finger into {pa2:item:char} {pussy:item}, making her come.",
                script:function(p) { p.char.arousal += 5; p.item.arousal += 12 },
              },
            ],
          },
        ],
      },
    ],
  },

  // WANK
  // Already checked item has a cock and has nothing over his crotch
  {
    name:"wank",
    test:function(p) { return p.action === "wank" },
    responses:[
      {
        name:"target tied up",
        test:function(p) { return !p.item.canUseHands() },
        responses:[
          {
            test:function(p) { return p.item === p.char },
            msg:"{nv:char:want:true} to jerk off, but cannot whilst tied up.",
            script:function(p) { p.char.arousal += 2 },
            failed:true,
          },
          {
            test:function(p) { return p.arousal > 90 },
            msg:"{nv:char:jerk} {nm:item} off for a few moments, then suddenly, {pv:item:shoot} {pa:char} load.",
            script:function(p) { p.char.arousal += 12; p.item.arousal = 2 },
          },
          {
            test:function(p) { return p.rating < 25 },
            msg:"{nv:char:put:true} a hand on {nms:item:the} cock. 'Hey, no!' {pv:item:exclaim}, unable to stop {sb:char} as {pv:char:jerk} {sb:item} off.",
            script:function(p) { p.char.arousal += 8; p.item.arousal += 2 },
          },
          {
            msg:"{nv:char:put:true} a hand on {nms:item:the} cock, and jerks {sb:item} off.",
            script:function(p) { p.char.arousal += 5; p.item.arousal += 12 },
          },
        ],
      },
      {
        name:"target not tied up",
        responses:[
          {
            name:"item is char",
            test:function(p) { return p.item === p.char },
            responses:[
              {
                test:function(p) { return p.char.arousal < 20 },
                msg:"{nv:char:put:true} {pa:char} hand on {pa:char} limp cock, and slowly kneads some life into it.",
                script:function(p) { p.char.arousal += 7 },
              },
              {
                test:function(p) { return p.char.arousal < 40 },
                msg:"{nv:char:squeeze:true} and {cj:char:pull} on {pa:char} cock",
                script:function(p) { p.char.arousal += 9 },
              },
              {
                test:function(p) { return p.char.arousal < 60 },
                msg:"{nv:char:squeeze:true} and {cj:char:pull} on {pa:char} cock, making it even harder",
                script:function(p) { p.char.arousal += 10 },
              },
              {
                test:function(p) { return p.char.arousal < 80 },
                msg:"{nv:char:pant:true} as {pv:char:jerk} {rf:char} off.",
                script:function(p) { p.char.arousal += 11 },
              },
              {
                msg:"A few more tugs, and {nv:char:gasp} as {pv:ejaculate}.",
                script:function(p) { p.char.arousal = 0 },
              },
            ],
          },
          {
            name:"item is not char",
            responses:[
              {
                test:function(p) { return p.rating < 0 },
                msg:"{nv:char:put:true} a hand on {nms:item:the} cock. 'Hey, no!' {pv:item:exclaim}.",
                script:function(p) { p.char.arousal += 8; p.item.arousal += 2 },
                failed:true,
              },
              {
                test:function(p) { return p.rating < 25 },
                msg:"{nv:char:put:true} a hand on {nms:item:the} cock. 'Hey, no!' {pv:item:exclaim}.",
                script:function(p) { p.char.reputation += 10 },
                failed:true,
              },
              {
                test:function(p) { return p.rating < 80 },
                msg:"{nv:char:put:true} a hand on {nms:item:the} cock. 'Hey, yes!' {pv:item:exclaim}, as {nv:char:jerk} {sb:item} off.",
                script:function(p) { p.char.arousal += 5; p.item.arousal += 10 },
              },
              {
                test:function(p) { return p.char.arousal < 90 },
                msg:"{nv:char:keep:true} jerking off {nm:item:the}; pre-cum starts to drip from the end of {pa:item} cock.",
                script:function(p) { p.char.arousal += 10; p.item.arousal += 15 },
              },
              {
                msg:"{nv:char:jerk} {nm:item} off for a few moments, then suddenly, {pv:item:shoot} {pa:char} load.",
                script:function(p) { p.char.arousal += 10; p.item.arousal = 2 },
              },
            ],
          },
        ],
      },
    ],
  },

  // GIRL ON TOP
  // Already checked item has a cock and char has pussy and both exposed
  // needs work
  {
    name:"girl_top",
    test:function(p) { return p.action === "girl_top" },
    responses:[    
      {
        test:function(p) { return p.item.restraint && !p.item.restraint.canUseHands && p.item === p.char },
        msg:"{nv:char:want:true} to jerk off, but cannot whilst tied up.",
        script:function(p) { p.char.arousal += 2 },
        failed:true,
      },
      {
        msg:"{nv:char:bounce:true} up and down on {nms:item:the} cock for a few minutes.",
        script:function(p) { p.char.arousal += 2 },
      },
    ],
  },
  
  // FUCK
  // Already checked item has a cock and char has pussy and both exposed
  {
    name:"fuck",
    test:function(p) { return p.action === "fuck" },
    responses:[    
      {
        msg:"{nv:char:fuck:true} {nm:item:the}.",
        script:function(p) { p.char.arousal += 2 },
      },
    ],
  },

  // FUCK WITH DILDO
  // TODO !!!
  {
    name:"fuck with dildo",
    assumptions:"Already checked item has a cock and char has dildo and both exposed",
    test:function(p) { return p.action === "fuck with dildo" },
    responses:[
      {
        name:"target tied up",
        test:function(p) { return !p.item.canUseHands() },
        responses:[
          {
            test:function(p) { return p.item === p.char },
            msg:"{nv:char:want:true} to fuck {rf:char} with the {nm:sextoy}, but cannot whilst tied up.",
            script:function(p) { p.char.arousal += 2 },
            failed:true,
          },
          {
            name:"pussy",
            test:function(p) { return p.bodypart.name === 'pussy' }, // is this right?
            responses:[
              {
                msg:"{nv:item:squeal:true} as {nv:char:thrust} the {nm:sextoy} into {nms:item:the} {nm:bodypart}.",
                script:function(p) { p.char.arousal += 8; p.item.arousal += 2 },
              },
            ],
          },
          {
            name:"ass, enjoys",
            test:function(p) { return p.item.enjoysAnal },
            responses:[
              {
                msg:"{nv:item:squeal:true} as {nv:char:ease} the {nm:sextoy} into {nms:item:the} {nm:bodypart}.",
                script:function(p) { p.char.arousal += 8; p.item.arousal += 2 },
              },
            ],
          },
          {
            name:"ass, does not enjoy",
            responses:[
              {
                msg:"{nv:item:squeal:true} as {nv:char:thrust} the {nm:sextoy} into {nms:item:the} {nm:bodypart}.",
                script:function(p) { p.char.arousal += 8; p.item.arousal += 2 },
              },
            ],
          },
        ],
      },
      {
        name:"target not tied up",
        responses:[
          {
            name:"item is char",
            test:function(p) { return p.item === p.char },
            responses:[
              {
                test:function(p) { return p.char.arousal < 20 },
                msg:"{nv:char:put:true} {pa:char} hand on {pa:char} limp cock, and slowly kneads some life into it.",
                script:function(p) { p.char.arousal += 7 },
              },
              {
                test:function(p) { return p.char.arousal < 40 },
                msg:"{nv:char:squeeze:true} and {cj:char:pull} on {pa:char} cock",
                script:function(p) { p.char.arousal += 9 },
              },
              {
                test:function(p) { return p.char.arousal < 60 },
                msg:"{nv:char:squeeze:true} and {cj:char:pull} on {pa:char} cock, making it even harder",
                script:function(p) { p.char.arousal += 10 },
              },
              {
                test:function(p) { return p.char.arousal < 80 },
                msg:"{nv:char:pant:true} as {pv:char:jerk} {rf:char} off.",
                script:function(p) { p.char.arousal += 11 },
              },
              {
                msg:"A few more tugs, and {nv:char:gasp} as {pv:ejaculate}.",
                script:function(p) { p.char.arousal = 0 },
              },
            ],
          },
          {
            name:"item is not char",
            responses:[
              {
                test:function(p) { return p.rating < 0 },
                msg:"{nv:char:put:true} a hand on {nms:item:the} cock. 'Hey, no!' {pv:item:exclaim}.",
                script:function(p) { p.char.arousal += 8; p.item.arousal += 2 },
                failed:true,
              },
              {
                test:function(p) { return p.rating < 25 },
                msg:"{nv:char:put:true} a hand on {nms:item:the} cock. 'Hey, no!' {pv:item:exclaim}.",
                script:function(p) { p.char.reputation += 10 },
                failed:true,
              },
              {
                test:function(p) { return p.rating < 80 },
                msg:"{nv:char:put:true} a hand on {nms:item:the} cock. 'Hey, yes!' {pv:item:exclaim}, as {nv:char:jerk} {sb:item} off.",
                script:function(p) { p.char.arousal += 5; p.item.arousal += 10 },
              },
              {
                test:function(p) { return p.char.arousal < 90 },
                msg:"{nv:char:keep:true} jerking off {nm:item:the}; pre-cum starts to drip from the end of {pa:item} cock.",
                script:function(p) { p.char.arousal += 10; p.item.arousal += 15 },
              },
              {
                msg:"{nv:char:jerk} {nm:item} off for a few moments, then suddenly, {pv:item:shoot} {pa:item} load.",
                script:function(p) { p.char.arousal += 10; p.item.arousal = 2 },
              },
            ],
          },
        ],
      },
    ],
  },


  // COMPLIMENT
  {
    name:"compliment",
    test:function(p) { return p.action === "compliment" },
    responses:[
      {
        name:"face",
        test:function(p) { return p.bodypart.name === "face" },
        responses:[
          {
            test:function(p) { return p.item.hasBodyPart("cock") },
            script:function(p) {
              p.char.msg("'You look great,' {nv:char:say}.", p)
              p.char.msg("'Thanks,' {nv:item:say}.", p)
              p.item.modifyAttraction(p.char, 10)
            },
          },
          {
            script:function(p) {
              p.char.msg("'You're beautiful,' {nv:char:say}.", p)
              p.char.msg("'Thanks,' {nv:item:say}.", p)
              p.item.modifyAttraction(p.char, 10)
            },
          },
        ],
      },
      {
        name:"unwanted",
        test:function(p) { return p.item.arousal + p.rating < 30 },
        responses:[
          {
            script:function(p) {
              p.char.msg("'Nice {nm:bodypart},' {nv:char:say}.", p)
              p.char.msg("'Fuck off,' {nv:item:say}.", p)
              p.item.modifyAttraction(p.char, -10)
            },
          },
        ],
      },
      {
        name:"wanted",
        responses:[
          {
            script:function(p) {
              p.char.msg("'Nice {nm:bodypart},' {nv:char:say}.", p)
              p.char.msg("'Thanks,' {nv:item:say}.", p)
              p.item.modifyAttraction(p.char, 10)
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
            test:function(p) { return p.item.posture === "reclining" },
            msg:"{nv:char:pour:true} {show:substance} on to {nms:item:the} chest and abdomen.",
            script:function(p) {
              p.char.arousal += 3
              p.item.arousal += 2
              p.source.volume -= 5
              erotica.pourOn(p.item, p.substance, "midriff")
              erotica.pourOn(p.item, p.substance, "chest")
              erotica.pourOn(p.item, p.substance, "groin")
              if (p.item.hasBodyPart("tit")) erotica.pourOn(p.item, p.substance, "tit")
              if (p.item.hasBodyPart("cock")) erotica.pourOn(p.item, p.substance, "cock")
              if (p.item.hasBodyPart("pussy")) erotica.pourOn(p.item, p.substance, "pussy")
            },
          },
          {
            test:function(p) { return p.item.posture === "facedown" || p.item.posture === "crawling" },
            msg:"{nv:char:pour:true} {show:substance} on to {nms:item:the} ass and back.",
            script:function(p) {
              p.char.arousal += 3
              p.item.arousal += 2
              p.source.volume -= 5
              erotica.pourOn(p.item, p.substance, "lowerback")
              erotica.pourOn(p.item, p.substance, "upperback")
              erotica.pourOn(p.item, p.substance, "buttock")
            },
          },
          {
            test:function(p) { return p.item.posture === "sitting" || p.item.posture === "kneeling"},
            msg:"{nv:char:pour:true} {show:substance} on to {nms:item:the} lap.",
            script:function(p) {
              p.char.arousal += 3
              p.item.arousal += 2
              p.source.volume -= 2
              erotica.pourOn(p.item, p.substance, "thigh")
              erotica.pourOn(p.item, p.substance, "groin")
              if (p.item.hasBodyPart("cock")) erotica.pourOn(p.item, p.substance, "cock")
              if (p.item.hasBodyPart("pussy")) erotica.pourOn(p.item, p.substance, "pussy")
            },
          },
          {
            test:function(p) { return p.char.posture === "standing" || p.item.posture === "kneeling"},
            msg:"{nv:char:pour:true} {show:substance} on to {nms:item:the} head.",
            script:function(p) {
              p.char.arousal += 3
              p.item.arousal += 2
              p.source.volume -= 2
              erotica.pourOn(p.item, p.substance, "head")
              erotica.pourOn(p.item, p.substance, "mouth")
            },
          },
          {
            msg:"{nv:char:pour:true} {show:substance} on to {nms:item:the} chest, letting it dribble down {ob:item}.",
            script:function(p) {
              p.char.arousal += 3
              p.item.arousal += 2
              p.source.volume -= 3
              erotica.pourOn(p.item, p.substance, "midriff")
              erotica.pourOn(p.item, p.substance, "chest")
              erotica.pourOn(p.item, p.substance, "groin")
              if (p.item.hasBodyPart("tit")) erotica.pourOn(p.item, p.substance, "tit")
              if (p.item.hasBodyPart("cock")) erotica.pourOn(p.item, p.substance, "cock")
              if (p.item.hasBodyPart("pussy")) erotica.pourOn(p.item, p.substance, "pussy")
            },
          },
        ],

        msg:"{nv:char:pour:true} {show:substance} on to {nm:item:the}.",
        script:function(p) {
          p.char.arousal += p.item.getExposure() / 2
          p.item.arousal += p.item.getExposure() / 3
              erotica.pourOn(p.item, "honey", "thighs")
        },
      },
      {
        name:"bodypart",
        responses:[
          {
            //test:function(p) { return p.rating < 0 },
            msg:"{nv:char:pour:true} {show:substance} on to {nms:item:the} {nm:bodypart}.",
            script:function(p) {
              p.char.arousal += p.item.getExposure() / 2
              p.item.arousal += p.item.getExposure() / 3
              erotica.pourOn(p.item, "honey", p.bodypart.name)
            },
          },
          {
            msg:"{nv:char:pour:true} {show:substance} on to {nm:item:the} 3.",
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
            msg:"{nv:char:pour:true} {show:substance} down {nms:item:the} {nm:garment}.",
          },
          {
            msg:"{nv:char:pour:true} {show:substance} down {nms:item:the} {nm:garment}.",
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
        test:function(p) { return !p.item.canUseHands() },
        script:function(p) {
          if (p.garment.ripOff) {
            p.garment.ripOff(p)
          }
          else {
            return errormsg("No ripOff for " + p.garment.name)
          }
          p.char.arousal += p.item.getExposure() / 2
          p.item.arousal += p.item.getExposure() / 3
        },
      },
      {
        name:"target not tied up",
        responses:[
          {
            test:function(p) { return p.rating < 0 },
            msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to remove {pa:item} {nm:garment}. 'Keep your filthy hands to yourself, {insult:item:char}!'",
            script:function(p) { p.item.modifyAttraction(p.char, -25); p.char.reputation += 10 },
            failed:true,
          },
          {
            test:function(p) { return p.rating < 30 },
            msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to remove {pa:item} {nm:garment}. 'Keep your filthy hands to yourself, {insult:item:char}!'",
            failed:true,
          },
          {
            test:function(p) { return p.exposure < 0 },
            msg:"'Hey!' {vn:item:exclaim} as {nv:char:try} to remove {pa:item} {nm:garment}. 'I'm not taking that off!'",
            failed:true,
          },

          {
            test:function(p) { return !!p.garment.pullsoff },
            script:function(p) {
              p.char.msg(erotica.pullOffTexts[p.garment.pullsoff], p)
              p.garment.loc = p.char.loc
              p.garment.worn = false
              p.char.arousal += p.item.getExposure() / 3
              p.item.arousal += p.item.getExposure() / 3
            },
          },
          {
            msg:"{nv:char:take:true} {nms:item:the} {nm:garment} off her.",
            script:function(p) {
              p.garment.loc = p.char.loc
              p.garment.worn = false
              p.char.arousal += p.item.getExposure() / 3
              p.item.arousal += p.item.getExposure() / 3
            },
          },
        ],
      },
    ],
  },
  
  {
    name:"default",
    msg:"THIS SHOULD NEVER HAPPEN: {show:action}",
  },
]


