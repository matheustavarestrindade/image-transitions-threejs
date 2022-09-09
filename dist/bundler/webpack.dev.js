var path = require("path");
var merge = require("webpack-merge").merge;
var commonConfiguration = require("./webpack.common.js");
var portFinderSync = require("portfinder-sync");
var infoColor = function (_message) {
    return "\u001B[1m\u001B[34m".concat(_message, "\u001B[39m\u001B[22m");
};
module.exports = merge(commonConfiguration, {
    stats: "errors-warnings",
    mode: "development",
    infrastructureLogging: {
        level: "warn",
    },
    devServer: {
        host: "local-ip",
        port: portFinderSync.getPort(8080),
        open: true,
        https: false,
        allowedHosts: "all",
        hot: false,
        watchFiles: ["src/**", "static/**"],
        static: {
            watch: true,
            directory: path.join(__dirname, "../static"),
        },
        client: {
            logging: "none",
            overlay: true,
            progress: false,
        },
        setupMiddlewares: function (middlewares, devServer) {
            console.log("------------------------------------------------------------");
            console.log(devServer.options.host);
            var port = devServer.options.port;
            var https = devServer.options.https ? "s" : "";
            var domain1 = "http".concat(https, "://").concat(devServer.options.host, ":").concat(port);
            var domain2 = "http".concat(https, "://localhost:").concat(port);
            console.log("Project running at:\n  - ".concat(infoColor(domain1), "\n  - ").concat(infoColor(domain2)));
            return middlewares;
        },
    },
});
//# sourceMappingURL=webpack.dev.js.map