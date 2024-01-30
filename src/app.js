import express from 'express';
import conectaNaDatabase from './config/dbConnect.js';
import routes from './routes/index.js';

const conexao = await conectaNaDatabase();

conexao.on('error', (erro) => {
    console.error('Erro ao se conectar ao MongoDB Atlas', erro);
});

const app = express();
routes(app);

export default app;
