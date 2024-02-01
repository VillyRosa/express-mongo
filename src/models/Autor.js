import mongoose from 'mongoose';

const autorSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  nome: { 
    type: String, 
    required: [true, 'O campo "nome" é obrigatório.'], 
  },
  sexo: {
    type: String,
    required: [true, 'O campo "sexo" é obrigatório.'],
    enum: {
      values: ['F', 'M'],
      message: 'O campo "sexo" deve ser preenchido com "F" ou "M".'
    },
  },
  nascionalidade: { type: String }
}, { versionKey: false });

const autor = mongoose.model('autores', autorSchema);
export { autor, autorSchema };