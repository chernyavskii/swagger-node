'use strict';

var url = require('url');
var Wanteds = require('./../services/WantedService');

module.exports.wantedGET = function wantedGET (req, res, next) {
    Wanteds.wantedGET(req.swagger.params, res, next);
};

module.exports.wantedIdDELETE = function wantedIdDELETE (req, res, next) {
    Wanteds.wantedIdDELETE(req.swagger.params, res, next);
};

module.exports.wantedIdGET = function wantedIdGET (req, res, next) {
    Wanteds.wantedIdGET(req.swagger.params, res, next);
};

module.exports.wantedIdPUT = function wantedIdPUT (req, res, next) {
    Wanteds.wantedIdPUT(req.swagger.params, res, next);
};

module.exports.wantedPOST = function wantedPOST (req, res, next) {
    Wanteds.wantedPOST(req.swagger.params, res, next);
};