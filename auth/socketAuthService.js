const { handleError, createError } = require("../utils/handleErrors");
const { verifyToken } = require("./providers/jwt");
const config = require("config");

const tokenGenerator = config.get("TOKEN_GENERATOR");

const ioAuth = (socket, next) => {
    if (tokenGenerator === "jwt") {
        try {
            const tokenFromClient = socket.handshake.query.token;
            if (!tokenFromClient) {
                const error = new Error("Please Login");
                return next(createError("Authentication", error, 401));
            }
            const userInfo = verifyToken(tokenFromClient);
            if (!userInfo) {
                const error = new Error("Unauthorize user");
                return next(createError("Authentication", error, 401));
            }
            socket.user = userInfo;
            return next();
        } catch (error) {
            return handleError(res, 401, error.message);

        }
    }

    return handleError(res, 500, "You did not use valid token generator");
};

module.exports = ioAuth;