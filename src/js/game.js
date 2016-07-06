/* global $, GameEngine */
$().ready(() => {
  console.log('loading')
  game_init()
  $('.button').click(generic_button_press)
})

var Vars = { }

function game_init () {
  Vars.modifier = { current: 1, cost: 1, increment: 0.1 }
  Vars.autoclick = { agents: [], cost: 1 }
  Vars.points = 0
  Vars.per_click = 1
}

const generic_button_press = function () {
  switch(this.id){
    case "modifier":

      break
    case "autoclick":
      break
    case "per_click":
  }
}
