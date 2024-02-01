import NaoEncontrado from '../erros/NaoEncontrado.js';
import { autor } from '../models/index.js';

class AutoresController {

  static async listarAutores(req, res, next) {
    try {
      const buscaAutores = autor.find();

      req.resultado = buscaAutores;
      next();
    } catch (e) {
      next(e);
    }
  }

  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado('Id do autor não localizado..'));
      }
    } catch (e) {
      next(e);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: 'Autor cadastrado!', autor: novoAutor });
    }
    catch (e) {
      next(e);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'Autor atualizado com sucesso!', autor: req.body });
    } catch (e) {
      next(e);
    }
  }

  static async deletarAutor(req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: 'Autor removido com sucesso!' });
    } catch (e) {
      next(e);
    }
  }

}

export default AutoresController;