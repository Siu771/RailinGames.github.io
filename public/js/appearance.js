(async function() {
    let Settings = JSON.parse(localStorage.getItem("railin-settings")) || {};

    if (Settings) {
        if (Settings["Theme"]) document.documentElement.setAttribute("data-theme", Settings["Theme"]);
        
        if (Settings["Cloak"]) {
            if (Settings["Cloak"] == "Railin") return;
            let Cloaks = await (await fetch("/json/cloaks.json")).json();
            const CloakData = Cloaks.find((e) => e.name === Settings["Cloak"]);
            document.querySelector("link[rel='icon']").href = CloakData["img"];
            document.title = CloakData["title"];
        }
    
        localStorage.setItem("railin-settings", JSON.stringify(Settings))
    }
}())