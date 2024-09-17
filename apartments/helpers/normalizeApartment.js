const { getUserById } = require("../../users/models/usersAccessDataService");

const normalizeApartment = async (apartment, userId) => {
    const user = await getUserById(userId);

    return ({
        ...apartment,
        image: {
            src: apartment.image.src || "https://saterdesign.com/cdn/shop/products/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399_600x.jpg?v=1500393334",
            alt: apartment.image.alt || "apartment image"
        },
        owner: {
            ownerId: userId._id || userId,
            fullName: user.name.first + " " + user.name.last,
            image: user.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            rating: user.rating
        },
    });
};

module.exports = normalizeApartment;