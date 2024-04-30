const router = require('express').Router();
const log = require("../../tools/log");
try {
    const { sendOtpViaSms, verifyOtpAndCreateAc, saveInfo, sendOtpForResetPasd, verifyOtpAndUpdatePasd, loginUser, showMyProfile } = require("../../controller/user/userController");
    const requireUserLogin = require('../../middleware/user/requireUserLogin');

    router.post('/sendOtp', sendOtpViaSms); //routes for Sending Otp
    router.post('/verifyOtpAndCreateAc', verifyOtpAndCreateAc);  //routes for verify Otp
    router.put('/saveInfo', requireUserLogin, saveInfo);  //routes for save User Info
    router.post('/sendOtpForResetPasd', sendOtpForResetPasd);    //routes for send Otp for Reset Password
    router.put('/verifyOtpAndUpdatePassword', verifyOtpAndUpdatePasd);   //routes for update User password
    router.post('/loginUser', loginUser);    //routes for login User
    router.get('/showMyProfile', requireUserLogin, showMyProfile)    //routes for Show Profile Details
} catch (error) {
    log(error);
}
module.exports = router;