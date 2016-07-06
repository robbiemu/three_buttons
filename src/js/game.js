/* global $, sfx, AutoclickAgent */
$().ready(() => {
  console.log('loading')
  game_init()
  Vars.audio = sfx('resources/Click Clock Wood.mp3')
  Vars.audio.loop = true
  Vars.audio.controls = true
  Vars.audio.isPlaying = false
  $('.button').click(generic_button_press)
  $('#modifier').hover(() => {
    if (Vars.points >= Vars.modifier.cost) {
      $(this).css('cursor', 'pointer')
    } else {
      $(this).css('cursor', 'default')
    }
  })
  $('#autoclick').hover(() => {
    if (Vars.points >= Vars.modifier.cost) {
      $(this).css('cursor', 'pointer')
    } else {
      $(this).css('cursor', 'default')
    }
  })
  $('#per_click').mousedown((e) => {
    if (e.which) {
      sfx('resources/Coins Thrown.mp3').playclip()
    }
  })
})

var Vars = {}

function updateButtonCost () {
  if (Vars.points >= Vars.modifier.cost) {
    $('#modifier').css({'background-color': 'rgb(200,127,127)', 'cursor': 'pointer'})
  } else {
    $('#modifier').css({'background-color': 'gray', 'cursor': 'default'})
  }

  if (Vars.points >= Vars.autoclick.cost) {
    $('#autoclick').css({'background-color': 'rgb(200,127,127)', 'cursor': 'pointer'})
  } else {
    $('#autoclick').css({'background-color': 'gray', 'cursor': 'default'})
  }
}

function updateDisplayVariables () {
  $('#points_numeric').text(((Vars.points.toFixed(3)*1000)/1000).toString())
  $('#per_click_text').text(Vars.modifier.current * Vars.per_click)
  $('#modifiers_cost').text(Vars.modifier.cost)
  $('#current_modifiers').text(Vars.modifier.current)
  $('#modifier_text').text(50)
  $('#count_of_autoclickers').text(Vars.autoclick.agents.length)
  $('#autoclick_cost').text(((Vars.autoclick.cost.toFixed(3) * 1000)/1000).toString())
  $('#autoclick_text').text(1)
}

function game_init () {
  Vars.modifier = { current: 1, cost: 100, increment: 0.5 }
  Vars.autoclick = { agents: [], cost: 100 }
  Vars.points = 0
  Vars.per_click = 100
  updateDisplayVariables()
}

function increaseCost (cost) {
  return Math.floor(Math.pow((0.018 * cost + 2), 3) + 100)
}

function increaseAutoclickCost () {
  Vars.autoclick.cost += (Vars.modifier.cost / 100)
  updateButtonCost()
  updateDisplayVariables()
}

const generic_button_press = function () {
  switch (this.id) {
    case 'modifier':
      let cost = Vars.modifier.cost
      if (Vars.points >= cost) {
        console.log('modifier clicked')
        let audio = sfx('resources/Kirby Super Star SNES - Treasure!.mp3')
        audio.volime = 0.02
        audio.playclip()

        Vars.points -= cost
        Vars.modifier.current += Vars.modifier.increment
        Vars.modifier.cost = increaseCost(cost)
        updateButtonCost()
        updateDisplayVariables()
      }
      break
    case 'autoclick':
      console.log('autoclick clicked')
      if (Vars.points >= Vars.autoclick.cost) {
        let agent = new AutoclickAgent()
        agent.act()
        Vars.autoclick.agents.push(agent)
        Vars.points -= Vars.autoclick.cost
        updateButtonCost()
        updateDisplayVariables()
      }
      break
    case 'per_click':
      console.log('per_click clicked')
      if (!Vars.audio.isPlaying) {
        Vars.audio.id = "track_player"
        Vars.audio.playclip()
        Vars.audio.isPlaying = true
        $(Vars.audio).insertAfter('section#content > #top')
      }

      Vars.points += Vars.modifier.current * Vars.per_click

      if (Vars.modifier.cost / Vars.points > 100) {
        Vars.modifier.cost = (((Vars.modifier.cost / Vars.points).toFixed(3) * 1000) / 1000)
      }
      if (Vars.autoclick.cost / Vars.points > 100) {
        Vars.autoclick.cost = (((Vars.autoclick.cost / Vars.points).toFixed(3) * 1000) / 1000)
      }

      updateButtonCost()
      updateDisplayVariables()
  }
}
