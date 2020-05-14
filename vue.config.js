module.exports = {
  devServer: {
    port: 8076,
    proxy: {
      "/query": {
        target: "http://127.0.0.1:8090",
        changeOrigin: true,
      },
      "/graphql": {
        target: "http://wsl.local:8090",
      },
    },
  },
};
