import { Router } from 'express';
import { LojasController, PedidosController, PedidosProdutoController, ProdutosController, UsuariosController } from '../controllers';

const router = Router()

//Loja
router.get('/store-data/:id', LojasController.getStoreDataValidation, LojasController.getStoreData)                         //  A API deverá fornecer um endpoint GET para retornar dados da loja
router.put('/store-data/:id', LojasController.updateStoreByIdValidation, LojasController.updateStoreById)                   //  A API deverá fornecer um endpoint PUT para atualizar dados da loja

//Pedidos
router.get('/order/:id', PedidosController.getOrderByIdValidation, PedidosController.getOrderById)                        //  A API deverá fornecer um endpoint GET para retornar detalhes de um pedido
router.get('/orders', PedidosController.getAllOrdersValidation, PedidosController.getAllOrders)                           //	A API deverá fornecer um endpoint GET para retornar todos os pedidos cadastrados
//router.post('/order/create', PedidosController.createOrderValidation, PedidosController.createOrder)                    //  A API deverá fornecer um endpoint POST para criar um novo pedido
//router.put('/order/:id', PedidosController., PedidosController.)                        //  A API deverá fornecer um endpoint PUT para alterar o status do pedido
//router.post('/order/:id', PedidosController., PedidosController.)                       //  A API deverá fornecer um endpoint POST para inserir os dados básicos para realização do pedido

//PedidosProdutos
// router.get('/order-products/:order-id', PedidosProdutoController.getOrderProductsDataValidation, PedidosProdutoController.getOrderProductsData)         //  A API deverá fornecer um endpoint GET para retornar produtos de um pedido

// //Produtos
// router.get('/products', ProdutosController)                         //  A API deverá fornecer um endpoint GET para retornar todos os produtos cadastrados
// router.get('/product/:id', ProdutosController)                      //  A API deverá fornecer um endpoint GET para retornar dados de um único produto
// router.get('/products/:status', ProdutosController)                 //  A API deverá fornecer um endpoint GET para retornar todos os produtos com status iguais
// router.post('/product/create', ProdutosController)                  //  A API deverá fornecer um endpoint POST para criar um novo produto
// router.put('/product/:id', ProdutosController)                      //  A API deverá fornecer um endpoint PUT para atualizar o produto
// router.delete('/product/:id', ProdutosController)                   //  A API deverá fornecer um endpoint DELETE para excluir um produto

// //Usuarios
// router.get('/user/:id', UsuariosController, UsuariosController)                         //  A API deverá fornecer um endpoint GET para retornar dados do usuário
// router.put('/user/:id', UsuariosController, UsuariosController)                         //  A API deverá fornecer um endpoint PUT para atualizar dados do usuário
// router.delete('/user:id', UsuariosController, UsuariosController)                       //  A API deverá fornecer um endpoint DELETE para excluir o registro da pessoa
// router.post('/login', UsuariosController, UsuariosController)                           //  A API deverá fornecer um endpoint POST para autenticar o login do usuário
// router.post('/register', UsuariosController, UsuariosController)                        //  A API deverá fornecer um endpoint POST para cadastrar um usuário no banco


export { router }