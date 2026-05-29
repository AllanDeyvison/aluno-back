const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');

const JWT_SECRET = process.env.JWT_SECRET;

function publicUser(usuario) {
	return {
		id_usuario: usuario.id_usuario,
		nome: usuario.nome,
		email: usuario.email,
	};
}

router.get('/', async (req, res) => {
	const usuarios = await Usuario.findAll();
	res.status(200).json(usuarios);
});

router.get('/:id', async (req, res) => {
	const usuario = await Usuario.findByPk(req.params.id);
	res.status(200).json(usuario);
});

router.post('/register', async (req, res) => {
	const { nome, email, senha } = req.body || {};

	if (!nome || !email || !senha) {
		return res.status(400).json({ message: 'nome, email e senha são obrigatórios' });
	}

	const existingUser = await Usuario.findOne({ where: { email } });

	if (existingUser) {
		return res.status(409).json({ message: 'Usuário já cadastrado' });
	}

	const hashedPassword = await bcrypt.hash(senha, 10);
	const usuario = await Usuario.create({ nome, email, senha: hashedPassword });

	res.status(201).json({ message: 'Usuário cadastrado com sucesso', usuario: publicUser(usuario) });
});

router.post('/login', async (req, res) => {
	const { email, senha } = req.body || {};

	if (!email || !senha) {
		return res.status(400).json({ message: 'email e senha são obrigatórios' });
	}

	const usuario = await Usuario.findOne({ where: { email } });

	if (!usuario) {
		return res.status(401).json({ message: 'Credenciais inválidas' });
	}

	const passwordMatches = await bcrypt.compare(senha, usuario.senha);

	if (!passwordMatches) {
		return res.status(401).json({ message: 'Credenciais inválidas' });
	}

	if (!JWT_SECRET) {
		return res.status(500).json({ message: 'JWT_SECRET não configurado' });
	}

	const token = jwt.sign(
		{
			id_usuario: usuario.id_usuario,
			nome: usuario.nome,
			email: usuario.email,
		},
		JWT_SECRET,
		{ expiresIn: '7d' }
	);

	res.status(200).json({
		message: 'Login realizado com sucesso',
		token,
		usuario: publicUser(usuario),
	});
});

router.delete('/:id', async (req, res) => {
	await Usuario.destroy({
		where: {
			id_usuario: req.params.id,
		},
	});

	res.status(200).json({ message: 'Usuário excluído com sucesso' });
});

module.exports = router;
