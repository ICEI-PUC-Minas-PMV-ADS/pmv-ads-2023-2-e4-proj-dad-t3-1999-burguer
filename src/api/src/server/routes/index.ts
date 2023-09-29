import { Router } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LojasController, PedidosController, PedidosProdutoController, ProdutosController, UsuariosController } from '../controllers';

const router = Router()

//Loja
router.get('/store-data/:id', LojasController.getStoreDataValidation, LojasController.getStoreData)                         //  A API deverá fornecer um endpoint GET para retornar dados da loja
router.put('/store-data/:id', LojasController.updateStoreByIdValidation, LojasController.updateStoreById)                   //  A API deverá fornecer um endpoint PUT para atualizar dados da loja

//Pedidos
router.get('/orders', PedidosController.getAllPedidosValidation, PedidosController.getAllPedidos)                           //	A API deverá fornecer um endpoint GET para retornar todos os pedidos cadastrados
router.get('/order/:id', PedidosController.getPedidoByIdValidation, PedidosController.getPedidoById)                        //  A API deverá fornecer um endpoint GET para retornar detalhes de um pedido
router.post('/order/create', PedidosController.createPedidoValidation, PedidosController.createPedido)                      //  A API deverá fornecer um endpoint POST para criar um novo pedido
router.put('/order/:id', PedidosController.updatePedidoByIdValidation, PedidosController.updatePedidoById)                  //  A API deverá fornecer um endpoint PUT para alterar o status do pedido

//PedidosProdutos
router.get('/order-products/:order-id', PedidosProdutoController.getOrderProductsDataValidation, PedidosProdutoController.getOrderProductsData)         //  A API deverá fornecer um endpoint GET para retornar produtos de um pedido

//Produtos
router.get('/products', ProdutosController.getAllProductValidation, ProdutosController.getAllProduct)                        //  A API deverá fornecer um endpoint GET para retornar todos os produtos cadastrados
router.get('/product/:id', ProdutosController.getAllProductByIdValidation, ProdutosController.getAllProductByIdValidation)   //  A API deverá fornecer um endpoint GET para retornar dados de um único produto
router.post('/product/create', ProdutosController.createProductValidation, ProdutosController.createProduct)                 //  A API deverá fornecer um endpoint POST para criar um novo produto
router.put('/product/:id', ProdutosController.updateProductByIdValidation, ProdutosController.updateProductById)             //  A API deverá fornecer um endpoint PUT para atualizar o produto
router.delete('/product/:id', ProdutosController.deleteProductByIdValidation, ProdutosController.deleteProductById)          //  A API deverá fornecer um endpoint DELETE para excluir um produto

// //Usuarios
// router.get('/user/:id', UsuariosController, UsuariosController)                         //  A API deverá fornecer um endpoint GET para retornar dados do usuário
// router.put('/user/:id', UsuariosController, UsuariosController)                         //  A API deverá fornecer um endpoint PUT para atualizar dados do usuário
// router.delete('/user:id', UsuariosController, UsuariosController)                       //  A API deverá fornecer um endpoint DELETE para excluir o registro da pessoa
// router.post('/login', UsuariosController, UsuariosController)                           //  A API deverá fornecer um endpoint POST para autenticar o login do usuário
// router.post('/register', UsuariosController, UsuariosController)                        //  A API deverá fornecer um endpoint POST para cadastrar um usuário no banco


export { router }