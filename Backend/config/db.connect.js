const mongosh = require('mongosh')
require('dotenv').config();
async function dbconnect() {
    await mongosh.connect(process.env.MONGO_URL)
}

module.exports = dbconnect