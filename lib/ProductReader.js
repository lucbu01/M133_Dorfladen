var fs = require('fs');
var Product_1 = require('../models/Product');
var ProductReader = (function () {
    function ProductReader() {
    }
    ProductReader.readAllProducts = function () {
        return JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
        as;
        Product_1.Product[];
    };
    ProductReader.getById = function (id) {
        var result;
        this.readAllProducts().forEach(function (product) {
            if (product.id === id) {
                result = product;
            }
        });
        return result;
    };
    return ProductReader;
})();
exports.ProductReader = ProductReader;
