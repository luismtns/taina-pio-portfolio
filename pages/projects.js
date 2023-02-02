import PropTypes from "prop-types";
import Head from "next/head";
import Image from "next/image";
import styles from "styles/Home.module.scss";
import { find } from "utils/tumblr";

import Layout from "components/layout";
import PostsList from "components/posts/List";

const Home = ({ posts, pagination }) => {
  return (
    <Layout>
      <PostsList posts={posts} initialIndex={1} />
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
