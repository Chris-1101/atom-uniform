AtomUniformView = require '../lib/atom-uniform-view'

#  NOTE not entirely sure how to write specs for the view element ¯\_(ツ)_/¯

describe 'AtomUniformView', ->
  [atomUniformView] = []

  beforeEach ->
    atomUniformView = new AtomUniformView

  afterEach ->
    atomUniformView = null

  it 'returns a view element', ->
    expect(atomUniformView.element).toExist();
