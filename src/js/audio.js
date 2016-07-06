const audiotypes = {
  'mp3': 'audio/mpeg',
  'mp4': 'audio/mp4',
  'ogg': 'audio/ogg',
  'wav': 'audio/wav'
}

function sfx (sound) {
  let type = sound.replace(/.*\.([^\.]+)$/, '$1')
  let audio_element = document.createElement('audio')
  if (audio_element.canPlayType(audiotypes[type])) {
    for (var i = 0; i < arguments.length; i++) {
      var source_element = document.createElement('source')
      source_element.setAttribute('src', sound)
      source_element.setAttribute('type', audiotypes[type])
      audio_element.appendChild(source_element)
    }
    audio_element.load()
    audio_element.playclip = function () {
      console.log(audio_element.volume)
      audio_element.pause()
      audio_element.currentTime = 0
      audio_element.play()
    }
    return audio_element
  }
}
