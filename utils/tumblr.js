import tumblr from "tumblr.js";

const CLIENT = {
  consumer_key: process.env.TUMBLR_CONSUMER_KEY,
  consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
  token: process.env.TUMBLR_TOKEN,
  token_secret: process.env.TUMBLR_TOKEN_SECRET,
  returnPromises: true,
};

const blogUrl = "test-blog-api.tumblr.com";

export async function find(locale, limit = 10, page = 1, id, tag) {
  const client = tumblr.createClient(CLIENT);
  const response = await getPosts(
    client,
    locale,
    limit,
    limit * (page - 1),
    id,
    tag
  );
  return parseResponse(response, !id, limit, page);
}

export async function findAll(locale, limit = 50) {
  const client = tumblr.createClient(CLIENT);
  const initialResponse = await getPosts(client, locale, limit, 0);
  const totalPages = Math.floor(initialResponse.total_posts / limit);

  const posts = await [...Array(totalPages).keys()].reduce(async (arr, i) => {
    const response = await getPosts(client, locale, limit * (i + 1));
    return [...(await arr), ...response.posts];
  }, []);

  return { ...initialResponse, posts: [...initialResponse.posts, ...posts] };
}

function getPosts(client, locale, limit, offset, id, tag) {
  return new Promise((resolve) => {
    client
      .blogPosts(blogUrl, { limit, offset, id, tag: [locale, tag] })
      .then((response) => resolve(response))
      .catch(() => resolve({}));
  });
}

function parseResponse(response, isExcerpt, limit, page) {
  return {
    posts: (response.posts || []).map((post) => {
      post.pathname = new URL(post.post_url).pathname;
      return post.type === "text" ? parseText(post, isExcerpt) : post;
    }),
    pagination: getPagination(limit, page, response.total_posts || 0),
  };
}

function parseText(post, isExcerpt) {
  if (isExcerpt) {
    const blocks = post.body.split("<p><!-- more --></p>");
    post = { ...post, body: blocks[0], readMore: blocks.length > 1 };
  }

  return { ...post, body: parseBody(post.body, "<pre><code", "</code></pre>") };
}

function parseBody(body, startString, endString) {
  let blocks = [];
  let startIdx = body.indexOf(startString);

  while (startIdx !== -1) {
    const endIdx = body.indexOf(endString) + endString.length;
    blocks = [...blocks, body.slice(0, startIdx), body.slice(startIdx, endIdx)];
    body = body.slice(endIdx);
    startIdx = body.indexOf(startString);
  }

  return [...blocks, body];
}

function getPagination(limit, page, totalPosts) {
  const lastPage = Math.ceil(totalPosts / limit);

  return {
    nextPage: page < lastPage ? page + 1 : null,
    prevPage: page === 1 ? null : page - 1,
  };
}
