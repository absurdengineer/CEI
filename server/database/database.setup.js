const Pool = require('pg').Pool
const config = require('config')
const winston = require('winston')

const pool = new Pool({
    host : config.get('PGHOST'),
    user : config.get('PGUSER'),
    database : config.get('PGDATABASE'),
    password : config.get('PGPASSWORD'),
    port : config.get('PGPORT')
})

pool.connect()
    .then( () => winston.info(`Connected to ${config.get('PGDATABASE')} as ${config.get('PGUSER')} over port ${config.get('PGPORT')}`) )
    .catch( ({name, message}) => winston.error(`${name} : ${message}`))

module.exports = pool