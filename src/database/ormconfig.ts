import { DataSource } from "typeorm"
import { join } from "path"

const dataBase = new DataSource({
    type: 'sqlite',
    database: './src/database/database.sqlite',
    logging: true,
    synchronize: true,
    entities: [
        join(__dirname, '..', 'models/*.{ts,js}')
    ]
})

dataBase.initialize()
.then(() => {
    console.log(`DB initialized!`)
}).catch(() => {
    console.log(`Failed to initialize database!`)
})

export default dataBase