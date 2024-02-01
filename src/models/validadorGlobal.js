import mongoose from 'mongoose';

mongoose.Schema.Types.String.set('validate', {
  validator: (v) => v.length > 0,
  message: 'O campo {PATH} não pode ser vazio.'
});