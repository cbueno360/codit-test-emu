const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://localhost:7071",
//       changeOrigin: true,
//     })
//   );
// };

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://codit-exam-test-api.azurewebsites.net",
      changeOrigin: true,
    })
  );
};
