import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { find } from "../utils/tumblr";
import Layout from "../components/layout";
import Post from "../components/post/Post";

const Show = ({ post, nextPost, prevPost }) => {
  console.log({ post });
  const formattedDate = new Date(
    post.date.replace(/-/g, "/")
  ).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const structuredData = `
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${process.env.NEXT_PUBLIC_BASE_URL}${post.pathname}"
      },
      "headline": "${post.summary}",
      "datePublished": "${formattedDate}",
      "dateModified": "${formattedDate}",
      "author": {
        "@type": "Person",
        "name": "Lauren Ashpole",
        "url": "https://laurenashpole.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Lauren Ashpole"
      },
      "image": [
        "${process.env.NEXT_PUBLIC_BASE_URL}/api/og-image?headline=${
    post.headline || post.summary
  }&type=${post.type}"
      ]
    }
  `;

  return (
    <Layout
      meta={{
        title: post.headline || post.summary || "",
        pathname: post.pathname,
        twitter: {
          card: "summary_large_image",
          image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og-image?headline=${
            post.headline || post.summary
          }&type=${post.type}`,
        },
        og: {
          type: "article",
          image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og-image?headline=${
            post.headline || post.summary
          }&type=${post.type}`,
        },
        structuredData,
      }}
    >
      <Post post={post} nextPost={nextPost} prevPost={prevPost} />
    </Layout>
  );
};

export async function getStaticPaths({ locale }) {
  const response = await find(locale, 50);
  return {
    paths: response.posts.map((post) => {
      // const params = new URL(post.slug).pathname
      //   .replace("/post/", "")
      //   .split("/");
      // console.log(params);
      return { params: { slug: post.slug } };
    }),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, locale }) {
  const response = await find(locale, 50);

  const postIndex = response.posts.findIndex(({ slug }) => params.slug == slug);
  if (!(response.posts || [])[0] || postIndex < 0) {
    return { notFound: true };
  }

  return {
    props: {
      post: response.posts[postIndex],
      nextPost: response.posts[postIndex + 1]?.slug || response.posts[0].slug,
      prevPost:
        response.posts[postIndex - 1]?.slug ||
        response.posts[response.posts.length - 1].slug,
    },
    revalidate: 3600,
  };
}

Show.propTypes = {
  post: PropTypes.object,
};

export default Show;
