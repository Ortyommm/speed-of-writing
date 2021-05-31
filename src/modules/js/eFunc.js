//eFunc v0.051

function $(element){
    return document.querySelector(element)
}

function $$(element){
    return document.querySelectorAll(element)
}

Object.defineProperty(Math, 'randomInt', {
    value: function(max, min=0){
    return Math.floor(min + Math.random() * (max + 1 - min))},
    enumerable: false,
})

// Object.defineProperty(Object.prototype, 'log', {
//     value: function(){
//         if (this.split('') != undefined){
//         console.log(this.toString())
//         }
//     },
//         enumerable: false,
// })

String.prototype.replaceAll = function (substr, newSubstr) {
    let newString = this, oldString = this
    if (typeof substr === 'string'){
        for (let i = 0; i<this.length;i++){
            newString = oldString.replace(substr, newSubstr)
        }
    } else if(Array.isArray(substr)){
        for (let x = 0; x<substr.length; x++){
            for (let i = 0; i<this.length;i++){
                newString = newString.replace(substr[x], newSubstr)
            }
        }
    }
    else {
        throw new Error(`Your substr isn't string or array.`)
    }
    return newString
}