import RequisicaoIncorreta from './RequisicaoIncorreta.js';

class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro) {
    const mensagensErro = Object.values(erro.errors)
      .map((valor) => valor.message)
      .join('; ');

    super(`Os seguintes erros, foram encontrados: ${mensagensErro}`);
  }
}

export default ErroValidacao;