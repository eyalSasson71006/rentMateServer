const { handleError, createError } = require("../utils/handleErrors");
const { verifyToken } = require("./providers/jwt");

const tokenGenerator = "jwt";

const auth = (req, res, next) => {
    if (tokenGenerator === "jwt") {
        try {
            const tokenFromClient = req.header("x-auth-token");
            if (!tokenFromClient) {
                const error = new Error("Please Login");
                return createError("Authentication", error, 401);
            }
            const userInfo = verifyToken(tokenFromClient);
            if (!userInfo) {
                const error = new Error("Unauthorize user");
                return createError("Authentication", error, 401);
            }
            req.user = userInfo;
            return next();
        } catch (error) {
            return handleError(res, 401, error.message);

        }
    }

    return handleError(res, 500, "You did not use valid token generator");
};

module.exports = auth;