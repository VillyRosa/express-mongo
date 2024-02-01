import { livro, autor } from '../models/index.js';

class LivrosController {

  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();

      req.resultado = buscaLivros;
      next();
    } catch (e) {
      next(e);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (e) {
      next(e);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: {...autorEncontrado._doc} };
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: 'Livro cadastrado!', livro: livroCriado });
    }
    catch (e) {
      next(e);
    }
  }

  static async atualizarLivro(req, res, next) {
    const livroAtualizado = req.body;
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(livroAtualizado.autor);
      const livroCompleto = { ...livroAtualizado, autor: {...autorEncontrado._doc} };
      await livro.findByIdAndUpdate(id, livroCompleto);
      res.status(200).json({ message: 'Livro atualizado com sucesso!', livro: livroCompleto });
    } catch (e) {
      next(e);
    }
  }

  static async deletarLivro(req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: 'Livro removido com sucesso!' });
    } catch (e) {
      next(e);
    }
  }

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = processaBusca(req.query);

      const livrosPorEditora = livro.find(busca);
      req.resultado = livrosPorEditora;
      next();
    } catch (e) {
      next(e);
    }
  }

}

function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  const busca = {};
  
  if (editora) busca.editora = { $regex: new RegExp(editora, 'i') };
  if (titulo) busca.titulo = { $regex: new RegExp(titulo, 'i') };

  if (minPaginas || maxPaginas) busca.paginas = {};

  // gte = greater than or equal = maior ou igual
  if (minPaginas) busca.paginas.$gte = parseInt(minPaginas);
  // lte = less than or equal = menor ou igual
  if (maxPaginas) busca.paginas.$lte = parseInt(maxPaginas);

  if (nomeAutor) busca['autor.nome'] = { $regex: new RegExp(nomeAutor, 'i') };

  return busca;
}

export default LivrosController;