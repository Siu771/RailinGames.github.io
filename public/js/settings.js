(async function() {
    const list = await (await fetch(`/json/appearance.json`)).json();

    if (list) list["Cloaks"].forEach(e => {
        const item = document.createElement("option")
        item.className = "box"
        item.innerHTML = e.cloak
        
        document.querySelector(".cloaks").appendChild(item);
    });
}())

// ChatGPT wrote this (trust me it was worth it the code was like 100 lines long for this)
const handleSettingsChange = async (className, key, modifier) => {
    let Settings = JSON.parse(localStorage.getItem("railin-settings")) || {"Cloak": {"cloak":"Railin","title":"Railin'"}, "Theme": "Default", "Engine": "Google"}
    const x = document.querySelector(`.${className}`).value; 
    if (x === "") return;
    if (modifier) {
        const modifiedValue = await modifier(x);
        Settings[key] = modifiedValue;
    } else Settings[key] = x;

    localStorage.setItem("railin-settings", JSON.stringify(Settings));
};

document.querySelector('.cloaks').addEventListener('change', async () => {
    handleSettingsChange('cloaks', 'Cloak', async (x) => {
        const title = (await (await fetch(`/json/appearance.json`)).json())["Cloaks"].find((e) => e.cloak === x).title;
        return {cloak: x, title};
    });
});

document.querySelector('.themes').addEventListener('change', () => {
    handleSettingsChange('themes', 'Theme');
    document.documentElement.setAttribute("data-theme", document.querySelector(`.themes`).value);
});

document.querySelector('.engine').addEventListener('change', () => {
handleSettingsChange('engine', 'Engine');
});

document.querySelector(".custom").addEventListener("click", () => { 
    const local = localStorage.getItem("railin-custom")
    if (local) localStorage.removeItem("railin-custom");
} )