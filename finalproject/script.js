document.querySelectorAll(".book-card").forEach(card => {

    const title = card.dataset.title;
  
    card.addEventListener("click", () => {
      window.location.href = `book.html?title=${encodeURIComponent(title)}`;
    });
  
  });
