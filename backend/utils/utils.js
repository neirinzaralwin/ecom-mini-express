const bcrypt = require('bcrypt');

const checkPassword = (password, passwordHash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, passwordHash, (err, same) => {
        if (err) {
          reject(err)
        }
  
        resolve(same)
      })
    })
  }

module.exports = { checkPassword }  