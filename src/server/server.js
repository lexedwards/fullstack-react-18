"use strict";
exports.__esModule = true;
exports.buildServer = void 0;
var fastify_1 = require("fastify");
var path_1 = require("path");
var pageRender_1 = require("./pageRender");
var buildServer = function (opts) {
    var server = (0, fastify_1["default"])(opts);
    server.register(Promise.resolve().then(function () { return require('@fastify/static'); }), {
        root: (0, path_1.resolve)(__dirname, '..', 'public'),
        prefix: '/public'
    });
    server.register(pageRender_1.pageRender);
    return server;
};
exports.buildServer = buildServer;
