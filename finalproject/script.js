//books
document.querySelectorAll(".book-card").forEach(card => {
  const title = card.dataset.title;

  card.addEventListener("click", () => {
    window.location.href = `book.html?title=${encodeURIComponent(title)}`;
  });
});

//likes
document.addEventListener("DOMContentLoaded", () => {
  const likes = JSON.parse(localStorage.getItem("likes")) || [];
  const list = document.getElementById("likesList");

  list.innerHTML = "";

  likes.forEach(book => {
    const item = document.createElement("p");
    item.classList.add("like-item");

    item.textContent = book.title;

    item.addEventListener("click", () => {
      window.location.href = `book.html?title=${encodeURIComponent(book.title)}`;
    });

    list.appendChild(item);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  const results = document.getElementById("searchResults");

  const cards = document.querySelectorAll(".book-card");

  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();

    results.innerHTML = "";

    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const displayTitle = card.querySelector("p").textContent;

      if (title.includes(query) && query !== "") {
        const clone = document.createElement("div");
        clone.classList.add("book-card");

        clone.innerHTML = `<p>${displayTitle}</p>`;

        clone.addEventListener("click", () => {
          window.location.href =
            `book.html?title=${encodeURIComponent(displayTitle)}`;
        });

        results.appendChild(clone);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clearLikesBtn");

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("likes"); 
    location.reload(); 
  });
});
