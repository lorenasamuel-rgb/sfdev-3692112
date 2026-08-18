const form = document.getElementById("filmForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let score = 50;

  const filmTitle = document.getElementById("filmTitle").value;
  const genre = document.getElementById("genre").value;
  const runtime = Number(document.getElementById("runtime").value);
  const premiere = document.getElementById("premiere").value;
  const pressKit = document.getElementById("pressKit").value;
  const trailer = document.getElementById("trailer").value;

  if (runtime <= 15) {
    score += 10;
  }

  if (premiere === "no") {
    score += 15;
  }

  if (pressKit === "yes") {
    score += 15;
  }

  if (trailer === "yes") {
    score += 10;
  }

  // Save information so results.html can use it
  localStorage.setItem("filmTitle", filmTitle);
  localStorage.setItem("genre", genre);
  localStorage.setItem("runtime", runtime);
  localStorage.setItem("premiere", premiere);
  localStorage.setItem("pressKit", pressKit);
  localStorage.setItem("trailer", trailer);
  localStorage.setItem("festivalScore", score);

  // Go to results page
  window.location.href = "results.html";
});