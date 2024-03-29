async function RenderProjects() {
    const list = await (await fetch(`/api/projects/list.json`)).json();

    if (list) list.forEach(e => {
        const Project = document.createElement("a");
        Project.href = `/load/${e.dir.replace("/", "")}`;
        Project.innerHTML = `
        <div class="box btn-1">
            <img src=${"/api/projects/" + e.dir + e.img}>
            <span>${e.name}</span>
        </div>`;

        document.querySelector(".holder").appendChild(Project);
    });
}

RenderProjects();