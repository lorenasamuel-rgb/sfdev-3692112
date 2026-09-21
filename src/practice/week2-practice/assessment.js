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

  const assessment = {
    filmTitle,
    genre,
    runtime,
    premiere,
    pressKit,
    trailer,
    score,
  };

  localStorage.setItem("festivalAssessment", JSON.stringify(assessment));

  // Go to results page
  window.location.href = "results.html";
});