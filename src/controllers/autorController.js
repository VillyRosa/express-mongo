import { autor } from '../models/Autor.js';

class AutorController {

    static async listarAutores(req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: `${e.message} - falha ao resgatar os autores.` });
        }
    };

    static async listarAutorPorId(req, res) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: `${e.message} - falha ao resgatar o autor.` });
        }
    };

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: 'Autor cadastrado!', autor: novoAutor });
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ message: `${e.message} - falha ao cadastrar o autor.` });
        }
    };

    static async atualizarAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'Autor atualizado com sucesso!', autor: req.body });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: `${e.message} - falha ao atualizar o autor.` });
        }
    };

    static async deletarAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({ message: 'Autor removido com sucesso!' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: `${e.message} - falha ao deletar o autor.` });
        }
    };

};

export default AutorController;