const chalk = require("chalk");

const createError = (validator, errorObj, status = null) => {
    errorObj.message = `${validator} Error: ${errorObj.message}`;
    errorObj.status = status || errorObj.status || 400;
    throw new Error(errorObj);
}

const handleError = (res, status, message="")=>{
    console.log(chalk.redBright(message));
    return res.status(status).send(message);
}

module.exports = {createError, handleError}