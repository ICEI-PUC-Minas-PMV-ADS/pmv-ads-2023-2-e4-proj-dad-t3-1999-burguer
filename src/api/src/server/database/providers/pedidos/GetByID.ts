import { IPedido } from '../../models';
import { database } from '../..';

export const getById = async (
    id: number
): Promise<IPedido | null | Error> => {

    try {

        const result = await database.pedido.findUnique({
            where: {
                id: Number(id),
            }
        });

        if (!result) {
            throw new Error('Pedido não encontrado!');
        }

        return result;

    } catch (err: any) {

        return new Error(`${err.message}`);

    } finally {

        await database.$disconnect();

    }

}