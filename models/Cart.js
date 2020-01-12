var CartPosition = (function () {
    function CartPosition(product, count) {
        this.product = product;
        this.count = count ? count : 1;
    }
    Object.defineProperty(CartPosition.prototype, "total", {
        get: function () {
            return this.count * this.product.price;
        },
        enumerable: true,
        configurable: true
    });
    return CartPosition;
})();
exports.CartPosition = CartPosition;
var Cart = (function () {
    function Cart() {
        this.positions = [];
    }
    Object.defineProperty(Cart.prototype, "total", {
        get: function () {
            var total = 0;
            this.positions.forEach(function (position) { return total += position.total; });
            return total;
        },
        enumerable: true,
        configurable: true
    });
    Cart.prototype.add = function (product) {
        var position = this.positions.filter(function (position) { return position.product.id === product.id; });
        if (position.length === 1) {
            position[0].count++;
        }
        else {
            this.positions.push(new CartPosition(product));
        }
    };
    Cart.prototype.remove = function (product) {
        var position = this.positions.filter(function (position) { return position.product.id === product.id; });
        if (position.length === 1) {
            position[0].count--;
            if (position[0].count === 0) {
                this.positions.splice(this.positions.indexOf(position[0]), 1);
            }
        }
    };
    Cart.prototype.removeAll = function (product) {
        var position = this.positions.filter(function (position) { return position.product.id === product.id; });
        if (position.length === 1) {
            this.positions.splice(this.positions.indexOf(position[0]), 1);
        }
    };
    Cart.prototype.set = function (product, count) {
        if (count > 0) {
            var position = this.positions.filter(function (position) { return position.product.id === product.id; });
            if (position.length === 1) {
                position[0].count = count;
            }
            else {
                this.positions.push(new CartPosition(product, count));
            }
        }
        else {
            this.removeAll(product);
        }
    };
    return Cart;
})();
exports.Cart = Cart;
