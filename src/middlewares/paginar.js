import RequisicaoIncorreta from '../erros/RequisicaoIncorreta.js';

async function paginar(req, res, next) {
  try {
    let { limite = 5, pagina = 1, campoOrdenacao = '_id', ordem = -1 } = req.query;

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;

    if (limite > 0 && pagina > 0) {
      const resultadoPaginado = await resultado
        .sort({ [campoOrdenacao]: ordem })
        .skip((pagina - 1) * limite)
        .limit(parseInt(limite));
            
      res.status(200).json(resultadoPaginado);
    } else next(new RequisicaoIncorreta());
  } catch (e) {
    next(e);
  }
}

export default paginar;