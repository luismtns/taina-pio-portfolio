import PropTypes from "prop-types";
import Head from "next/head";
import Image from "next/image";
import styles from "styles/Home.module.scss";
import { find } from "utils/tumblr";

import Layout from "components/layout";
import PostsCarousel from "components/posts/Carousel";

const Home = ({ posts, pagination }) => {
  console.log({ posts });
  return (
    <Layout>
      <PostsCarousel posts={posts} initialIndex={0} />
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  const response = await find(locale);
  return {
    props: response,
    revalidate: 3600,
  };
}
Home.propTypes = {
  posts: PropTypes.array,
  pagination: PropTypes.object,
};
export default Home;
