'use babel';

import { TextEditor } from 'atom';
import Format from './atom-uniform-enum';

// DOM Element Passed to Modal Panel
export default class UniformView {

  constructor() {
    // Root element
    this.rootElement = document.createElement('div');
    this.rootElement.setAttribute('id', 'rootElement');
    this.rootElement.classList.add('atom-uniform');
    this.rootElement.setAttribute('tabindex', '-1');

    // Header text
    this.message = document.createElement('div');
    this.message.classList.add('text-info');
    this.message.textContent = 'Uniform';
    this.rootElement.appendChild(this.message);

    // Mini editor
    this.miniEditor = new TextEditor({ mini: true });
    this.miniEditor.setPlaceholderText('Insert text to be formatted...');
    this.rootElement.appendChild(this.miniEditor.element);

    // Format radio-list
    this.radioList = document.createElement('div');
    this.radioList.classList.add('atom-uniform-radioList');
    this.radioList.innerHTML = `
      <label class="input-label">
        <input class="input-radio" type="radio" name="formatType" value="${Format.BOLD}">
        <span>Bold</span>
      </label>
      <label class="input-label">
        <input class="input-radio" type="radio" name="formatType" value="${Format.ITALIC}">
        <span>Italic</span>
      </label>
      <label class="input-label">
        <input class="input-radio" type="radio" name="formatType" value="${Format.BOLDITALIC}" checked>
        <span>Bold-Italic</span>
      </label>`;
    this.rootElement.appendChild(this.radioList);
  }

  destroy() {
    this.rootElement.remove();
  }

  getElement() {
    return this.rootElement;
  }

}
