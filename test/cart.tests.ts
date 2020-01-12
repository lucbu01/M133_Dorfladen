import { expect } from 'chai';
import { Cart, CartPosition } from '../models/Cart';
import { Product } from '../models/Product';
import { ProductReader } from '../lib/ProductReader';

describe("Cart Test", () => {
    const products: Product[] = [];
    let product = new Product();
    product.id = "001";
    product.productName = "Test Product 1";
    product.normalPrice = 10;
    products.push(product);
    product = new Product();
    product.id = "002";
    product.productName = "Test Product 2";
    product.normalPrice = 20;
    product.specialOffer = 15;
    products.push(product);

    it("can add product", () => {
        const cart: Cart = new Cart();
        cart.add(products[0]);
        expect(cart.positions.length).to.equal(1);
        expect(cart.positions[0].count).to.equal(1);
        expect(cart.positions[0].product).to.equal(products[0]);
    });

    it("double add product to cart increase count of cart position", () => {
        const cart: Cart = new Cart();
        cart.add(products[0]);
        cart.add(products[0]);
        expect(cart.positions.length).to.equal(1);
        expect(cart.positions[0].count).to.equal(2);
        expect(cart.positions[0].product).to.equal(products[0]);
    });
    
    it("total of all products in cart (consider special offers)", () => {
        const cart: Cart = new Cart();
        cart.set(products[0], 3);
        cart.set(products[1], 2);
        expect(cart.positions.length).to.equal(2);
        expect(cart.positions[0].count).to.equal(3);
        expect(cart.positions[0].product).to.equal(products[0]);
        expect(cart.positions[0].total).to.equal(30);
        expect(cart.positions[1].count).to.equal(2);
        expect(cart.positions[1].product).to.equal(products[1]);
        expect(cart.positions[1].total).to.equal(30);
        expect(cart.total).to.equal(60);
    });
});