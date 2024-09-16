const createError = (validator, errorObj)=>{
    errorObj.message = `${validator} Error: ${errorObj.message}`
    errorObj.status = errorObj.status || 400
    throw new Error(errorObj) 
}

const handleError = (res, status, message="")=>{
    console.log(message);
    return res.status(status).send(message);
}

module.exports = {createError, handleError}