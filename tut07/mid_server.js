const path = require('path');
const { logger }  = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const express = require('express');
//const { error } = require('console');

const app = express()
const PORT = process.env.PORT || 3500;

/*
    3 types of middleware
    1) built-in middleware
    2) custom middleware
    3) middleware from third party
    middlewares work in orderly manner like the middleware loaded first will be executed first 
*/

// custom logger middleware

app.use(logger);

/*
    third party middleware
    Cross Origin Resource Sharing
*/
/* List that is allowed to access backend that cors will not stop */
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        /* here by putting !origin we also allowed undefined req.headers.origin */
        if(whitelist.indexOf(origin) != -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by cors'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

/* 
    built-in middleware to handle urlencoded data
    in other words, form data :
    'content-type : application/x-www-form-urlencoded'

    here express.urlencoded() is a built-in middleware
    Returns middleware that only parses urlencoded bodies and only looks at requests where 
    the Content-Type header matches the type option. This parser accepts only UTF-8 encoding 
    of the body.
*/

app.use(express.urlencoded({extended : false}));

/*
    Returns middleware that only parses JSON and only looks at requests where the 
    Content-Type header matches the type option.
*/

app.use(express.json());

/*
    This is a built-in middleware function in Express. It serves static files and is based on 
    serve-static.
    The root argument specifies the root directory from which to serve static assets. The 
    function determines the file to serve by combining req.url with the provided root directory.
    When a file is not found, instead of sending a 404 response, it instead calls next() to move
    on to the next middleware, allowing for stacking and fall-backs.
*/

app.use(express.static(path.join(__dirname, '/public')));

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

app.get('^/$|/index(.html)?', (req, res) => {
    
    res.sendFile('./views/index.html', { root : __dirname});

});

app.get('/new-page(.html)?', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));

});

app.get('/old-page(.html)?', (req, res) => {

    res.redirect(301, '/new-page.html');

});


app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempting to load hello word!');
    next();
}, (req, res) => {
    res.send('Hello World!');
});

app.get('/chain(.html)?', [one, two, three]);

/*
1)  app.use() applies the specified middleware to the main app middleware stack.You can specify a 
    path for which a particular middleware is applicable.

2)  app.all() on the other hand will attach to the app’s implicit router. app.all attaches a 
    particular piece of middleware to all HTTP methods, and if attached in the main config file 
    will globally apply the middleware to all requests made to your app. Like app.use, it is 
    also possible to specify a path for which the middleware should be applied.

    app.all also accepts a regex as its path parameter. app.use does not accept a regex, but will
    automatically match all routes that extend the base route.
    
    https://bambielli.com/til/2016-12-27-app-use-app-all/
*/

app.all('*', (req, res) => {

    res.status(404);

    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')){
        res.json({error : "404 Not Found"});
    }else{
        res.type('txt').send("404 Not Found");
    }
});

/*
    Express by default has built in error handling but below we are building our custom error
    middleware
*/

app.use(errorHandler); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 

 

