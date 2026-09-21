const savedAssessment = localStorage.getItem("festivalAssessment");
const assessment = savedAssessment
  ? JSON.parse(savedAssessment)
  : { filmTitle: "Your film", genre: "Unknown", runtime: null, score: 0 };

const { filmTitle, genre, runtime, score, premiere, pressKit, trailer } = assessment;

const scoreElement = document.getElementById("score");
const filmTitleElement = document.getElementById("filmTitle");
const filmDetailsElement = document.getElementById("filmDetails");
const recommendationsElement = document.getElementById("recommendations");
const preparationListElement = document.getElementById("preparationList");
const festivalListElement = document.getElementById("festivalList");

if (scoreElement) {
  scoreElement.innerText = "Festival Readiness Score: " + score + "/100";
}

if (filmTitleElement) {
  filmTitleElement.innerText = filmTitle;
}

if (filmDetailsElement) {
  const runtimeText = runtime ? `${runtime} minutes` : "Runtime not provided";
  filmDetailsElement.innerText = `${genre} · ${runtimeText}`;
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
  const recommendationText = document.createElement("p");
  recommendationText.innerText = message;
  recommendationsElement.append(recommendationText);
}

if (preparationListElement) {
  const checklist = [
    [premiere === "no", "Festival premiere available"],
    [pressKit === "yes", "Press kit ready"],
    [trailer === "yes", "Trailer ready"],
  ];

  checklist.forEach(([complete, label]) => {
    const item = document.createElement("li");
    item.innerText = `${complete ? "✓" : "✗"} ${label}`;
    preparationListElement.append(item);
  });
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
  suggestedFestivals.forEach((festival) => {
    const item = document.createElement("li");
    item.innerText = festival;
    festivalListElement.append(item);
  });
}