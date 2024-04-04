import express from "express"
import dataBase from "./database/ormconfig"
import routes from "./routes"
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    console.log(
        dataBase.isInitialized ? 
        `Database Ok` : `Database loading`)
})