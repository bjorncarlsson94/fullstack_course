const info = (...params) => {
  if (process.env.NODE_ENV !== 'dev') {
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'dev') {
    console.error(...params)
  }
}

module.exports = {
  info,
  error,
}
