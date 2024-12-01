// responseHelper.js
module.exports = {
    success: (res, message, data = null, statusCode = 200) => {
        return res.status(statusCode).json({
            status: 'success',
            message: message,
            data: data
        });
    },
    error: (res, message, error = null, statusCode = 500) => {
        return res.status(statusCode).json({
            status: 'error',
            message: message,
            error: error
        });
    }
};
