'use babel';

import Format from './atom-uniform-enum';

Settings = {

  config: {
    autoFormat: {
      type      : 'object',
      title     : 'Auto-Format Selection',
      properties: {
        isEnabled: {
          order      : 1,
          title      : 'Enable',
          description: '`Enabled` Automatically formats selected text in the editor using the preset specified below.<br>`Disabled` Activating the package will always bring up the input dialogue. Any active selection will be added to the input field.',
          type       : 'boolean',
          default    : true
        },
        preset: {
          order  : 2,
          title  : 'Auto-Format Preset',
          type   : 'integer',
          default: Format.BOLDITALIC,
          enum   : null
        }
      }
    },
    defaults: {
      type      : 'object',
      title     : 'Defaults',
      properties: {
        formatType: {
          order: 1,
          title: 'Format Type',
          description: 'Default format type selected when first invoking the input dialogue.',
          type: 'integer',
          default: Format.BOLDITALIC,
          enum: null
        }
      }
    }
  }

};

const formatConfigEnum = [
  { value: Format.BOLD,       description: 'Bold' },
  { value: Format.ITALIC,     description: 'Italic' },
  { value: Format.BOLDITALIC, description: 'Bold-Italic' }
];

Settings.config.autoFormat.properties.preset.enum = formatConfigEnum;
Settings.config.defaults.properties.formatType.enum = formatConfigEnum;

export default Settings;
