const db = require('./db');

const Proprietario = db.sequelize.define('proprietario', {
    id_proprietario: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING(255)
    },
    cpf: {
        type: db.Sequelize.STRING(14)
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Proprietario;