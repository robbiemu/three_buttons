/* global $, AutoclickAgent */
$().ready(() => {
  console.log('loading')
  game_init()
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
})

var Vars = { }

function updateButtonCost () {
  if (Vars.points >= Vars.modifier.cost) {
    $('#modifier').css('background-color', 'rgb(200,127,127)')
  } else {
    $('#modifier').css('background-color', 'gray')
  }

  if (Vars.points >= Vars.autoclick.cost) {
    $('#autoclick').css('background-color', 'rgb(200,127,127)')
  } else {
    $('#autoclick').css('background-color', 'gray')
  }
}

function updateDisplayVariables () {
  $('#points_numeric').text(((Vars.points.toFixed(3)*1000)/1000).toString())
  $('#modifiers_cost').text(Vars.modifier.cost)
  $('#current_modifiers').text(Vars.modifier.current)
  $('#count_of_autoclickers').text(Vars.autoclick.agents.length)
  $('#autoclick_cost').text(((Vars.autoclick.cost.toFixed(3) * 1000)/1000).toString())
}

function game_init () {
  Vars.modifier = { current: 1, cost: 100, increment: 0.5 }
  Vars.autoclick = { agents: [], cost: 100 }
  Vars.points = 0
  Vars.per_click = 1
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
      Vars.points += Vars.modifier.current * Vars.per_click * 100

      if(Vars.modifier.cost/Vars.points > 100) {
        Vars.modifier.cost = (((Vars.modifier.cost/Vars.points).toFixed(3) * 1000)/1000)
      }
      if(Vars.autoclick.cost/Vars.points > 100) {
        Vars.autoclick.cost = (((Vars.autoclick.cost/Vars.points).toFixed(3) * 1000)/1000)
      }

      updateButtonCost()
      updateDisplayVariables()
  }
}
