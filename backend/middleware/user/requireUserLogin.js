try {
    const log = require('../../tools/log');
    const jwt = require('jsonwebtoken');
    const JWTKEYS = process.env.JWTKEYS;
    const { User } = require('../../modal/user/userModal');
    module.exports = (async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                return res.status(401).json({ message: "You must have Login for Post" });
            }
            else {
                const token = authorization;
                jwt.verify(token, JWTKEYS, async (err, payload) => {
                    if (err) {
                        return res.status(401).json({ error: "You must have  logged in", ackbool: 0 });
                    }
                    else {
                        const _id = payload._id;
                        await User.findById(_id).then((userdata) => {
                            req.user = userdata;
                            next();
                        })
                    }
                })
            }
        } catch (error) {
            log(error)
        }
    })

} catch (error) {
    log(error);
}