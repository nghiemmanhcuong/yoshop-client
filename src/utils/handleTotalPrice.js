const handleTotalPrice = (cartProducts) => {
    if (cartProducts.length > 0) {
        const result = cartProducts.reduce((total, product) => {
            return total + Number(product.productPrice) * product.quantity;
        }, 0);
        return result;
    } else {
        return 0;
    }
};

export default handleTotalPrice;