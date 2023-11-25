const { v4: uuidv4 } = require('uuid');

const gen_uuid = () => {
    return uuidv4()
}

module.exports = gen_uuid