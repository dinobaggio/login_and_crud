let RoleUser = function (user) {
    let { status } = user;
    if (status !== 'User') {
        return false;
    }

    return true;
}

module.exports = {RoleUser};
