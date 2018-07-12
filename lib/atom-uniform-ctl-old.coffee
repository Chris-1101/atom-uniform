Format = require './atom-uniform-enum'

# Old coffeescript implementation

module.exports =

  # Format input string
  format: (text, formatType) ->
    basicSet = @getCharSet Format.REGULAR
    charSet = @getCharSet formatType

    result = text.split('').map (char) ->
      validChar = basicSet.indexOf(char)
      charSet[validChar] || char

    result.join('')

  # Generate character sets
  getCharSet: (offset) ->
    if offset is Format.REGULAR
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    else
      range = [0...52]
      range.map (index) -> String.fromCodePoint(index + offset)
