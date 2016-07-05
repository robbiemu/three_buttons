/* global $, GameEngine */
$().ready(() => {
  $('section#content > div#splash').load('templates/splash.html')
  $('section#content > div#scores').load('templates/scores.html')
  $('section#content > div#game').load('templates/game.html')

  const game_engine = new GameEngine()
  game_engine.start()
})
