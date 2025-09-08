const errorCustomizer = {
    createError: (code, message, errors = []) => {
        const error = new Error(message);
        error.statusCode = code;
        error.data = errors;
        return error;
    }
}

export default errorCustomizer;