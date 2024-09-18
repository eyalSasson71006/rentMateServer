const normalizeUser = (user) => {
    return({
        ...user,
        image: {
            src: user.image.src || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            alt: user.image.alt || "Profile Picture"
        }
    })
}

module.exports = normalizeUser