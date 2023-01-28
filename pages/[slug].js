import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { find } from "../utils/tumblr";
import Layout from "../components/layout";
import Post from "../components/post/Post";
import PostsList from "components/posts/List";

const Show = ({ posts, pagination, currentIndex }) => {
  const { asPath } = useRouter();
  const post = posts[currentIndex] || null;
  if (!post) return null;
  const formattedDate = new Date(
    post.date.replace(/-/g, "/")
  ).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`,
    },
    headline: `${post.summary}`,
    datePublished: `${formattedDate}`,
    dateModified: `${formattedDate}`,
    author: {
      "@type": "Person",
      name: "Tainá Pio",
      url: "http://tainapio.com/",
    },
    publisher: {
      "@type": "Organization",
      name: "Tainá Pio",
    },
    image: [`${post?.photos?.[0]?.original_size.url}`],
  });

  return (
    <Layout
      meta={{
        title: post.headline || post.summary || "",
        pathname: `${asPath}`,
        twitter: {
          card: "summary_large_image",
          image: `${post?.photos?.[0]?.original_size.url}`,
        },
        og: {
          type: "article",
          image: `${post?.photos?.[0]?.original_size.url}`,
        },
        structuredData,
      }}
    >
      <PostsList posts={posts} initialIndex={currentIndex} />
    </Layout>
  );
};

export async function getStaticPaths({ locale }) {
  const response = await find(locale, 50);
  return {
    paths: response.posts.map((post) => {
      return { params: { slug: post.slug } };
    }),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, locale }) {
  const response = await find(locale);
  const index = response.posts.findIndex(({ slug }) => params.slug == slug);
  if (!(response.posts || [])[0] || index < 0) {
    return { notFound: true };
  }
  return {
    props: { ...response, currentIndex: index },
    revalidate: 3600,
  };
}

Show.propTypes = {
  post: PropTypes.object,
};

export default Show;
