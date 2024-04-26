const iFrame = document.getElementById("iFrame");

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
        iFrame.src = __uv$config.prefix + __uv$config.encodeUrl(item.url);
        document.getElementById("Title").innerText = item.name;
        document.getElementById("Icon").src = item.img;
    }
}())

iFrame.onload = function() {
    if (__uv$config.decodeUrl(iFrame.src).includes("https://fnf.run3.io/")) {
        iFrame.contentDocument.getElementById("playmore").remove()
    }
}

document.getElementById("Fullscreen").addEventListener("click", () => { iFrame.requestFullscreen(); })
document.getElementById("OpenLink").addEventListener("click", () => { window.open(document.getElementById("iFrame").src); })