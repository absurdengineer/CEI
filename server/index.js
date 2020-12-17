const { json } = require('express')
const express =  require('express')
const cors = require('cors')
const winston = require('winston')
const users = require('./APIs/users.api')

const app = express()

//* Middlewares
app.use(json())
app.use(cors())

//* Settings
const port = process.env.PORT || 8080
if (process.env.NODE_ENV !== 'production') {
    winston.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
} else 
winston.add(new winston.transports.File({ filename: 'logfile.log' }));

//* Routes
app.use('/api/users', users)

//* Handling uncaughtExceptions
process.on('uncaughtException', (ex) => {
    console.log(`Node got an Unhandled Exception.`)
    winston.error(ex.message,ex)
    process.exit(1)
})

//* Handling unhandledRejections
process.on('unhandledRejection', (ex) => {
    console.log(`Node got an Unhandled Rejection.`)
    winston.error(ex.message,ex)
    process.exit(1)
})

app.listen(port, () => {
    winston.info(`Listening on Port ${port}`)
    winston.info(`Server Started at http://127.0.0.1:${port}/`)
})