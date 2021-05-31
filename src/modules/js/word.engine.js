

export class WordEngine {
  constructor(words, selector) {
    this.words = words
    this.selector = selector
    this.totalLength
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }

  refactorWords(words = this.words) {
    const refactoredWords = words.split('|')
    return this.shuffle(refactoredWords).map((el, i) => `<span id='word_${i}'>${el}</span>`).join(' ')
  }

  displayWords() {
    this.selector.innerHTML = ''
    this.selector.insertAdjacentHTML('afterbegin', this.refactorWords(this.words))
  }
}