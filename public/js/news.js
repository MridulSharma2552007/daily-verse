const NEWS_API_KEY = "69caa40994344ecea2037c2f38e5c85c";
async function loadNews() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`,
    );

    const data = await response.json();

    const articles = data.articles;

    const container = document.getElementById("news-container");
    if (!container) {
      console.error('Missing "#news-container" element in HTML.');
      return;
    }

    container.innerHTML = articles
      .map(
        (article) => `
      <div class="news-card">
        <img src="${article.urlToImage || "https://via.placeholder.com/400"}" />
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More ..</a>
      </div>
    `,
      )
      .join("");
  } catch (error) {
    console.error("Error loading news:", error);
  }
}

loadNews();
