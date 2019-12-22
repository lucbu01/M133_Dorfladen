import * as fs from 'fs';
import { Product } from '../models/Product';

export class ProductReader {
    static readAllProducts() : Product[] {
        return JSON.parse(fs.readFileSync('data/products.json', 'utf8')) as Product[];
    }

    static getById(id: string): Product {
        let result;
        this.readAllProducts().forEach(product => {
            if(product.id === id) {
                result = product;
            }
        });
        return result;
    }
}