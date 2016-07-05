/* global $ */
class GameEngine {
  start () {
    this.splash()
  }

  cycle_sections (section) {
    $(`section#content > div#${section}`).css('display', 'initial')
    $(`section#content > div:not("${section}")`).css('display', 'none')
  }

  splash () {
    // start splash music
    this.cycle_sections('splash')
    $('section#content > div#splash > div#start').click(() => {
      $('section#content > div#splash').fadeTo('slow', 0.4, () => {
        this.play()
      })
      // stop music
    })
  }

  play () {
    // start game music
    this.cycle_sections('play')
    // start game
  }

  scores () {
    //start scores music
    this.cycle_sections('scores')

  }
}
