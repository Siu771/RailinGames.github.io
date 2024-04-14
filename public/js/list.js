async function Render(name) {
    let list = await (await fetch("/json/lists.json")).json();
    let custom = JSON.parse(localStorage.getItem("railin-custom"));

    // thank you chatgpt for making this code 10x better lol
    if (custom && list)  {
        list["projects"] = [...list["projects"], ...custom["projects"]]
        list["apps"] = [...list["apps"], ...custom["apps"]]
    }

    // im so smart for this omg
    list[name].forEach(e => {
        const item = document.createElement("a");
        item.href = `/load/${e.id}`;
        item.innerHTML = `
        <div class="box btn-1">
            <img src="${e.img}" loading="lazy" onerror="this.src='/img/icons/box.svg'">
            <span>${e.name}</span>
        </div>`;
    
        document.querySelector(".holder").appendChild(item);
    })
}

const searchbox = document.getElementById("searchbox");
searchbox.addEventListener("input", () => { document.querySelector(".holder").querySelectorAll("a").forEach((item) => {
    var names = item.querySelector("span").innerText.trim().toLowerCase();
    if (!names.startsWith(searchbox.value.trim().toLowerCase())) item.style.display = "none";
    else item.style.display = "block";
})});

function addCustom(type) {
    const data = JSON.parse(localStorage.getItem("railin-custom")) || {"apps": [], "projects": []};

    const name = prompt(`What should the ${type} be called?`);
    if (data[type].some(obj => obj.name === name)) return alert("This already exists");
    let url = prompt(`What is the url for this ${type}?`);
    let img = prompt(`Do you have an image for this ${type}?`);

    if (!name || !url) return alert(`Please set ${type} name and url!`);
    if (!url.startsWith("https://") || !url.startsWith("http://")) url = "https://" + url;
    if (img == null || img == "" || img.length < 1) img = ""; // dont ask why i did this ok.

    data[type].push(JSON.parse(`{
        "url": "${url}",
        "name": "${name}",
        "img": "${img}",
        "id": "${type}-${name}"
    }`))

    localStorage.setItem("railin-custom", JSON.stringify(data))
}