const { Review, Product, User } = require("../db");
const { getOne: getUser } = require("./users");
const { getOne: getProduct } = require("./products");
const { getOrderByUser } = require("./users_order");

const getAll = ({ idUser, idProduct }) => {
    return new Promise((resolve, reject) => {
        let where = {};

        if (idUser) where.userId = idUser;
        if (idProduct) where.productId = idProduct;

        Review.findAll({
            where,
            order: [["id", "ASC"]],
            include: [Product, User],
        })
            .then((reviews) => {
                if (reviews.length === 0) {
                    return reject({
                        error: {
                            name: "ApiFindError",
                            type: "Reviws error",
                            errors: [
                                {
                                    message:
                                        "there are no reviews in the database",
                                    type: "not found",
                                    value: null,
                                },
                            ],
                        },
                    });
                }

                resolve(reviews);
            })
            .catch((err) => reject({ error: err }));
    });
};

const createOne = ({ stars, title, description }) => {
    return new Promise((resolve, reject) => {
        Review.create({ stars, title, description })
            .then((review) => resolve(review))
            .catch((err) => reject({ error: err }));
    });
};

const getOne = (id) => {
    return new Promise((resolve, reject) => {
        Review.findOne({
            where: { id },
            include: [Product, User],
        })
            .then((review) => {
                if (!review) {
                    return reject({
                        error: {
                            name: "ApiFindError",
                            type: "Reviews Error",
                            errors: [
                                {
                                    message:
                                        "Review does not exist in the database",
                                    type: "not found",
                                    value: null,
                                },
                            ],
                        },
                    });
                }

                resolve(review);
            })
            .catch((err) => reject({ error: err }));
    });
};

const editOne = ({ id, stars, title, description }) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((review) => {
                if (stars) review.stars = stars;
                if (title) review.title = title;
                if (description) review.description = description;

                return review.save();
            })
            .then((review) => resolve(review))
            .catch((err) => reject({ error: err }));
    });
};

const deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((review) => review.destroy())
            .then(() => resolve({ description: "successfully remove" }))
            .catch((err) => reject({ error: err }));
    });
};

const createReviewComplete = async ({
    idProduct,
    idUser,
    stars,
    title,
    description,
    idReview,
}) => {
    let review = null,
        product,
        user,
        orders,
        promises = [];

    if (!idUser) {
        throw new Error({
            error: { message: "No has comprado este artículo" },
        });
    }

    if (idUser) {
        user = await getUser(idUser);
    }

    if (idProduct) {
        user = await getUser(idUser);
        product = await getProduct(idProduct);
    }

    orders = await getOrderByUser(idUser);

    if (user && product) {
        if (orders.length === 0) {
            throw new Error({
                error: { message: "No has comprado este artículo" },
            });
        }

        const ordersFinalized = orders.filter(
            (order) => order.status === "CONFIRMED"
        );

        if (!ordersFinalized) {
            throw new Error({
                error: { message: "No has comprado este artículo" },
            });
        }

        const productBuyed = ordersFinalized.filter(
            (Theproduct) => Theproduct.id == product.id
        );

        if (!productBuyed) {
            throw new Error({
                error: { message: "No has comprado este artículo" },
            });
        }
    }

    if (user && product) {
        const reviesOfUser = await user.getReviews();
        const review = reviesOfUser.find(
            (review) => review.productId === product.id
        );
        if (review) {
            try {
                const reviewEdited = await editOne({
                    id: review.id,
                    stars,
                    title,
                    description,
                });
                return reviewEdited;
            } catch (err) {
                throw new Error(err);
            }
        }
    }

    if (!idReview) {
        review = await createOne({ stars, title, description });
    } else {
        review = await getOne(idReview);
    }

    if (idProduct) {
        promises.push(review.setProduct(product));
    }
    if (idUser) {
        promises.push(review.setUser(user));
    }

    if (idProduct || idUser) {
        try {
            const reviewResolved = await Promise.all(promises);
            return reviewResolved[0];
        } catch (err) {
            throw new Error({ error: err });
        }
    }

    if (review) return review;
    else throw new Error({ error: { message: "Error, no creada" } });
};

module.exports = {
    getAll,
    createOne,
    getOne,
    editOne,
    deleteOne,
    createReviewComplete,
};
