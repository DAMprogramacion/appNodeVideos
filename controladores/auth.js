const {response} = require('express')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const Usuario = require('../modelos/Usuario')
const { generarJWT } = require('../helper/jwt')
const registrar =  async (req, res = response) => {
    const { email, password } = req.body
    try {
        let usuario = await Usuario.findOne({ email })
        //console.log(usuario)
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                mensaje : 'usuario ya existe en la BD'
            })
        }
        usuario = new Usuario(req.body)
        usuario.password = bcrypt.hashSync(password, salt)
        await usuario.save()
        //generar token
        const token = await generarJWT(usuario.id, usuario.nombre)
        return res.status(201).json({
            ok : true,
            mensaje: "registro",
            nombre: usuario.nombre,
            email: usuario.email,
            token
    })
    } catch (error) {
        //console.log(error)
        res.status(500).json({
            ok: false,
            mensaje: 'error en el servidor'
        })
    }
    
}

const loguear = async (req, res = response) => {

    const {email, password }= req.body
    try {
        let usuario = await Usuario.findOne({ email })
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                mensaje : 'usuario no existe en la BD'
            })
        }
        if (! bcrypt.compareSync(password, usuario.password) ) {
            return res.status(400).json({
                ok: false,
                mensaje : 'credenciales erróneas'
            })
        }
        //generar token
        const token = await generarJWT(usuario.id, usuario.nombre)
        return res.json({
            ok : true,
            mensaje: "login",
            email,
            id: usuario.id,
            token
        })
    } catch {
        res.status(500).json({
            ok: false,
            mensaje: 'error en el servidor'
        })
    }
    
    
}

const revalidar = async (req, res = response) => {
   const { id, nombre } = req
   const token = await generarJWT(id, nombre)
   res.json({
       ok: true,
       mensaje : 'revalidando token',
       token
   })
}

module.exports = {
    registrar, loguear, revalidar
}