const gfs = require('gatsby-source-filesystem')
const path = require('path')

const getNodeContent = async currentNode => await gfs.loadNodeContent(currentNode)

exports.createPages = async function ({ actions, graphql, getNode }) {
  const { data } = await graphql(`
    query {
      allFile {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `)
  //
  data.allFile.edges.forEach(async node => {
    const currentNode = getNode(node.node.id)
    const nodeContent = await getNodeContent(currentNode)
    const slug = `/chapters/chapter-${node.node.name}`
    //
    actions.createPage({
      path: slug,
      component: path.resolve('src/components/Chapter/Chapter.js'),
      context: {
        chapterNumber: node.node.name,
        content: nodeContent
      }
    })
  })
}
