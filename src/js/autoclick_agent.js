/* global $ */
class AutoclickAgent {
  constructor () {
    this.base_time = 1
    sfx('resources/Goofy Yell.mp3').playclip()
  }

  act () {
    if (!this.cancel) {
      setTimeout(() => {
        increaseAutoclickCost()
        $('#per_click').trigger('click')
        this.act()
      }, this.get_next_trigger_timestamp())
    }
  }

  get_next_trigger_timestamp () {
    let next = Math.floor((this.base_time + ((Math.random() - Math.random()) / 10)) * 1000)
    console.log('next trigger in ' + next + 'ms')
    return next
  }
}
