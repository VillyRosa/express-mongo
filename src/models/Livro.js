import mongoose from 'mongoose';
import { autorSchema } from './Autor.js';

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { 
    type: String, 
    required: [true, 'O campo "titulo" é obrigatório.'] 
  },
  editora: { 
    type: String,
    required: [true, 'O campo "editora" é obrigatório.']
  },
  preco: { type: Number },
  paginas: { 
    type: Number,
    min: [10, 'O livro deve ter no mínimo 10 páginas.'],
    max: [5000, 'O livro deve ter no máximo 5000 páginas.']
  },
  autor: {
    type: [autorSchema],
    required: [true, 'O campo "autor" é obrigatório.']
  }
}, { versionKey: false });

const livro = mongoose.model('livros', livroSchema);

export default livro;