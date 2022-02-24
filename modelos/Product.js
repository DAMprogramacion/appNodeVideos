const { Schema, model} = require('mongoose')

const ProductoSchema = new Schema({
    nombre : {
        type : String,
        required: true
    },
    precio : {
        type : Number,
        required : true
    },
    id_usuario : {
        type : Schema.Types.ObjectId,
        required : true
    }
})

const Producto = model('Producto' , ProductoSchema)

module.exports = Producto