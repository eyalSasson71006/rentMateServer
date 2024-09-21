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
        if (amenitiesList.includes(key) && params[key]) {
            amenities[`amenities.${key}`] = Boolean(params[key]);
        }
    }
    const minPrice = !isNaN(Number(params.minPrice)) ? Number(params.minPrice) : null;
    const maxPrice = !isNaN(Number(params.maxPrice)) ? Number(params.maxPrice) : null;
    const bedrooms = !isNaN(Number(params.bedrooms)) ? Number(params.bedrooms) : null;
    const bathrooms = !isNaN(Number(params.bathrooms)) ? Number(params.bathrooms) : null;

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
    if (bedrooms) query.bedrooms = bedrooms;
    if (bathrooms) query.bathrooms = bathrooms;
    if (params.propertyType) query.propertyType = params.propertyType;

    return query;
};

module.exports = normalizeSearchParams;
