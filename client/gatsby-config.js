module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'chapters_HTML',
        path: `${__dirname}/src/chapters_HTML/`
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/logo.png',
      }
    }
  ]
}
