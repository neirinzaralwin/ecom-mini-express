const bcrypt = require('bcrypt');
const User = require('../models/User')
const { sendResponseError } = require('../helpers/custom_responses')
const { newToken } = require('../helpers/jwt')
const { checkPassword } = require('../utils/utils')

const signUpUser = async (req, res) => {
    const {email, fullName, password} = req.body
    try{
        const hash = await bcrypt.hash(password, 8)
        await User.create({...req.body, password: hash})
        res.status(201).send({message: 'Sucessfully registerd'})
    }catch(e){
        console.error(e)
        sendResponseError(500, 'server error', res)
    }
}

const signInUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if(!!!user){
            sendResponseError(400, 'There is no account with this email', res)
        }
        const same = await checkPassword(password, user.password)
        if (same) {
            let token = newToken(user)
            res.status(200).send({message: 'Sign in successful', token})
            return
        }
        sendResponseError(400, 'Incorrect password', res)

    }catch(e){
        console.error(e)
        sendResponseError(500, 'server error', res)
    }

    

    
}
const getUser = async (req, res) => {
        res.status(200).send({user: req.user})
    }
    
module.exports = {signUpUser, signInUser, getUser}