const bcryptjs = require('bcryptjs')
const User = require('../model/userModel')

const register = async (req, res) => {
    const { name, email, password } = req.body

    const hashedPassword = await bcryptjs.hash(password, 12)

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: 'User already exists, Kindly login.'})
        } else {
            const newUser = new User({ name, email, password:hashedPassword })
            try {
                await newUser.save()
                res.status(201).json({ message: 'User successfully created.' })
            } catch (error) {
                res.status(400).json({ message: 'Something went wrong!' })
            }
        }
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
}


const login = async (req, res) => {
    const { email, password } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({ email })
    } catch (error) {
        return res.status(400).json({ message: 'User does not exist!' })
    }

    let validPassword
    try {
        validPassword = await bcryptjs.compare(password, existingUser.password)
    } catch (error) {
        return res.status(400).json({ message: 'Invalid Credentials, Try again later' })
    }

    let loggedUser = existingUser && validPassword
    if (loggedUser) {
        res.status(200).json({ message: 'User logged in Successfully', user: existingUser } )
    }
    
}

const logout = (req, res) => {
    res.json({ message: 'LOGOUT'})
}

module.exports = { register, login, logout }