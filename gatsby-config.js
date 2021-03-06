require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Skill++"
  },

  plugins: [
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        appendScript: require.resolve("./src/custom-sw-code.js")
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("node-sass")
      }
    },
    "gatsby-plugin-postcss"
  ]
};
