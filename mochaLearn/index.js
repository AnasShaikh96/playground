const index = (a = 0, b = 0) => {

  if (typeof a !== 'number' || typeof b !== 'number') {
    return 0
  }

  return a + b
}

module.exports = { index } 