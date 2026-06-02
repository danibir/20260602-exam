const mongoose = require("mongoose")


const mainDb = mongoose.createConnection(
  `mongodb://${process.env.DBIP}:27017/${process.env.DBCOLLECTION}`
)

mainDb.on("connected", () => console.log("Main DB connected"))

module.exports = { 
    mainDb
}