'use babel';

import AtomUniform from '../lib/atom-uniform';
import Format from '../lib/atom-uniform-enum';

// NOTE This is a mess
// TODO Clean up ─➤ DRY
// TODO Adopt better form: closer to one expect per specification

describe("The 'atom-uniform' package", () => {
  let workspaceElement, activationPromise, editor;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('atom-uniform');

    // Build editor to be retrieved
    editor = atom.workspace.buildTextEditor();
    editor.setText('test string with #@%& symbols');
    spyOn(atom.workspace, 'getActiveTextEditor').andReturn(editor);
  });

  describe('when the atom-uniform:toggle event is triggered', () => {
    it('activates the package, initialises the view element, and toggles the panel', () => {

      // The package should be loaded
      expect(atom.packages.loadedPackages['atom-uniform']).toBeDefined();

      // Prior to activation, the panel shouldn't exist on the DOM
      expect(workspaceElement.querySelector('#rootElement')).not.toExist();

      // Trigger the toggle() command, this also activates the package
      atom.commands.dispatch(workspaceElement, 'atom-uniform:toggle');

      // Wait for activation
      waitsForPromise(() => activationPromise);

      runs(() => {
        const atomUniformElement = workspaceElement.querySelector('#rootElement');
        const atomUniformPanel = atom.workspace.panelForItem(atomUniformElement);

        // The package should have been activated and the panel displayed
        expect(atomUniformElement).toExist();
        expect(atomUniformPanel.isVisible()).toBe(true);

        // After triggering the toggle() command again, panel should be hidden
        atom.commands.dispatch(workspaceElement, 'atom-uniform:toggle');
        expect(atomUniformPanel.isVisible()).toBe(false);
      });

    });

    it("formats the selection without openning the modal panel (if 'Auto-Format Selection' is enabled)", () => {

      // Create selection in editor
      editor.selectAll();

      // Set package config
      atom.config.set('atom-uniform.autoFormat.isEnabled', true);
      atom.config.set('atom-uniform.autoFormat.preset', Format.ITALIC);

      // Activation sequence
      atom.commands.dispatch(workspaceElement, 'atom-uniform:toggle');
      waitsForPromise(() => activationPromise);

      runs(() => {
        const atomUniformElement = workspaceElement.querySelector('#rootElement');
        const atomUniformPanel = atom.workspace.panelForItem(atomUniformElement);

        // Panel shouldn't open, text formats in-place
        expect(atomUniformPanel.isVisible()).toBe(false);
        expect(editor.getText()).toBe('𝘵𝘦𝘴𝘵 𝘴𝘵𝘳𝘪𝘯𝘨 𝘸𝘪𝘵𝘩 #@%& 𝘴𝘺𝘮𝘣𝘰𝘭𝘴');
      });

    });

    it('sends selected text to the input dialogue which accepts confirm/cancel commands', () => {

      // Required to send commands to the mini editor
      jasmine.attachToDOM(workspaceElement);

      // Create selection in editor
      editor.selectAll();

      // Set package config
      atom.config.set('atom-uniform.autoFormat.isEnabled', false);
      atom.config.set('atom-uniform.defaults.formatType', Format.BOLD);

      // Activation sequence
      atom.commands.dispatch(workspaceElement, 'atom-uniform:toggle');
      waitsForPromise(() => activationPromise);

      runs(() => {
        const atomUniformElement = workspaceElement.querySelector('#rootElement');
        const atomUniformEditor = workspaceElement.querySelector('#rootElement .editor');
        const atomUniformRadio = parseInt(workspaceElement.querySelector('input[name="formatType"]:checked').value);
        const atomUniformPanel = atom.workspace.panelForItem(atomUniformElement);

        // Panel should be visible, default format should be selected
        expect(atomUniformElement).toBeVisible();
        expect(atomUniformRadio).toBe(Format.BOLD);

        // Listen for .process() calls
        spyOn(AtomUniform, 'process').andCallThrough();

        // Validating mini editor's input closes the modal panel and calls .process()
        atom.commands.dispatch(atomUniformEditor, 'core:confirm');
        expect(atomUniformElement).not.toBeVisible();
        expect(AtomUniform.process).toHaveBeenCalled();

        // Selection in editor should have been replaced by formatted text
        expect(editor.getText()).toBe('𝘁𝗲𝘀𝘁 𝘀𝘁𝗿𝗶𝗻𝗴 𝘄𝗶𝘁𝗵 #@%& 𝘀𝘆𝗺𝗯𝗼𝗹𝘀');

        // Test dismiss command
        atom.commands.dispatch(workspaceElement, 'atom-uniform:toggle');
        expect(atomUniformElement).toBeVisible();
        atom.commands.dispatch(atomUniformEditor, 'core:cancel');
        expect(atomUniformElement).not.toBeVisible();
      });

    });
  });
});
