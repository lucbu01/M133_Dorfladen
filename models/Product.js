var Product = (function () {
    function Product() {
    }
    Object.defineProperty(Product.prototype, "price", {
        get: function () {
            return this.specialOffer ? this.specialOffer : this.normalPrice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "hasSpecialOffer", {
        get: function () {
            return this.specialOffer ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    return Product;
})();
exports.Product = Product;
