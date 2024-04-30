const log = require("../../tools/log");
try {
  const jwt = require("jsonwebtoken");
  const JWTKEYS = process.env.JWTKEYS;
  const { Seller } = require("../../modal/seller/sellerModal");

  module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .json({
          message: "Session Expired , Please Login",
          error: "You must have do Login For post in",
          ackbool: 0,
        });
    } else {
      const token = authorization;
      jwt.verify(token, JWTKEYS, async (err, payload) => {
        if (err) {
          return res
            .status(401)
            .json({
              message: "Session Expired , Please Login",
              error: "You must have  logged in",
              ackbool: 0,
            });
        } else {
          const { _id } = payload;
          await Seller.findById(_id).then((sellerdata) => {
            req.seller = sellerdata;
            next();
          });
        }
      });
    }
  };
} catch (error) {
  log(error);
}
