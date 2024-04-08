async function Render(name) {
    let list;
    
    if (name == "projects") {
        list = await (await fetch(`/cdn/projects/list.json`)).json();

        if (list != null) list.forEach(e => {
            const Project = document.createElement("a");
            Project.href = `/load/${e.dir.replace("/", "")}`;
            Project.innerHTML = `
            <div class="box btn-1">
                <img src=${"/cdn/projects/" + e.dir + e.img}>
                <span>${e.name}</span>
            </div>`;
    
            document.querySelector(".holder").appendChild(Project);
        });
    } else if (name == "apps") {
        list = await (await fetch(`/cdn/apps/list.json`)).json();

        if (list != null) list.forEach(e => {
            const App = document.createElement("a");
            App.href = `/load/${e.id}`;
            App.innerHTML = `
            <div class="box btn-1">
                <img src="/cdn/apps/icons/${e.app.toLowerCase()}.png">
                <span>${e.app}</span>
            </div>`;
    
            document.querySelector(".holder").appendChild(App);
        });
    }
}

Render();

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