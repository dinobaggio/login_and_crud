let RoleAdmin = function (user) {
    let { status } = user;
    if (status !== 'Admin') {
        return false;
    }

    return true;
}

module.exports = {RoleAdmin};
