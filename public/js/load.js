(async function() {
    const id = window.location.pathname.replace("/load/", "");
    const list = await (await fetch(`/json/lists.json`)).json();
    const custom_list = JSON.parse(localStorage.getItem("railin-custom"));
    let item;

    // this is weird and repetitive but it gets the job done
    if (list) {
        if (!item) item = list["projects"].find((e) => e.id === id);
        if (!item) item = list["apps"].find((e) => e.id === id);
    }

    if (custom_list) {
        if (!item) item = custom_list["projects"].find((e) => e.id === id);
        if (!item) item = custom_list["apps"].find((e) => e.id === id);
    }

    if (item) {
        document.getElementById("iFrame").src = __uv$config.prefix + __uv$config.encodeUrl(item.url);
        document.getElementById("Title").innerText = item.name;
    }
}())


document.getElementById("Fullscreen").addEventListener("click", () => { document.getElementById("iFrame").requestFullscreen(); })
document.getElementById("OpenLink").addEventListener("click", () => { window.open(document.getElementById("iFrame").src); })