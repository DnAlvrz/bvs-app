const mongoose = require('mongoose')

;

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/bvs')
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

module.exports = connectDatabase