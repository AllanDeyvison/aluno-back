const db = require('./db');

const Tema = db.sequelize.define('tema', {
    id_tema: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING(255)
    },
    descricao: {
        type: db.Sequelize.STRING(255)
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Tema;