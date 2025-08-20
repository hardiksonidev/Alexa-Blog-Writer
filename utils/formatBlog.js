function formatBlog(data) {
  const content = data.paragraphs.map(p => `<p>${p}</p>`).join('\n');
  const refs = data.references.map(r => `<li><a href="${r.url}">${r.title}</a></li>`).join('\n');
  return `${content}\n<h3>References</h3>\n<ul>${refs}</ul>`;
}
module.exports = { formatBlog };
