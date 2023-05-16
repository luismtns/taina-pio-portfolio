import PropTypes from "prop-types";
import { about, find } from "utils/tumblr";

import Layout from "components/layout";
import PostsList from "components/posts/List";

const Home = ({ posts, about, pagination }) => {
  return (
    <Layout header={about}>
      <PostsList posts={posts} initialIndex={0} />
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  const response = await find(locale);
  const aboutRes = await about(locale);
  return {
    props: { ...response, about: aboutRes },
    revalidate: 3600,
  };
}
Home.propTypes = {
  posts: PropTypes.array,
  pagination: PropTypes.object,
};
export default Home;
