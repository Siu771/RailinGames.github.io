function set() {
    let Settings = JSON.parse(localStorage.getItem("railin-settings")) || {"Cloak": {"cloak":"Railin","title":"Railin'"}, "Theme": "Default"}
    if (Settings) {
        document.documentElement.setAttribute("data-theme", Settings["Theme"]);

        document.querySelector("link[rel='icon']").href = `/img/cloaks/${Settings["Cloak"].cloak.toLowerCase()}.png`;
        document.title = Settings["Cloak"].title;

        localStorage.setItem("railin-settings", JSON.stringify(Settings))
    }
}

set();