const User = require('../models/User')
const { verifyToken } = require('../helpers/jwt')
const { sendResponseError } = require('../helpers/custom_responses')

const verifyUser = async (req, res, next) => {
    const {authorization} = req.headers
    if (!authorization) {
        return sendResponseError(401, 'Unauthorized access', res)
    } else if (!authorization.startsWith('Bearer')) {
        return sendResponseError(401, 'Unauthorized access', res)
    }
    try {
        const payload = await verifyToken(authorization.split(' ')[1])
        console.log(payload)
        if (payload) {
        // not include password
          const user = await User.findById(payload.id, {password: 0})
          req['user'] = user
          next()
        } else {
          sendResponseError(400, `you are not authorizeed`, res)
        }
      } catch (err) {
        console.log('Error ', err)
        sendResponseError(400, `Error ${err}`, res)
      }
}

module.exports = {
    verifyUser
  }