'use strict';
import './eFunc'
import { WordEngine } from './word.engine';
export class Game {
  constructor($input, $words, $wpm, $timeDisplay, words) {
    this.$input = $input
    this.$wpm = $wpm
    this.$timeDisplay = $timeDisplay
    this.$words = $words

    this.wordLength = 0
    this.seconds = 60
    this.wpm = 0
    this.totalLength = 0
    this.wordCounter = 0
    this.words = words
    this.lastWpm = 0

    this.wordEngine = new WordEngine(this.words, this.$words)
    this.resetted = false
    this.needReloadWords = true

  }

  start() {
    this.updateInfo()

  }
  check() {
    if (this.$input.value[this.$input.value.length - 1] === ' ' && this.$input.value.slice(0, this.$input.value.length) === this.$words.innerText.slice(0, this.$input.value.length)) {
      try { document.querySelector(`#word_${this.wordCounter}`).remove() } catch { }
      this.wordLength += this.$input.value.length
      this.$input.value = ''
      this.wordCounter++
      document.querySelector(`#word_${this.wordCounter}`).style.backgroundColor = 'rgba(0,0,0,.1)'
    } else if (this.$input.value.slice(0, this.$input.value.length) == this.$words.innerText.slice(0, this.$input.value.length)) {
      try { document.querySelector(`#word_${this.wordCounter}`).style.color = 'black' } catch { }
    }
    else if (this.$input.value.slice(0, this.$input.value.length) != this.$words.innerText.slice(0, this.$input.value.length)) {
      try { document.querySelector(`#word_${this.wordCounter}`).style.color = 'red' } catch { }
    }
  }
  countWPM() {
    const oneWord = 6 //symbols
    let wpm = 0
    this.totalLength += this.wordLength
    if (!isNaN(wpm = (this.totalLength * 60) / (60 - this.seconds) / oneWord)) wpm = (this.totalLength * 60) / (60 - this.seconds) / oneWord

    else wpm = (this.totalLength * 60) / (61 - this.seconds) / oneWord

    if (wpm == Infinity) wpm = '0.0'
    this.wordLength = 0
    this.wpm = wpm
    return Number(wpm).toFixed(1)
  }
  reset() {

    this.resetted = true//
    this.seconds = 60
    this.$words.innerHTML = ''
    if (this.needReloadWords) { this.wordEngine.displayWords(); this.$timeDisplay.textContent = 60 }

    this.wordLength = 0
    this.wpm = 0
    this.totalLength = 0
    this.wordCounter = 0
    this.$wpm.innerHTML = '0.0'
    this.$input.value = ''
  }
  updateInfo() {

    const tick = () => {
      // this.$wpm.textContent = '0.0'
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

        // else { this.resetted = false }
      }
    }
    this.$wpm.textContent = '0.0'
    this.$timeDisplay.textContent = this.seconds
    tick()
    const timer = setInterval(tick, 1000)
  }
}
