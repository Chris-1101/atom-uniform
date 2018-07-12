# Uniform Package for Atom

[![Build Status](https://travis-ci.org/Chris-1101/atom-uniform.svg?branch=master)](https://travis-ci.org/Chris-1101/atom-uniform/)
[![Dependencies](https://david-dm.org/Chris-1101/atom-uniform.svg)](https://david-dm.org/Chris-1101/atom-uniform)
[![Maintainability](https://api.codeclimate.com/v1/badges/875d210fb1758d448188/maintainability)](https://codeclimate.com/github/Chris-1101/atom-uniform/maintainability)
[![License](https://img.shields.io/github/license/Chris-1101/atom-uniform.svg)](https://github.com/Chris-1101/atom-uniform/blob/master/LICENSE.md)
[![apm](https://img.shields.io/apm/v/atom-uniform.svg)](https://atom.io/packages/atom-uniform)

A simple package to emulate text formatting in Atom using symbols from the unicode character table's [Mathematical Alphanumeric Symbols](https://codepoints.net/mathematical_alphanumeric_symbols) block. The ability to display these symbols will depend on which font is being used. Atom's default font supports all the symbols in the `MAS` block and has good support for most commonly-used symbols.

![atom-uniform preview](https://raw.githubusercontent.com/Chris-1101/atom-uniform/master/preview.png)

The original purpose of this package was to enable the ability to emphasise certain parts of comments, but it can be used to create italic or bold text anywhere that formatting isn't traditionally allowed.

And in case you're wondering, the name `Uniform` is an acronym of <u>Uni</u>code <u>Form</u>at!

## Installation
```
$ apm install atom-uniform
```
You can also use Atom: go to `Preferences` » `Install` and search for `atom-uniform`

## Usage
 * This package will only work inside Atom's actual editor panes
 * Execute `atom-uniform:toggle` or use the keymap (<kbd>ctrl</kbd>-<kbd>alt</kbd>-<kbd>u</kbd> by default)

#### Package Settings
 * `Auto-Format Selection:` when **enabled**, having text selected will cause the package to format it on the spot using the specified preset. When **disabled**, any selection will instead get added to the input dialogue. (default: `enabled`)
 * `Auto-Format Preset:` format type applied to the active selection when **Auto-Format Selection** is enabled. (default: `Bold-Italic`)
 * `Default Format Type:` specifies which format type the graphical dialogue should default to every new session. After that, it will remember the last format applied. (default: `Bold-Italic`)

## Use with Caution :warning:
> // And under no circumstances ⌧⌧⌧⌧⌧⌧⌧⌧⌧ ⌧⌧⌧⌧⌧ ⌧⌧⌧⌧⌧

That *would* defeat the point of emphasising an important comment, wouldn't it?

As previously stated, this won't work with every font, and most likely not at all with most CLI/terminal fonts (vim/emacs). It's probably not a good idea to try and use this in large collaborative projects... Ye be warned!
