'use babel';

import Settings from '../lib/atom-uniform-settings';

describe('Package settings', () => {

  it('loads the config object that defines user options', () => {

    expect(Settings.config).toBeDefined();

  });

});
