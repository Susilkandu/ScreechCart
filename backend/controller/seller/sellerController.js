const log = require("../../tools/log");
try {
  const { Seller } = require("../../modal/seller/sellerModal");
  const {
    sendOtp,
    encryptPassword,
    verifyOtp,
    jwtToken,
  } = require("../../tools/tools");
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const JWTKEYS = process.env.JWTKEYS;

  const verifyOtpAndCreateSellerAc = async (req, res) => {
    try {
      const { countryCode, mobile, otp } = req.body;
      if (!countryCode || !mobile || !otp) {
        return res
          .status(400)
          .json({ message: "Please Enter Valid Details", ackbool: 0 });
      }
      await verifyOtp(countryCode, mobile, otp)
        .then(async (result) => {
          if (result == 1) {
            const mbl = { countryCode: countryCode, number: mobile };
            const data = new Seller({
              mobile: mbl,
              otp: otp,
            });
            const userdt = await data.save();
            const token = await jwtToken(userdt._id);
            return res
              .status(200)
              .json({
                message: "Seller Account Has Been Created ",
                ackbool: 1,
                token: token,
              });
          }
        })
        .catch((error) => {
          error == 0
            ? res
                .status(400)
                .json({ message: "Invalid Otp", ackbool: 0, error: error })
            : res
                .status(409)
                .json({
                  message: "Your Account is Already Exist",
                  ackbool: 0,
                  error: error,
                });
        });
    } catch (error) {
      log(error);
      return res
        .status(500)
        .json({
          message: "Some Internal Server Error Occured",
          ackbool: 0,
          error: error,
        });
    }
  };
  const saveInfo = async (req, res) => {
    try {
      const { name, email, address, password } = req.body;
      if (!name || !email || !address || !password) {
        return res
          .status(400)
          .json({ message: "Insufficient parameters provided" ,error:'Insufficient parameters',ackbool:0});
      }
      const hsdpassd = await encryptPassword(password);
      const objdata = {};
      name && (objdata.name = name);
      email && (objdata.email = email);
      address && (objdata.address = address);
      password && (objdata.password = hsdpassd);
      try {
        await Seller.findOneAndUpdate(
          { _id: req.seller._id },
          { $set: objdata },
          { new: true }
        );
        return res.status(200).json({ message: "Saved", ackbool: 1 });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Some Error Occured ", error: error, ackbool: 0 });
      }
    } catch (error) {
      log(error);
    }
  };
  const loginSellerAc = async (req, res) => {
    try {
      const { mobile, password } = req.body;
      if (!mobile || !password) {
        return res
          .status(400)
          .json({ message: "Please Enter Valid Mobile Number and Password",ackbool:0});
      } else {
        await Seller.findOne({ mobile: mobile })
          .then((data) => {
            if (data !== null || undefined) {
              bcrypt.compare(password, data.password).then((result) => {
                if (result) {
                  const token = jwt.sign({ _id: data._id }, JWTKEYS, {
                    expiresIn: "5d",
                  });
                  return res.status(200).json({ key: token, ackbool: 1 });
                } else {
                  return res
                    .status(401)
                    .json({
                      message:
                        "Sir Please Enter Valid Mobile Number and Password",
                      ackbool: 0,
                    });
                }
              });
            } else {
              return res
                .status(401)
                .json({
                  message: "Please Enter Valid Mobile Number and Password",
                  ackbool: 0,
                });
            }
          })
          .catch((error) => {
            return res
              .status(401)
              .json({
                message: "Please Enter Valid Mobile Number and Password",
                error: error,
                ackbool: 0,
              });
          });
      }
    } catch (error) {
      log(error);
    }
  };
  const updateProfilePhoto = async (req, res) => {
    try {
      const { photoUrl } = req.body;
      if (!photoUrl) {
        return res.json({ message: "Photo Url Not Gotten", ackbool: 0 });
      } else {
        await Seller.findByIdAndUpdate(
          req.seller._id,
          { $set: { profilePhoto: photoUrl } },
          { new: true }
        )
          .then((data) => {
            data != null
              ? res
                  .status(200)
                  .json({ message: "Profile Updated Succussfully", ackbool: 1 })
              : res
                  .status(400)
                  .json({
                    message: "Some Error Occured Due To Saving",
                    ackbool: 0,
                  });
          })
          .catch((error) => {
            return res
              .status(400)
              .json({
                message: "Some Error Occured Due To Saving",
                ackbool: 0,
                error: error,
              });
          });
      }
    } catch (error) {
      log(error);
      return res.json({
        message: "Some Internal Error Occured",
        ackbool: 0,
        error: error,
      });
    }
  };
  const myProfile = async (req, res) => {
    try {
      await Seller.findById(req.seller._id)
        .select("-password")
        .then((data) => {
          if (!data) {
            return res
              .status(404)
              .json({ message: "Details Not Found", ackbool: 0 });
          }
          return res.status(200).json({ data, ackbool: 1 });
        })
        .catch((error) => {
          return res
            .status(400)
            .json({
              message: "Some Error occured While Fetching",
              error: error,
              ackbool: 0,
            });
        });
    } catch (error) {
      log(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", error: error, acklbool: 0 });
    }
  };
  const sendOtpForResetPasd = async (req, res) => {
    try {
      const { countryCode, mobile } = req.body;
      if (!countryCode || !mobile) {
        return res
          .status(400)
          .json({
            message: "Please Select Country Code and Enter Mobile Number",
            ackbool: 0,
          });
      }
      const data = await Seller.findOne({
        "mobile.countryCode": countryCode,
        "mobile.number": mobile,
      });
      if (data == null || data == undefined) {
        return res
          .status(404)
          .json({
            message: "Account Not Exist . Create New Account",
            ackbool: 0,
          });
      }
      const msg = "Otp for Reset Password";
      await sendOtp(req, res, msg)
        .then(async (generatedOtp) => {
          const OTP = new Otp({
            countryCode,
            mobile,
            otp: generatedOtp,
          });
          await OTP.save();
          return res
            .status(200)
            .json({
              messages: `Otp Sent to ${countryCode}${mobile}`,
              ackbool: 1,
              expires: 2,
            });
        })
        .catch((error) => {
          return res
            .status(500)
            .json({
              messages: "Failed to Send Otp Please Try After Some Time",
              error: error,
              ackbool: 0,
            });
        });
    } catch (error) {
      log(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", error: error, acklbool: 0 });
    }
  };
  const verifyOtpAndUpdatePasd = async (req, res) => {
    try {
      const { countryCode, mobile, otp, password } = req.body;
      if (!countryCode || !mobile || !otp || !password) {
        return res
          .status(400)
          .json({ message: "Please fill up All Parameter", ackbool: 0 });
      }
      await verifyOtp(countryCode, mobile, otp)
        .then(async (result) => {
          if (result == 1) {
            const hasdPsd = await encryptPassword(password);
            await Seller.findOneAndUpdate(
              { "mobile.countryCode": countryCode, "mobile.number": mobile },
              { $set: { password: hasdPsd } }
            );
            await sendOtp(req, res, "Your Password Updated Succussfully");
            return res
              .status(201)
              .json({ message: "Password Updated Succussfully" });
          }
        })
        .catch((error) => {
          return res
            .status(400)
            .json({ messages: "Invalid Otp", error: error, ackbool: 0 });
        });
    } catch (error) {
      log(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", error: error, acklbool: 0 });
    }
  };

  module.exports = {
    verifyOtpAndCreateSellerAc,
    saveInfo,
    loginSellerAc,
    updateProfilePhoto,
    myProfile,
    sendOtpForResetPasd,
    verifyOtpAndUpdatePasd,
  };
} catch (error) {
  log(error);
}
