'use babel';

import Format from './atom-uniform-enum';

export default {

  // Format Input String
  format(text, formatType) {
    const basicSet = this.getCharSet(Format.REGULAR);
    const charSet = this.getCharSet(formatType);

    const result = text.split('').map(char => {
      let validChar = basicSet.indexOf(char);
      return charSet[validChar] || char;
    });

    return result.join('');
  },

  // Generate Character Sets
  getCharSet(offset) {
    if (offset === Format.REGULAR) {
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    } else {
      const size = 52;
      const range = [...Array(size).keys()];
      return range.map(index => String.fromCodePoint(index + offset));
    }
  }

};
