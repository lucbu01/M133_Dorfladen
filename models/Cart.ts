import { Product} from './Product';

export class CartPosition {
    product: Product;
    count: number;

    constructor(product: Product, count?: number) {
        this.product = product;
        this.count = count ? count : 1;
    }

    get total(): number {
        return this.count * this.product.price;
    }
}

export class Cart {
    positions: CartPosition[] = [];

    get total(): number {
        let total = 0;
        this.positions.forEach(position => total += position.total);
        return total;
    }

    add(product: Product) {
        const position = this.positions.filter(position => position.product.id === product.id);
        if(position.length === 1) {
            position[0].count++;
        } else {
            this.positions.push(new CartPosition(product));
        }
    }

    remove(product: Product) {
        const position = this.positions.filter(position => position.product.id === product.id);
        if(position.length === 1) {
            position[0].count--;
            if(position[0].count === 0){
                this.positions.splice(this.positions.indexOf(position[0]), 1);
            }
        }
    }

    removeAll(product: Product) {
        const position = this.positions.filter(position => position.product.id === product.id);
        if(position.length === 1) {
            this.positions.splice(this.positions.indexOf(position[0]), 1);
        }
    }
}