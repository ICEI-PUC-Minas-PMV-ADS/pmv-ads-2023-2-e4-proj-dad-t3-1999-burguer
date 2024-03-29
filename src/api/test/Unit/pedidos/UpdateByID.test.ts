import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Pedido - UpdateByID', () => {

    let accessToken = ''
    let listagem;
    let pedido;
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })
        accessToken = signInResponse.body.accessToken

        listagem = await testServer
            .get('/api/v1/orders?page=1&limit=1')
            .set('Authorization', `Bearer ${accessToken}`)
            .send();

        if (listagem?.body.rows?.length) {
            pedido = listagem.body.rows[0];
        }

    })

    const novosDados = {
        status: false
    };

    it('Tenta atualizar um sem autenticação', async () => {
        const output = await testServer
            .put('/api/v1/order/1')
            .send({ endereco: 'Belo Horizonte' })

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(typeof output.body).toEqual('object')
    })



    it('Validar lista de pedidos', async () => {

        expect(listagem.statusCode).toEqual(StatusCodes.OK);
        expect(listagem.body).toHaveProperty('rows');
        expect(listagem.body).toHaveProperty('count');
        expect(listagem.body.rows.length).toEqual(1);
        expect(listagem.body.count).toBeGreaterThanOrEqual(1);
        expect(pedido);
        expect(pedido).toHaveProperty('id');

    });

    it('Atualizar pedido específico', async () => {

        const output = await testServer
            .put(`/api/v1/order/${pedido.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(novosDados)

        expect(output.statusCode).toEqual(StatusCodes.OK);

    });

    it('Get pedido específico', async () => {

        const output = await testServer
            .get(`/api/v1/order/${pedido.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.OK);
        expect(output.body).toHaveProperty('id');
    });

});