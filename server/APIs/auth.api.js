const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const config = require('config')
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
        const token = jwt.sign(_.pick(rows[0],['id','name','email','role']), config.get('JSONPRIVATEKEY'))
        res.header('x-auth-token',token)
        return res.status(200).send(token)
    } catch ({name, message}) {
        winston.error(`${name} : ${message}`)
        return res.status(500).send('Something went Wrong!!!')
    }
})

module.exports = router