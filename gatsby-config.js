module.exports = {
  siteMetadata: {
    title: 'Porto',
    author: {
      name: 'GatsbyTemplates',
      summary: 'premium portfolio theme',
    },
    description: 'Porto - portfolio theme for GatsbyJS',
    siteUrl: 'https://porto.gatsbytemplates.io/',
    social: {
      twitter: 'gatsbytemplates',
      instagram: ' ',
      behance: ' ',
      github: ' ',
      linkedin: ' ',
    },
    // Defining menu links to your pages:
    menu: [
      {
        name: 'portfolio',
        url: '/#portfolio',
      },
      {
        name: 'blog',
        url: '/blog',
      },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1280,
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-theme-porto',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gatsby Porto Theme Demo',
        short_name: 'Porto',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'content/assets/gatsbytemplates-icon.png',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
  ],
};
