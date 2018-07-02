'use babel';

import Format from './atom-uniform-enum';

export default {

  // Format Input String
  convert(text, format) {
    const basicSet = this.getCharSet(Format.REGULAR);
    const charSet = this.getCharSet(format);

    let result = text.split('').map(char => {
      let validChar = basicSet.indexOf(char);
      return charSet[validChar] || char;
    });

    return result.join('');

    // let result = '';

    // for (let char of text)
    // {
    //   result += charSet[basicSet.indexOf(char)] || char;
    // }
    //
    // return result;
  },

  // Generate Character Sets
  getCharSet(formatOffset) {
    if (formatOffset === Format.REGULAR) {
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    } else {
      const size = 52;
      return [...Array(size).keys()].map(i => String.fromCodePoint(i + formatOffset));
    }
  }

};