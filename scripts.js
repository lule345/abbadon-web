async function fetchRSS(url) {
  const response = await fetch(url);
  const text = await response.text();
  return text;
}
function parseRSS(rssText) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rssText, 'text/xml');
  return xmlDoc;
}
function extractFeedItems(xmlDoc) {
  const items = xmlDoc.querySelectorAll('item');
  const feedItems = [];
  
  items.forEach(item => {
    const title = item.querySelector('title').textContent;
    const link = item.querySelector('link').textContent;
    const description = item.querySelector('description').textContent;
    const pubDate = item.querySelector('pubDate').textContent;
    
    feedItems.push({ title, link, description, pubDate });
  });
  
  return feedItems;
}
function displayRSSFeed(feedItems) {
  const container = document.getElementById('rss');
  container.innerHTML = '';
  
  feedItems.forEach(item => {
    const article = document.createElement('article');
    article.innerHTML = `
      <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
      <p>${item.description}</p>
      <small>${item.pubDate}</small>
    `;
    container.appendChild(article);
  });
}
async function loadRSSFeed(url) {
  try {
    const rssText = await fetchRSS(url);
    const xmlDoc = parseRSS(rssText);
    const feedItems = extractFeedItems(xmlDoc);
    displayRSSFeed(feedItems);
  } catch (error) {
    console.error('Error loading RSS feed:', error);
  }
}

// Usage
const rssUrl = 'https://rss.spacehey.com/blog_user?id=2993095';
loadRSSFeed(rssUrl);

