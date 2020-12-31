module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'chapters_HTML',
        path: `${__dirname}/src/chapters_HTML/`
      }
    }
  ]
}
