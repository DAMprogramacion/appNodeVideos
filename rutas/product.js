const { Router } = require('express')
const {obtenerTodosProductos, crearProducto} = require('../controladores/product')
const { validarJWT } = require('../middleware/validar-token')

const router = Router()

router.get('/', obtenerTodosProductos)

router.post('/', validarJWT, crearProducto)

module.exports = router