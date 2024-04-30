const log = require('../../tools/log');
try {
  const bcrypt = require('bcrypt');
  const Otp = require('../../modal/otp/otpModal');
  const { User } = require('../../modal/user/userModal');
  const { sendOtp, verifyOtp, jwtToken, encryptPassword } = require('../../tools/tools');


  // controller member body
  const sendOtpViaSms = async (req, res) => {  //Controller for SendOtpViaSms 
    try {
      const { countryCode, mobile } = req.body;
      if (!countryCode || !mobile) {
        return res.status(400).json({ message: 'Please Enter valid country code and Mobile Number', ackbool:0 });
      }
      const msg = `Your one-time verification code for ScreechCart account creation. Keep it confidential and enjoy seamless shopping! Please Do not share OTP with anyone `;
      await sendOtp(req, res, msg).then(async (generatedOtp) => {
        const OTP = new Otp({
          countryCode,
          mobile,
          otp: generatedOtp
        });
        await OTP.save();
        return res.status(200).json({ message: 'Otp Sent to The Mobile Number', ackbool: 1, expires: 2 });
      }).catch((error) => {
        return res.status(400).json({ message: 'Failed to Send Otp Please Try After Some Time', error: error, ackbool: 0 });
      })

    } catch (error) {
      log(error);
    }
  }

  const verifyOtpAndCreateAc = async (req, res) => {    //Controller for Verify Otp And Creat New Account
    try {
      const { countryCode, mobile, otp } = req.body;
      if (!countryCode || !mobile || !otp) {
        return res.status(400).json({ message: 'Please Enter Valid Details', ackbool: 0 });
      }
      await verifyOtp(countryCode, mobile, otp).then(async (result) => {
        if (result == 1) {
          const mbl = { countryCode: countryCode, number: mobile };
          const data = new User({
            mobile: mbl,
            otp: otp
          });
          const userdt = await data.save();
          const token = await jwtToken(userdt._id);
          return res.status(200).json({ message: "Your Account Has Been Created Succussfully", ackbool: 1, token: token });
        }
      }).catch((error) => {
        error == 0 ? res.status(400).json({ message: "Invalid Otp", ackbool: 0, error: error }) : res.status(409).json({ message: "Your Account is Already Exist", ackbool: 0, error: error });
      })
    } catch (error) {
      return res.status(500).json({ message: "Some Internal Server Error Occured", ackbool: 0, error: error });
    }

  }
  const saveInfo = async (req, res) => {
    try {
      const { name, email, password, address } = req.body;
      if (!name && !email && !password && !address) {
        return res.status(400).json({ message: "Please Fill Atlease One Field", ackbool: 0 });
      }
      const objdata = {};
      name && (objdata.name = name);
      email && (objdata.email = email);
      address && (objdata.address = address);
      password && (objdata.password = await encryptPassword(password));
      await User.findOneAndUpdate({ _id: req.user._id }, { $set: objdata }, { new: true });
      return res.status(200).json({ message: "Updated Succussfully", ackbool: 1 });
    } catch (error) {
      return res.status(400).json({ message: "Some Error Occured due To updation", ackbool: 0, error: error.message });
    }
  }
  const sendOtpForResetPasd = async (req, res) => {
    try {
      const { countryCode, mobile } = req.body
      if (!countryCode || !mobile) {
        return res.status(400).json({ message: 'Please Select Country Code and Enter Mobile Number', ackbool: 0 });
      }
      const data = await User.findOne({ "mobile.countryCode": countryCode, "mobile.number": mobile });
      if (data == null || data == undefined) {
        return res.status(404).json({ message: "Account Not Exist You Can Create New Account", ackbool: 0 });
      }

      const msg = ` OTP For Reset Password`;
      await sendOtp(req, res, msg).then(async (generatedOtp) => {
        const OTP = new Otp({
          countryCode,
          mobile,
          otp: generatedOtp
        });
        await OTP.save();
        return res.status(200).json({ messages: `Otp Sent to ${countryCode}${mobile}`, ackbool: 1, expires: 2 });
      }).catch((error) => {
        return res.status(500).json({ messages: 'Failed to Send Otp Please Try After Some Time', error: error, ackbool: 0 });
      })
    } catch (error) {
      log(error);
    }
  }
  const verifyOtpAndUpdatePasd = async (req, res) => {
    try {
      const { countryCode, mobile, otp, password } = req.body;
      if (!countryCode || !mobile || !otp || !password) {
        return res.status(400).json({ message: "Please fill up All Parameter", ackbool: 0 });
      }
      await verifyOtp(countryCode, mobile, otp).then(async (result) => {
        if (result == 1) {
          const hasdPsd = await encryptPassword(password);
          await User.findOneAndUpdate({ "mobile.countryCode": countryCode, "mobile.number": mobile }, { $set: { password: hasdPsd } });
          await sendOtp(req, res, "Your Password Updated Succussfully");
          return res.status(201).json({ message: "Password Updated Succussfully" });
        }
      }).catch((error) => {
        console.log(error);
        return res.status(400).json({ messages: 'Invalid Otp', error: error, ackbool: 0 });
      })
    } catch (error) {
      log(error);
    }
  }
  const loginUser = async (req, res) => {
    try {
      const { countryCode, mobile, password } = req.body;
      if (!countryCode || !mobile || !password) {
        return res.status(400).json({ message: "Please fill up All the parameter", ackbool: 0 });
      }
      await User.findOne({ "mobile.countryCode": countryCode, "mobile.number": mobile })
        .then((data) => {
          if (data !== null || data !== undefined) {
            bcrypt.compare(password, data.password).then(async (result) => {
              if (result) {
                const token = await jwtToken(data._id);
                return res.status(200).json({ key: token, ackbool: 1 });
              }
              return res.status(401).json({ message: "Invalid Password", ackbool: 0 });
            })
          }
        }).catch((error) => {
          return res.status(401).json({ message: "Please Enter Valid Credential", error: error, ackbool: 0 });
        })

    } catch (error) {
      log(error);
    }
  }
  const showMyProfile = async (req, res) => {
    try {
      await User.findById(req.user._id).select("-password")
        .then((data) => {
          if (!data || data <= 0) {
            return res.status(400).json({ message: "Details Not Found", ackbool: 0 });
          }
          return res.status(200).json({ data, ackbool: 1 })
        })
    } catch (error) {
      log(error);
      return res.status(500).json({ message: "Some Internal Error Occured", error: error, ackbool: 0 })
    }
  }

  // exporting controller modules
  module.exports = {
    sendOtpViaSms,
    verifyOtpAndCreateAc,
    saveInfo,
    sendOtpForResetPasd,
    verifyOtpAndUpdatePasd,
    loginUser,
    showMyProfile

  }
} catch (error) {
  log(error)
}