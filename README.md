# atom-uniform package

Emulate text formatting in Atom using symbols from the unicode character table's [Mathematical Alphanumeric Symbols](https://codepoints.net/mathematical_alphanumeric_symbols) block. The ability to display these symbols will depend on which font is being used. Atom's default font supports all the symbols in the `MAS` block and has good support for most commonly-used symbols.

The original purpose of this package was to enable the ability to emphasise certain parts of comments, but it can be used to create italic or bold text anywhere that formatting isn't traditionally allowed.

And in case you're wondering, the name `Uniform` is an acronym of **Uni**code **Form**at!

## Use with Caution :warning:
> // And under no circumstances ⌧⌧⌧⌧⌧⌧⌧⌧⌧ ⌧⌧⌧⌧⌧ ⌧⌧⌧⌧⌧

That *would* defeat the point of emphasising an important comment, wouldn't it?

As previously stated, this won't work with every font, and most likely not at all with most CLI/terminal fonts (vim/emacs). It's probably not a good idea to try and use this in large collaborative projects... Ye be warned!
