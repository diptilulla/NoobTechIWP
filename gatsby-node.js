exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
      },
      alias: {
        process: "process/browser",
      },
    },
    plugins: [
      // fix "process is not defined" error:
      // (do "npm install process" before running the build)
      plugins.provide({ process: "process/browser" }),
      plugins.define({
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
    ],
  });
};
