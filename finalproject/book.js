document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const titleParam = params.get("title");

  const titleEl = document.getElementById("title");
  const descEl = document.getElementById("desc");
  const likeBtn = document.getElementById("likeBtn");
  const speakBtn = document.getElementById("speakBtn");

  let currentKey = "";

//loading
  titleEl.textContent = "Loading...";
  descEl.textContent = "Loading description...";

  //books
  fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(titleParam)}`)
    .then(res => res.json())
    .then(data => {
      const book = data.docs[0];

      titleEl.textContent = book.title;

      currentKey = book.key;
      window.currentBookKey = book.key;

      return fetch(`https://openlibrary.org${book.key}.json`);
    })
    .then(res => res.json())
    .then(details => {
      const description =
        typeof details.description === "string"
          ? details.description
          : details.description?.value;

      descEl.textContent = description || "No description available.";
    })
    .catch(err => {
      console.error(err);
      titleEl.textContent = "Error loading book";
    });
//like button
  let likes = JSON.parse(localStorage.getItem("likes")) || [];


  const updateLikeUI = () => {
    const title = titleEl.textContent;

    const exists = likes.some(b => b.title === title);

    likeBtn.textContent = exists ? "Liked ❤️" : " Like ❤️";
  };

  likeBtn.addEventListener("click", () => {
    const title = titleEl.textContent;

    const exists = likes.some(b => b.title === title);

    if (exists) {
      likes = likes.filter(b => b.title !== title);
    } else {
      likes.push({
        title: title,
        key: window.currentBookKey
      });
    }

    localStorage.setItem("likes", JSON.stringify(likes));
    updateLikeUI();
  });
//read aloud
  let isSpeaking = false;
  let utterance;

  speakBtn.addEventListener("click", () => {
    const text = descEl.textContent;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      speakBtn.textContent = "🔊 Read Aloud";
      return;
    }

    utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => {
      isSpeaking = false;
      speakBtn.textContent = "🔊 Read Aloud";
    };

    window.speechSynthesis.speak(utterance);

    isSpeaking = true;
    speakBtn.textContent = "⛔ Stop";
  });
});