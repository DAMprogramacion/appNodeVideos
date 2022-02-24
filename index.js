const express = require('express')
require('dotenv').config()
const auth = require('./rutas/auth')
const product = require('./rutas/product')

const { conexion } = require('./database/config')

//conexion a la BD
conexion()

//creación del servidor
const app = express()

//permitir escritura y lectura en json
app.use(express.json())

//ruta de la autenticacion
app.use('/api/users', auth )
app.use('/api/products', product )



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
})