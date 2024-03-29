async function RenderSettings() {
    const list = await (await fetch(`/json/appearance.json`)).json();
    const Themes = list["Themes"];
    const Cloaks = list["Cloaks"];

    if (list){ 
        Themes.forEach(e => {
            const Item = document.createElement("option")
            Item.className = "box"
            Item.innerHTML = e
            
            document.querySelector(".themes").appendChild(Item);
        });
        Cloaks.forEach(e => {
            const Item = document.createElement("button")
            Item.className = "box"
            Item.onclick = () => setCloak(e.cloak, e.title);
            Item.innerHTML = `<img src=${"/img/cloaks/" + e.cloak.toLowerCase() + ".png"}>`
            
            document.querySelector(".cloaks").appendChild(Item);
        });
    }
}

function setCloak(name, title) {
    let Settings = JSON.parse(localStorage.getItem("railin-settings")) || {"Cloak": {"cloak":"Railin","title":"Railin'"}, "Theme": "Default"}
    Settings["Cloak"].cloak = name
    Settings["Cloak"].title = title

    localStorage.setItem("railin-settings", JSON.stringify(Settings));
}

document.querySelector('.themes').addEventListener('change', () => {
    let Settings = JSON.parse(localStorage.getItem("railin-settings")) || {"Cloak": {"cloak":"Railin","title":"Railin'"}, "Theme": "Default"}
    const x = document.querySelector('.themes').value; 
    if (x == "Themes") return;
    Settings["Theme"] = x
    localStorage.setItem("railin-settings", JSON.stringify(Settings)); 
    document.documentElement.setAttribute("data-theme", x);
});

RenderSettings();
