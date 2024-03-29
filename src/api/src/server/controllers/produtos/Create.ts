import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from './../../shared/middleware/Validator';
import { IProduto } from '../../database/models';
import { ProdutosProvider } from '../../database/providers/produtos';
import ProductImg from '../../mongo-database/models/ProductImg';

interface IBodyProps extends Omit<IProduto, 'id'> { }


export const createProductValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(5),
        descricao: yup.string().required().min(10),
        valor: yup.number().required().moreThan(0),
        status: yup.boolean().required(),
        imagem: yup.string().optional()
    }))
}));


// só entra aqui depois do handle request
export const createProduct = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const produto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        valor: req.body.valor,
        status: req.body.status
    };

    const result = await ProdutosProvider.create(produto);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    if (req.body.imagem) {

        const produtoImg = await ProductImg.create({
            product_id: +result['id'],
            url: req.body.imagem
        });

        result['imagem'] = produtoImg.url;

    }

    return res.status(StatusCodes.CREATED).send(result);

};