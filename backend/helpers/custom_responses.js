const sendResponseError = (statusCode, msg, res) => {
    res.status(statusCode || 400).send(!!msg ? {
      message: msg
    } : {
      message: 'Something went wrong'
    })
  }

module.exports = { sendResponseError }