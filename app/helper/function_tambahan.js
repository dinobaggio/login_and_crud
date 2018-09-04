// function tambahan...

let ifUser = function (res) {
    let json = {
        message: 'failed',
        error: 'tidak ada izin'
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify(json));
    return res.end();
}

let ifNotSuper = function (res) {
    let json = {
        message: 'failed',
        error: 'tidak ada izin'
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify(json));
    return res.end();
}

let ifDataKosong = function (res) {
    let json = {
        message: 'failed',
        error: 'semua data harus diisi'
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify(json));
    return res.end();
}

let ifCodeTidakValid = function (res, code) {
    let json = {
        message: 'failed',
        error: `code tidak valid! code = ${code}`
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify(json));
    return res.end();
}

let ifError = function (res, err) {
    let json = {
        message: 'failed',
        error: err
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify(json));
    return res.end();
}

let ifIdTidakValid = function (res, id) {
    let json = {
        message: 'failed',
        error: `id tidak valid! id = ${id}`
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify(json));
    return res.end();
}

  // end of function tambahan ...

module.exports = {ifUser, ifNotSuper, ifDataKosong, ifCodeTidakValid, ifIdTidakValid, ifError}
