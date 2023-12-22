const fs = require('fs');
const path = require('path');

const rs = fs.ReadStream(path.join(__dirname, 'Files', 'lorem.txt'), {encoding : 'utf8'});

const ws = fs.WriteStream(path.join(__dirname, 'Files', 'new-lorem.txt'));


/* We have to listen to the data here comming from our readable stream. We are listening in the forms of small chunks we can use those chunks to log out data on console or we can use our previously created write stream to write on these datachunks. */

/* rs.on ('data', (dataChunk)=>{
    ws.write(dataChunk);
}); */

/* More efficient way is to use pipe. */

rs.pipe(ws);