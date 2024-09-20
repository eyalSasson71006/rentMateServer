const { getUserById } = require("../../users/models/usersAccessDataService");

const normalizeApartment = async (apartment, userId) => {
    const user = await getUserById(userId);
        
    return ({
        ...apartment,
        image: {
            src: apartment.image.src || "https://saterdesign.com/cdn/shop/products/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399_600x.jpg?v=1500393334",
            alt: apartment.image.alt || "apartment image"
        },
        owner: userId._id || userId,
    });
};

module.exports = normalizeApartment;