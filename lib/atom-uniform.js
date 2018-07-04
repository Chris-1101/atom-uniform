'use babel';

import { CompositeDisposable } from 'atom';
import Format from './atom-uniform-enum';
import Uniform from './atom-uniform-ctl';
import UniformView from './atom-uniform-view';
import Settings from './atom-uniform-settings';

export default {

  uniformView: null,
  modalPanel: null,
  subscriptions: null,
  config: Settings.config,

  activate() {
    this.uniformView = new UniformView();

    this.modalPanel = atom.workspace.addModalPanel({
      item: this.uniformView.getElement(),
      visible: false,
      autoFocus: true
    });

    this.subscriptions = new CompositeDisposable(
      atom.commands.add('atom-workspace', {
        'atom-uniform:toggle': () => this.toggle()
      }),
      atom.commands.add(this.uniformView.rootElement, 'core:confirm', () => {
        this.process();
      }),
      atom.commands.add(this.uniformView.rootElement, 'core:cancel', () => {
        this.close();
      })
    );
  },

  deactivate() {
    this.modalPanel.destroy();
    this.uniformView.destroy();
    this.subscriptions.dispose();
  },

  toggle() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      const selection = editor.getSelectedText();
      const autoFormat = {
        isEnabled: atom.config.get('atom-uniform.autoFormat.isEnabled'),
        preset: atom.config.get('atom-uniform.autoFormat.preset')
      };
      if (selection && autoFormat.isEnabled) {
        const conversion = Uniform.convert(selection, autoFormat.preset);
        editor.insertText(conversion);
      } else {
        this.modalPanel.isVisible() ? this.close() : this.open();
      }
    }
  },

  open() {
    if (this.modalPanel.isVisible()) return;

    this.modalPanel.show();
    this.uniformView.miniEditor.element.focus();
  },

  process() {
    const text = this.uniformView.miniEditor.getText();
    const format = parseInt(document.querySelector('input[name="formatType"]:checked').value);
    if (!text) return;

    const result = Uniform.convert(text, format);
    atom.workspace.getActiveTextEditor().insertText(result);

    this.close();
  },

  close() {
    if (!this.modalPanel.isVisible()) return;

    this.uniformView.miniEditor.setText('');
    this.modalPanel.hide();
    atom.views.getView(atom.workspace).focus();
  }

};
