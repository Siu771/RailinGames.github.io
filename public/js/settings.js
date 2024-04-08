async function RenderSettings() {
    const list = await (await fetch(`/json/appearance.json`)).json();
    const Cloaks = list["Cloaks"];

    if (list){ 
        Cloaks.forEach(e => {
            const Item = document.createElement("option")
            Item.className = "box"
            Item.innerHTML = e.cloak
            
            document.querySelector(".cloaks").appendChild(Item);
        });
    }
}

document.querySelector('.cloaks').addEventListener('change', async () => {
    let Settings = JSON.parse(localStorage.getItem("railin-settings")) || {"Cloak": {"cloak":"Railin","title":"Railin'"}, "Theme": "Default"}
    const x = document.querySelector('.cloaks').value; 
    if (x === "") return;
    const title = (await (await fetch(`/json/appearance.json`)).json())["Cloaks"].find((e) => e.cloak === x).title;
    Settings["Cloak"].cloak = x
    Settings["Cloak"].title = title

    localStorage.setItem("railin-settings", JSON.stringify(Settings));
});

document.querySelector('.themes').addEventListener('change', () => {
    let Settings = JSON.parse(localStorage.getItem("railin-settings")) || {"Cloak": {"cloak":"Railin","title":"Railin'"}, "Theme": "Default"}
    const x = document.querySelector('.themes').value; 
    if (x === "") return;
    Settings["Theme"] = x
    localStorage.setItem("railin-settings", JSON.stringify(Settings)); 
    document.documentElement.setAttribute("data-theme", x);
});

RenderSettings();
