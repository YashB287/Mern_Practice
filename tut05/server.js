const logEvents = require('./logEvents');
const EventEmitter = require('events');
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

class MyEmitter extends EventEmitter {};

 // initialize object

 const myEmitter = new MyEmitter();

 // add listener for the log event

 myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

 /*  Now we need to define a port for our webserver.
 When hosting your application on another service (like Heroku, Nodejitsu, and AWS), your host may 
 independently configure the process.env.PORT variable for you; after all, your script runs in 
 their environment.
 Amazon's Elastic Beanstalk does this. If you try to set a static port value like 3000 
 instead of process.env.PORT || 3000 where 3000 is your static setting, then your application 
 will result in a 500 gateway error because Amazon is configuring the port for you. 
 */ 

 const PORT = process.env.PORT || 3500;

//  using response not res just as a placeholder
 const serveFile = async (filePath, contentType, response) => {
   try {

      const rawData = await fsPromises.readFile(
         filePath, 
         !contentType.includes('image') ? 'utf8' : ''
         );
      const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;

      response.writeHead(
         filePath.includes('404.html') ? 404 : 200 , 
         {'Content-Type' : contentType}
         );
      response.end(
         contentType === 'application/json'
            ? JSON.stringify(data) : data
      );  

      
   } catch (err) {
      console.log(err);
      myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
      response.statusCode = 500;
      response.end();
   }
 }

 const server = http.createServer((req, res) => {
    if (path.normalize(decodeURI(req.url)) !== decodeURI(req.url)) {
        res.statusCode = 403;
        res.end();
        return;
    }

   console.log(req.url, req.method);
   myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');
 

   // extracting extension from request url
   const extension = path.extname(req.url);

   let contentType;

   // setting up the contentType based on the extracted extension

   switch(extension){
      case '.css':
         contentType = 'text/css';
         break;
      case '.js':
         contentType = 'text/javascript';
         break;
      case '.json':
         contentType = 'application/json';
         break;
      case '.jpg':
         contentType = 'image/jpeg';
         break;
      case '.png':
         contentType = 'image/png';
         break;
      case '.txt':
         contentType = 'text/plain';
         break;
      default:
         contentType = 'text/html';
         break;
   }

/* if we give localhost:3500/old
   we will reach till
   path.join(__dirname, 'views', req.url)
   and path.parse will get us

   {
      root: '/',
      dir: '/home/yash/MERN_Practice/tut05/views',
      base: 'old.html',
      ext: '.html',
      name: 'old'
   }

*/

   let filePath =
       contentType === 'text/html' && req.url === '/'
           ? path.join(__dirname, 'views', 'index.html')
           : contentType === 'text/html' && req.url.slice(-1) === '/'
               ? path.join(__dirname, 'views', req.url, 'index.html')
               : contentType === 'text/html'
                     ? path.join(__dirname, 'views', req.url)
                     : path.join(__dirname, req.url);


   // makes the .html extension not required in browser.

   if(!extension && req.url.slice(-1) !== '/'){
      filePath += '.html';
   }

   const fileExists = fs.existsSync(filePath);

   if(fileExists){
      // serve the file
      serveFile(filePath, contentType, res); 
   }
   else{
      // 301 redirect
      switch(path.parse(filePath).base){
         case 'old-page.html':
            res.writeHead(301, {'Location' : '/new-page.html'});
            res.end();
            break;
         case 'www-page.html':
            res.writeHead(301, {'Location' : '/'})
            res.end();
            break;
         default:
            // serve a 404 here
            serveFile(path.join(__dirname, 'views', '404.html'), 'text/html ', res); 

      }
   }

 })

 /* server.listen should always will be at end of your server file */
 server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 

 

