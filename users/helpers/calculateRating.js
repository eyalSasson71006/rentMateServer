const calculateRating = (apartments) => {
    let reviews = [];
    apartments = apartments.forEach(apartment => reviews.push(...apartment.reviews));
    let rating = 0;
    reviews.forEach(review => {
        rating += review.rating;
    });
    rating = rating / reviews.length;
    return { reviews, rating };
};

module.exports = calculateRating