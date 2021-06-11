'use strict';
import './eFunc'
import { WordEngine } from './word.engine';
export class Game {
  constructor(words) {
    //game DOM elements
    this.$input = document.querySelector('.input__word')
    this.$wpm = document.querySelector('.wpm')
    this.$timeDisplay = document.querySelector('.time-remain')
    this.$words = document.querySelector('.words')
    this.$btnRestart = document.querySelector('.btn__restart')


    //game settings, we can change them
    this.initialSecondsValue = 60
    this.oneWord = 6 //letters

    //game values
    this.wordLength = 0
    this.seconds = 0
    this.wpm = 0
    this.totalLength = 0
    this.wordCounter = 0
    this.words = words
    this.lastWpm = 0

    //game status
    this.resetted = false
    this.needReloadWords = true
    this.isGameStarted = false

    //wordengine init
    this.wordEngine = new WordEngine(this.words, this.$words)
    this.startOnType = this.startOnType.bind(this)
    //eventListeners

  }

  init() {
    this.$btnRestart.addEventListener('click', this.reset.bind(this))
    this.$btnRestart.addEventListener('click', this.rotateButton.bind(this))

    this.startOnTypeListener()
    this.$timeDisplay.textContent = this.initialSecondsValue
  }
  startOnTypeListener() {
    if (!this.isGameStarted && this.needReloadWords) {
      this.$input.addEventListener('input', this.startOnType)
    }
  }

  startTimer() {
    this.seconds = this.initialSecondsValue
    this.updateInfo()
  }

  colorWord($currentWord, color) {
    if ($currentWord) $currentWord.style.color = color
  }

  clearInput() {
    this.$input.value = ''
  }

  isWordCorrect() {
    return this.$input.value.slice(0, this.$input.value.length) === this.$words.innerText.slice(0, this.$input.value.length)
  }

  check() {
    const
      $currentWord = document.querySelector(`#word_${this.wordCounter}`),
      $nextWord = document.querySelector(`#word_${this.wordCounter + 1}`)
    if (this.$input.value[this.$input.value.length - 1] === ' ' && this.isWordCorrect()) {
      if ($currentWord) $currentWord.remove()
      this.wordLength += this.$input.value.length
      this.clearInput()
      $nextWord.classList.add('word--active')
      this.wordCounter++
    } else if (this.isWordCorrect()) {
      this.colorWord($currentWord, 'black')
    }
    else if (!this.isWordCorrect()) {
      this.colorWord($currentWord, 'red')
    }
  }
  countWPM() {
    let wpm = 0
    this.totalLength += this.wordLength
    wpm = (this.totalLength * 60) / (this.initialSecondsValue - this.seconds) / this.oneWord || 0
    this.wordLength = 0
    this.wpm = wpm
    return Number(wpm).toFixed(1)
  }
  rotateButton() {
    this.$btnRestart.querySelector('i').style.transform = 'rotate(360deg)'
    this.$btnRestart.addEventListener('transitionend', () => this.$btnRestart.querySelector('i').style.transform = '')
  }
  reset() {
    this.isGameStarted = false
    this.startOnTypeListener()

    this.resetted = true
    this.seconds = this.initialSecondsValue
    this.$words.innerHTML = ''
    if (this.needReloadWords) { this.wordEngine.displayWords(); this.$timeDisplay.textContent = this.initialSecondsValue }

    this.wordLength = 0
    this.wpm = 0
    this.totalLength = 0
    this.wordCounter = 0
    this.$wpm.innerHTML = '0.0'
    this.clearInput()

  }
  startOnType() {
    this.startTimer()
    this.check()
    this.$input.addEventListener('input', this.check.bind(this))
    this.$input.removeEventListener('input', this.startOnType)
    this.isGameStarted = true
  }

  updateInfo() {
    const tick = () => {
      this.$timeDisplay.textContent = this.seconds
      this.$wpm.textContent = this.countWPM(this.$input.value.length)
      this.seconds--
      if (this.seconds < 0 || this.resetted) {
        clearInterval(timer)
        this.needReloadWords = false
        this.lastWpm = this.wpm
        if (!this.resetted) this.reset()
        this.$wpm.textContent = this.lastWpm.toFixed(1)
        this.needReloadWords = true
        this.resetted = false
      }
    }
    this.$wpm.textContent = '0.0'
    this.$timeDisplay.textContent = this.initialSecondsValue
    tick()
    const timer = setInterval(tick, 1000)
  }
}
