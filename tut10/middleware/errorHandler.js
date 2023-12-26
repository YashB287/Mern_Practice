
/*
    Always remember that when importing a custom module if we have exported more than one
    functions from the module file and we only want to import one function we have to use curly
    brace syntax like as given below { logEvents }.
*/
const { logEvents }  = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    res.status(500).send(err.message);
}

module.exports = errorHandler;