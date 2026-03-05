import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './config/ConnectDB.js'

dotenv.config()

const port = process.env.PORT || 5000

connectDB()
app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
})