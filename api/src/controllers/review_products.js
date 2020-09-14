const { getOne: getProduct } = require("./products");
const { getOne: getReview } = require("./reviews");

const addReviewToProduct = async (idReview, idProduct) => {
    const Review = await getReview(idReview);
    const Product = await getProduct(idProduct);

    return new Promise((resolve, reject) => {
        Review.setProduct(Product)
            .then((review_product) => resolve(review_product))
            .catch((err) => reject({ error: err }));
    });
};

const removeReviewToProduct = async (idReview, idProduct) => {
    const Review = await getReview(idReview);
    const Product = await getProduct(idProduct);

    return new Promise((resolve, reject) => {
        Product.removeReview(Review)
            .then(() => resolve({ message: "Successfully removed" }))
            .catch((err) => reject({ error: err }));
    });
};

module.exports = {
    addReviewToProduct,
    removeReviewToProduct,
};
