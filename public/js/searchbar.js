const searchbox = document.getElementById("searchbox");

searchbox.addEventListener("input", () => {
  const searchedup = searchbox.value.trim().toLowerCase();
  const g = document
    .querySelector(".holder")
    .querySelectorAll("a");

  g.forEach((game) => {
    var gamenames = game.querySelector("span").innerText.trim().toLowerCase();
    if (!gamenames.startsWith(searchedup)) game.style.display = "none";
    else game.style.display = "block";
  });
});