'use babel';

import AtomUniformCTL from '../lib/atom-uniform-ctl';
import Format from '../lib/atom-uniform-enum';

describe("The 'AtomUniformCTL' object", () => {

  it("calls '.getCharSet()' to obtain an array of pre-formatted symbols", () => {

    const actual = {
      regularSet    : AtomUniformCTL.getCharSet(Format.REGULAR),
      boldSet       : AtomUniformCTL.getCharSet(Format.BOLD),
      italicSet     : AtomUniformCTL.getCharSet(Format.ITALIC),
      boldItalicSet : AtomUniformCTL.getCharSet(Format.BOLDITALIC)
    };

    const expected = {
      regularSet    : Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'),
      boldSet       : Array.from('𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇'),
      italicSet     : Array.from('𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻'),
      boldItalicSet : Array.from('𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯')
    };

    expect(actual.regularSet).toEqual(expected.regularSet);
    expect(actual.boldSet).toEqual(expected.boldSet);
    expect(actual.italicSet).toEqual(expected.italicSet);
    expect(actual.boldItalicSet).toEqual(expected.boldItalicSet);

  });

  it("calls '.format()' to replace known alphabetical characters with formatted counterparts", () => {

    const actualItalic = AtomUniformCTL.format('testing #%?& italic', Format.ITALIC);
    const expectedItalic = '𝘵𝘦𝘴𝘵𝘪𝘯𝘨 #%?& 𝘪𝘵𝘢𝘭𝘪𝘤';

    expect(actualItalic).toBe(expectedItalic);

  });

});
