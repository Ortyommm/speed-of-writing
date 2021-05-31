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
    this.seconds = 59
    this.wpm = 0
    this.totalLength = 0
    this.wordCounter = 0
    this.words = words

    this.wordEngine = new WordEngine(this.words, this.$words)
    this.resetInterval = false
    this.isGameStarted = false
    this.needReloadWords = true
  }

  start() {
    this.isGameStarted = true
    this.updateInfo()
  }
  check() {
    if (this.$input.value[this.$input.value.length - 1] === ' ' && this.$input.value.slice(0, this.$input.value.length) === this.$words.innerText.slice(0, this.$input.value.length)) {
      try { document.querySelector(`#word_${this.wordCounter}`).remove() } catch { }
      this.wordLength += this.$input.value.length
      this.$input.value = ''
      this.wordCounter++
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
    if (this.isGameStarted) this.resetInterval = true
    this.seconds = 60
    this.$words.innerHTML = ''
    if (this.needReloadWords) { this.wordEngine.displayWords(); this.$timeDisplay.innerHTML = 60 }
    this.wordLength = 0
    this.wpm = 0
    this.totalLength = 0
    this.wordCounter = 0
    this.$wpm.innerHTML = '0.0'
    this.$input.value = ''
    this.isGameStarted = false
  }
  updateInfo() {

    this.$wpm.innerHTML = '0.0'
    if (!this.isGameStarted) this.$timeDisplay.innerHTML = this.seconds + 1
    else this.$timeDisplay.innerHTML = this.seconds

    const interval = setInterval(() => {
      this.$wpm.innerHTML = '0.0'
      this.$timeDisplay.innerHTML = this.seconds
      this.$wpm.innerHTML = this.countWPM(this.$input.value.length)
      this.seconds--
      if (this.seconds < 0 || this.resetInterval) {
        clearInterval(interval)
        this.needReloadWords = false
        if (!this.resetInterval) this.reset()
        this.needReloadWords = true
        this.resetInterval = false

        // else { this.resetInterval = false }
      }
    }, 1000)
  }
}
