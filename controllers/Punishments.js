'use strict';

var url = require('url');
var Punishments = require('./../services/PunishmentService');

module.exports.punishmentGET = function punishmentGET (req, res, next) {
    Punishments.punishmentGET(req.swagger.params, res, next);
};

module.exports.punishmentIdDELETE = function punishmentIdDELETE (req, res, next) {
    Punishments.punishmentIdDELETE(req.swagger.params, res, next);
};

module.exports.punishmentIdGET = function punishmentIdGET (req, res, next) {
    Punishments.punishmentIdGET(req.swagger.params, res, next);
};

module.exports.punishmentIdPUT = function punishmentIdPUT (req, res, next) {
    Punishments.punishmentIdPUT(req.swagger.params, res, next);
};

module.exports.punishmentPOST = function punishmentPOST (req, res, next) {
    Punishments.punishmentPOST(req.swagger.params, res, next);
};