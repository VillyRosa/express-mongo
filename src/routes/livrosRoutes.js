import express from 'express';
import LivrosController from '../controllers/livrosController.js';
import paginar from '../middlewares/paginar.js';

const routes = express.Router();

routes.get('/livros', LivrosController.listarLivros, paginar);
routes.get('/livros/busca', LivrosController.listarLivrosPorFiltro, paginar);
routes.get('/livros/:id', LivrosController.listarLivroPorId);
routes.post('/livros', LivrosController.cadastrarLivro);
routes.put('/livros/:id', LivrosController.atualizarLivro);
routes.delete('/livros/:id', LivrosController.deletarLivro);

export default routes;