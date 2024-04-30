const router = require('express').Router();
const log = require('../../tools/log');
try {
    const { saveInfo, loginSellerAc, updateProfilePhoto, verifyOtpAndCreateSellerAc, sendOtpForResetPasd, verifyOtpAndUpdatePasd, myProfile } = require('../../controller/seller/sellerController');
    const { sendOtpViaSms } = require('../../controller/user/userController');
    const requireSellerLogin = require('../../middleware/seller/requireSellerLogin');

    // Routes
    router.post('/sendOtpViaSms', sendOtpViaSms);        // routes for sending Otp for creating new Seller Account
    router.post('/verifyOtpAndCreateSellerAc', verifyOtpAndCreateSellerAc);  // routes for verify Otp And Create New Account
    router.put('/saveInfo', requireSellerLogin, saveInfo);     // routes for creating seller account
    router.post('/loginSellerAc', loginSellerAc);        // routes for login SEller Account
    router.put('/updateProfilePhoto', requireSellerLogin, updateProfilePhoto);    // routes for update Seller Profile Photo
    router.get('/myProfile', requireSellerLogin, myProfile);    // routes for fetching my Profile details
    router.put('/sendOtpForResetPasd', sendOtpForResetPasd);     // routes for send Otp for Reset Password 
    router.put('/verifyOtpAndUpdatePasd', verifyOtpAndUpdatePasd);   // routes for Verify Otp And Update Password

} catch (error) {
    log(error);
}
module.exports = router;