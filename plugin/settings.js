/**
 * Created by Nicolas on 7/8/15.
 */
(function (Settings) {
    'use strict';

    var objectAssign = require('object-assign'),

        constants    = require('./constants'),
        meta         = require('./nodebb').meta;

    //Memory cache
    var settingsCache = null,
        defaults      = {};

    Settings.init = function (done) {
        meta.settings.get(constants.NAMESPACE, function (error, settings) {
            if (error) {
                return done(error);
            }
            settingsCache = objectAssign(defaults, settings);
            done(null);
        });
    };

    Settings.get = function (done) {
        return done(null, settingsCache);
    };

    Settings.save = function (settings, done) {
        settingsCache = objectAssign(settingsCache, settings);
        meta.settings.set(constants.NAMESPACE, settingsCache, function (error) {
            done(error, settingsCache);
        });
    };

})(module.exports);
