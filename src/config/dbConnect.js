import mongoose from 'mongoose';

async function conectaNaDatabase() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('Conectado ao MongoDB Atlas');
    return mongoose.connection;
  } catch (e) {
    console.error(e);
  }
}

export default conectaNaDatabase;