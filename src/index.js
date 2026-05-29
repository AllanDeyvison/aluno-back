require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const db = require('../models/db');

//protocolo de comunicacão entre apis e outros serviços cors
//CORS: autoriza para qualquer tipo de serviço (front-end, outras apis,etc)
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

//Rotas
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Função CORS para a autorização do uso da API
app.use(cors())
app.get('/', (req, res)=> res.send('Estou aqui'))

async function start() {
	await db.ensureDatabaseExists();

	//importações das rotas
	const proprietario = require('../controllers/ProprietarioControlls.js');
	const veiculo = require('../controllers/VeiculoControlls.js');
	const usuario = require('../controllers/UsuarioControlls.js');

	app.use('/proprietario', proprietario);
	app.use('/veiculo', veiculo);
	app.use('/usuario', usuario);

	await db.sequelize.authenticate();
	await db.sequelize.sync();

	app.listen(port, '0.0.0.0', () => console.log(`Servidor rodando porta ${port}!`));
}

start().catch((error) => {
	console.error('Falha ao iniciar o servidor:', error);
	process.exit(1);
});




