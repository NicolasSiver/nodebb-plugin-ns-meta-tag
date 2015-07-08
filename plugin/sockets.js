/**
 * Created by Nicolas on 7/8/15.
 */
(function (Sockets) {
    'use strict';

    var async     = require('async'),
        path      = require('path'),

        constants = require('./constants'),
        nodebb    = require('./nodebb'),
        settings  = require('./settings');

    var sockets = nodebb.pluginSockets;

    Sockets.init = function (callback) {
        sockets[constants.SOCKETS] = {};
        //Acknowledgements

        callback();
    };

})(module.exports);