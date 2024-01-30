import livro from '../models/Livro.js';
import { autor } from '../models/Autor.js';

class LivroController {

    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: `${e.message} - falha ao resgatar os livros.` });
        }
    };

    static async listarLivroPorId(req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: `${e.message} - falha ao resgatar o livro.` });
        }
    };

    static async cadastrarLivro(req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: {...autorEncontrado._doc} };
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: 'Livro cadastrado!', livro: livroCriado });
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ message: `${e.message} - falha ao cadastrar o livro.` });
        }
    };

    static async atualizarLivro(req, res) {
        const livroAtualizado = req.body;
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(livroAtualizado.autor);
            const livroCompleto = { ...livroAtualizado, autor: {...autorEncontrado._doc} };
            await livro.findByIdAndUpdate(id, livroCompleto);
            res.status(200).json({ message: 'Livro atualizado com sucesso!', livro: livroCompleto });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: `${e.message} - falha ao atualizar o livro.` });
        }
    };

    static async deletarLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: 'Livro removido com sucesso!' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: `${e.message} - falha ao deletar o livro.` });
        }
    };

    static async listarLivrosPorEditora(req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: `${e.message} - falha ao resgatar os livros.` });
        }
    }

};

export default LivroController;