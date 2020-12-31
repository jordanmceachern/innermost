const path = require('path')

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allFile {
        edges {
          node {
            name
          }
        }
      }
    }
  `)
  //
  if (data.errors) {
    console.error('gatsby-node: ', data.errors)
    return
  }
  //
  data.allFile.edges.forEach(node => {
    const slug = `/chapters/chapter-${node.node.name}`
    //
    actions.createPage({
      path: slug,
      component: path.resolve('src/components/Chapter/Chapter.js'),
      context: { fileName: node.node.name }
    })
  })
}
