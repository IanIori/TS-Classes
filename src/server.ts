import express from "express"
import dataBase from "./database/ormconfig"
import routes from "./routes"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    console.log(
        dataBase.isInitialized ? 
        `Database Ok` : `Database loading`)
})