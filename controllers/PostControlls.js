const express = require('express');
const router = express.Router();

//Importando o módulo de Post
const Post = require('../models/Post');

//Busca Post (GET)
router.get('/', async (req, res) => {
    const posts = await Post.findAll();
    res.status(200).json(posts);
});

//Cadastra Post (POST)
router.post('/', async (req, res) => {
    const { titulo } = req.body;
    const { conteudo } = req.body;
    const { fk_tema } = req.body;
    const newEdit = await Post.create({ titulo, conteudo, fk_tema })
    res.status(201).json({ message: 'Post cadastrado com sucesso' });
});

//Busca Post por id (GET)
router.get('/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    res.status(200).json(post);
});

//Deleta Post por id (DELETE)
router.delete('/:id', async (req, res) => {
    await Post.destroy({
        where: { id_post: req.params.id },
    });
    res.status(200).json({ message: 'Post excluído com sucesso' })
});

//Altera Post por ID (PUT)
router.put('/:id', async (req, res) => {
    const { titulo } = req.body;
    const { conteudo } = req.body;
    const { fk_tema } = req.body;
    await Post.update(
        { titulo, conteudo, fk_tema },
        {
            where: { id_post: req.params.id },
        }
    );
    res.status(200).json({ message: 'Post atualizado com sucesso' });
});


module.exports = router;