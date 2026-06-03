const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');

const Aluno = require('../models/Usuario');

// configurar multer para salvar em /uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '..', 'uploads'));
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname);
		cb(null, Date.now() + '-' + file.fieldname + ext);
	}
});
const upload = multer({ storage: storage });

const JWT_SECRET = process.env.JWT_SECRET;

function publicAluno(aluno) {
	return {
		id_aluno: aluno.id_aluno,
		nome_completo: aluno.nome_completo,
		usuario_acesso: aluno.usuario_acesso,
		email_aluno: aluno.email_aluno,
		observacao: aluno.observacao,
		foto: aluno.foto,
		data_cadastro: aluno.data_cadastro,
	};
}

router.get('/', async (req, res) => {
	const alunos = await Aluno.findAll({
		order: [['data_cadastro', 'DESC']],
	});
	res.status(200).json(alunos.map(publicAluno));
});

router.get('/:id', async (req, res) => {
	const aluno = await Aluno.findByPk(req.params.id);
	res.status(200).json(aluno ? publicAluno(aluno) : null);
});

router.post('/register', upload.single('foto'), async (req, res) => {
	const {
		nome_completo,
		usuario_acesso,
		senha,
		email_aluno,
		observacao = null,
	} = req.body || {};

	// se enviou arquivo, gerar URL pública para salvar no DB
	let foto = null;
	if (req.file) {
		foto = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
	} else if (req.body.foto) {
		foto = req.body.foto; // aceitar também URL enviada
	}

	if (!nome_completo || !usuario_acesso || !senha || !email_aluno) {
		return res.status(400).json({
			message: 'nome_completo, usuario_acesso, senha e email_aluno são obrigatórios',
		});
	}

	const existingUser = await Aluno.findOne({
		where: {
			[Op.or]: [{ usuario_acesso }, { email_aluno }],
		},
	});

	if (existingUser) {
		return res.status(409).json({ message: 'Aluno já cadastrado' });
	}

	const senha_hash = await bcrypt.hash(senha, 10);
	const aluno = await Aluno.create({
		nome_completo,
		usuario_acesso,
		senha_hash,
		email_aluno,
		observacao,
		foto,
	});

	res.status(201).json({ message: 'Aluno cadastrado com sucesso', aluno: publicAluno(aluno) });
});

router.post('/login', async (req, res) => {
	const { usuario_acesso, email_aluno, senha } = req.body || {};

	if ((!usuario_acesso && !email_aluno) || !senha) {
		return res.status(400).json({ message: 'usuario_acesso ou email_aluno e senha são obrigatórios' });
	}

	const aluno = await Aluno.findOne({
		where: {
			[Op.or]: [
				usuario_acesso ? { usuario_acesso } : null,
				email_aluno ? { email_aluno } : null,
			].filter(Boolean),
		},
	});

	if (!aluno) {
		return res.status(401).json({ message: 'Credenciais inválidas' });
	}

	const passwordMatches = await bcrypt.compare(senha, aluno.senha_hash);

	if (!passwordMatches) {
		return res.status(401).json({ message: 'Credenciais inválidas' });
	}

	if (!JWT_SECRET) {
		return res.status(500).json({ message: 'JWT_SECRET não configurado' });
	}

	const token = jwt.sign(
		{
			id_aluno: aluno.id_aluno,
			nome_completo: aluno.nome_completo,
			usuario_acesso: aluno.usuario_acesso,
			email_aluno: aluno.email_aluno,
		},
		JWT_SECRET,
		{ expiresIn: '7d' }
	);

	res.status(200).json({
		message: 'Login realizado com sucesso',
		token,
		aluno: publicAluno(aluno),
	});
});

router.put('/:id', upload.single('foto'), async (req, res) => {
	const {
		nome_completo,
		usuario_acesso,
		senha,
		email_aluno,
		observacao,
	} = req.body || {};

	let foto = undefined;
	if (req.file) {
		foto = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
	} else if (req.body.foto !== undefined) {
		foto = req.body.foto;
	}

	const aluno = await Aluno.findByPk(req.params.id);

	if (!aluno) {
		return res.status(404).json({ message: 'Aluno não encontrado' });
	}

	if (usuario_acesso || email_aluno) {
		const conflict = await Aluno.findOne({
			where: {
				id_aluno: { [Op.ne]: req.params.id },
				[Op.or]: [
					usuario_acesso ? { usuario_acesso } : null,
					email_aluno ? { email_aluno } : null,
				].filter(Boolean),
			},
		});

		if (conflict) {
			return res.status(409).json({ message: 'usuario_acesso ou email_aluno já cadastrado' });
		}
	}

	const updates = {};

	if (nome_completo !== undefined) updates.nome_completo = nome_completo;
	if (usuario_acesso !== undefined) updates.usuario_acesso = usuario_acesso;
	if (email_aluno !== undefined) updates.email_aluno = email_aluno;
	if (observacao !== undefined) updates.observacao = observacao;
	if (foto !== undefined) updates.foto = foto;
	if (senha !== undefined) updates.senha_hash = await bcrypt.hash(senha, 10);

	await Aluno.update(updates, {
		where: { id_aluno: req.params.id },
	});

	const alunoAtualizado = await Aluno.findByPk(req.params.id);
	res.status(200).json({ message: 'Aluno atualizado com sucesso', aluno: publicAluno(alunoAtualizado) });
});

router.delete('/:id', async (req, res) => {
	await Aluno.destroy({
		where: {
			id_aluno: req.params.id,
		},
	});

	res.status(200).json({ message: 'Aluno excluído com sucesso' });
});

module.exports = router;
