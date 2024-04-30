const router = require('express').Router();
const log = require('../../../tools/log');
try {
    const { getItem, initiatePayment, viewItemDetails, placeCODOrder, verifyPaymentAndPlaceOrder, showMyOrder } = require('../../../controller/user/item/itemController');
    const requireUserLogin = require('../../../middleware/user/requireUserLogin');
    // routes body
    router.get('/getItem', getItem);    //routes for get Item List
    router.get('/viewItemDetails', viewItemDetails);    //routes for view An Item Details
    router.post('/placeCODOrder', requireUserLogin, placeCODOrder); //routes for place COD Order
    router.post('/initiatePayment', requireUserLogin, initiatePayment); //routes for Initiate Payment
    router.post('/verifyPaymentAndPlaceOrder', requireUserLogin, verifyPaymentAndPlaceOrder);   //routes for Verify Payment And Place Order
    router.get('/showMyOrder',requireUserLogin,showMyOrder);

} catch (error) {
    console.log(error);
    log(error);
}
module.exports = router;