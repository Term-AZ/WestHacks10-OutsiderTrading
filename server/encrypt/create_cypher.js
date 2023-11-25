const forge = require('node-forge')


const create_cypther = () =>{


    const entitySecret = forge.util.hexToBytes('ffd791be992648d67961a335aa78396a11c9478b6cf437e6c856a448faf43c48')
    const publicKey = forge.pki.publicKeyFromPem(process.env.PUBLIC_KEY)
    const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
        md: forge.md.sha256.create(),
    },
    })
    return forge.util.encode64(encryptedData)
}

module.exports = create_cypther