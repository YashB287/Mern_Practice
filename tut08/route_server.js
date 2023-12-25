const path = require('path');
const { logger }  = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const express = require('express');

const app = express()
const PORT = process.env.PORT || 3500;

app.use(logger);

const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500']
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) != -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by cors'));
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

/*
    Use css for subdir aswell it was working for me without additional line but added for just
    to be sure
*/

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));


// serving any request coming for subdir through routes
// routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));

// creating basic rest apis
app.use('/employees', require('./routes/api/employees'));

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

app.use(errorHandler); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
