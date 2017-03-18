'use strict';
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'fbi_db'
});

exports.usersGET = function(args, res, next) {
    /**
     * Список всех пользователей
     *
     * returns GetUsersListResponse
     **/
    var query = "SELECT * FROM ??";
    var table = ["users"];
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

exports.usersIdDELETE = function(args, res, next) {
    /**
     * Удалить пользователя
     *
     * id Integer id пользователя
     * returns GeneralResponse
     **/
    var id = args.id.originalValue;

    var query = "DELETE from ?? WHERE ??=?";
    var table = ["users", "id", id];
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

exports.usersIdGET = function(args, res, next) {
    /**
     * Получить пользователя по id
     *
     * id Integer id пользователя
     * returns GetUserResponse
     **/
    var id = args.id.originalValue;

    var query = "SELECT * FROM ?? WHERE ??=?";
    var table = ["users", "id", id];
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

exports.usersIdPUT = function(args, res, next) {
    /**
     * Изменить пользователя
     *
     * id Integer id пользователя
     * title User атрибуты пользователя
     * returns GeneralResponse
     **/
    var id = args.id.originalValue;
    var name = args.title.originalValue.name;
    var surname = args.title.originalValue.surname;
    var age = args.title.originalValue.age;
    var location = args.title.originalValue.location;
    var passport = args.title.originalValue.passport;


    var query = "UPDATE ?? SET ?? = ? , ?? = ?,  ?? = ?,  ?? = ?,  ?? = ? WHERE ?? = ?";
    var table = ["users", "name", name, "surname", surname,"age", age,"location", location,"passport", passport, "id", id];
    if (name.length == 0 || surname == 0 || age == 0 || location == 0 || passport == 0) {
        res.end(JSON.stringify({Success: false}));
    }
    else {
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) res.end(JSON.stringify({Success: false}));

            if (Object.keys(rows).length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({Success: true}));
            } else {
                res.end();
            }
        });
    }
}

exports.usersPOST = function(args, res, next) {
    /**
     * Добавить нового пользователя
     *
     * title User Атрибуты пользователя
     * returns GeneralResponse
     **/
    var name = args.title.originalValue.name;
    var surname = args.title.originalValue.surname;
    var age = args.title.originalValue.age;
    var location = args.title.originalValue.location;
    var passport = args.title.originalValue.passport;

    var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
    var table = ["users", "name", "surname","age","location","passport", name, surname,age,location,passport];
    if (name.length == 0 || surname == 0 || age == 0 || location == 0 || passport == 0) {
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
