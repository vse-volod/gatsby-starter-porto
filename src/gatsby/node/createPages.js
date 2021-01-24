const { paginate } = require('gatsby-awesome-pagination');
const query = require('../data/query');

module.exports = async ({ graphql, actions, reporter }, options) => {
  const { createPage } = actions;

  // Define templates
  const blogPostTemplate = require.resolve('../../templates/query/blog-post.jsx');
  const blogListTemplate = require.resolve('../../templates/query/blog-list.jsx');
  const projectPostTemplate = require.resolve('../../templates/query/project.jsx');

  // Get all markdown blog posts sorted by date
  const result = await graphql(query.data.posts);

  if (result.errors) {
    reporter.panicOnBuild(
      'There was an error loading your blog posts',
      result.errors,
    );
    return;
  }

  const blogPosts = result.data.allSitePost.nodes.filter((post) => post.posttype !== 'project');
  const projectPosts = result.data.allSitePost.nodes.filter((post) => post.posttype === 'project');
  const blogPathPrefix = options.blogPath || '/blog';
  const projectsPathPrefx = options.projectsPath || '/project';
  if (blogPosts.length > 0) {
    blogPosts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : blogPosts[index - 1].id;
      const nextPostId = index === blogPosts.length - 1 ? null : blogPosts[index + 1].id;
      createPage({
        path: `${blogPathPrefix}${post.slug}`,
        component: blogPostTemplate,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          slug: post.slug,
        },
      });
    });
  }

  paginate({
    createPage,
    component: blogListTemplate,
    items: blogPosts,
    itemsPerPage: 10,
    pathPrefix: blogPathPrefix,
  });

  if (projectPosts.length > 0) {
    projectPosts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : projectPosts[index - 1].id;
      const nextPostId = index === projectPosts.length - 1 ? null : projectPosts[index + 1].id;
      createPage({
        path: `${projectsPathPrefx}${post.slug}`,
        component: projectPostTemplate,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          slug: post.slug,
        },
      });
    });
  }
};
