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
    await actions.createPage({
      path: slug,
      component: path.resolve('src/components/Chapter/Chapter.js'),
      context: {
        chapterNumber: node.node.name,
        content: nodeContent
      }
    })
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/chapters/)) {
    page.matchPath = "/chapters/*"

    // Update the page.
    await createPage(page)
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
