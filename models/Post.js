const db = require('./db');

const Post = db.sequelize.define('post', {
    id_post: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: db.Sequelize.STRING(255)
    },
    conteudo: {
        type: db.Sequelize.TEXT
    },
    fk_tema: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'tema',
            key: 'id_tema'
        },
        onDelete: 'CASCADE',
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Post;