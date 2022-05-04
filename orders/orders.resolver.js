const orderModel = require('./order.model');
module.exports = {
    Query: {
        orders: () => {
            return orderModel.getAllOrders()
        }
    }
}