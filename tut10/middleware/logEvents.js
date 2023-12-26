// ES6 way

/* import { format } from 'date-fns'; */

// CommonJS way

const { format } = require('date-fns');
const { v4 : uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path'); 


const logEvents = async (message, logName) => {

    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')} `;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);

    try {

        if(!fs.existsSync(path.join(__dirname, '..', 'logs')))
        {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs')); 
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
        //testing
    } catch (err) {

        console.error(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}\t${req.path}\n`, 'reqLog.txt')
     console.log(`${req.url}\t${req.method}\t${req.path}\n`);
    next();
};

module.exports = { logger, logEvents }; 
