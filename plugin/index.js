/**
 * Created by Nicolas on 7/8/15.
 */
(function (Plugin) {

    var async    = require('async'),

        settings = require('./settings'),
        sockets  = require('./sockets');

    Plugin.hooks = {
        filters: {
            adminHeaderBuild: function (header, callback) {
                header.plugins.push({
                    route: '/plugins/meta-tag',
                    icon : 'fa-code',
                    name : 'Meta Tag'
                });
                callback(null, header);
            },
        },

        statics: {
            appLoad: function (params, callback) {
                var router     = params.router,
                    middleware = params.middleware,
                    pluginUri  = '/admin/plugins/meta-tag',
                    apiUri     = '/api' + pluginUri;

                router.get(pluginUri, middleware.admin.buildHeader, renderAdminPage);
                router.get(apiUri, renderAdminPage);

                async.series([
                    async.apply(settings.init),
                    async.apply(sockets.init)
                ], callback);
            }
        }
    };

    function renderAdminPage(req, res, next) {
        res.render(
            'admin/plugins/meta-tag', {}
        );
    }

})(module.exports);
