const router = require('express').Router()
const bcrypt = require('bcrypt')
const pool = require('../database/database.setup')
const {validateAuth} = require('../models/user.model')
const winston = require('winston');

router.post('/', async (req, res) => {
    const {error} = validateAuth(req.body)
    if(error) return res.status(400).send(`${error.name} : ${error.message}`)
    const {email, password} = req.body
    try {
        const {rows, rowCount} = await pool.query(`SELECT * FROM users WHERE email='${email}'`)
        if(!rowCount) return res.status(400).send(`Authentication Error : Invalid User Id or Password`)
        const isAuthenticated = await bcrypt.compare(password, rows[0].password)
        if(!isAuthenticated) return res.status(400).send(`Authentication Error : Invalid User Id or Password`)
        return res.status(200).json(rows[0])
    } catch ({name, message}) {
        winston.error(`${name} : ${message}`)
        return res.status(500).send('Something went Wrong!!!')
    }
})

module.exports = router