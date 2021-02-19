const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/MercuryGate/rest',
        createProxyMiddleware({
            target: 'http://localhost:80',
            changeOrigin: true,
        })
    );
    app.use(
        '/carma/admin',
        createProxyMiddleware({
            target: 'http://localhost:8444',
            changeOrigin: true,
        })
    );

};
