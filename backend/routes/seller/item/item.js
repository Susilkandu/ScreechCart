const router = require('express').Router();
const log = require('../../../tools/log');
try {
    const { addItem, getItems, updateQty, deleteItemById, updateItem, addPhoto, deletePhoto, showOrders } = require('../../../controller/seller/item/itemController');
    const requireSellerLogin = require('../../../middleware/seller/requireSellerLogin');

    // Routes
    router.post('/addItem', requireSellerLogin, addItem);    //routes for adding New Item
    router.get('/getItems', requireSellerLogin, getItems);  //routes for getting items
    router.put('/updateQty', requireSellerLogin, updateQty); //routes for update quantity of item
    router.put('/updateItem', requireSellerLogin, updateItem); //routes for update Item Details except Photo
    router.put('/addPhoto', requireSellerLogin, addPhoto); //routes for add photo in of Item
    router.delete('/deletePhoto/:itemId/:photoUrl', requireSellerLogin, deletePhoto); //route for delete Item Photo
    router.delete('/deleteItem/:itemId', requireSellerLogin, deleteItemById); //routes for delete itme by item By Id
    router.get('/showOrders', requireSellerLogin, showOrders); //routes for Fetching Orders

} catch (error) {
    log(error);
}
module.exports = router;