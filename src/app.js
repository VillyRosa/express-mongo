import express from 'express';
import conectaNaDatabase from './config/dbConnect.js';
import routes from './routes/index.js';
import manipuladorDeErros from './middlewares/manipuladorDeErros.js';
import manipulador404 from './middlewares/manipulador404.js';

const conexao = await conectaNaDatabase();

conexao.on('error', (erro) => {
  console.error('Erro ao se conectar ao MongoDB Atlas', erro);
});

const app = express();
routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;