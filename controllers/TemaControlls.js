const express = require('express');
const router = express.Router();

//Importando o módulo de Tema
const Tema = require('../models/Tema');

//Busca Tema (GET)
router.get('/', async (req, res) => {
const temas = await Tema.findAll();
    res.status(200).json(temas);
});

//Cadastra Tema (POST)
router.post('/', async (req, res) => {
    const { nome } = req.body;
    const { descricao } = req.body;
    const newEdit = await Tema.create({ nome, descricao })
    res.status(201).json({ message: 'Tema cadastrado com sucesso' });
});

//Busca Tema por id (GET)
router.get('/:id', async (req, res) => {
const tema = await Tema.findByPk(req.params.id);
    res.status(200).json(tema);
});

//Deleta Tema por id (DELETE)
router.delete('/:id', async (req, res) => {
    await Tema.destroy({
        where: {
            id_tema: req.params.id,
        },
    });
    res.status(200).json({ message: 'Tema excluído com sucesso' })
});

//Altera Tema por ID (PUT)
router.put('/:id', async (req, res) => {
    const { nome } = req.body;
    const { descricao } = req.body;
    await Tema.update(
        { nome, descricao },
            {
                where: { id_tema: req.params.id },
            }
        );
    res.status(200).json({ message: 'Tema atualizado com sucesso' });
});

module.exports = router;