const {response} = require('express')
const Producto = require('../modelos/Product')

const obtenerTodosProductos = async (req, res = response) => {
    
    try {
        const productos = await Producto.find({})
      //  console.log(productos)
        return res.json({
            ok: true,
            productos 
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'error en el servidor'
        })
    }
    
    

}
const crearProducto = async (req, res) => {
    console.log(req.body.nombre, req.body.precio, req.id);
    const product = {
        nombre : req.body.nombre,
        precio : req.body.precio,
        id_usuario : req.id
    }
    const producto = new Producto(product)
    try {
        await producto.save()
    return res.status(201).json({
        ok: true, 
        producto
    })
    } catch (error) {
        console.log(error)
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'error en el servidor'
        })
    }
    
}
module.exports = { obtenerTodosProductos, crearProducto }
