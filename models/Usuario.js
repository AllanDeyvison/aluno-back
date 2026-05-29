const db = require('./db');

const Usuario = db.sequelize.define('usuario', {
    id_usuario: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING(255)
    },
    email: {
        type: db.Sequelize.STRING(255)
    },
    senha: {
        type: db.Sequelize.STRING(255)
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Usuario;