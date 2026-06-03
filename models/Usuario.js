const db = require('./db');

const Aluno = db.sequelize.define('alunos', {
    id_aluno: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_completo: {
        type: db.Sequelize.STRING(150),
        allowNull: false
    },
    usuario_acesso: {
        type: db.Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    senha_hash: {
        type: db.Sequelize.STRING(255),
        allowNull: false
    },
    email_aluno: {
        type: db.Sequelize.STRING(150),
        allowNull: false,
        unique: true
    },
    observacao: {
        type: db.Sequelize.STRING(500),
        allowNull: true
    },
    foto: {
        type: db.Sequelize.STRING(255),
        allowNull: true
    },
    data_cadastro: {
        type: db.Sequelize.DATE,
        allowNull: false,
        defaultValue: db.Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Aluno;