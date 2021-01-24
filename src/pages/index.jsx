import React from 'react';
import { graphql } from 'gatsby';

import Bio, { BioTitle, BioSubtitle, BioText } from 'gatsby-theme-porto/src/components/bio';
import Layout from 'gatsby-theme-porto/src/components/layout';
import SEO from 'gatsby-theme-porto/src/components/seo';
import Hero from 'gatsby-theme-porto/src/components/hero';
import { Title, MainTitle, Subtitle } from 'gatsby-theme-porto/src/components/title';
import { BlogListing, BlogSection } from 'gatsby-theme-porto/src/templates/display/blog-list-template';
import BlogCard from 'gatsby-theme-porto/src/components/blog-card';
import ProjectSection from 'gatsby-theme-porto/src/components/project-section';

const Index = ({ data }) => {
  const posts = data.blog?.nodes;
  const portfolio = data.portfolio?.nodes;
  const author = data.site.siteMetadata?.author;
  const portrait = data?.portrait?.childImageSharp?.fluid;

  return (
    <Layout>
      <SEO title="All posts" />
      <Hero>
        <MainTitle>
          HI! I’m Porto!
        </MainTitle>
        <Subtitle>
          Gatsby theme for designers and web developers,
          which you can change with your taste.
        </Subtitle>
      </Hero>
      <div id="portfolio">
        {portfolio.length > 0 && portfolio.map((project) => {
          const {
            title, subtitle, description, slug,
          } = project;
          const images = project.images.map((img) => img.childImageSharp.fluid);
          return (
            <ProjectSection
              key={slug}
              title={title}
              subtitle={subtitle}
              description={description}
              images={images}
              link={`/project${slug}`}
            />
          );
        })}
      </div>
      <Bio author={author} portrait={portrait}>
        <BioTitle>About me</BioTitle>
        <BioSubtitle>
          Professional Designer, Full Stack developer,
          Speaker and UX specialist
        </BioSubtitle>
        <BioText>
          My name is and John and I'm an experienced creator of digital projects.
          My latest projects mostly UX-oriented, but also I'm currently learning javascript
          so I can create
          interfaces that I design
        </BioText>
      </Bio>
      <BlogSection>
        <div>
          <Title>
            Latest Blog posts
          </Title>
          <Subtitle>
            Read the articles and be inspired
          </Subtitle>
        </div>
        <BlogListing>
          {posts.length > 0 && posts.map((post) => {
            const {
              image, title, description, slug,
            } = post;
            return (
              <BlogCard
                key={slug}
                title={title}
                description={description}
                image={image.childImageSharp.fluid}
                link={`/blog${slug}`}
              />
            );
          })}
        </BlogListing>
      </BlogSection>
    </Layout>
  );
};

export default Index;

export const mainPageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    portrait: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 380, quality: 97) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    blog: allSitePost(
      sort: { 
        fields: [date], order: DESC }, 
        filter: {
          posttype: {eq: "blog"}
        }
        limit: 3
    ) {
      nodes {
        excerpt
        slug
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 320, quality: 97) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    portfolio: allSitePost(
      sort: { 
        fields: [date], order: DESC 
      }, 
      filter: {
        posttype: {eq: "project"}
      }
    ) {
      nodes {
        excerpt
        slug
        date(formatString: "MMMM DD, YYYY")
        title
        subtitle
        description
        images {
          childImageSharp {
            fluid(maxWidth: 1175, quality: 97) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
