/*!
 * limon <https://github.com/limonjs/limon>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var limon = require('./index')

limon
  .use(function prevNext (app) {
    return function (ch, i, input) {
      app.prev = function prev (pos) {
        pos = pos || 1
        return input[i - pos]
      }
      app.next = function next (pos) {
        pos = pos || 1
        return input[i + pos]
      }
    }
  })
  .use(function (app) {
    return function (ch, i, input) {
      // console.log('prev is:', this.prev())
      // console.log('next is:', this.next())

      if (/\s/.test(ch)) {
        this.tokens.push(['whitespace', ch, i])
        return
      }
      if (/\W/.test(ch)) {
        this.tokens.push(['symbol', ch, i])
        return
      }
      if (/\d/.test(ch)) {
        this.tokens.push(['digit', ch, i])
        return
      }
      this.tokens.push(['letter', ch, i])
    }
  })

var tokens = limon.tokenize('a > (b + 2)')
console.log(tokens)
// =>
// [ [ 'letter', 'a', 0 ],
//   [ 'whitespace', ' ', 1 ],
//   [ 'symbol', '>', 2 ],
//   [ 'whitespace', ' ', 3 ],
//   [ 'symbol', '(', 4 ],
//   [ 'letter', 'b', 5 ],
//   [ 'whitespace', ' ', 6 ],
//   [ 'symbol', '+', 7 ],
//   [ 'whitespace', ' ', 8 ],
//   [ 'digit', '2', 9 ],
//   [ 'symbol', ')', 10 ] ]