import colors from 'colors'
import express from 'express'
import router from './router'
import db from './config/dbt'

//conectar a base de datops

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue("Conexion existosa a la db"))
    } catch (error) {
        console.log(colors.red.bold("Hubo un error al conectar a la BD"))
    }
}

connectDB()

//  Instancia de express
const server = express()

//leer datos de formularios - habilitar lectura de jsons
server.use(express.json())

server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({ msg: 'DEsde api' })
})

export default server