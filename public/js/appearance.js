(function() {
    let Settings = JSON.parse(localStorage.getItem("railin-settings")) || {"Cloak": {"cloak":"Railin","title":"Railin'"}, "Theme": "Default", "Engine": "Google"}
    if (Settings) {
        document.documentElement.setAttribute("data-theme", Settings["Theme"]);
        localStorage.setItem("railin-settings", JSON.stringify(Settings))

        if (Settings["Cloak"].cloak.toLowerCase() == "railin") return;
        document.querySelector("link[rel='icon']").href = `/img/cloaks/${Settings["Cloak"].cloak.toLowerCase()}.png`;
        document.title = Settings["Cloak"].title;
    }
}())