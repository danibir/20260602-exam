const fs = require('fs')

const obj = {
        key: "replaceMeNow",
        secret: "LoremIpsum",
        DBIp: "localhost",
        DBCollection: "node-default"
    }

const env_init = (overwrite = false) => {
    
    const envString = Object.entries(obj)
    .map(([k, v]) => `${k.toUpperCase()}=${v}`)
    .join('\n')
    
    if (fs.existsSync('./.env')) {  
        const oldEnv = fs.readFileSync('./.env').toString()

        if (!overwrite && oldEnv == envString) 
            console.log('! ! WARNING ! ! Configure file is still default! Reconfigure ./.env as soon as possible.')
        if (!overwrite && oldEnv != "") 
            return { success: true, message: '.env file already exists.'}
    }

    fs.writeFile('./.env', envString, (err)=>{ if (err) throw err })
    console.log('.env initialized (! reconfigure as soon as possible !)')
    return { success: true, message: '.env file successfully written.'}
}

module.exports = {
    env_init
}