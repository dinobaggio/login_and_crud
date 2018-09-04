let RoleSuperAdmin = function (user) {
    let { status } = user;
    if (status !== 'Super Admin') {
        return false;
    }

    return true;
}

module.exports = {RoleSuperAdmin};
