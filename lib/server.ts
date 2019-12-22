import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as fs from 'fs';

const app = express();
app.use(cookieParser());
app.use(expressSession({
    secret: 'super-safa-secret',
    resave: false,
    saveUninitialized: true
}));

const port = 8080;

app.get('/', (req, res) => {
    res.header({'Content-Type': 'text/html', 'status': 200});
    fs.readFile('frontend/dist/dorfladen/index.html', (err, data) => {
        res.send(data);
    });
});

app.get('/:path', (req, res) => {
    fs.readFile(`frontend/dist/dorfladen/${req.params.path}`, (err, data) => {
        if(err) {
            res.header({'status': 404});
            res.send();
        } else {
            res.header({'Content-Type': getContentType(req.params.path), 'status': 200});
            res.send(data);
        }
    });
});

app.listen(port, () => console.log(`server is started and listen on port ${port}`));

function getContentType(fileName: string): string {
    if(fileName.endsWith('.html') || fileName.endsWith('.htm')){
        return 'text/html';
    }
    if(fileName.endsWith('.js')){
        return 'text/javascript';
    }
    if(fileName.endsWith('.jpg')){
        return 'image/jpeg';
    }
    if(fileName.endsWith('.png')){
        return 'image/png';
    }
    if(fileName.endsWith('.ico')){
        return 'image/x-icon';
    }
}