'use babel';

import { Disposable, CompositeDisposable } from 'atom';
import Format from './atom-uniform-enum';
import Uniform from './atom-uniform-ctl';
import UniformView from './atom-uniform-view';
import Settings from './atom-uniform-settings';

export default {

  // Global Vars
  viewProvider: null,
  element: null,
  miniEditor: null,
  modalPanel: null,
  subscriptions: null,
  config: Settings.config,

  // Initialise Package
  activate() {
    this.viewProvider = new UniformView();
    this.element = this.viewProvider.getElement();
    this.miniEditor = this.viewProvider.refs.queryEditor;

    // Create UI Panel
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.element,
      visible: false,
      autoFocus: true
    });

    // Register Editor Commands
    this.subscriptions = new CompositeDisposable(
      atom.commands.add('atom-workspace', {
        'atom-uniform:toggle': () => this.toggle()
      }),
      atom.commands.add(this.element, {
        'core:confirm': () => this.process(),
        'core:cancel': () => this.close()
      })
    );

    // Listen for Focus Events
    const onDidChangeFocus = this.onDidChangeFocus.bind(this);
    this.miniEditor.element.addEventListener('blur', onDidChangeFocus);
    this.subscriptions.add(new Disposable(() => {
      this.miniEditor.element.removeEventListener('blur', onDidChangeFocus);
    }));
  },

  // Garbage Collection
  deactivate() {
    this.modalPanel.destroy();
    this.viewProvider.destroy();
    this.subscriptions.dispose();
    delete this.miniEditor;
    delete this.element;
  },

  // Handle Focus Events
  onDidChangeFocus(event) {
    if (this.element.contains(event.relatedTarget)) {
      this.miniEditor.element.focus();
    } else if (document.hasFocus()) {
      this.close();
    }
  },

  // Main Control
  toggle() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {

      const selection = editor.getSelectedText();
      const autoFormat = {
        isEnabled: atom.config.get('atom-uniform.autoFormat.isEnabled'),
        preset: atom.config.get('atom-uniform.autoFormat.preset')
      };

      if (selection && autoFormat.isEnabled) {
        const result = Uniform.format(selection, autoFormat.preset);
        editor.insertText(result);
      } else {
        this.modalPanel.isVisible() ? this.close() : this.open(selection);
      }

    }
  },

  // Open UI Panel
  open(text) {
    if (this.modalPanel.isVisible()) return;

    this.modalPanel.show();
    this.miniEditor.setText(text);
    this.miniEditor.element.focus();
  },

  // Process User Input
  process() {
    const text = this.miniEditor.getText();
    const formatType = parseInt(document.querySelector('input[name="formatType"]:checked').value);
    if (!text) return;

    const result = Uniform.format(text, formatType);
    atom.workspace.getActiveTextEditor().insertText(result);

    this.close();
  },

  // Close UI Panel
  close() {
    if (!this.modalPanel.isVisible()) return;

    this.miniEditor.setText('');
    this.modalPanel.hide();
  }

};
