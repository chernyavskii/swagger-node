'use strict';
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'fbi_db'
});

exports.wantedGET = function(args, res, next) {
    /**
     * Отчет о разыскиваемых
     *
     * returns GetWantedsListResponse
     **/
    var query = "SELECT * FROM users u " +
        "INNER JOIN wanted w ON (w.id_user = u.id) " +
        "INNER JOIN punishment p ON (w.id_punishment = p.id)";
    var table = ["wanted"];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) throw err;
        if (rows == 0) {
            res.end(JSON.stringify({rows: false}));
        }
        var examples = {};
        examples['application/json'] = {rows}
        if (Object.keys(examples).length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
        } else {
            res.end();
        }
    });
}

exports.wantedIdDELETE = function(args, res, next) {
    /**
     * Удалить запись
     *
     * id Integer
     * returns GeneralResponse
     **/
    var id = args.id.originalValue;

    var query = "DELETE from ?? WHERE ??=?";
    var table = ["wanted", "id", id];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) res.end(JSON.stringify({Success: false}));
        if (Object.keys(rows).length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({Success:true}));
        } else {
            res.end();
        }
    });
}

exports.wantedIdGET = function(args, res, next) {
    /**
     * Получить запись по id
     *
     * id Integer
     * returns GetWantedResponse
     **/
    var id = args.id.originalValue;

    var query = "SELECT * FROM users u " +
        "INNER JOIN wanted w ON (w.id_user = u.id) " +
        "INNER JOIN punishment p ON (w.id_punishment = p.id) WHERE ?? = ?";

    var table = ["w.id_user", id];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) res.end(JSON.stringify({Success: false}));
        var examples = {};
        examples['application/json'] = {rows};
        if (rows == 0) {
            res.end(JSON.stringify({rows: false}));
        }
        else {
            if (Object.keys(examples).length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
            } else {
                res.end();
            }
        }
    });
}

exports.wantedIdPUT = function(args, res, next) {
    /**
     * Изменить запись
     *
     * id Integer
     * title Wanted
     * returns GeneralResponse
     **/
    var id = args.id.originalValue;
    var id_user = args.title.originalValue.id_user;
    var id_punishment = args.title.originalValue.id_punishment;

    var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
    var table = ["wanted", "id_user", id_user, "id_punishment", id_punishment, "id", id];
    if (id_user.length == 0 || id_punishment.length == 0) {
        res.end(JSON.stringify({Success: false}));
    }
    else {
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) res.end(JSON.stringify({Success: false}));
            else {
                if (Object.keys(rows).length > 0) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({Success: true}));
                } else {
                    res.end();
                }
            }
        });
    }
}

exports.wantedPOST = function(args, res, next) {
    /**
     * Добавить новую запись
     *
     * title Wanted
     * returns GeneralResponse
     **/
    var id_user = args.title.originalValue.id_user;
    var id_punishment = args.title.originalValue.id_punishment;

    var query = "INSERT INTO ??(??,??) VALUES (?,?)";
    var table = ["wanted", "id_user","id_punishment",id_user, id_punishment];

    if (id_user.length == 0 || id_punishment.length == 0) {
        res.end(JSON.stringify({Success: false}));
    }
    else {
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) res.end(JSON.stringify({Success:false}));
            else {
                if (Object.keys(rows).length > 0) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({Success: true}));
                } else {
                    res.end();
                }
            }
        });
    }
}
