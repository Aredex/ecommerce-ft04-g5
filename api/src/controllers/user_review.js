const { getOne: getUser } = require("./users");
const { getOne: getReview } = require("./reviews");

const addUserToReview = async (idUser, idReview) => {
    const User = await getUser(idUser);
    const Review = await getReview(idReview);

    verifyUserReview(User, Review)

    return new Promise((resolve, reject) => {
        Review.setUser(User)
            .then((user_review) => resolve(user_review))
            .catch((err) => reject({ error: err }));
    });
};

const removeUserToReview = async (idUser, idReview) => {
    const User = await getUser(idUser);
    const Review = await getReview(idReview);

    return new Promise((resolve, reject) => {
        User.removeReview(Review)
            .then(() => resolve({ message: "Successfully removed" }))
            .catch((err) => reject({ error: err }));
    });
};

const verifyUserReview = async (User, Review) => {
    console.log('JAJA, ACÁ ESTÁ', Review)
}

module.exports = {
    addUserToReview,
    removeUserToReview,
};
