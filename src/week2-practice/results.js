const score = Number(localStorage.getItem("festivalScore") || 0);
const filmTitle = localStorage.getItem("filmTitle") || "Your film";

const scoreElement = document.getElementById("score");
const filmTitleElement = document.getElementById("filmTitle");
const recommendationsElement = document.getElementById("recommendations");
const festivalListElement = document.getElementById("festivalList");

if (scoreElement) {
  scoreElement.innerText = "Festival Readiness Score: " + score + "/100";
}

if (filmTitleElement) {
  filmTitleElement.innerText = "Film: " + filmTitle;
}

let message = "";

if (score >= 80) {
  message = "Your film appears well prepared for festival submissions.";
} else if (score >= 60) {
  message = "Your film has good festival potential, but some areas should be strengthened before submitting.";
} else {
  message = "We recommend preparing your festival strategy and promotional materials before starting submissions.";
}

if (recommendationsElement) {
  recommendationsElement.innerHTML = "<p>" + message + "</p>";
}

let suggestedFestivals = ["Austin Film Festival", "Indie Memphis", "Local film showcase"];

if (score >= 85) {
  suggestedFestivals = ["Sundance", "Toronto International Film Festival", "SXSW"];
} else if (score >= 70) {
  suggestedFestivals = ["Tribeca", "South by Southwest", "Seattle International Film Festival"];
} else if (score >= 50) {
  suggestedFestivals = ["Atlanta Film Festival", "Mill Valley Film Festival", "Regional short-film circuit"];
}

if (festivalListElement) {
  festivalListElement.innerHTML = suggestedFestivals
    .map((festival) => "<li>" + festival + "</li>")
    .join("");
}