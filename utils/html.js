export const getTitle = (htmlStg) => {
  return htmlStg?.match(/<h2>([^\<]*?)<\/h2>/g)[0] || "";
};

function getParagraphs(htmlStg) {
  return htmlStg?.match(/<p>([^\<]*?)<\/p>/g) || "";
}
