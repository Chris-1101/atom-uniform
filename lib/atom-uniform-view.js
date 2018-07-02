'use babel';

import { TextEditor } from 'atom';
import Format from './atom-uniform-enum';

export default class UniformView {

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('atom-uniform');

    this.message = document.createElement('div');
    this.message.classList.add('text-info');
    this.element.appendChild(this.message);

    this.miniEditor = new TextEditor({ mini: true });
    this.element.appendChild(this.miniEditor.element);

    // TODO radio list for valid formats
    this.radioList = document.createElement('div');
    this.radioList.classList.add('atom-uniform-radioList');
    this.radioList.innerHTML = `
      <label class="input-label" for="formatBold">
        <input class="input-radio" type="radio" name="formatType" id="formatBold" value="${Format.BOLD}">
        <span>Bold</span>
      </label>
      <label class="input-label" for="formatItalic">
        <input class="input-radio" type="radio" name="formatType" id="formatItalic" value="${Format.ITALIC}">
        <span>Italic</span>
      </label>
      <label class="input-label" for="formatBoldItalic">
        <input class="input-radio" type="radio" name="formatType" id="formatBoldItalic" value="${Format.BOLDITALIC}" checked>
        <span>Bold-Italic</span>
      </label>`;
    this.element.appendChild(this.radioList);
  }

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
