const jwt = require('jsonwebtoken')

const generarJWT = ( id, nombre ) => {
    return new Promise ((resolve, reject) => {
        const payload = { id, nombre }
        console.log(process.env.SECRET_KEY_JWT);
        jwt.sign( payload , process.env.SECRET_KEY_JWT, { expiresIn : '1h' },
        (err, token) => {
            if (err) {
                console.log(err)
                reject('No se puede generar el token')
            }
            resolve( token )
        })
    })
}

module.exports = { generarJWT }