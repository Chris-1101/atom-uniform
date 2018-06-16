'use babel';

import UniformView from './atom-uniform-view';
import { CompositeDisposable } from 'atom';

export default {

  uniformView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.uniformView = new UniformView(state.atomUniformViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.uniformView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-uniform:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.uniformView.destroy();
    this.subscriptions.dispose();
  },

  serialize() {
    return {
      atomUniformViewState: this.uniformView.serialize()
    };
  },

  toggle() {
    // console.log('AtomUniform was toggled!');
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );

    let editor;
    if (editor = atom.workspace.getActiveTextEditor())
    {
      let selection = editor.getSelectedText();
      editor.insertText('«' + String.fromCodePoint(0x1D63C) + '»');
    }
  }

};
