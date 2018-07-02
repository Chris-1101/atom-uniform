'use babel';

import Format from './atom-uniform-enum';
// TODO Migrate config to separate file
export default {

  config: {
    autoFormat: {
      type      : 'object',
      title     : 'Auto-Format Selection',
      properties: {
        isEnabled: {
          order      : 1,
          title      : 'Enable',
          description: '`Enabled` Automatically formats selected text in editor using the preset specified below<br>`Disabled` Activating the package will bring up the input dialogue regardless of selection',
          type       : 'boolean',
          default    : true
        },
        preset: {
          order  : 2,
          title  : 'Auto-Format Preset',
          type   : 'integer',
          default: Format.BOLDITALIC,
          enum   : [
            { value: Format.BOLD,       description: 'Bold'        },
            { value: Format.ITALIC,     description: 'Italic'      },
            { value: Format.BOLDITALIC, description: 'Bold-Italic' }
          ]
        }
      }
    }
  }

};
