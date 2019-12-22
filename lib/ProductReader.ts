import * as fs from 'fs';
import { Product } from '../models/Product';

export class ProductReader {
    static readAllProducts() : Product[] {
        return JSON.parse(fs.readFileSync('data/products.json', 'utf8')) as Product[];
    }
}