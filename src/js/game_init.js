/* global $, GameEngine */
$().ready(() => {
  console.log('loading')
  const game_engine = new GameEngine()
  game_engine.start()
})
