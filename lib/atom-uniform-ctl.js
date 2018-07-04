'use babel';

import Format from './atom-uniform-enum';

export default {

  // Format Input String
  convert(text, format) {
    const basicSet = this.getCharSet(Format.REGULAR);
    const charSet = this.getCharSet(format);

    const result = text.split('').map(char => {
      let validChar = basicSet.indexOf(char);
      return charSet[validChar] || char;
    });

    return result.join('');
  },

  // Generate Character Sets
  getCharSet(formatOffset) {
    if (formatOffset === Format.REGULAR) {
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    } else {
      const size = 52;
      return [...Array(size).keys()].map(index => String.fromCodePoint(index + formatOffset));
    }
  }

};
