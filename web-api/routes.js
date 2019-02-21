module.exports = function(app) {
  let productsCtrl = require('./controllers/ProductsController'),
  tokenCtrl = require('./controllers/token');
  //check token
  app.route('/token')
    .get(tokenCtrl.get);
    //.post(tokenCtrl.store);

  // todoList Routes
  app.route('/products')
    .get(productsCtrl.get)
    .post(productsCtrl.store);

  app.route('/products/:productId')
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);
};