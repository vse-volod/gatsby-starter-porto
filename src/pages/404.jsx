import React from 'react';
import { graphql } from 'gatsby';

import Layout from 'gatsby-theme-porto/src/components/layout';
import Container from 'gatsby-theme-porto/src/components/container';
import { MainTitle } from 'gatsby-theme-porto/src/components/title';
import SEO from 'gatsby-theme-porto/src/components/seo';

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <Container>
        <MainTitle>404: Not Found</MainTitle>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
