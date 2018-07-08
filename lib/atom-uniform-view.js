'use babel';

const { TextEditor } = require('atom');
const Format = require('./atom-uniform-enum');
const etch = require('etch');
const $ = etch.dom;

// View Provider Component
export default class UniformView {

  // Initialise Component
  constructor() {
    this.state = {};
    this.initialiseState();

    etch.initialize(this);
    this.element.classList.add('atom-uniform');
    this.element.setAttribute('tabindex', '-1');
    this.refs.queryEditor.setPlaceholderText('Insert text to be formatted...');
  }

  // Read & Apply Relevant Config
  initialiseState() {
    const defaults = {
      formatType: atom.config.get('atom-uniform.defaults.formatType')
    };

    Object.keys(Format).forEach(key => {
      if (Format[key] === Format.REGULAR) return;

      const value = Format[key];
      const type = key.charAt(0).toUpperCase() + key.substr(1).toLowerCase();
      const isDefault = (defaults.formatType === value);

      this.state['is' + type + 'Default'] = isDefault ? true : false;
    });
  }

  // Build Virtual DOM Tree & Render Component
  render() {
    return $.div(
      { ref: 'rootElement', id: 'rootElement' },
      $.div({ ref: 'title', className: 'text-info' }, 'Uniform'),
      $(TextEditor, { ref: 'queryEditor', mini: true }),
      $.div(
        { ref: 'radioList', className: 'atom-uniform-radioList' },
        $(RadioButton, { name: 'formatType', value: Format.BOLD,       checked: this.state.isBoldDefault,       label: 'Bold' }),
        $(RadioButton, { name: 'formatType', value: Format.ITALIC,     checked: this.state.isItalicDefault,     label: 'Italic' }),
        $(RadioButton, { name: 'formatType', value: Format.BOLDITALIC, checked: this.state.isBolditalicDefault, label: 'Bold-Italic' })
      )
    );
  }

  // Update Component
  update(props = {}) {
    return etch.update(this);
  }

  // Destroy Component
  async destroy() {
    await etch.destroy(this);
  }

  // Return Associated DOM Element
  getElement() {
    return this.element;
  }

}

// Radio Button Component
class RadioButton {

  constructor(props) {
    this.props = props;
    etch.initialize(this);
    this.element.classList.add('input-label');
  }

  render() {
    return $.label({},
      $.input({
        className: 'input-radio',
        type: 'radio',
        name: this.props.name,
        value: this.props.value,
        checked: this.props.checked
      }),
      $.span({}, this.props.label)
    );
  }

  update(props = {}) {
    return etch.update(this);
  }

}
