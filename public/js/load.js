async function Setup(id) {
    const Projects = await (await fetch(`/api/projects/list.json`)).json();
    const Apps = await (await fetch(`/json/apps.json`)).json();

    let ProjectsIndex = Projects.findIndex((e) => e.dir.replace("/", "") === id);
    let AppsIndex = Apps.findIndex((e) => e.id.toString() === id);

    if (ProjectsIndex && ProjectsIndex !== -1) {
        document.getElementById("iFrame").src = "/api/projects/" + Projects[ProjectsIndex].dir;
        document.getElementById("Icon").src = "/api/projects/" + Projects[ProjectsIndex].dir + Projects[ProjectsIndex].img;
        document.getElementById("Title").innerText = Projects[ProjectsIndex].name;
    } else if (AppsIndex && AppsIndex !== -1) {
        document.getElementById("iFrame").src = __uv$config.prefix + __uv$config.encodeUrl(Apps[AppsIndex].url);
        document.getElementById("Icon").src = `/img/apps/${Apps[AppsIndex].app.toLowerCase()}.png`;
        document.getElementById("Title").innerText = Apps[AppsIndex].app;
    }
}

document.getElementById("Fullscreen").addEventListener("mousedown", function() {
    document.getElementById("iFrame").requestFullscreen();
})

document.getElementById("OpenLink").addEventListener("mousedown", function() {
    window.open(document.getElementById("iFrame").src);
})