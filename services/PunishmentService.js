'use strict';
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'fbi_db'
});

exports.punishmentGET = function(args, res, next) {
    /**
     * Список всех взысканий
     *
     * returns GetPunishmentsListResponse
     **/
    var query = "SELECT * FROM ??";
    var table = ["punishment"];
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

exports.punishmentIdDELETE = function(args, res, next) {
    /**
     * Удалить взыскание
     *
     * id Integer id взыскания
     * returns GeneralResponse
     **/
    var id = args.id.originalValue;

    var query = "DELETE from ?? WHERE ??=?";
    var table = ["punishment", "id", id];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) res.end(JSON.stringify({Success: false}));
        else {
            if (Object.keys(rows).length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({Success: true}));
            } else {
                res.end(JSON.stringify({Success: false}));
            }
        }
    });
}

exports.punishmentIdGET = function(args, res, next) {
    /**
     * Получить взыскание по id
     *
     * id Integer id взыскания
     * returns GetPunishmentResponse
     **/
    var id = args.id.originalValue;

    var query = "SELECT * FROM ?? WHERE ??=?";
    var table = ["punishment", "id", id];
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

exports.punishmentIdPUT = function(args, res, next) {
    /**
     * Изменить взыскание
     *
     * id Integer id взыскания
     * title Punishment атрибуты взыскания
     * returns GeneralResponse
     **/
    var id = args.id.originalValue;
    var name = args.title.originalValue.name;

    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    var table = ["punishment", "name", name, "id", id];
    if (name.length == 0) {
        res.end(JSON.stringify({Success: false}));
    }
    else {
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
}

exports.punishmentPOST = function(args, res, next) {
    /**
     * Добавить новое взыскание
     *
     * title Punishment Атрибуты взыскания
     * returns GeneralResponse
     **/
    var query = "INSERT INTO ??(??) VALUES (?)";
    var name = args.title.originalValue.name;
    var table = ["punishment", "name", name];
    if (name.length == 0) {
        res.end(JSON.stringify({Success: false}));
    }
    else {
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) throw err;
            if (Object.keys(rows).length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({Success:true}));
            } else {
                res.end();
            }
        });
    }
}