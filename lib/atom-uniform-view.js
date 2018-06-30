'use babel';

import { TextEditor } from 'atom';

export default class UniformView {

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('atom-uniform');

    this.message = document.createElement('div');
    this.message.classList.add('message');
    this.element.appendChild(this.message);

    this.miniEditor = new TextEditor({ mini: true });
    this.element.appendChild(this.miniEditor.element);

    // TODO radio list for valid formats
  }

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
