const path = require('path');
const express = require('express');
/* Creates an Express application. The express() function is a top-level function exported by 
the express module. */
const app = express()
const PORT = process.env.PORT || 3500;

const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('Chain linked succesfully!');
}

/* 1) Express support regular expressions, so that we can use or like in below
scenario. We can also use other characters like ^ which signifies start with and $
which signifies end with.

2) Express automatically sets the correct status code and also sets the correct content type. 

3) Express works in waterfall pattern to execute code like it will first take first app.get
   then second and so on. So at last we can pit our default one because express will reach
   there.
*/

app.get('^/$|/index(.html)?', (req, res) => {
    /*  Another way to send the file is given below
     Here path must be either absolute or root directory should be provided. */
    res.sendFile('./views/index.html', { root : __dirname});
    //res.sendFile(path.join(__dirname, 'views', 'index.html'));

});

/* /new-page(.html)? this style of regular expression makes .html file not required. */

app.get('/new-page(.html)?', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));

});

app.get('/old-page(.html)?', (req, res) => {

    /* This works just for sending files and not as actual redirect.*/
    // res.sendFile(path.join(__dirname, 'views', 'new-page.html'));

    /* This is actual redirect. */
    res.redirect(301, '/new-page.html'); // Express sends 302 response code by default for redirecting.

});

/* 
Following our app.get route 
These anonymous function expressions which we are using are Route handlers.
We can also chain those.
(req, res) => {
    res.redirect(301, '/new-page.html');
} 
*/

/* next keyword is basically helping us in chaining multiple route handlers, last route handler
   will not have next because we don't want to chain further */

app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempting to load hello word!');
    next();
}, (req, res) => {
    res.send('Hello World!');
});

// generally used way of chaining


app.get('/chain(.html)?', [one, two, three]);





app.get('/*', (req, res) => {

/* Since we want to send custom 404.html page we have send status code also like this
   because if we don't send the code like this it will send 200 by default because it is
   getting the file which is to be served (404.html) it will not see a problem.
*/

    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

/* app.listen should always will be at end of your server file */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 

 

