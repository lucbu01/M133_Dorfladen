import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import { ProductReader } from './ProductReader'
import * as fs from 'fs';

const app = express();
app.use(cookieParser());
app.use(expressSession({
    secret: 'super-safa-secret',
    resave: false,
    saveUninitialized: true
}));

const port = 8080;

app.get('/api/products', (req, res) => {
    res.header({'Content-Type': 'application/json', 'status': 200});
    res.send(ProductReader.readAllProducts());
});

app.get('/api/product/:id', (req, res) => {
    const product = ProductReader.getById(req.params.id);
    if(product) {
        res.header({'Content-Type': 'application/json', 'status': 200});
        res.send(product);
    } else {
        res.sendStatus(404);
    }
});

app.get('/api/img/:name', (req, res) => {
    fs.readFile(`data/${req.params.name}`, (err, data) => {
        if (err) {
            res.sendStatus(404);
        }
        else {
            res.header({ 'Content-Type': getContentType(req.params.name), 'status': 200 });
            res.send(data);
        }
    });
});

app.get('*', (req, res) => {
    if (/(\.html|\.js|\.ico|\.json|\.jpg|\.png)$/.test(req.path)) {
        fs.readFile(`frontend/dist/dorfladen${req.path}`, (err, data) => {
            if (err) {
                res.sendStatus(404);
            }
            else {
                res.header({ 'Content-Type': getContentType(req.path), 'status': 200 });
                res.send(data);
            }
        });
    } else {
        res.header({ 'Content-Type': 'text/html', 'status': 200 });
        fs.readFile('frontend/dist/dorfladen/index.html', (err, data) => {
            res.send(data);
        });
    }
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
    if(fileName.endsWith('.json')){
        return 'application/json';
    }
}