const normalizeSearchParams = (params) => {
    if (JSON.stringify(params) == "{}") return {};

    const amenitiesList = [
        "airConditioning",
        "heating",
        "wifi",
        "parking",
        "washingMachine",
        "dryer",
        "dishwasher",
        "balcony",
        "pool",
        "gym",
        "elevator",
        "petFriendly",
        "furnished",
        "securitySystem",
        "fireplace",
        "garden",
        "rooftopAccess",
        "smartHomeFeatures",
        "cableTV",
        "outdoorSeating",
        "kitchenAppliances",
        "smokeDetectors",
        "wheelchairAccessible",
    ];

    let amenities = {};
    for (let key in params) {

        if (amenitiesList.includes(key) && params[key] == "true") {
            amenities[`amenities.${key}`] = Boolean(params[key]);
        }
    }
    const minPrice = !isNaN(Number(params.minPrice)) ? Number(params.minPrice) : null;
    const maxPrice = !isNaN(Number(params.maxPrice)) ? Number(params.maxPrice) : null;
    const bedrooms = !isNaN(Number(params.bedrooms)) ? Number(params.bedrooms) : null;
    const bathrooms = !isNaN(Number(params.bathrooms)) ? Number(params.bathrooms) : null;
    const guests = !isNaN(Number(params.guests)) ? Number(params.guests) : null;

    let query = {
        ...amenities,
    };
    if (params.location) {
        query.$or = [
            { 'address.state': params.location },
            { 'address.city': params.location },
            { 'address.country': params.location }
        ];
    }
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = minPrice;
        if (maxPrice) query.price.$lte = maxPrice;
    }
    if (bedrooms) {
        query.bedrooms = {};
        query.bedrooms.$gte = bedrooms;
    }
    if (bathrooms) {
        query.bathrooms = {};
        query.bathrooms.$gte = bathrooms;
    }
    if (guests) query.guests = guests;
    if (params.propertyType && params.propertyType != "Any") query.propertyType = params.propertyType;
    console.log(query);

    return query;
};

module.exports = normalizeSearchParams;
