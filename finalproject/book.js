const params = new URLSearchParams(window.location.search);
const title = params.get("title");

if (title) {
  fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`)
    .then(res => res.json())
    .then(data => {

      const book = data.docs[0];

      document.getElementById("title").textContent = book.title;

      return fetch(`https://openlibrary.org${book.key}.json`);
    })
    .then(res => res.json())
    .then(details => {

      const description =
        typeof details.description === "string"
          ? details.description
          : details.description?.value;

      document.getElementById("desc").textContent =
        description || "No description available.";
    });
}