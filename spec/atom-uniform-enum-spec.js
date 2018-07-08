'use babel';

import Format from '../lib/atom-uniform-enum';

describe("The 'Format' enum", () => {

  it('sets the starting point for the codepoint sequences of each format type', () => {

    expect(Format.REGULAR).toBe(0x41);
    expect(Format.BOLD).toBe(0x1D5D4);
    expect(Format.ITALIC).toBe(0x1D608);
    expect(Format.BOLDITALIC).toBe(0x1D63C);

  });

});
