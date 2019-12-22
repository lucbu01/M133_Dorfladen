import {Product} from './Product';

interface CartPosition {
    product: Product;
    count: number;
}

export interface ICart {
    positions: CartPosition[];
}

export class Cart {
    private positions: CartPosition[] = [];

    get total(): number {
        let total = 0;
        this.positions.forEach(position => total += (position.count * (position.product.specialOffer ? position.product.specialOffer : position.product.normalPrice)));
        return total;
    }

    add(product: Product) {
        const position = this.positions.filter(position => position.product === product);
        if(position.length === 1) {
            position[0].count++;
        } else {
            this.positions.push({product: product, count: 1});
        }
    }

    static of(iCart: any): Cart {
        const cart = new Cart();
        cart.positions = iCart.positions;
        return cart;
    }
}