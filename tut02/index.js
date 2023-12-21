/* ES6 way */
/* import fs from 'fs'
import path from 'path' */

/* Common module way */
const fsPromises = require('fs').promises;
const path = require('path');


// Converting data which is buffer mode to string using data.toString

/* fs.readFile('./Files/starter.txt', (err, data) => {
    if(err) throw err;
    console.log(data.toString());
}); */

/* Better way to print data in string format is by passing utf8 format as 
parameter so we don't need toString() function */

/* fs.readFile('./Files/starter.txt', 'utf8', (err, data) => {
    if(err) throw err;
    console.log(data);
}); */

fs.readFile(path.join(__dirname, 'Files', 'starter.txt'), 'utf8', (err, data) => {
    if(err) throw err;
    console.log(data);
});


/* This nesteing of multiple functions is done to avoid async nature of nodejs. We have nested 
the functions in our desired order to get our output in sequential way.

This is wrong way of doing things and it is called callback hell. 

We can avoid this similar to vanilla javascript by using async and await.*/

/* fs.writeFile(path.join(__dirname, 'Files', 'reply.txt'), 'Hey there!',(err) => {
    if(err) throw err;
    console.log('Write Sucessfull.');

    fs.appendFile(path.join(__dirname, 'Files', 'reply.txt'), '\n How are you doing?', (err) => {
        if(err) throw err;
        console.log('Append Sucessfull.');

        fs.rename(path.join(__dirname, 'Files', 'reply.txt'), path.join(__dirname, 'Files', 'new_reply.txt'), (err) => {
            if(err) throw err;
            console.log('Rename Sucessfull.');
        });

    });

}); */

/* This is to show async nature of NodeJS because as from output we can see that Yash output will be
printed first because it will take time to read data from starter file and by its async nature
nodejs will not wait so it will do other available task and will come back to print data from starter 
file */

console.log("Yash Bhaiya ki jai.");

// exit on uncaught errors
// we listen for this uncaughtException using process 
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error : ${err}`);
    process.exit(1);
});
