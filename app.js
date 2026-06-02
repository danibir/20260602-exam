require('./scripts/envScript').env_init()
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const os = require('os')
const path = require('path')
const env = require("dotenv")

const db = require('./handlers/han-db')

const mid_main = require('./middleware/mid-main')
const mid_auth = require('./middleware/mid-auth')

const app = express()

//routers

const rou_main = require('./routers/rou-main')
const rou_login = require('./routers/rou-login')
const rou_admin = require('./routers/rou-admin')

//handlers

const han_main = require('./handlers/han-main')

//config

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(helmet())
app.use(cookieParser())
app.use(mid_main.setLocals)

//Connecting to db and starting server

Promise.all([
    db.mainDb.asPromise()
])
.then(()=>{
    mid_main.dbSetStatus(true)
    console.log('Database connection success.')
})
.catch((err)=>{
    mid_main.dbSetStatus(false)
    console.log(`Database connection failure. Error: ${err}`)
    app.use((req, res) => {
        res.status(503).render('error', { error: "503 - Database down" })
    })
})
.finally(()=>{
    app.use(mid_auth.auth)

    app.use('/login', rou_login)
    app.use(mid_auth.authRestrain)
    app.use('/', rou_main)
    app.use('/admin', rou_admin)
    

    app.use((req, res) => {
        han_main.renderErrorPage(res, 404, "Kunne ikke finne side")
    })
    app.listen(3000, () => {
        console.log('Server is running on port 3000 and on', os.hostname())
    })
})