import mongoose from 'mongoose'

const startDatabase = () => {
  /** Database Config **/
  const { DB_NAME, DB_SERVER } = process.env
  const DB_URI = `${DB_SERVER}/${DB_NAME}`

  /** Start Database **/
  mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log('there was an error in database connection')
    else console.log('Database started...')
  })
}

export default startDatabase
