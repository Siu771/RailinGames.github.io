// If anyone can help reduce the length/size of this code (optimize) it please do 🙏
(async function() {
    const list = await (await fetch("/json/cloaks.json")).json();
    
    if (list) {
        list.forEach(e => {
            const item = document.createElement("option")
            item.className = "box"
            item.innerHTML = e.name
            
            document.querySelector(".Cloak").appendChild(item);
        });
    }
}())

let Settings = JSON.parse(localStorage.getItem("railin-settings")) || {};

function SetSettings(name) {
    const x = document.querySelector(`.${name}`);
    x.addEventListener('change', () => {
        Settings[`${name}`] = x.value;
        if (name === "Theme") document.documentElement.setAttribute("data-theme", x.value);
        localStorage.setItem("railin-settings", JSON.stringify(Settings));
    });
}

// How to get rid of these without making the setSettings function sloppy 🤔
SetSettings("Theme")
SetSettings("Cloak")
SetSettings("Engine")
SetSettings("OnPageLoad")